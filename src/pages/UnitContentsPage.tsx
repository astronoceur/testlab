import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import { Page } from '../types';

/* ──────────────────────────────────────────────────────────────────
 * UnitContentsPage
 * ─────────────────
 * Hub central da unidade. Mostra todas as secoes da unidade em
 * formato indice e permite acesso rapido a:
 *   - Introducao (welcome / objectives)
 *   - Conteudo teorico (content)
 *   - Exemplos / demonstracao
 *   - Atividades praticas
 *   - Desafio final
 *   - Revisao / resumo
 *
 * O acesso e livre — nao reseta progresso, permite revisao a
 * qualquer momento. Itens nao disponiveis na unidade (ex: unidades
 * 2..5 sem situationProblem) sao automaticamente ocultados.
 *
 * Para adicionar conteudos textuais novos, basta editar
 * src/data/units.ts ou src/data/unit{N}Data.ts. A pagina renderiza
 * dinamicamente o que existir.
 * ────────────────────────────────────────────────────────────────── */

interface SectionLink {
  icon: string;
  title: string;
  description: string;
  page?: Page;
  available: boolean;
  badge?: string;
}

const UnitContentsPage: React.FC = () => {
  const { navigateTo, currentUnit, getUnitProgress } = useApp();
  const unit = units.find((u) => u.id === currentUnit);
  if (!unit) return null;

  const progress = getUnitProgress(unit.id);
  const blocksRead = new Set(progress?.contentBlocksRead ?? []);
  const visited = new Set(progress?.visitedPages ?? []);
  const completed = new Set(progress?.completedActivities ?? []);

  const totalBlocks =
    (unit.theoryBlocks && unit.theoryBlocks.length) ||
    (unit.content && unit.content.length) ||
    0;

  const sections: SectionLink[] = [
    {
      icon: '📖',
      title: 'Introdução da Unidade',
      description: 'Boas-vindas, objetivos de aprendizagem e contexto da unidade.',
      page: 'welcome',
      available: true,
      badge: visited.has('welcome') ? 'Visitado' : undefined,
    },
    {
      icon: '🧩',
      title: 'Situação-Problema',
      description: 'Cenário real que motiva o estudo da unidade.',
      page: 'situation-problem',
      available: !!unit.situationProblem,
      badge: visited.has('situation-problem') ? 'Visitado' : undefined,
    },
    {
      icon: '🧪',
      title: 'Conhecimentos Prévios',
      description: 'Diagnóstico rápido para ativar o que você já sabe.',
      page: 'prior-knowledge',
      available: (unit.priorKnowledgeQuestions?.length ?? 0) > 0,
      badge:
        progress?.priorScore !== undefined
          ? `${progress.priorScore}%`
          : visited.has('prior-knowledge')
          ? 'Visitado'
          : undefined,
    },
    {
      icon: '📚',
      title: 'Conteúdo Teórico',
      description: totalBlocks
        ? `${totalBlocks} bloco${totalBlocks === 1 ? '' : 's'} de teoria com exemplos e mini-atividades.`
        : 'Material teórico da unidade.',
      page: 'content',
      available: totalBlocks > 0,
      badge: blocksRead.size > 0 ? `${blocksRead.size}/${totalBlocks} lidos` : undefined,
    },
    {
      icon: '🔬',
      title: 'Exemplos / Demonstração',
      description: 'Resolução guiada de um caso prático para fixar conceitos.',
      page: 'demonstration',
      available: !!unit.demonstration || (unit.examples && unit.examples.length > 0),
      badge: visited.has('demonstration') ? 'Visitado' : undefined,
    },
    {
      icon: '✅',
      title: 'Atividade 1.1',
      description: 'Questões objetivas para testar a compreensão.',
      page: 'atividade-1-1',
      available: !!unit.atividade11,
      badge: completed.has('atividade-1-1') ? 'Concluída' : undefined,
    },
    {
      icon: '💬',
      title: 'Atividade 1.2',
      description: 'Atividade discursiva para aprofundar a reflexão.',
      page: 'atividade-1-2',
      available: !!unit.atividade12,
      badge: completed.has('atividade-1-2') ? 'Concluída' : undefined,
    },
    {
      icon: '🛠',
      title: 'Prática Guiada',
      description: 'Aplicação assistida com dicas progressivas.',
      page: 'guided-practice',
      available: !!unit.guidedPracticeRich || !!unit.guidedPractice?.question,
      badge: completed.has('guided-practice') ? 'Concluída' : undefined,
    },
    {
      icon: '✏️',
      title: 'Prática Independente',
      description: 'Exercícios autônomos com critérios de avaliação.',
      page: 'independent-practice',
      available:
        !!unit.independentPracticeRich || !!unit.independentPractice?.scenario,
      badge: completed.has('independent-practice') ? 'Concluída' : undefined,
    },
    {
      icon: '📝',
      title: 'Avaliação Final',
      description: 'Verificação de aprendizagem com pontuação.',
      page: 'final-assessment',
      available: (unit.finalAssessmentQuestions?.length ?? 0) > 0,
      badge:
        progress?.score !== undefined
          ? `${progress.score}%`
          : completed.has('final-assessment')
          ? 'Concluída'
          : undefined,
    },
    {
      icon: '🏆',
      title: 'Desafio Aplicado',
      description: 'Problema integrador para encerrar a unidade.',
      page: 'challenge',
      available: !!unit.finalChallenge || !!unit.challenge?.scenario,
      badge: progress?.challengeCompleted ? 'Concluído' : undefined,
    },
    {
      icon: '📈',
      title: 'Resumo / Revisão',
      description: 'Feedback personalizado e revisão dos pontos-chave.',
      page: 'feedback',
      available: true,
      badge: visited.has('feedback') ? 'Visitado' : undefined,
    },
  ];

  const visibleSections = sections.filter((s) => s.available);
  const meta = unit.meta;

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Cabecalho */}
        <div className="tl-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ fontSize: '3rem' }}>{unit.icon}</div>
          <div style={{ flex: 1 }}>
            <p
              className="tl-subtitle"
              style={{ margin: 0, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: 1 }}
            >
              Conteúdos da Unidade · {unit.title}
            </p>
            <h1 className="tl-title" style={{ margin: '0.25rem 0', fontSize: '1.4rem' }}>
              {unit.subtitle}
            </h1>
            <p style={{ margin: 0, color: 'var(--tl-text-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>
              {unit.description}
            </p>
          </div>
        </div>

        {/* Metadados (quando disponiveis) */}
        {meta && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.6rem',
            }}
          >
            {[
              { label: 'Carga horária', value: meta.cargaHoraria },
              { label: 'Nível', value: meta.nivel },
              { label: 'Referência', value: meta.referencia },
              { label: 'Abordagem', value: meta.abordagem },
            ].map((m) => (
              <div
                key={m.label}
                className="tl-card-white"
                style={{ textAlign: 'center', padding: '0.6rem 0.75rem' }}
              >
                <p
                  style={{
                    margin: '0 0 2px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--tl-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  {m.label}
                </p>
                <p style={{ margin: 0, fontWeight: 800, color: 'var(--tl-title)', fontSize: '0.9rem' }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Aviso de revisao livre */}
        <div
          className="tl-card-white"
          style={{ borderLeft: '5px solid var(--tl-success)', padding: '0.75rem 1rem' }}
        >
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--tl-text)', lineHeight: 1.5 }}>
            Acesse qualquer seção a qualquer momento — antes, durante ou depois de
            realizar as atividades. Seu progresso é preservado.
          </p>
        </div>

        {/* Lista de secoes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {visibleSections.map((s) => (
            <button
              key={s.title}
              onClick={() => s.page && navigateTo(s.page)}
              className="tl-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                padding: '0.85rem 1rem',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
                width: '100%',
                transition: 'transform 0.1s, background 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
              }}
            >
              <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{s.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 800, color: 'var(--tl-title)', fontSize: '0.95rem' }}>
                  {s.title}
                </p>
                <p
                  style={{
                    margin: '2px 0 0',
                    fontSize: '0.8rem',
                    color: 'var(--tl-text-muted)',
                    lineHeight: 1.4,
                  }}
                >
                  {s.description}
                </p>
              </div>
              {s.badge && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: 12,
                    background: 'var(--tl-btn-ghost)',
                    color: 'var(--tl-title)',
                    border: '1px solid var(--tl-card-border)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s.badge}
                </span>
              )}
              <span style={{ color: 'var(--tl-btn-bg)', fontWeight: 800, fontSize: '1.1rem' }}>→</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button className="tl-btn-ghost" onClick={() => navigateTo('units')}>
            ← Voltar para Unidades
          </button>
          <button className="tl-btn" onClick={() => navigateTo('welcome')}>
            Iniciar trilha completa →
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UnitContentsPage;
