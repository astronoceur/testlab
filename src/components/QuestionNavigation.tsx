import React from 'react';

interface QuestionNavigationProps {
  isFirst: boolean;
  isLast: boolean;
  hasAnswer: boolean;
  revealed: boolean;
  showSubmit?: boolean;
  showSubmitAll?: boolean;
  canSubmitAll?: boolean;

  onPrev: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  onSubmitAll?: () => void;
  onClose: () => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  isFirst,
  isLast,
  hasAnswer,
  revealed,
  showSubmit,
  showSubmitAll,
  canSubmitAll,
  onPrev,
  onNext,
  onSubmit,
  onSubmitAll,
  onClose,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <button
        className="tl-btn-ghost"
        onClick={onPrev}
        disabled={isFirst}
        style={{ opacity: isFirst ? 0.5 : 1, cursor: isFirst ? 'not-allowed' : 'pointer' }}
      >
        ← Anterior
      </button>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {showSubmit && !revealed && (
          <button
            className="tl-btn"
            onClick={onSubmit}
            disabled={!hasAnswer}
            style={{ opacity: hasAnswer ? 1 : 0.6 }}
          >
            Responder
          </button>
        )}

        {!isLast && (
          <button className="tl-btn" onClick={onNext}>
            Próxima →
          </button>
        )}

        {isLast && showSubmitAll && (
          <button
            className="tl-btn"
            onClick={onSubmitAll}
            disabled={!canSubmitAll}
            style={{ opacity: canSubmitAll ? 1 : 0.6 }}
          >
            Enviar Avaliação ✓
          </button>
        )}

        {isLast && !showSubmitAll && (
          <button className="tl-btn" onClick={onClose}>
            Concluir ✓
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionNavigation;
