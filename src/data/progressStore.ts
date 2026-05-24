import { Page } from '../types';
import { supabase } from './supabaseClient';

const LEGACY_KEY = 'testlab_user_progress_v1';
const DEBOUNCE_MS = 600;

export type UnitStatus = 'locked' | 'in-progress' | 'completed';

export interface UnitProgress {
  unitId: number;
  lastPage: Page;
  visitedPages: Page[];
  contentBlocksRead: string[];
  completedActivities: string[];
  score?: number;
  priorScore?: number;
  challengeCompleted: boolean;
  completed: boolean;
  startedAt: string;
  updatedAt: string;
}

export interface UserProgress {
  userId: string;
  currentUnitId: number;
  lastPage: Page;
  units: Record<number, UnitProgress>;
}

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

export async function loadOrMigrateUserProgress(
  userId: string,
  email: string,
): Promise<UserProgress> {
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

  if (row) return rowToProgress(row);
  return emptyUserProgress(userId);
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;
let pendingProgress: UserProgress | null = null;

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
  }
}
