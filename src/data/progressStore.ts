import { Page } from '../types';
import { supabase } from './supabaseClient';

/* ──────────────────────────────────────────────────────────────────
 * progressStore
 * ─────────────
 * Camada de persistencia do progresso do aluno.
 *
 * Backend: Supabase (tabela public.user_progress, RLS por user_id).
 * Schema esperado: ver supabase_schema.sql na raiz do projeto.
 *
 * O modelo tem duas camadas:
 *   - Helpers puros e sincronos (emptyUnitProgress, updateUnitProgress,
 *     unitStatus, etc.) usados pelo React state.
 *   - Persistencia async com debounce: loadOrMigrateUserProgress(...)
 *     na inicializacao + saveUserProgress(...) fire-and-forget nas
 *     atualizacoes. flushPendingSave() forca gravacao imediata
 *     (usado em logout / beforeunload).
 *
 * Migracao do localStorage:
 *   Usuarios que ja usavam a versao localStorage (chave
 *   "testlab_user_progress_v1") tem seu progresso migrado para o
 *   Supabase na primeira sessao apos o cadastro com o mesmo e-mail.
 *   A entrada local e removida apos a migracao para nao migrar duas
 *   vezes.
 * ────────────────────────────────────────────────────────────────── */

const LEGACY_KEY = 'testlab_user_progress_v1';
const DEBOUNCE_MS = 600;

export type UnitStatus = 'locked' | 'in-progress' | 'completed';

export interface UnitProgress {
  unitId: number;
  /** Ultima pagina visitada nesta unidade (para retomar). */
  lastPage: Page;
  /** Lista de paginas ja visitadas nesta unidade. */
  visitedPages: Page[];
  /** Ids dos blocos de conteudo teorico ja lidos. */
  contentBlocksRead: string[];
  /** Atividades concluidas (chaves arbitrarias: 'atividade-1-1', 'guided-practice', etc.). */
  completedActivities: string[];
  /** Pontuacao da avaliacao final (0-100). */
  score?: number;
  /** Pontuacao da atividade de conhecimentos previos (0-100). */
  priorScore?: number;
  /** Desafio final concluido. */
  challengeCompleted: boolean;
  /** Unidade considerada concluida (avaliacao final + desafio). */
  completed: boolean;
  startedAt: string;
  updatedAt: string;
}

export interface UserProgress {
  /** UUID do usuario no Supabase Auth (chave primaria). */
  userId: string;
  /** Ultima unidade acessada — usada para "Continuar de onde parei". */
  currentUnitId: number;
  /** Ultima pagina global visitada. */
  lastPage: Page;
  units: Record<number, UnitProgress>;
}

/* ─── Helpers puros e sincronos ────────────────────────────── */

export function emptyUnitProgress(unitId: number): UnitProgress {
  const now = new Date().toISOString();
  return {
    unitId,
    lastPage: 'welcome',
    visitedPages: [],
    contentBlocksRead: [],
    completedActivities: [],
    challengeCompleted: false,
    completed: false,
    startedAt: now,
    updatedAt: now,
  };
}

export function emptyUserProgress(userId: string): UserProgress {
  return {
    userId,
    currentUnitId: 1,
    lastPage: 'home',
    units: {},
  };
}

export function updateUnitProgress(
  progress: UserProgress,
  unitId: number,
  patch: Partial<UnitProgress>,
): UserProgress {
  const prev = progress.units[unitId] ?? emptyUnitProgress(unitId);
  const merged: UnitProgress = {
    ...prev,
    ...patch,
    visitedPages: patch.visitedPages ?? prev.visitedPages,
    contentBlocksRead: patch.contentBlocksRead ?? prev.contentBlocksRead,
    completedActivities: patch.completedActivities ?? prev.completedActivities,
    updatedAt: new Date().toISOString(),
  };
  return {
    ...progress,
    units: { ...progress.units, [unitId]: merged },
  };
}

/**
 * Decide se uma unidade esta liberada com base na conclusao da
 * anterior. Unidade 1 sempre liberada. Demais liberadas se a anterior
 * estiver completed === true OU score >= 75.
 */
export function isUnitUnlocked(unitId: number, progress: UserProgress): boolean {
  if (unitId <= 1) return true;
  const prev = progress.units[unitId - 1];
  if (!prev) return false;
  if (prev.completed) return true;
  if (prev.score !== undefined && prev.score >= 75) return true;
  return false;
}

export function unitStatus(unitId: number, progress: UserProgress): UnitStatus {
  const u = progress.units[unitId];
  if (u?.completed) return 'completed';
  if (!isUnitUnlocked(unitId, progress)) return 'locked';
  if (u && (u.visitedPages.length > 0 || u.score !== undefined)) {
    return 'in-progress';
  }
  return 'in-progress';
}

/**
 * Calcula o percentual de progresso aproximado dentro de uma unidade.
 */
export function unitProgressPercent(
  unitId: number,
  progress: UserProgress,
  totalSteps = 13,
): number {
  const u = progress.units[unitId];
  if (!u) return 0;
  if (u.completed) return 100;
  const visited = Math.min(u.visitedPages.length, totalSteps);
  return Math.round((visited / totalSteps) * 100);
}

/* ─── Carga inicial (async) + migracao legada ──────────────── */

interface ProgressRow {
  user_id: string;
  current_unit_id: number;
  last_page: string;
  units: Record<number, UnitProgress> | null;
  updated_at: string;
}

function rowToProgress(row: ProgressRow): UserProgress {
  return {
    userId: row.user_id,
    currentUnitId: row.current_unit_id ?? 1,
    lastPage: ((row.last_page as Page) ?? 'home') as Page,
    units: row.units ?? {},
  };
}

/**
 * Carrega o progresso do usuario logado. Estrategia:
 *   1) Busca a linha em public.user_progress (Supabase).
 *   2) Se nao houver dados, tenta migrar do localStorage legado
 *      pelo e-mail informado.
 *   3) Caso contrario, retorna estado vazio.
 */
export async function loadOrMigrateUserProgress(
  userId: string,
  email: string,
): Promise<UserProgress> {
  /* 1. Carrega do Supabase. */
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('progressStore: falha ao carregar do Supabase', error);
  }

  const row = data as ProgressRow | null;
  const hasRemoteData =
    row && row.units && Object.keys(row.units).length > 0;

  if (hasRemoteData) {
    return rowToProgress(row);
  }

  /* 2. Tenta migrar do localStorage. */
  const legacy = loadLegacyByEmail(email);
  if (legacy) {
    const migrated: UserProgress = {
      userId,
      currentUnitId: legacy.currentUnitId ?? 1,
      lastPage: legacy.lastPage ?? 'home',
      units: legacy.units ?? {},
    };
    await persistImmediate(migrated);
    clearLegacyByEmail(email);
    return migrated;
  }

  /* 3. Linha existe (criada pelo trigger) mas vazia, ou nao existe. */
  if (row) return rowToProgress(row);
  return emptyUserProgress(userId);
}

/* ─── Saves com debounce ───────────────────────────────────── */

let saveTimer: ReturnType<typeof setTimeout> | null = null;
let pendingProgress: UserProgress | null = null;

/**
 * Agenda uma gravacao no Supabase. Se outro save chegar antes do
 * timer disparar, ele substitui o anterior — apenas a versao mais
 * recente vai para o servidor.
 */
export function saveUserProgress(progress: UserProgress): void {
  if (!progress.userId) return;
  pendingProgress = progress;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    if (pendingProgress) {
      void persistImmediate(pendingProgress);
      pendingProgress = null;
    }
    saveTimer = null;
  }, DEBOUNCE_MS);
}

/**
 * Forca flush imediato do save pendente. Util em logout e
 * beforeunload, para nao perder dados do ultimo segundo.
 */
export function flushPendingSave(): void {
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  if (pendingProgress) {
    void persistImmediate(pendingProgress);
    pendingProgress = null;
  }
}

async function persistImmediate(progress: UserProgress): Promise<void> {
  try {
    const { error } = await supabase.from('user_progress').upsert(
      {
        user_id: progress.userId,
        current_unit_id: progress.currentUnitId,
        last_page: progress.lastPage,
        units: progress.units,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );
    if (error) console.error('progressStore: falha ao gravar', error);
  } catch (e) {
    console.error('progressStore: erro inesperado ao gravar', e);
  }
}

/* ─── Migracao legada (localStorage da versao anterior) ────── */

interface LegacyProgress {
  email?: string;
  currentUnitId?: number;
  lastPage?: Page;
  units?: Record<number, UnitProgress>;
}

function loadLegacyByEmail(email: string): LegacyProgress | null {
  if (!email) return null;
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return null;
    const all = JSON.parse(raw) as Record<string, LegacyProgress>;
    return all[email.trim().toLowerCase()] ?? null;
  } catch {
    return null;
  }
}

function clearLegacyByEmail(email: string): void {
  if (!email) return;
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return;
    const all = JSON.parse(raw) as Record<string, unknown>;
    delete all[email.trim().toLowerCase()];
    if (Object.keys(all).length === 0) {
      localStorage.removeItem(LEGACY_KEY);
    } else {
      localStorage.setItem(LEGACY_KEY, JSON.stringify(all));
    }
  } catch {
    /* ignore */
  }
}
