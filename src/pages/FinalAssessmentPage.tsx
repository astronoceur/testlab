import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import ActivityQuizModal from '../components/ActivityQuizModal';
import { units } from '../data/units';

const FinalAssessmentPage: React.FC = () => {
  const {
    navigateTo,
    currentUnit,
    finalAssessmentAnswers,
    setFinalAssessmentAnswers,
    finalAssessmentScore,
    setFinalAssessmentScore,
    finalAssessmentSubmitted,
    setFinalAssessmentSubmitted,
    setUnitScore,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const questions = unit.finalAssessmentQuestions;

  /* Threshold: 70% para unidades ricas (Unidade 1 padrão CTFL),
   * 75% para unidades legadas. */
  const isRich = !!unit.theoryBlocks;
  const passingThreshold = isRich ? 70 : 75;

  const [selected, setSelected] = useState<(number | null)[]>(
    finalAssessmentAnswers.length === questions.length
      ? finalAssessmentAnswers
      : Array(questions.length).fill(null),
  );
  const [modalOpen, setModalOpen] = useState(false);

  const answeredCount = selected.filter((s) => s !== null).length;
  const allAnswered = answeredCount === questions.length;
  const correctCount = selected.filter((s, i) => s === questions[i].correctIndex).length;
  const passed = finalAssessmentScore >= passingThreshold;

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (finalAssessmentSubmitted) return;
    const next = [...selected];
    next[qIdx] = oIdx;
    setSelected(next);
    setFinalAssessmentAnswers(next);
  };

  const handleSubmitAll = () => {
    const correct = selected.filter((s, i) => s === questions[i].correctIndex).length;
    const pct = Math.round((correct / questions.length) * 100);
    setFinalAssessmentAnswers(selected);
    setFinalAssessmentScore(pct);
    setFinalAssessmentSubmitted(true);
    setUnitScore(currentUnit, pct);
    /* Mantem o modal aberto — agora em modo "revisao com feedback".
     * O usuario pode navegar pelas questoes vendo respostas certas
     * e explicacoes antes de fechar. */
  };

  /* Erros agrupados por bloco de revisao (Unidade 1) */
  const blocksToReview = useMemo(() => {
    if (!finalAssessmentSubmitted) return [] as string[];
    const wrongIds = questions
      .filter((q, i) => selected[i] !== q.correctIndex)
      .map((q) => String(q.id));
    if (!unit.reviewMap) {
      const blocks = questions
        .filter((_, i) => selected[i] !== questions[i].correctIndex)
        .flatMap((q) => (q.reviewBlock ? q.reviewBlock.split(',') : []));
      return Array.from(new Set(blocks));
    }
    const blocks = wrongIds.flatMap((id) => unit.reviewMap![id] ?? []);
    return Array.from(new Set(blocks));
  }, [finalAssessmentSubmitted, selected, questions, unit.reviewMap]);

  const blockLabels: Record<string, string> = {
    'bloco-1': 'Bloco 1 — Qualidade de Software',
    'bloco-2': 'Bloco 2 — O que é Teste de Software',
    'bloco-3': 'Bloco 3 — Objetivos do Teste',
    'bloco-4': 'Bloco 4 — Erro, Falha e Defeito',
    'bloco-5': 'Bloco 5 — Importância do Teste no Ciclo',
  };

  /* Indice inicial: primeira nao respondida (durante o quiz) ou
   * 0 (quando ja submetido). */
  const initialIndex = (() => {
    if (finalAssessmentSubmitted) return 0;
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
            Avaliação Final {isRich ? '— Padrão CTFL/ISTQB Foundation Level' : ''}
          </p>
          <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
            {questions.length} questões objetivas
          </h1>
          <p style={{ margin: 0, color: 'var(--tl-text-muted)', fontSize: '0.875rem' }}>
            Responda cada questão na janela e clique em Próxima. Aprovação requer{' '}
            <strong>{passingThreshold}%</strong> ou mais. O feedback aparece após enviar a
            avaliação completa.
          </p>
        </div>

        {/* Card de status */}
        <div className="tl-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 800, color: 'var(--tl-title)' }}>
                Status: {finalAssessmentSubmitted ? 'Avaliação enviada' : 'Em andamento'}
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--tl-text-muted)' }}>
                Respondidas: {answeredCount} de {questions.length}
                {finalAssessmentSubmitted && ` · Pontuação: ${finalAssessmentScore}%`}
              </p>
            </div>
            <button className="tl-btn" onClick={() => setModalOpen(true)}>
              {finalAssessmentSubmitted
                ? 'Revisar respostas e feedback'
                : answeredCount === 0
                ? 'Iniciar avaliação →'
                : 'Continuar avaliação →'}
            </button>
          </div>
          <div className="tl-progress-track" style={{ height: 10 }}>
            <div
              className="tl-progress-fill"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Resultado apos envio */}
        {finalAssessmentSubmitted && (
          <>
            <div
              className="tl-card"
              style={{
                textAlign: 'center',
                padding: '2rem',
                background: passed ? 'var(--tl-btn-ghost)' : 'var(--tl-error-bg)',
                borderColor: passed ? 'var(--tl-success)' : 'var(--tl-error)',
                borderWidth: 3,
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{passed ? '🎉' : '📚'}</div>
              <p
                style={{
                  margin: '0 0 4px',
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: passed ? 'var(--tl-success)' : 'var(--tl-error-strong)',
                }}
              >
                {finalAssessmentScore}%
              </p>
              <p
                style={{
                  margin: '0 0 8px',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: passed ? 'var(--tl-success)' : 'var(--tl-error-strong)',
                }}
              >
                {correctCount}/{questions.length} questões corretas —{' '}
                {passed ? 'Aprovado!' : 'Precisa revisar'}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  color: passed ? 'var(--tl-title)' : 'var(--tl-error-strong)',
                }}
              >
                {passed
                  ? `Excelente! Você atingiu ${passingThreshold}% ou mais. O Desafio Aplicado está desbloqueado.`
                  : `Você ficou abaixo de ${passingThreshold}%. Veja abaixo os blocos sugeridos para revisão.`}
              </p>
            </div>

            {!passed && blocksToReview.length > 0 && (
              <div className="tl-card" style={{ background: 'var(--tl-bg-soft)', borderColor: 'var(--tl-card-border)' }}>
                <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: 'var(--tl-title)' }}>
                  📚 Blocos sugeridos para revisão
                </p>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  {blocksToReview.map((bId) => (
                    <li
                      key={bId}
                      style={{
                        background: '#fff',
                        border: '1px solid var(--tl-card-border)',
                        borderRadius: 6,
                        padding: '0.4rem 0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--tl-title)',
                      }}
                    >
                      🔁 {blockLabels[bId] ?? bId}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="tl-btn-ghost" onClick={() => navigateTo('feedback')}>
              ← Voltar
            </button>
            <button className="tl-btn-ghost" onClick={() => navigateTo('unit-contents')}>
              Retornar para Conteúdos
            </button>
          </div>
          {finalAssessmentSubmitted && passed && (
            <button className="tl-btn" onClick={() => navigateTo('challenge')}>
              Ir ao Desafio Aplicado 🏆
            </button>
          )}
          {finalAssessmentSubmitted && !passed && (
            <button className="tl-btn-ghost" onClick={() => navigateTo('content')}>
              Rever Conteúdo →
            </button>
          )}
          {!finalAssessmentSubmitted && !allAnswered && (
            <span style={{ fontSize: '0.78rem', color: 'var(--tl-text-muted)' }}>
              Responda todas as questões na janela para enviar.
            </span>
          )}
        </div>
      </div>

      <ActivityQuizModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        questions={questions}
        answers={selected}
        onSelect={handleSelect}
        mode="deferred"
        submitted={finalAssessmentSubmitted}
        onSubmitAll={handleSubmitAll}
        activityLabel="Avaliação Final"
        initialIndex={initialIndex}
      />
    </Layout>
  );
};

export default FinalAssessmentPage;
