import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import { Page } from '../types';
import ladybugs from '../assets/ladybug.png';
import bug from '../assets/bug.webp';

/* Rotulos amigaveis para a "ultima etapa" da unidade em andamento. */
const PAGE_LABELS: Partial<Record<Page, string>> = {
  welcome: 'Boas-vindas',
  objectives: 'Objetivos',
  'situation-problem': 'Situação-Problema',
  'prior-knowledge': 'Conhecimentos Prévios',
  content: 'Conteúdo Teórico',
  examples: 'Demonstração',
  demonstration: 'Demonstração',
  'atividade-1-1': 'Atividade 1.1',
  'atividade-1-2': 'Atividade 1.2',
  'guided-practice': 'Prática Guiada',
  'independent-practice': 'Prática Independente',
  feedback: 'Feedback',
  'final-assessment': 'Avaliação Final',
  challenge: 'Desafio Aplicado',
  'unit-contents': 'Conteúdos da Unidade',
};

const HomePage: React.FC = () => {
  const {
    user,
    userProgress,
    navigateTo,
    setCurrentUnit,
    getUnitStatus,
    getUnitProgress,
    getUnitProgressPercent,
    isUnitUnlocked,
    resetUnitProgress,
  } = useApp();

  /* Estatisticas: unidades concluidas e media das notas registradas. */
  let completedUnits = 0;
  const scores: number[] = [];
  units.forEach((u) => {
    const p = getUnitProgress(u.id);
    if (p?.completed) completedUnits += 1;
    if (p?.score !== undefined) scores.push(p.score);
  });
  const avgScore =
    scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  /* Unidade ativa para destacar no card "Continuar de onde parei". */
  const currentUnitId = userProgress.currentUnitId;

  const handleContinue = (unitId: number) => {
    if (!isUnitUnlocked(unitId)) return;
    setCurrentUnit(unitId);
    const progress = getUnitProgress(unitId);
    if (progress && progress.visitedPages.length > 0) {
      navigateTo(progress.lastPage);
    } else {
      navigateTo('welcome');
    }
  };

  const handleRestart = (unitId: number) => {
    if (!isUnitUnlocked(unitId)) return;
    setCurrentUnit(unitId);
    resetUnitProgress();
    navigateTo('welcome');
  };

  const handleReview = (unitId: number) => {
    if (!isUnitUnlocked(unitId)) return;
    setCurrentUnit(unitId);
    navigateTo('unit-contents');
  };

  return (
    <Layout wide>
      <div className="tl-home-grid">
        {/* ─── Coluna esquerda: boas-vindas + estatisticas ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            className="tl-card"
            style={{
              background: 'linear-gradient(135deg, #0F3D2E 0%, #146B4A 100%)',
              border: '2px solid var(--tl-title)',
              color: '#fff',
              textAlign: 'center',
              padding: '2rem 1.5rem',
            }}
          >
            <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
              <img src={ladybugs} alt="Test Lab" style={{ width: '170px' }} />
            </div>
            <h1 style={{ margin: 0, fontSize: '1.55rem', color: '#fff', fontWeight: 900 }}>
              Olá, bem-vindo, {user?.name}!
            </h1>
            <p style={{ margin: '0.5rem 0 0', color: '#EAF7EF', fontWeight: 600, fontSize: '0.95rem' }}>
              Pronto para aprender sobre Testes de Software?
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { value: units.length, label: 'Unidades' },
              { value: completedUnits, label: 'Concluídas' },
              { value: avgScore !== null ? `${avgScore}%` : '--', label: 'Média de acertos' },
            ].map((s) => (
              <div
                key={s.label}
                className="tl-card"
                style={{
                  textAlign: 'center',
                  padding: '1.25rem 0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem',
                  minHeight: '155px',
                }}
              >
                <img
                  src={bug}
                  alt=""
                  style={{ width: '60px', display: 'block', margin: '0 auto' }}
                />
                <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--tl-title)', lineHeight: 1.1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--tl-title)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Coluna direita: lista de unidades ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {units.map((unit) => {
            const status = getUnitStatus(unit.id);
            const unlocked = isUnitUnlocked(unit.id);
            const progress = getUnitProgress(unit.id);
            const hasProgress = !!progress && progress.visitedPages.length > 0;
            const percent = getUnitProgressPercent(unit.id);
            const score = progress?.score;

            /* Card verde "Continuar de onde parei": apenas a unidade
             * ativa do usuario, em andamento e com algum progresso. */
            const isHighlighted =
              status === 'in-progress' && hasProgress && currentUnitId === unit.id;

            /* ─── Unidade bloqueada ─── */
            if (!unlocked) {
              return (
                <div
                  key={unit.id}
                  className="tl-card"
                  style={{
                    background: 'var(--tl-bg-soft)',
                    border: '2px solid var(--tl-text-muted)',
                    opacity: 0.75,
                    padding: '0.875rem 1rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', flex: 1 }}>
                    <span style={{ fontSize: '1.5rem' }}>{unit.icon}</span>
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                          marginBottom: 4,
                        }}
                      >
                        <span style={{ fontWeight: 900, color: 'var(--tl-title)' }}>
                          {unit.title}
                        </span>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 12,
                            background: '#fff',
                            color: 'var(--tl-text-muted)',
                            border: '1px solid var(--tl-text-muted)',
                          }}
                        >
                          🔒 Bloqueada
                        </span>
                      </div>
                      <p
                        style={{
                          margin: '0 0 4px',
                          fontWeight: 700,
                          color: 'var(--tl-title)',
                          fontSize: '0.875rem',
                        }}
                      >
                        {unit.subtitle}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.8rem',
                          color: 'var(--tl-text-muted)',
                          lineHeight: 1.4,
                        }}
                      >
                        {unit.description}
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--tl-text-muted)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      alignSelf: 'center',
                    }}
                  >
                    🔒 Conclua a unidade anterior
                  </span>
                </div>
              );
            }

            /* ─── Unidade em andamento (card verde destacado) ─── */
            if (isHighlighted) {
              const lastLabel = PAGE_LABELS[progress!.lastPage] ?? 'Início da unidade';
              return (
                <div
                  key={unit.id}
                  className="tl-card"
                  style={{
                    background: 'linear-gradient(135deg, #146B4A 0%, #1F8A5B 100%)',
                    border: '2px solid var(--tl-title)',
                    color: '#fff',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.625rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>▶️</span>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        color: '#EAF7EF',
                      }}
                    >
                      Continuar de onde parei
                    </p>
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#fff', fontWeight: 800 }}>
                      {unit.title}: {unit.subtitle}
                    </h2>
                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#EAF7EF' }}>
                      Última etapa: <strong>{lastLabel}</strong>
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EAF7EF' }}>
                        Progresso da unidade
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fff' }}>
                        {percent}%
                      </span>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        borderRadius: 6,
                        height: 12,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          background: '#FFFFFF',
                          height: '100%',
                          width: `${percent}%`,
                          transition: 'width 0.4s ease',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleContinue(unit.id)}
                      className="tl-btn"
                      style={{
                        background: '#fff',
                        color: 'var(--tl-title)',
                        border: '2px solid #fff',
                        fontWeight: 800,
                      }}
                    >
                      Continuar →
                    </button>
                    <button
                      onClick={() => handleReview(unit.id)}
                      className="tl-btn-ghost"
                      style={{
                        background: 'rgba(255,255,255,0.15)',
                        color: '#fff',
                        border: '2px solid rgba(255,255,255,0.5)',
                      }}
                    >
                      Ver conteúdos da unidade
                    </button>
                  </div>
                </div>
              );
            }

            /* ─── Unidade concluida ou unidade liberada sem destaque ─── */
            const isCompleted = status === 'completed';
            return (
              <div
                key={unit.id}
                className="tl-card"
                style={{
                  background: 'var(--tl-bg-soft)',
                  border: `2px solid ${isCompleted ? 'var(--tl-success)' : 'var(--tl-card-border)'}`,
                  padding: '0.875rem 1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', flex: 1 }}>
                  <span style={{ fontSize: '1.5rem' }}>{unit.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontWeight: 900, color: 'var(--tl-title)' }}>
                        {unit.title}
                      </span>
                      {isCompleted && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 12,
                            background: '#fff',
                            color: 'var(--tl-success)',
                            border: '1px solid var(--tl-success)',
                          }}
                        >
                          ✓ Concluída
                        </span>
                      )}
                      {score !== undefined && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 12,
                            background: '#fff',
                            color: score >= 75 ? 'var(--tl-success)' : 'var(--tl-error-strong)',
                            border: `1px solid ${
                              score >= 75 ? 'var(--tl-success)' : 'var(--tl-error)'
                            }`,
                          }}
                        >
                          Nota: {score}%
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        margin: '0 0 4px',
                        fontWeight: 700,
                        color: 'var(--tl-title)',
                        fontSize: '0.875rem',
                      }}
                    >
                      {unit.subtitle}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.8rem',
                        color: 'var(--tl-text-muted)',
                        lineHeight: 1.4,
                      }}
                    >
                      {unit.description}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    flexShrink: 0,
                  }}
                >
                  <button className="tl-btn" onClick={() => handleContinue(unit.id)}>
                    {hasProgress ? 'Continuar' : 'Iniciar'} →
                  </button>
                  <button className="tl-btn-ghost" onClick={() => handleReview(unit.id)}>
                    Ver conteúdos
                  </button>
                  {hasProgress && (
                    <button
                      className="tl-btn-ghost"
                      onClick={() => handleRestart(unit.id)}
                      style={{ fontSize: '0.78rem' }}
                    >
                      Recomeçar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
