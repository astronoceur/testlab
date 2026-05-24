import React from 'react';

interface FeedbackBoxProps {
  correct: boolean;
  explanation: string;
  title?: string;
}

const FeedbackBox: React.FC<FeedbackBoxProps> = ({ correct, explanation, title }) => {
  return (
    <div
      className={correct ? 'tl-feedback-ok' : 'tl-feedback-err'}
      style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', alignItems: 'flex-start' }}
    >
      <span style={{ fontSize: '1.4rem', flexShrink: 0, lineHeight: 1 }}>
        {correct ? '✓' : '✗'}
      </span>
      <div>
        <p style={{ fontWeight: 800, margin: 0 }}>
          {title ?? (correct ? 'Correto!' : 'Não foi dessa vez.')}
        </p>
        <p style={{ fontSize: '0.875rem', lineHeight: 1.5, margin: '4px 0 0' }}>{explanation}</p>
      </div>
    </div>
  );
};

export default FeedbackBox;
