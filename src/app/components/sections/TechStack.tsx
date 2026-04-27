'use client';

import Reveal from '../ui/Reveal';

type Partner = { icon: string; name: string; color?: string; tier: string };

const iconUrl = (icon: string, color?: string) =>
  color
    ? `https://api.iconify.design/${icon}.svg?color=%23${color}`
    : `https://api.iconify.design/${icon}.svg`;

const partners: Partner[] = [
  { icon: 'logos:salesforce', name: 'Salesforce', tier: 'Implementation Partner' },
  { icon: 'logos:hubspot', name: 'HubSpot', tier: 'Solutions Partner' },
  { icon: 'logos:microsoft', name: 'Microsoft', tier: 'Cloud Solution Provider' },
  { icon: 'logos:tableau', name: 'Tableau', tier: 'Visualization Partner' },
];

export default function TechStack() {
  return (
    <section id="tech-stack" data-phase={8} className="relative">
      <div className="ic-fh-section">
        <div className="max-w-[1400px] mx-auto w-full">
          <Reveal mode="rise" className="text-center">
            <h2 className="ic-typ-h2">
              Le piattaforme su cui il nostro
              <br />
              team è certificato e operativo.
            </h2>
            <p className="ic-typ-p mt-10 mx-auto max-w-[60ch]">
              Lavoriamo end-to-end sulle tecnologie scelte dal mercato
              enterprise. Le configuriamo, le integriamo, le manuteniamo —
              senza vendor-lock interessato. La scelta dello stack la dettano i
              tuoi requisiti, non le commissioni di un partner program.
            </p>
          </Reveal>

          <div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            {partners.map((p, i) => (
              <Reveal key={p.name} mode="rise" delay={0.1 + i * 0.2}>
                <div
                  className="px-8 py-12 flex flex-col items-center justify-center text-center h-full"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(20,7,7,0.55), rgba(8,4,5,0.45))',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    minHeight: 220,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={iconUrl(p.icon, p.color)}
                    alt={p.name}
                    width={80}
                    height={80}
                    style={{ width: 80, height: 80, objectFit: 'contain' }}
                    loading="lazy"
                  />
                  <div className="mt-7 text-[0.86rem] tracking-[0.05em] text-white/65">
                    {p.tier}
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
