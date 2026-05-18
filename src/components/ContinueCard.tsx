import React from 'react';
import { useApp } from '../context/AppContext';
import { units } from '../data/units';
import { Page } from '../types';

/* ──────────────────────────────────────────────────────────────────
 * ContinueCard
 * ─────────────
 * Card "Continuar de onde parei" exibido no Dashboard quando o
 * usuario ja iniciou alguma unidade. Mostra:
 *   - Nome da unidade atual
 *   - Ultima atividade acessada (rotulo amigavel)
 *   - Percentual de progresso
 *   - Botao "Continuar"
 *
 * Se nao houver progresso, o componente nao renderiza nada.
 * ────────────────────────────────────────────────────────────────── */

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

const ContinueCard: React.FC = () => {
  const { userProgress, getUnitProgressPercent, navigateTo, setCurrentUnit } = useApp();
  const unitId = userProgress.currentUnitId;
  const unit = units.find((u) => u.id === unitId);
  const unitProgress = userProgress.units[unitId];

  if (!unit || !unitProgress || unitProgress.visitedPages.length === 0) {
    return null;
  }

  const percent = getUnitProgressPercent(unitId);
  const lastPage = unitProgress.lastPage;
  const lastLabel = PAGE_LABELS[lastPage] ?? 'Início da unidade';

  const handleContinue = () => {
    setCurrentUnit(unitId);
    navigateTo(lastPage);
  };

  return (
    <div
      className="tl-card"
      style={{
        background: 'linear-gradient(135deg, #146B4A 0%, #1F8A5B 100%)',
        border: '2px solid var(--tl-title)',
        color: '#fff',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '1.6rem' }}>▶️</span>
        <p
          style={{
            margin: 0,
            fontSize: '0.78rem',
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
        <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 800 }}>
          {unit.title}: {unit.subtitle}
        </h2>
        <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: '#EAF7EF' }}>
          Última etapa: <strong>{lastLabel}</strong>
        </p>
      </div>

      {/* Barra de progresso */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EAF7EF' }}>
            Progresso da unidade
          </span>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fff' }}>{percent}%</span>
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
          onClick={handleContinue}
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
          onClick={() => {
            setCurrentUnit(unitId);
            navigateTo('unit-contents');
          }}
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
};

export default ContinueCard;
