'use client';

import Reveal from '../ui/Reveal';

const layers = [
  { n: 'L1', t: 'Data ingestion & lineage' },
  { n: 'L2', t: 'Identity & access mesh' },
  { n: 'L3', t: 'Workflow & orchestration' },
  { n: 'L4', t: 'AI inference & retrieval' },
  { n: 'L5', t: 'Observability & telemetry' },
  { n: 'L6', t: 'Governance & compliance' },
  { n: 'L7', t: 'Decision & action layer' },
];

export default function T4SCore() {
  return (
    <section id="t4s-core" data-phase={6} className="relative">
      <div className="ic-fh-section">
        <div className="max-w-[1400px] mx-auto w-full text-center">
          <Reveal mode="rise">
            <h1 className="ic-typ-h1">The T4S Core®</h1>
            <p className="ic-typ-p mt-10 max-w-[68ch] mx-auto">
              Il framework di riferimento che applichiamo su ogni mandato di
              trasformazione IT. Sette layer interoperabili — dato, identità,
              orchestrazione, intelligenza, osservabilità, governance, azione
              — disegnati per evitare il lock-in di prodotto e dare al cliente
              una architettura modulare, documentata e auditabile.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {layers.map((l, i) => (
              <Reveal key={l.n} delay={i * 0.06}>
                <div
                  className="rounded-lg p-5 h-full"
                  style={{
                    background: `linear-gradient(180deg,
                      ${['rgba(254,205,211,0.10)', 'rgba(252,165,165,0.10)', 'rgba(248,113,113,0.10)', 'rgba(239,68,68,0.10)', 'rgba(220,38,38,0.10)', 'rgba(185,28,28,0.10)', 'rgba(127,29,29,0.10)'][i]},
                      rgba(255,255,255,0.02))`,
                    border: `1px solid ${['rgba(254,205,211,0.32)', 'rgba(252,165,165,0.32)', 'rgba(248,113,113,0.32)', 'rgba(239,68,68,0.32)', 'rgba(220,38,38,0.32)', 'rgba(185,28,28,0.32)', 'rgba(127,29,29,0.32)'][i]}`,
                  }}
                >
                  <div className="text-[0.92rem] text-white/85 leading-snug">
                    {l.t}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
