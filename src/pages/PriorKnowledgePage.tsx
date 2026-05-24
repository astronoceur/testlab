import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import ActivityQuizModal from '../components/ActivityQuizModal';
import { units } from '../data/units';
import { nextPage, previousPage } from '../data/unitFlow';

const PriorKnowledgePage: React.FC = () => {
  const {
    navigateTo,
    currentUnit,
    priorKnowledgeAnswers,
    setPriorKnowledgeAnswers,
    setPriorKnowledgeScore,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const questions = unit.priorKnowledgeQuestions;

  /* Respostas locais — espelham o que o context guarda para
   * preservar entre navegacoes. */
  const [selected, setSelected] = useState<(number | null)[]>(
    priorKnowledgeAnswers.length === questions.length
      ? priorKnowledgeAnswers
      : Array(questions.length).fill(null),
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (priorKnowledgeAnswers.length === questions.length) {
      setSelected(priorKnowledgeAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answeredCount = selected.filter((s) => s !== null).length;
  const correctCount = selected.filter((s, i) => s === questions[i].correctIndex).length;
  const allAnswered = answeredCount === questions.length;

  const handleSelect = (qIdx: number, oIdx: number) => {
    const next = [...selected];
    next[qIdx] = oIdx;
    setSelected(next);
    /* Persiste imediatamente no context — assim, mesmo se o usuario
     * fechar o modal antes de terminar, as respostas sao mantidas. */
    setPriorKnowledgeAnswers(next);
  };

  const handleStart = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleContinue = () => {
    setPriorKnowledgeAnswers(selected);
    setPriorKnowledgeScore(Math.round((correctCount / questions.length) * 100));
    const next = nextPage('prior-knowledge', unit) ?? 'content';
    navigateTo(next);
  };

  const handleBack = () => {
    const prev = previousPage('prior-knowledge', unit) ?? 'objectives';
    navigateTo(prev);
  };

  /* Indice inicial: primeira questao ainda nao respondida (ou 0). */
  const initialIndex = (() => {
    const idx = selected.findIndex((s) => s === null);
    return idx === -1 ? 0 : idx;
  })();

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: 'var(--tl-title)', textTransform: 'uppercase', letterSpacing: 1 }}>
            Ativação de Conhecimentos Prévios
          </p>
          <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
            Quiz de Conhecimentos Prévios
          </h1>
          <p style={{ margin: 0, color: 'var(--tl-text-muted)', fontSize: '0.875rem' }}>
            Não se preocupe com acertos: o objetivo é identificar seus conhecimentos prévios e
            prepará-lo para o conteúdo. As questões aparecem uma a uma em janelas separadas e o
            feedback aparece imediatamente após sua escolha.
          </p>
        </div>

        {/* Card resumo + botao para abrir o modal */}
        <div className="tl-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 800, color: 'var(--tl-title)' }}>
                {questions.length} questões objetivas
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--tl-text-muted)' }}>
                Respondidas: {answeredCount} de {questions.length}
              </p>
            </div>
            <button className="tl-btn" onClick={handleStart}>
              {answeredCount === 0
                ? 'Iniciar quiz →'
                : answeredCount < questions.length
                ? 'Continuar quiz →'
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

        {/* Resumo apos concluir todas */}
        {allAnswered && (
          <div
            className="tl-card"
            style={{
              background: 'var(--tl-btn-ghost)',
              borderColor: 'var(--tl-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: 800, color: 'var(--tl-success)' }}>Quiz concluído!</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--tl-title)' }}>
                Você acertou <strong>{correctCount}</strong> de <strong>{questions.length}</strong>.
                Agora vamos ao conteúdo!
              </p>
            </div>
            <button className="tl-btn" onClick={handleContinue}>
              Continuar →
            </button>
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
        onClose={handleCloseModal}
        questions={questions}
        answers={selected}
        onSelect={handleSelect}
        mode="immediate"
        activityLabel="Conhecimentos Prévios"
        initialIndex={initialIndex}
      />
    </Layout>
  );
};

export default PriorKnowledgePage;
