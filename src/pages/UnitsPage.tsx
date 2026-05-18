import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import ladybugs from '../assets/perfil_ladybug.png';

/* Visual de cada estado da unidade. */
const STATUS_STYLE = {
  locked: {
    border: 'var(--tl-text-muted)',
    bg: 'var(--tl-bg-soft)',
    label: 'Bloqueada',
    icon: '🔒',
    color: 'var(--tl-text-muted)',
  },
  'in-progress': {
    border: 'var(--tl-card-border)',
    bg: 'var(--tl-card-bg)',
    label: 'Em andamento',
    icon: '▶',
    color: 'var(--tl-title)',
  },
  completed: {
    border: 'var(--tl-success)',
    bg: 'var(--tl-btn-ghost)',
    label: 'Concluída',
    icon: '✓',
    color: 'var(--tl-success)',
  },
} as const;

const UnitsPage: React.FC = () => {
  const {
    navigateTo,
    setCurrentUnit,
    getUnitStatus,
    getUnitProgress,
    getUnitProgressPercent,
    isUnitUnlocked,
    resetUnitProgress,
  } = useApp();

  const handleContinue = (unitId: number) => {
    if (!isUnitUnlocked(unitId)) return;
    setCurrentUnit(unitId);
    const progress = getUnitProgress(unitId);
    /* Se ja tem progresso, vai direto para a ultima pagina; senao
     * abre o welcome (inicio). Em ambos os casos NAO reseta o
     * estado das atividades — permite continuar de onde parou. */
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
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="tl-title" style={{ fontSize: '1.5rem', margin: '0 0 0.25rem' }}>
            Unidades de Aprendizagem
          </h1>
          <p style={{ color: 'var(--tl-text-muted)', fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>
            Selecione uma unidade para continuar de onde parou ou revisar conteúdos.
          </p>
        </div>

        {/* Grid de icones (resumo visual rapido) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0.75rem',
          }}
        >
          {units.map((unit) => {
            const status = getUnitStatus(unit.id);
            const style = STATUS_STYLE[status];
            const unlocked = isUnitUnlocked(unit.id);
            return (
              <button
                key={unit.id}
                onClick={() => handleReview(unit.id)}
                disabled={!unlocked}
                style={{
                  background: style.bg,
                  border: `2px solid ${style.border}`,
                  borderRadius: 10,
                  padding: '0.75rem 0.5rem',
                  cursor: unlocked ? 'pointer' : 'not-allowed',
                  opacity: unlocked ? 1 : 0.6,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'inherit',
                  transition: 'transform 0.1s',
                }}
                onMouseEnter={(e) => {
                  if (unlocked) (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }}
              >
                <span style={{ fontSize: '3rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                  <img src={ladybugs} alt="" style={{ width: '150px', filter: unlocked ? 'none' : 'grayscale(80%)' }} />
                </span>
                <span style={{ fontWeight: 800, fontSize: '0.78rem', color: 'var(--tl-title)' }}>
                  {unit.title}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: style.color,
                  }}
                >
                  {style.icon} {style.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards detalhados */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {units.map((unit) => {
            const status = getUnitStatus(unit.id);
            const style = STATUS_STYLE[status];
            const unlocked = isUnitUnlocked(unit.id);
            const progress = getUnitProgress(unit.id);
            const percent = getUnitProgressPercent(unit.id);
            const score = progress?.score;
            const hasProgress = !!progress && progress.visitedPages.length > 0;

            return (
              <div
                key={unit.id}
                className="tl-card"
                style={{
                  borderLeft: `5px solid ${style.border}`,
                  opacity: unlocked ? 1 : 0.75,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flex: 1 }}>
                    <span style={{ fontSize: '2rem', flexShrink: 0 }}>{unit.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 2 }}>
                        <span style={{ fontWeight: 900, color: 'var(--tl-title)', fontSize: '1rem' }}>
                          {unit.title}
                        </span>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 12,
                            background: '#fff',
                            color: style.color,
                            border: `1px solid ${style.color}`,
                          }}
                        >
                          {style.icon} {style.label}
                        </span>
                        {score !== undefined && (
                          <span
                            style={{
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: 4,
                              background: score >= 75 ? 'var(--tl-btn-ghost)' : 'var(--tl-error-bg)',
                              color: score >= 75 ? 'var(--tl-success)' : 'var(--tl-error-strong)',
                              border: `1px solid ${score >= 75 ? 'var(--tl-success)' : 'var(--tl-error)'}`,
                            }}
                          >
                            Nota: {score}%
                          </span>
                        )}
                      </div>
                      <p style={{ margin: '0 0 4px', fontWeight: 700, color: 'var(--tl-title)', fontSize: '0.875rem' }}>
                        {unit.subtitle}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--tl-text-muted)', lineHeight: 1.4 }}>
                        {unit.description}
                      </p>

                      {hasProgress && status !== 'completed' && (
                        <div style={{ marginTop: 8 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--tl-text-muted)' }}>
                              Progresso
                            </span>
                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--tl-title)' }}>
                              {percent}%
                            </span>
                          </div>
                          <div className="tl-progress-track">
                            <div className="tl-progress-fill" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexShrink: 0 }}>
                    {!unlocked ? (
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--tl-text-muted)',
                          padding: '6px 12px',
                          textAlign: 'center',
                        }}
                      >
                        🔒 Conclua a unidade anterior
                      </span>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default UnitsPage;
