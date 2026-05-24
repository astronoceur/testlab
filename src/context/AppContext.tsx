import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Page, User } from '../types';
import { supabase } from '../data/supabaseClient';
import {
  UnitProgress,
  UnitStatus,
  UserProgress,
  emptyUserProgress,
  flushPendingSave,
  isUnitUnlocked,
  loadOrMigrateUserProgress,
  saveUserProgress,
  unitProgressPercent,
  unitStatus,
  updateUnitProgress,
} from '../data/progressStore';

const UNIT_PAGES: Page[] = [
  'welcome',
  'objectives',
  'situation-problem',
  'prior-knowledge',
  'content',
  'examples',
  'demonstration',
  'atividade-1-1',
  'atividade-1-2',
  'guided-practice',
  'independent-practice',
  'feedback',
  'final-assessment',
  'challenge',
  'unit-contents',
];

function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('invalid login credentials')) return 'E-mail ou senha inválidos.';
  if (m.includes('user already registered')) return 'Este e-mail já está cadastrado.';
  if (m.includes('password should be at least')) {
    return 'A senha deve ter pelo menos 6 caracteres.';
  }
  if (m.includes('email not confirmed')) {
    return 'E-mail não confirmado. Verifique sua caixa de entrada.';
  }
  if (m.includes('unable to validate email')) return 'E-mail inválido.';
  if (m.includes('rate limit')) {
    return 'Muitas tentativas. Aguarde alguns segundos e tente novamente.';
  }
  return message;
}

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface RegisterResult extends AuthResult {
  needsConfirmation?: boolean;
}

interface AppContextType {
  page: Page;
  navigateTo: (page: Page) => void;
  user: User | null;
  authLoading: boolean;
  register: (name: string, email: string, password: string) => Promise<RegisterResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;

  currentUnit: number;
  setCurrentUnit: (id: number) => void;

  situationProblemRead: boolean;
  setSituationProblemRead: (v: boolean) => void;

  priorKnowledgeAnswers: (number | null)[];
  setPriorKnowledgeAnswers: (a: (number | null)[]) => void;
  priorKnowledgeScore: number;
  setPriorKnowledgeScore: (s: number) => void;

  miniActivityAnswers: Record<string, string>;
  setMiniActivityAnswer: (blockId: string, value: string) => void;
  miniActivityRevealed: Record<string, boolean>;
  revealMiniActivity: (blockId: string) => void;

  demonstrationViewed: boolean;
  setDemonstrationViewed: (v: boolean) => void;

  atividade11Answers: (number | null)[];
  setAtividade11Answers: (a: (number | null)[]) => void;
  atividade11Submitted: boolean;
  setAtividade11Submitted: (v: boolean) => void;
  atividade11Score: number;
  setAtividade11Score: (s: number) => void;

  atividade12Answer: string;
  setAtividade12Answer: (s: string) => void;
  atividade12Submitted: boolean;
  setAtividade12Submitted: (v: boolean) => void;

  guidedPracticeFields: Record<string, string>;
  setGuidedPracticeField: (key: string, value: string) => void;
  guidedPracticeAttempts: number;
  incrementGuidedPracticeAttempts: () => void;
  guidedPracticeSubmitted: boolean;
  setGuidedPracticeSubmitted: (v: boolean) => void;

  guidedPracticeSelected: number[];
  setGuidedPracticeSelected: (a: number[]) => void;

  independentPracticeAnswer: Record<string, string>;
  setIndependentPracticeAnswer: (a: Record<string, string>) => void;
  independentPracticeSubmitted: boolean;
  setIndependentPracticeSubmitted: (v: boolean) => void;

  finalAssessmentAnswers: (number | null)[];
  setFinalAssessmentAnswers: (a: (number | null)[]) => void;
  finalAssessmentScore: number;
  setFinalAssessmentScore: (s: number) => void;
  finalAssessmentSubmitted: boolean;
  setFinalAssessmentSubmitted: (v: boolean) => void;

  challengeAnswers: Record<string, string>;
  setChallengeAnswers: (a: Record<string, string>) => void;
  challengeSubmitted: boolean;
  setChallengeSubmitted: (v: boolean) => void;

  userProgress: UserProgress;
  markPageVisited: (page: Page) => void;
  markContentBlockRead: (unitId: number, blockId: string) => void;
  markActivityCompleted: (unitId: number, activityKey: string) => void;
  setUnitScore: (unitId: number, score: number) => void;
  markUnitCompleted: (unitId: number) => void;
  getUnitStatus: (unitId: number) => UnitStatus;
  getUnitProgressPercent: (unitId: number) => number;
  isUnitUnlocked: (unitId: number) => boolean;
  getUnitProgress: (unitId: number) => UnitProgress | undefined;
  resumeProgress: () => void;

  unitScores: Record<number, number>;
  unitCompleted: Record<number, boolean>;

  resetUnitProgress: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [page, setPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);
  const [currentUnit, setCurrentUnit] = useState(1);

  const [situationProblemRead, setSituationProblemRead] = useState(false);

  const [priorKnowledgeAnswers, setPriorKnowledgeAnswers] = useState<(number | null)[]>([]);
  const [priorKnowledgeScore, setPriorKnowledgeScore] = useState(0);

  const [miniActivityAnswers, setMiniActivityAnswers] = useState<Record<string, string>>({});
  const [miniActivityRevealed, setMiniActivityRevealed] = useState<Record<string, boolean>>({});

  const [demonstrationViewed, setDemonstrationViewed] = useState(false);

  const [atividade11Answers, setAtividade11Answers] = useState<(number | null)[]>([]);
  const [atividade11Submitted, setAtividade11Submitted] = useState(false);
  const [atividade11Score, setAtividade11Score] = useState(0);

  const [atividade12Answer, setAtividade12Answer] = useState('');
  const [atividade12Submitted, setAtividade12Submitted] = useState(false);

  const [guidedPracticeFields, setGuidedPracticeFields] = useState<Record<string, string>>({});
  const [guidedPracticeAttempts, setGuidedPracticeAttempts] = useState(0);
  const [guidedPracticeSubmitted, setGuidedPracticeSubmitted] = useState(false);

  const [guidedPracticeSelected, setGuidedPracticeSelected] = useState<number[]>([]);

  const [independentPracticeAnswer, setIndependentPracticeAnswer] = useState<Record<string, string>>({});
  const [independentPracticeSubmitted, setIndependentPracticeSubmitted] = useState(false);

  const [finalAssessmentAnswers, setFinalAssessmentAnswers] = useState<(number | null)[]>([]);
  const [finalAssessmentScore, setFinalAssessmentScore] = useState(0);
  const [finalAssessmentSubmitted, setFinalAssessmentSubmitted] = useState(false);

  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, string>>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);

  const [userProgress, setUserProgress] = useState<UserProgress>(() => emptyUserProgress(''));

  const unitScores: Record<number, number> = {};
  const unitCompleted: Record<number, boolean> = {};
  Object.values(userProgress.units).forEach((u) => {
    if (u.score !== undefined) unitScores[u.unitId] = u.score;
    if (u.completed) unitCompleted[u.unitId] = true;
  });

  const progressRef = useRef(userProgress);
  progressRef.current = userProgress;

  useEffect(() => {
    let mounted = true;

    async function applySession(session: Session) {
      const u = session.user;
      const displayName =
        (u.user_metadata?.name as string | undefined) ??
        u.email?.split('@')[0] ??
        'Aluno';
      setUser({ name: displayName, email: u.email ?? '' });

      const loaded = await loadOrMigrateUserProgress(u.id, u.email ?? '');
      if (!mounted) return;
      setUserProgress(loaded);
      setCurrentUnit(loaded.currentUnitId || 1);
      setPage('home');
    }

    async function bootstrap() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (data.session) {
        await applySession(data.session);
      }
      if (mounted) setAuthLoading(false);
    }

    bootstrap();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === 'SIGNED_IN' && session) {
        setAuthLoading(true);
        applySession(session).finally(() => {
          if (mounted) setAuthLoading(false);
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setUserProgress(emptyUserProgress(''));
        setPage('login');
      }
    });

    const onBeforeUnload = () => flushPendingSave();
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (next: UserProgress) => {
    setUserProgress(next);
    if (next.userId) saveUserProgress(next);
  };

  const patchUnit = (unitId: number, patch: Partial<UnitProgress>) => {
    const next = updateUnitProgress(progressRef.current, unitId, patch);
    persist(next);
  };

  const navigateTo = (p: Page) => {
    setPage(p);
    if (UNIT_PAGES.includes(p) && progressRef.current.userId) {
      const unitId = currentUnit;
      const prev = progressRef.current.units[unitId];
      const visited = prev?.visitedPages ?? [];
      const nextVisited = visited.includes(p) ? visited : [...visited, p];
      const next: UserProgress = {
        ...progressRef.current,
        currentUnitId: unitId,
        lastPage: p,
        units: {
          ...progressRef.current.units,
          [unitId]: {
            ...(prev ?? {
              unitId,
              lastPage: p,
              visitedPages: [],
              contentBlocksRead: [],
              completedActivities: [],
              challengeCompleted: false,
              completed: false,
              startedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }),
            unitId,
            lastPage: p,
            visitedPages: nextVisited,
            updatedAt: new Date().toISOString(),
          },
        },
      };
      persist(next);
    } else if (progressRef.current.userId) {
      persist({ ...progressRef.current, lastPage: p });
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<RegisterResult> => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { name: name.trim() } },
    });
    if (error) return { ok: false, error: translateAuthError(error.message) };
    const needsConfirmation = !data.session;
    return { ok: true, needsConfirmation };
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) return { ok: false, error: translateAuthError(error.message) };
    return { ok: true };
  };

  const logout = async (): Promise<void> => {
    flushPendingSave();
    await supabase.auth.signOut();
  };

  const markPageVisited = (p: Page) => {
    if (!UNIT_PAGES.includes(p)) return;
    const unitId = currentUnit;
    const prev = progressRef.current.units[unitId];
    const visited = prev?.visitedPages ?? [];
    if (visited.includes(p)) return;
    patchUnit(unitId, {
      lastPage: p,
      visitedPages: [...visited, p],
    });
  };

  const markContentBlockRead = (unitId: number, blockId: string) => {
    const prev = progressRef.current.units[unitId];
    const list = prev?.contentBlocksRead ?? [];
    if (list.includes(blockId)) return;
    patchUnit(unitId, { contentBlocksRead: [...list, blockId] });
  };

  const markActivityCompleted = (unitId: number, activityKey: string) => {
    const prev = progressRef.current.units[unitId];
    const list = prev?.completedActivities ?? [];
    if (list.includes(activityKey)) return;
    const challengeCompleted =
      activityKey === 'challenge' ? true : prev?.challengeCompleted ?? false;
    patchUnit(unitId, {
      completedActivities: [...list, activityKey],
      challengeCompleted,
    });
  };

  const setUnitScore = (unitId: number, score: number) => {
    patchUnit(unitId, { score });
  };

  const markUnitCompleted = (unitId: number) => {
    patchUnit(unitId, { completed: true });
  };

  const wrappedSetAtividade11Submitted = (v: boolean) => {
    setAtividade11Submitted(v);
    if (v) markActivityCompleted(currentUnit, 'atividade-1-1');
  };
  const wrappedSetAtividade12Submitted = (v: boolean) => {
    setAtividade12Submitted(v);
    if (v) markActivityCompleted(currentUnit, 'atividade-1-2');
  };
  const wrappedSetGuidedPracticeSubmitted = (v: boolean) => {
    setGuidedPracticeSubmitted(v);
    if (v) markActivityCompleted(currentUnit, 'guided-practice');
  };
  const wrappedSetIndependentPracticeSubmitted = (v: boolean) => {
    setIndependentPracticeSubmitted(v);
    if (v) markActivityCompleted(currentUnit, 'independent-practice');
  };
  const wrappedSetFinalAssessmentSubmitted = (v: boolean) => {
    setFinalAssessmentSubmitted(v);
    if (v) markActivityCompleted(currentUnit, 'final-assessment');
  };
  const wrappedSetChallengeSubmitted = (v: boolean) => {
    setChallengeSubmitted(v);
    if (v) markActivityCompleted(currentUnit, 'challenge');
  };
  const wrappedSetPriorKnowledgeScore = (s: number) => {
    setPriorKnowledgeScore(s);
    patchUnit(currentUnit, { priorScore: s });
  };

  const getUnitStatus = (unitId: number) => unitStatus(unitId, progressRef.current);

  const getUnitProgressPercent = (unitId: number) =>
    unitProgressPercent(unitId, progressRef.current);

  const isUnitUnlockedFn = (unitId: number) => isUnitUnlocked(unitId, progressRef.current);

  const getUnitProgress = (unitId: number) => progressRef.current.units[unitId];

  const resumeProgress = () => {
    const p = progressRef.current;
    if (!p.userId) return;
    const unitId = p.currentUnitId || 1;
    setCurrentUnit(unitId);
    const target = p.units[unitId]?.lastPage ?? 'welcome';
    navigateTo(target);
  };

  const setMiniActivityAnswer = (blockId: string, value: string) =>
    setMiniActivityAnswers((prev) => ({ ...prev, [blockId]: value }));

  const revealMiniActivity = (blockId: string) => {
    setMiniActivityRevealed((prev) => ({ ...prev, [blockId]: true }));
    if (currentUnit) markContentBlockRead(currentUnit, blockId);
  };

  const setGuidedPracticeField = (key: string, value: string) =>
    setGuidedPracticeFields((prev) => ({ ...prev, [key]: value }));

  const incrementGuidedPracticeAttempts = () =>
    setGuidedPracticeAttempts((prev) => prev + 1);

  const resetUnitProgress = () => {
    setSituationProblemRead(false);
    setPriorKnowledgeAnswers([]);
    setPriorKnowledgeScore(0);
    setMiniActivityAnswers({});
    setMiniActivityRevealed({});
    setDemonstrationViewed(false);
    setAtividade11Answers([]);
    setAtividade11Submitted(false);
    setAtividade11Score(0);
    setAtividade12Answer('');
    setAtividade12Submitted(false);
    setGuidedPracticeFields({});
    setGuidedPracticeAttempts(0);
    setGuidedPracticeSubmitted(false);
    setGuidedPracticeSelected([]);
    setIndependentPracticeAnswer({});
    setIndependentPracticeSubmitted(false);
    setFinalAssessmentAnswers([]);
    setFinalAssessmentScore(0);
    setFinalAssessmentSubmitted(false);
    setChallengeAnswers({});
    setChallengeSubmitted(false);
  };

  return (
    <AppContext.Provider
      value={{
        page,
        navigateTo,
        user,
        authLoading,
        register,
        login,
        logout,
        currentUnit,
        setCurrentUnit,
        situationProblemRead,
        setSituationProblemRead,
        priorKnowledgeAnswers,
        setPriorKnowledgeAnswers,
        priorKnowledgeScore,
        setPriorKnowledgeScore: wrappedSetPriorKnowledgeScore,
        miniActivityAnswers,
        setMiniActivityAnswer,
        miniActivityRevealed,
        revealMiniActivity,
        demonstrationViewed,
        setDemonstrationViewed,
        atividade11Answers,
        setAtividade11Answers,
        atividade11Submitted,
        setAtividade11Submitted: wrappedSetAtividade11Submitted,
        atividade11Score,
        setAtividade11Score,
        atividade12Answer,
        setAtividade12Answer,
        atividade12Submitted,
        setAtividade12Submitted: wrappedSetAtividade12Submitted,
        guidedPracticeFields,
        setGuidedPracticeField,
        guidedPracticeAttempts,
        incrementGuidedPracticeAttempts,
        guidedPracticeSubmitted,
        setGuidedPracticeSubmitted: wrappedSetGuidedPracticeSubmitted,
        guidedPracticeSelected,
        setGuidedPracticeSelected,
        independentPracticeAnswer,
        setIndependentPracticeAnswer,
        independentPracticeSubmitted,
        setIndependentPracticeSubmitted: wrappedSetIndependentPracticeSubmitted,
        finalAssessmentAnswers,
        setFinalAssessmentAnswers,
        finalAssessmentScore,
        setFinalAssessmentScore,
        finalAssessmentSubmitted,
        setFinalAssessmentSubmitted: wrappedSetFinalAssessmentSubmitted,
        challengeAnswers,
        setChallengeAnswers,
        challengeSubmitted,
        setChallengeSubmitted: wrappedSetChallengeSubmitted,
        userProgress,
        markPageVisited,
        markContentBlockRead,
        markActivityCompleted,
        setUnitScore,
        markUnitCompleted,
        getUnitStatus,
        getUnitProgressPercent,
        isUnitUnlocked: isUnitUnlockedFn,
        getUnitProgress,
        resumeProgress,
        unitScores,
        unitCompleted,
        resetUnitProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
