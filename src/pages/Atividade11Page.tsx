import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import ActivityQuizModal from '../components/ActivityQuizModal';
import { units } from '../data/units';
import { nextPage, previousPage } from '../data/unitFlow';

const Atividade11Page: React.FC = () => {
  const {
    navigateTo,
    currentUnit,
    atividade11Answers,
    setAtividade11Answers,
    atividade11Submitted,
    setAtividade11Submitted,
    setAtividade11Score,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const atividade = unit.atividade11;

  if (!atividade) {
    const next = nextPage('atividade-1-1', unit) ?? 'guided-practice';
    navigateTo(next);
    return null;
  }

  const questions = atividade.questions;

  const [selected, setSelected] = useState<(number | null)[]>(
    atividade11Answers.length === questions.length
      ? atividade11Answers
      : Array(questions.length).fill(null),
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (atividade11Submitted && atividade11Answers.length === questions.length) {
      setSelected(atividade11Answers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answeredCount = selected.filter((s) => s !== null).length;
  const allAnswered = answeredCount === questions.length;
  const correctCount = selected.filter((s, i) => s === questions[i].correctIndex).length;

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (atividade11Submitted) return;
    const next = [...selected];
    next[qIdx] = oIdx;
    setSelected(next);
    setAtividade11Answers(next);
  };

  const handleSubmit = () => {
    setAtividade11Answers(selected);
    setAtividade11Score(Math.round((correctCount / questions.length) * 100));
    setAtividade11Submitted(true);
  };

  const handleContinue = () => {
    const next = nextPage('atividade-1-1', unit) ?? 'atividade-1-2';
    navigateTo(next);
  };

  const handleBack = () => {
    const prev = previousPage('atividade-1-1', unit) ?? 'demonstration';
    navigateTo(prev);
  };

  /* Indice inicial do modal: primeira nao respondida (se ainda
   * estiver no processo) ou 0 (em modo revisao). */
  const initialIndex = (() => {
    if (atividade11Submitted) return 0;
    const idx = selected.findIndex((s) => s === null);
    return idx === -1 ? 0 : idx;
  })();

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <p
            style={{
              margin: 0,
              fontSize: '0.78rem',
              fontWeight: 800,
              color: 'var(--tl-title)',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Atividade 1.1
          </p>
          <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
            Questionário Objetivo sobre Conceitos
          </h1>
          <p style={{ margin: 0, color: 'var(--tl-text-muted)', fontSize: '0.875rem' }}>
            {atividade.description}
          </p>
        </div>

        {/* Card de progresso e botao do modal */}
        <div className="tl-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 800, color: 'var(--tl-title)' }}>
                {questions.length} questões objetivas
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--tl-text-muted)' }}>
                Respondidas: {answeredCount} de {questions.length}
                {atividade11Submitted && ` · Acertos: ${correctCount}`}
              </p>
            </div>
            <button className="tl-btn" onClick={() => setModalOpen(true)}>
              {atividade11Submitted
                ? 'Revisar respostas'
                : answeredCount === 0
                ? 'Iniciar atividade →'
                : answeredCount < questions.length
                ? 'Continuar atividade →'
                : 'Revisar respostas'}
            </button>
          </div>
          <div className="tl-progress-track" style={{ height: 10 }}>
            <div
              className="tl-progress-fill"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Resumo + acoes */}
        {(allAnswered || atividade11Submitted) && (
          <div
            className="tl-card"
            style={{
              background: correctCount >= 6 ? 'var(--tl-btn-ghost)' : 'var(--tl-error-bg)',
              borderColor: correctCount >= 6 ? 'var(--tl-success)' : 'var(--tl-error)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontWeight: 800,
                  color: correctCount >= 6 ? 'var(--tl-success)' : 'var(--tl-error-strong)',
                }}
              >
                Atividade 1.1 — Resultado
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  color: correctCount >= 6 ? 'var(--tl-title)' : 'var(--tl-error-strong)',
                }}
              >
                Você acertou <strong>{correctCount}</strong> de <strong>{questions.length}</strong>{' '}
                ({Math.round((correctCount / questions.length) * 100)}%).
              </p>
            </div>
            {!atividade11Submitted ? (
              <button className="tl-btn" onClick={handleSubmit}>
                Salvar resultado
              </button>
            ) : (
              <button className="tl-btn" onClick={handleContinue}>
                Continuar →
              </button>
            )}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="tl-btn-ghost" onClick={handleBack}>
            ← Voltar
          </button>
          <button className="tl-btn-ghost" onClick={() => navigateTo('unit-contents')}>
            Retornar para Conteúdos
          </button>
        </div>
      </div>

      <ActivityQuizModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        questions={questions}
        answers={selected}
        onSelect={handleSelect}
        mode="immediate"
        activityLabel="Atividade 1.1"
        initialIndex={initialIndex}
      />
    </Layout>
  );
};

export default Atividade11Page;
