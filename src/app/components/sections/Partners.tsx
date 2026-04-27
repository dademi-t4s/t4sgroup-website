'use client';

import Reveal from '../ui/Reveal';

const items = [
  {
    title: 'Gruppi Industriali',
    body:
      'Mandati pluriennali su programmi CRM, integrazione ERP, modernizzazione legacy e governance multi-cloud. Engagement strutturato, MSA, SLA scritti, steering committee mensile con la direzione IT.',
  },
  {
    title: 'PMI in Crescita',
    body:
      'Implementazione di Salesforce o HubSpot, integrazioni iPaaS, prima architettura cloud, AI-readiness. Forfait fisso per fase, deliverable verificabili, time-to-value sotto i sei mesi dal kick-off.',
  },
  {
    title: 'Scale-up Tecnologiche',
    body:
      'Affianchiamo i CTO nella scalabilità: data platform, observability, automazione DevOps, sicurezza by-design. Approccio embedded — lavoriamo come estensione del team interno, non come fornitore esterno.',
  },
];

export default function Partners() {
  return (
    <section id="partners" data-phase={1} className="relative">
      <div className="ic-fh-section">
        <div className="max-w-[1400px] mx-auto w-full">
          <Reveal mode="rise" className="text-center">
            <h1 className="ic-typ-h1">
              Tre profili di cliente,
              <br />
              uno standard di delivery.
            </h1>
            <p className="ic-typ-p mt-10 mx-auto max-w-[60ch]">
              Adattiamo modello d&apos;ingaggio, governance e profondità del
              team al contesto. La metodologia, il livello di seniority e le
              certificazioni del nostro personale restano costanti.
            </p>
          </Reveal>

          <div className="ic-card-wrapper">
            {items.map((it, i) => (
              <Reveal mode="rise" key={it.title} delay={i * 0.12}>
                <div className="ic-card">
                  <div className="ic-card-content">
                    <h3>{it.title}</h3>
                    <p className="ic-typ-p--small">{it.body}</p>
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
