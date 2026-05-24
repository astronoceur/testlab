import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import { TheoryBlock } from '../types';
import { nextPage, previousPage } from '../data/unitFlow';

/* ──────────────────────────────────────────────────────────────────
 * Helpers visuais: realce de glossario, deteccao de checklist e
 * de comparacao produto/processo, e inferencia de subtitulo do
 * subcard a partir de pistas no texto.
 * ────────────────────────────────────────────────────────────────── */

/* Termos do glossario que ganham destaque automatico (negrito + cor)
 * quando aparecem no texto. Ordenados do mais longo para o mais curto
 * para evitar capturas parciais. */
const GLOSSARY: string[] = [
  'qualidade do produto', 'qualidade do processo',
  'qualidade de produto', 'qualidade de processo',
  'qualidade de software', 'teste de software',
  'integração contínua', 'teste exaustivo',
  'erro humano', 'casos de teste', 'caso de teste',
  'manutenibilidade', 'confiabilidade', 'usabilidade',
  'depuração', 'debugging', 'corretude', 'eficiência',
  'defeito', 'defect', 'fault', 'failure', 'falha', 'error',
  'bug', 'TDD',
  'Sommerville', 'Myers', 'Dijkstra', 'Boehm', 'Basili',
  'CTFL', 'ISTQB',
];

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const GLOSSARY_RE = new RegExp(
  `(${GLOSSARY.map(escapeRegExp).join('|')})`,
  'gi',
);

/** Renderiza o texto destacando termos do glossario em negrito verde. */
function highlightTerms(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  GLOSSARY_RE.lastIndex = 0;
  while ((match = GLOSSARY_RE.exec(text)) !== null) {
    if (match.index > lastIdx) parts.push(text.slice(lastIdx, match.index));
    parts.push(
      <strong
        key={`${match.index}-${match[0]}`}
        style={{ color: 'var(--tl-title)', fontWeight: 800 }}
      >
        {match[0]}
      </strong>,
    );
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts;
}

/** Detecta padrao "...: a; b; c; e d." e devolve {intro, items}. */
function detectChecklist(text: string): { intro: string; items: string[] } | null {
  const idx = text.indexOf(': ');
  if (idx === -1) return null;
  const rest = text.slice(idx + 2);
  if ((rest.match(/;/g) || []).length < 2) return null;
  if (rest.length < 60) return null;
  const intro = text.slice(0, idx + 1);
  let items = rest
    .split(';')
    .map((s) => s.trim())
    .map((s) => s.replace(/\.$/, '').trim())
    .filter((s) => s.length > 0);
  if (items.length === 0) return null;
  // remove "e " inicial do ultimo item, se houver
  items[items.length - 1] = items[items.length - 1].replace(/^e\s+/i, '');
  // capitaliza primeira letra
  items = items.map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s));
  return { intro, items };
}

/** Detecta comparacao qualidade do produto x qualidade do processo. */
function detectProductProcessComparison(text: string): {
  intro: string;
  left: string;
  right: string;
  outro: string;
} | null {
  const lc = text.toLowerCase();
  if (!(lc.includes('qualidade do produto') && lc.includes('qualidade do processo'))) {
    return null;
  }
  const sentences = text.split(/(?<=[.!?])\s+/);
  const introParts: string[] = [];
  let leftBody = '';
  let rightBody = '';
  const outroParts: string[] = [];
  for (const s of sentences) {
    const slc = s.toLowerCase();
    const hasL = slc.includes('qualidade do produto');
    const hasR = slc.includes('qualidade do processo');
    if (hasL && !hasR) leftBody = leftBody ? `${leftBody} ${s}` : s;
    else if (hasR && !hasL) rightBody = rightBody ? `${rightBody} ${s}` : s;
    else if (!leftBody && !rightBody) introParts.push(s);
    else outroParts.push(s);
  }
  if (!leftBody || !rightBody) return null;
  return {
    intro: introParts.join(' '),
    left: leftBody,
    right: rightBody,
    outro: outroParts.join(' '),
  };
}

/** Inferencia de etiqueta (icone + rotulo) para um paragrafo. */
function inferLabel(text: string, index: number): { icon: string; label: string; color: string } {
  if (/sommerville/i.test(text)) return { icon: '👨‍🏫', label: 'Visão de Sommerville', color: '#224488' };
  if (/\bmyers\b/i.test(text)) return { icon: '📘', label: 'Visão clássica de Myers', color: '#224488' };
  if (/dijkstra/i.test(text)) return { icon: '🧠', label: 'Princípio de Dijkstra', color: '#224488' };
  if (/boehm|basili/i.test(text)) return { icon: '📊', label: 'Pesquisa de Boehm e Basili', color: '#224488' };
  if (/\bCTFL\b|\bISTQB\b/.test(text)) return { icon: '📚', label: 'Padrão CTFL / ISTQB', color: '#224488' };
  if (/relação causal/i.test(text)) return { icon: '🔗', label: 'Relação causal', color: '#7a5a00' };
  if (/^por fim|em síntese/i.test(text)) return { icon: '🧩', label: 'Em síntese', color: '#0a4f0a' };
  if (/^a terminologia|distinção entre|distinguir|conceitos correlatos|diferença/i.test(text)) {
    return { icon: '🔀', label: 'Conceitos correlatos', color: '#7a3a00' };
  }
  if (/do ponto de vista prático|^na prática/i.test(text)) {
    return { icon: '🛠️', label: 'Na prática', color: '#0a4f0a' };
  }
  if (/além d[oe]|também|^um segundo|^o terceiro/i.test(text)) {
    return { icon: '➕', label: 'Aprofundando', color: '#2d6e18' };
  }
  if (/é importante (notar|reafirmar|distinguir|reconhecer)|é igualmente importante/i.test(text)) {
    return { icon: '⭐', label: 'Ponto importante', color: '#7a5a00' };
  }
  if (index === 0) return { icon: '📖', label: 'Definição', color: 'var(--tl-title)' };
  return { icon: '🔎', label: 'Aprofundando', color: '#2d6e18' };
}

/* ──────────────────────────────────────────────────────────────────
 * Renderiza:
 *   - Modo rico: blocos teoricos com Explicacao + Exemplo +
 *     Observacao + Miniatividade interativa (Unidade 1).
 *   - Modo legado: ContentSection[] simples (Unidades 2..5).
 * ────────────────────────────────────────────────────────────────── */

const TheoryBlockView: React.FC<{ block: TheoryBlock }> = ({ block }) => {
  const {
    miniActivityAnswers,
    setMiniActivityAnswer,
    miniActivityRevealed,
    revealMiniActivity,
  } = useApp();

  const answer = miniActivityAnswers[block.id] ?? '';
  const revealed = !!miniActivityRevealed[block.id];

  const renderMini = () => {
    const ma = block.miniActivity;
    if (ma.type === 'truefalse' && ma.options) {
      return (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 8 }}>
          {ma.options.map((opt, oIdx) => {
            const sel = answer === String(oIdx);
            const correct = ma.correctIndex === oIdx;
            let cls = 'tl-option';
            if (revealed && correct) cls += ' tl-option-correct';
            else if (revealed && sel && !correct) cls += ' tl-option-wrong';
            else if (revealed) cls += ' tl-option-disabled';
            else if (sel) cls += ' tl-option-selected';
            return (
              <button
                key={oIdx}
                onClick={() => !revealed && setMiniActivityAnswer(block.id, String(oIdx))}
                disabled={revealed}
                className={cls}
                style={{ minWidth: 130, textAlign: 'center' }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      );
    }
    if (ma.type === 'match' && ma.pairs) {
      return (
        <div style={{ marginTop: 8 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'var(--tl-title)', color: '#fff' }}>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Objetivo</th>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {ma.pairs.map((p, i) => (
                <tr key={i} style={{ background: i % 2 ? '#f4fff0' : '#e4f8cc' }}>
                  <td style={{ padding: '6px 10px', fontWeight: 700, color: '#1a4a10' }}>{p.left}</td>
                  <td style={{ padding: '6px 10px', color: '#2d5a1e' }}>{p.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ margin: '6px 0 0', fontSize: '0.78rem', color: '#5a7a4a' }}>
            Releia a tabela e tente justificar mentalmente cada associação. Em seguida revele a resposta esperada.
          </p>
        </div>
      );
    }
    // fill / text
    return (
      <textarea
        className="tl-input"
        rows={ma.type === 'fill' ? 2 : 4}
        placeholder={ma.placeholder ?? 'Sua resposta...'}
        value={answer}
        onChange={(e) => !revealed && setMiniActivityAnswer(block.id, e.target.value)}
        disabled={revealed}
        style={{ resize: 'vertical', marginTop: 8 }}
      />
    );
  };

  /* Quebra o body do exemplo em sub-seções quando vier no padrão
   * "ERRO: ...\n\nDEFEITO: ...\n\nFALHA: ..." (usado no Bloco 4). */
  const exampleBlocks = block.example.body
    .split(/\n\n+/)
    .map((chunk) => {
      const m = chunk.match(/^([A-ZÁÉÍÓÚÂÊÔÃÕÇ ]{3,}):\s*([\s\S]+)$/);
      if (m) return { label: m[1].trim(), body: m[2].trim() };
      return { label: '', body: chunk.trim() };
    })
    .filter((b) => b.body.length > 0);
  const structuredExample = exampleBlocks.length > 1 && exampleBlocks.every((b) => b.label);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      {/* ─── Cabeçalho do bloco ─── */}
      <div
        className="tl-card"
        style={{
          background: 'linear-gradient(135deg, #146B4A 0%, #1F8A5B 100%)',
          border: '2px solid var(--tl-title)',
          color: '#fff',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.18)',
            border: '2px solid rgba(255,255,255,0.5)',
            borderRadius: 12,
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            flexShrink: 0,
          }}
        >
          {block.icon}
        </div>
        <div>
          <p
            style={{
              margin: 0,
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#EAF7EF',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Bloco {block.number}
          </p>
          <h2 style={{ margin: '2px 0 0', fontSize: '1.3rem', color: '#fff', fontWeight: 900 }}>
            {block.title}
          </h2>
        </div>
      </div>

      {/* ─── Explicação: 1 subcard por ideia ─── */}
      {block.explanation.map((p, i) => {
        const label = inferLabel(p, i);
        const comparison = detectProductProcessComparison(p);
        const checklist = !comparison ? detectChecklist(p) : null;

        return (
          <div
            key={i}
            className="tl-card-white"
            style={{
              borderLeft: `5px solid ${label.color}`,
              padding: '0.875rem 1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  background: label.color,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.7rem',
                  padding: '2px 8px',
                  borderRadius: 12,
                  letterSpacing: 0.3,
                  textTransform: 'uppercase',
                }}
              >
                {label.icon} {label.label}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'var(--tl-text-muted)',
                }}
              >
                · ideia {i + 1} de {block.explanation.length}
              </span>
            </div>

            {comparison ? (
              <>
                {comparison.intro && (
                  <p style={{ margin: '0 0 10px', fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.6 }}>
                    {highlightTerms(comparison.intro)}
                  </p>
                )}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '0.625rem',
                    marginBottom: comparison.outro ? 10 : 0,
                  }}
                >
                  <div
                    style={{
                      background: '#EAF7EF',
                      border: '2px solid var(--tl-card-border)',
                      borderRadius: 8,
                      padding: '0.75rem 0.875rem',
                    }}
                  >
                    <p style={{ margin: '0 0 4px', fontWeight: 800, color: 'var(--tl-title)', fontSize: '0.85rem' }}>
                      📦 Qualidade do Produto
                    </p>
                    <p style={{ margin: 0, fontSize: '0.825rem', color: '#2d5a1e', lineHeight: 1.5 }}>
                      {highlightTerms(comparison.left)}
                    </p>
                  </div>
                  <div
                    style={{
                      background: '#FFF4E5',
                      border: '2px solid #c87a00',
                      borderRadius: 8,
                      padding: '0.75rem 0.875rem',
                    }}
                  >
                    <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#7a3a00', fontSize: '0.85rem' }}>
                      ⚙️ Qualidade do Processo
                    </p>
                    <p style={{ margin: 0, fontSize: '0.825rem', color: '#5a3300', lineHeight: 1.5 }}>
                      {highlightTerms(comparison.right)}
                    </p>
                  </div>
                </div>
                {comparison.outro && (
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.6 }}>
                    {highlightTerms(comparison.outro)}
                  </p>
                )}
              </>
            ) : checklist ? (
              <>
                <p style={{ margin: '0 0 10px', fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.6 }}>
                  {highlightTerms(checklist.intro)}
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
                  {checklist.items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        background: '#EAF7EF',
                        borderLeft: '3px solid var(--tl-success)',
                        padding: '0.45rem 0.65rem',
                        borderRadius: 4,
                      }}
                    >
                      <span style={{ color: 'var(--tl-success)', fontWeight: 900, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: '0.85rem', color: '#1a4a10', lineHeight: 1.5 }}>
                        {highlightTerms(item)}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.6 }}>
                {highlightTerms(p)}
              </p>
            )}
          </div>
        );
      })}

      {/* ─── Exemplo ─── */}
      <div className="tl-card-white" style={{ borderLeft: '5px solid #5588cc', padding: '0.875rem 1rem' }}>
        <p style={{ margin: '0 0 8px', fontWeight: 800, color: '#224488', fontSize: '0.85rem' }}>
          🧪 {block.example.title}
        </p>
        {structuredExample ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {exampleBlocks.map((b, i) => (
              <div
                key={i}
                style={{
                  background: '#F0F5FF',
                  border: '1px solid #aac4ee',
                  borderLeft: '4px solid #224488',
                  borderRadius: 6,
                  padding: '0.5rem 0.75rem',
                }}
              >
                <p
                  style={{
                    margin: '0 0 3px',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    color: '#224488',
                    letterSpacing: 0.6,
                  }}
                >
                  {b.label}
                </p>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#1a3a66', lineHeight: 1.55 }}>
                  {highlightTerms(b.body)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#1a3a66', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {highlightTerms(block.example.body)}
          </p>
        )}
      </div>

      {/* ─── Observação / Atenção ─── */}
      <div
        className="tl-card"
        style={{ background: '#fffde0', borderColor: '#c0a000', padding: '0.875rem 1rem' }}
      >
        <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#7a6000', fontSize: '0.85rem' }}>
          ⚠️ {block.observation.title}
        </p>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#5a4800', lineHeight: 1.6 }}>
          {highlightTerms(block.observation.body)}
        </p>
      </div>

      {/* ─── Miniatividade ─── */}
      <div className="tl-card" style={{ borderLeft: '5px solid #2d8f2d', padding: '0.875rem 1rem' }}>
        <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#0a4f0a', fontSize: '0.85rem' }}>
          ✏️ Miniatividade de fixação
        </p>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#1a4a10', lineHeight: 1.5 }}>
          {block.miniActivity.prompt}
        </p>

        {renderMini()}

        <div style={{ marginTop: 10 }}>
          {!revealed ? (
            <button
              className="tl-btn-ghost"
              onClick={() => revealMiniActivity(block.id)}
              disabled={
                block.miniActivity.type !== 'match' &&
                block.miniActivity.type !== 'truefalse' &&
                answer.trim().length === 0
              }
            >
              Ver resposta esperada
            </button>
          ) : (
            <div
              style={{
                background: '#d4f0c0',
                border: '2px solid #2d8f2d',
                borderRadius: 8,
                padding: '0.6rem 0.8rem',
              }}
            >
              <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#0a4f0a', fontSize: '0.82rem' }}>
                Resposta esperada
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#1a4a10', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                {block.miniActivity.expectedAnswer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ContentPage: React.FC = () => {
  const { navigateTo, currentUnit } = useApp();
  const unit = units.find((u) => u.id === currentUnit)!;

  const blocks = unit.theoryBlocks;
  const useRich = !!(blocks && blocks.length > 0);
  const total = useRich ? blocks!.length : unit.content.length;

  const [active, setActive] = useState(0);
  const isLast = active === total - 1;

  const handleNext = () => {
    if (!isLast) {
      setActive(active + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const next = nextPage('content', unit) ?? 'demonstration';
      navigateTo(next);
    }
  };

  const handlePrev = () => {
    if (active === 0) {
      const prev = previousPage('content', unit) ?? 'prior-knowledge';
      navigateTo(prev);
    } else {
      setActive(active - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase', letterSpacing: 1 }}>
            Conteúdo Teórico
          </p>
          <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
            {useRich ? 'Blocos Conceituais' : 'Conteúdo'}
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Leia cada bloco com atenção. Faça a miniatividade ao final antes de avançar.
          </p>
        </div>

        {/* Tabs de navegacao entre blocos */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {(useRich ? blocks! : unit.content).map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: '5px 12px',
                borderRadius: 20,
                fontWeight: 700,
                fontFamily: 'inherit',
                fontSize: '0.78rem',
                border: '2px solid var(--tl-card-border)',
                cursor: 'pointer',
                background: active === i ? 'var(--tl-title)' : 'var(--tl-card-bg)',
                color: active === i ? '#fff' : '#2d6e18',
                transition: 'background 0.15s',
              }}
            >
              {i + 1}. {useRich ? blocks![i].title : (s as { title: string }).title}
            </button>
          ))}
        </div>

        {/* Conteudo do bloco */}
        {useRich ? (
          <TheoryBlockView block={blocks![active]} />
        ) : (
          (() => {
            const section = unit.content[active];
            return (
              <div className="tl-card" style={{ minHeight: 220 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{section.icon}</span>
                  <h2 className="tl-title" style={{ margin: 0, fontSize: '1.15rem' }}>{section.title}</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {section.body.split('\n').map((line, i) => {
                    if (!line.trim()) return <div key={i} style={{ height: 6 }} />;
                    if (line.startsWith('•'))
                      return (
                        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginLeft: 8 }}>
                          <span style={{ color: 'var(--tl-title)', flexShrink: 0, fontWeight: 800 }}>•</span>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.5 }}>
                            {line.slice(1).trim()}
                          </p>
                        </div>
                      );
                    return (
                      <p key={i} style={{ margin: 0, fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.5 }}>
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })()
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="tl-btn-ghost" onClick={handlePrev}>
              ← {active === 0 ? 'Voltar' : 'Bloco anterior'}
            </button>
            <button className="tl-btn-ghost" onClick={() => navigateTo('unit-contents')}>
              Retornar para Conteúdos
            </button>
          </div>
          <button className="tl-btn" onClick={handleNext}>
            {isLast ? 'Ir para Demonstração →' : 'Próximo Bloco →'}
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#5a7a4a', margin: 0 }}>
          Bloco {active + 1} de {total}
        </p>
      </div>
    </Layout>
  );
};

export default ContentPage;
