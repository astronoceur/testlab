import React, { useEffect, useState } from 'react';
import { QuizQuestion } from '../types';
import QuestionModal from './QuestionModal';
import QuestionProgress from './QuestionProgress';
import QuestionNavigation from './QuestionNavigation';
import FeedbackBox from './FeedbackBox';

/* ──────────────────────────────────────────────────────────────────
 * ActivityQuizModal
 * ──────────────────
 * Orquestrador que renderiza UMA questao por vez dentro de um
 * modal. Reutilizado pelas atividades objetivas:
 *
 *   - PriorKnowledgePage   (mode: 'immediate')
 *   - Atividade11Page      (mode: 'immediate')
 *   - FinalAssessmentPage  (mode: 'deferred')
 *
 * No modo 'immediate' o feedback aparece automaticamente apos o
 * usuario clicar numa alternativa (mantendo o comportamento
 * existente da plataforma).
 *
 * No modo 'deferred' o feedback so aparece apos o submitAll global,
 * e ate la o usuario pode navegar livremente entre as questoes
 * trocando respostas.
 *
 * As respostas sao mantidas pelo componente pai (props.answers).
 * O indice da questao corrente e o array de "revelado" no modo
 * immediate ficam em estado local — o componente reabre na primeira
 * questao quando `open` muda de false para true.
 * ────────────────────────────────────────────────────────────────── */

type Mode = 'immediate' | 'deferred';

interface ActivityQuizModalProps {
  open: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
  /** Respostas atuais (selectedIndex por questao). */
  answers: (number | null)[];
  /** Notifica selecao de uma alternativa. */
  onSelect: (qIdx: number, oIdx: number) => void;
  /** Modo de feedback. */
  mode?: Mode;
  /** [deferred] avaliacao ja foi enviada — mostra feedback. */
  submitted?: boolean;
  /** [deferred] callback de Enviar Avaliacao no botao do ultimo modal. */
  onSubmitAll?: () => void;
  /** Texto do header do modal (ex: "Atividade 1.1"). */
  activityLabel?: string;
  /** Indice inicial ao abrir (0-based). Default: 0. */
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

  /* No modo immediate, mantemos um array local de "ja revelado"
   * para que ao reabrir uma questao previamente respondida o
   * feedback apareca novamente. */
  const [revealedLocal, setRevealedLocal] = useState<boolean[]>(() =>
    answers.map((a) => a !== null),
  );

  /* Reabre na questao inicial quando abre o modal. */
  useEffect(() => {
    if (open) {
      setIndex(initialIndex);
      /* Re-sincroniza revealed com o array de respostas — assim
       * uma sessao reaberta apos navegacao ja mostra o feedback
       * das questoes ja respondidas. */
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
    /* Apos revelado/submetido, nao permite alterar. */
    if (mode === 'immediate' && isRevealed) return;
    if (mode === 'deferred' && submitted) return;
    onSelect(index, oIdx);
    /* No modo immediate, clicar na alternativa ja revela o feedback —
     * preserva o comportamento original da plataforma. */
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

  /* "Responder" so e exibido se quisermos um botao explicito —
   * hoje o modo immediate auto-revela ao selecionar, entao mantemos
   * showSubmit=false. Disponivel para uso futuro. */
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
