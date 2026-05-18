import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import ContinueCard from '../components/ContinueCard';
import { units } from '../data/units';
import ladybugs from '../assets/ladybug.png';
import bug from '../assets/bug.webp';

/* Mapeia status da unidade para cor de borda/ icone usados no
 * card resumido. Mantem identidade verde/vermelho/branco. */
const STATUS_VISUAL: Record<
  'locked' | 'in-progress' | 'completed',
  { color: string; bg: string; label: string; icon: string }
> = {
  locked:        { color: 'var(--tl-text-muted)', bg: '#F8F9FA', label: 'Bloqueada',    icon: '🔒' },
  'in-progress': { color: 'var(--tl-card-border)', bg: 'var(--tl-btn-ghost)', label: 'Em andamento', icon: '▶' },
  completed:     { color: 'var(--tl-success)', bg: 'var(--tl-btn-ghost)', label: 'Concluída', icon: '✓' },
};

const HomePage: React.FC = () => {
  const { user, navigateTo, setCurrentUnit, getUnitStatus, getUnitProgress, isUnitUnlocked } = useApp();

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

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Hero */}
        <div
          className="tl-card"
          style={{
            background: 'linear-gradient(135deg, #0F3D2E 0%, #146B4A 100%)',
            border: '2px solid var(--tl-title)',
            color: '#fff',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
              <img src={ladybugs} alt="Test Lab" style={{ width: '150px'}} />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#fff', fontWeight: 900 }}>
            Olá, bem-vindo, {user?.name}!
          </h1>
          <p style={{ margin: '0.5rem 0 0', color: '#EAF7EF', fontWeight: 600 }}>
            Pronto para aprender sobre Testes de Software?
          </p>
        </div>

        {/* Continuar de onde parei (so aparece se houver progresso) */}
        <ContinueCard />

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {[
            { icon: <img src={bug} alt="" style={{ width: '60px', display: 'block', margin: '0 auto'}}/>, value: units.length, label: 'Unidades' },
            { icon: <img src={bug} alt="" style={{ width: '60px', display: 'block', margin: '0 auto'}}/>, value: completedUnits, label: 'Concluídas' },
            { icon: <img src={bug} alt="" style={{ width: '60px', display: 'block', margin: '0 auto'}}/>, value: avgScore !== null ? `${avgScore}%` : '--', label: 'Média de acertos' },
          ].map((s) => (
            <div
              key={s.label}
              className="tl-card"
              style={{ textAlign: 'center', padding: '1rem 0.5rem' }}
            >
              <div style={{ fontSize: '1.8rem' }}>{s.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--tl-title)' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--tl-title)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trilha de aprendizagem com status visual */}
        <div>
          <h2 className="tl-title" style={{ margin: '0 0 0.75rem' }}>
            Sua Trilha de Aprendizagem
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {units.map((unit) => {
              const status = getUnitStatus(unit.id);
              const visual = STATUS_VISUAL[status];
              const unlocked = isUnitUnlocked(unit.id);
              const progress = getUnitProgress(unit.id);
              const score = progress?.score;

              const handleClick = () => {
                if (!unlocked) return;
                setCurrentUnit(unit.id);
                navigateTo('unit-contents');
              };

              return (
                <div
                  key={unit.id}
                  className="tl-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    borderLeft: `5px solid ${visual.color}`,
                    background: unlocked ? 'var(--tl-card-bg)' : visual.bg,
                    opacity: unlocked ? 1 : 0.7,
                    cursor: unlocked ? 'pointer' : 'not-allowed',
                  }}
                  onClick={handleClick}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                    <span style={{ fontSize: '1.5rem' }}>{unit.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontWeight: 800, color: 'var(--tl-title)' }}>{unit.title}</p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--tl-text-muted)' }}>{unit.subtitle}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: 12,
                        background: '#fff',
                        color: visual.color,
                        border: `1px solid ${visual.color}`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {visual.icon} {visual.label}
                    </span>
                    {score !== undefined && (
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: '0.72rem',
                          padding: '2px 8px',
                          borderRadius: 4,
                          background: score >= 75 ? 'var(--tl-btn-ghost)' : 'var(--tl-error-bg)',
                          color: score >= 75 ? 'var(--tl-success)' : 'var(--tl-error-strong)',
                          border: `1px solid ${score >= 75 ? 'var(--tl-success)' : 'var(--tl-error)'}`,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {score}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
          <button className="tl-btn" onClick={() => navigateTo('units')} style={{ padding: '10px 32px', fontSize: '1rem' }}>
            Ir para Unidades →
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
