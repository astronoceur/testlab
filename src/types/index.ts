

export type Page =
  | 'login'
  | 'home'
  | 'units'
  | 'unit-contents'
  | 'welcome'
  | 'objectives'
  | 'situation-problem'
  | 'prior-knowledge'
  | 'content'
  | 'examples'
  | 'demonstration'
  | 'atividade-1-1'
  | 'atividade-1-2'
  | 'guided-practice'
  | 'independent-practice'
  | 'feedback'
  | 'final-assessment'
  | 'challenge';

export interface User {
  name: string;
  email: string;
}

export interface StoredUser {
  name: string;
  email: string;
  password: string;
}

export interface QuizQuestion {
  id: string | number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  errorExplanation?: string;
  reviewBlock?: string;
}

export interface UnitMeta {
  cargaHoraria: string;
  nivel: string;
  referencia: string;
  abordagem: string;
  pillars?: string[];
}

export interface SituationProblem {
  title: string;
  paragraphs: string[];
  dialogues?: { speaker: string; text: string }[];
  reflectionQuestions: string[];
  conclusion: string;
}

export type MiniActivityType = 'truefalse' | 'fill' | 'match' | 'text';

export interface MiniActivity {
  type: MiniActivityType;
  prompt: string;
  options?: string[];
  correctIndex?: number;
  pairs?: { left: string; right: string }[];
  placeholder?: string;
  expectedAnswer: string;
}

export interface TheoryBlock {
  id: string;
  number: number;
  title: string;
  icon: string;
  explanation: string[];
  example: { title: string; body: string };
  observation: { title: string; body: string };
  miniActivity: MiniActivity;
}

export interface DemonstrationStep {
  id: number;
  label: string;
  question: string;
  body: string;
  color: string;
}

export interface Demonstration {
  requirement: string;
  situation: string;
  steps: DemonstrationStep[];
  lesson: string;
}

export interface Atividade12 {
  question: string;
  minWords: number;
  criteria: string[];
  sampleAnswer: string;
  rubric: { level: string; range: string; description: string }[];
}

export interface PracticeField {
  key: string;
  label: string;
  description?: string;
  placeholder?: string;
  color?: string;
}

export interface GuidedPracticeRich {
  scenario: string;
  question: string;
  fields: PracticeField[];
  hints: string[];
  expectedAnswers: Record<string, string>;
  feedback: string;
}

export interface IndependentPracticeRich {
  scenario: string;
  tasks: string[];
  fields: PracticeField[];
  expectedAnswers: Record<string, string>;
  criteria: { label: string; weight: string; description: string }[];
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface FinalChallenge {
  enunciado: string;
  scenario: string;
  fields: PracticeField[];
  expectedAnswers: Record<string, string>;
  rubric: {
    level: string;
    range: string;
    achievementCount: string;
    description: string;
  }[];
  finalFeedback: string;
}

export interface ContentSection {
  title: string;
  body: string;
  icon: string;
}

export interface Example {
  id: number;
  scenario: string;
  task: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GuidedPractice {
  question: string;
  context: string;
  options: string[];
  correctAnswers: number[];
  explanation: string;
}

export interface IndependentPracticeField {
  key: string;
  label: string;
  placeholder: string;
}

export interface IndependentPractice {
  title: string;
  scenario: string;
  fields: IndependentPracticeField[];
  sampleAnswer: Record<string, string>;
}

export interface ChallengeField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
  placeholder?: string;
}

export interface Challenge {
  title: string;
  scenario: string;
  tasks: string[];
  fields: ChallengeField[];
  expectedReport: {
    title: string;
    steps: string;
    expected: string;
    actual: string;
    severity: string;
  };
}

export interface Unit {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  meta?: UnitMeta;
  objectives: string[];

  situationProblem?: SituationProblem;
  theoryBlocks?: TheoryBlock[];
  demonstration?: Demonstration;
  atividade11?: { description: string; questions: QuizQuestion[] };
  atividade12?: Atividade12;
  guidedPracticeRich?: GuidedPracticeRich;
  independentPracticeRich?: IndependentPracticeRich;
  finalChallenge?: FinalChallenge;
  reviewMap?: Record<string, string[]>;

  priorKnowledgeQuestions: QuizQuestion[];
  content: ContentSection[];
  examples: Example[];
  guidedPractice: GuidedPractice;
  independentPractice: IndependentPractice;
  finalAssessmentQuestions: QuizQuestion[];
  challenge: Challenge;
}
