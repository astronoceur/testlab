import React from 'react';

/* ──────────────────────────────────────────────────────────────────
 * QuestionProgress
 * ────────────────
 * Indicador de progresso dentro de uma atividade — exibe
 * "Questao N de M" + barra de progresso. Tambem pode receber um
 * total de questoes ja respondidas para mostrar contexto extra.
 * ────────────────────────────────────────────────────────────────── */

interface QuestionProgressProps {
  /** Numero da questao atual (1-indexed). */
  current: number;
  total: number;
  /** Quantidade de questoes ja respondidas (opcional). */
  answered?: number;
}

const QuestionProgress: React.FC<QuestionProgressProps> = ({ current, total, answered }) => {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            color: 'var(--tl-title)',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          Questão {current} de {total}
        </span>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--tl-text-muted)' }}>
          {answered !== undefined ? `${answered}/${total} respondidas` : `${pct}%`}
        </span>
      </div>
      <div className="tl-progress-track" style={{ height: 8 }}>
        <div className="tl-progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default QuestionProgress;
