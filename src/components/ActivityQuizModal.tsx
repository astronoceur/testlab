import React, { useEffect, useState } from 'react';
import { QuizQuestion } from '../types';
import QuestionModal from './QuestionModal';
import QuestionProgress from './QuestionProgress';
import QuestionNavigation from './QuestionNavigation';
import FeedbackBox from './FeedbackBox';

type Mode = 'immediate' | 'deferred';

interface ActivityQuizModalProps {
  open: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
  answers: (number | null)[];
  onSelect: (qIdx: number, oIdx: number) => void;
  mode?: Mode;
  submitted?: boolean;
  onSubmitAll?: () => void;
  activityLabel?: string;
  initialIndex?: number;
}

const ActivityQuizModal: React.FC<ActivityQuizModalProps> = ({
  open,
  onClose,
  questions,
  answers,
  onSelect,
  mode = 'immediate',
  submitted = false,
  onSubmitAll,
  activityLabel,
  initialIndex = 0,
}) => {
  const [index, setIndex] = useState(initialIndex);

  const [revealedLocal, setRevealedLocal] = useState<boolean[]>(() =>
    answers.map((a) => a !== null),
  );

  useEffect(() => {
    if (open) {
      setIndex(initialIndex);
      if (mode === 'immediate') {
        setRevealedLocal(answers.map((a) => a !== null));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open || questions.length === 0) return null;

  const q = questions[index];
  const sel = answers[index] ?? null;
  const total = questions.length;
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const answeredCount = answers.filter((a) => a !== null).length;
  const allAnswered = answeredCount === total;

  const isRevealed =
    mode === 'immediate' ? !!revealedLocal[index] : submitted;

  const handleSelect = (oIdx: number) => {
    if (mode === 'immediate' && isRevealed) return;
    if (mode === 'deferred' && submitted) return;
    onSelect(index, oIdx);
    if (mode === 'immediate') {
      setRevealedLocal((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    }
  };

  const handleNext = () => {
    if (!isLast) setIndex(index + 1);
  };
  const handlePrev = () => {
    if (!isFirst) setIndex(index - 1);
  };

  const showSubmit = false;
  const showSubmitAll = mode === 'deferred' && !submitted;

  return (
    <QuestionModal
      open={open}
      onClose={onClose}
      title={
        activityLabel
          ? `${activityLabel} — Questão ${index + 1} de ${total}`
          : `Questão ${index + 1} de ${total}`
      }
      footer={
        <QuestionNavigation
          isFirst={isFirst}
          isLast={isLast}
          hasAnswer={sel !== null}
          revealed={isRevealed}
          showSubmit={showSubmit}
          showSubmitAll={showSubmitAll}
          canSubmitAll={allAnswered}
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmitAll={onSubmitAll}
          onClose={onClose}
        />
      }
    >
      <QuestionProgress current={index + 1} total={total} answered={answeredCount} />

      <p
        style={{
          margin: '0 0 1rem',
          fontWeight: 800,
          fontSize: '1rem',
          color: 'var(--tl-title)',
          lineHeight: 1.45,
          whiteSpace: 'pre-line',
        }}
      >
        {q.question}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {q.options.map((opt, oIdx) => {
          const isSel = sel === oIdx;
          const isCorrect = oIdx === q.correctIndex;
          const rev = isRevealed;

          let cls = 'tl-option';
          if (rev && isCorrect) cls += ' tl-option-correct';
          else if (rev && isSel && !isCorrect) cls += ' tl-option-wrong';
          else if (rev) cls += ' tl-option-disabled';
          else if (isSel) cls += ' tl-option-selected';

          return (
            <button
              key={oIdx}
              onClick={() => handleSelect(oIdx)}
              disabled={rev}
              className={cls}
            >
              {rev && isCorrect && <strong>✓ </strong>}
              {rev && isSel && !isCorrect && <strong>✗ </strong>}
              {opt}
            </button>
          );
        })}
      </div>

      {isRevealed && (
        <FeedbackBox
          correct={sel === q.correctIndex}
          explanation={
            sel === q.correctIndex
              ? q.explanation
              : (q.errorExplanation ?? q.explanation)
          }
        />
      )}
    </QuestionModal>
  );
};

export default ActivityQuizModal;
