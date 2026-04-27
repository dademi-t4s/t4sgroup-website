'use client';

import Reveal from '../ui/Reveal';

const team = [
  {
    role: 'Managing Partners',
    body:
      'Founder e partner senior con vent&apos;anni di delivery IT su clienti enterprise svizzeri ed europei. Sono i referenti diretti dei programmi pluriennali e i firmatari dei mandati.',
  },
  {
    role: 'Solution Architects',
    body:
      'Architetture CRM, cloud e dati. Esperienza diretta su Salesforce, HubSpot, AWS e Microsoft Azure su programmi enterprise pluriennali.',
  },
  {
    role: 'Delivery & Program Managers',
    body:
      'PMP, Prince2 e SAFe-certified. Tengono insieme scope, qualità e relazione cliente. Sono il punto unico di contatto operativo per tutta la durata del mandato.',
  },
  {
    role: 'AI & Data Engineers',
    body:
      'Data engineer Snowflake/Databricks-certified, ML engineer con esperienza su LLM applicati a contesti enterprise. Costruiscono i layer dati e AI del T4S Core®.',
  },
  {
    role: 'Cybersecurity Leads',
    body:
      'CISSP, OSCP, ISO 27001 Lead Auditor. Definiscono security-by-design, identity governance e compliance svizzera ed europea su tutti i progetti.',
  },
  {
    role: 'Cloud & DevOps Engineers',
    body:
      'AWS, Azure e GCP certified. Infrastructure-as-code, pipeline CI/CD, observability, gestione costi cloud. Mantengono in esercizio le piattaforme che mettiamo in produzione.',
  },
];

export default function Team() {
  return (
    <section id="people" data-phase={7} className="relative">
      <div className="ic-fh-section">
        <div className="max-w-[1400px] mx-auto w-full">
          <Reveal mode="rise" className="text-center">
            <h1 className="ic-typ-h1">Il nostro team</h1>
            <p className="ic-typ-p mt-10 mx-auto max-w-[60ch]">
              Senior-only, certificati sulle piattaforme che implementiamo. La
              persona che disegna l&apos;architettura è la stessa che la firma
              al kick-off. Niente staffing piramidale, niente delivery offshore
              non dichiarata.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {team.map((p, i) => (
              <Reveal mode="rise" key={p.role} delay={i * 0.15}>
                <div className="ic-card h-full">
                  <div className="ic-card-content">
                    <h3 style={{ fontWeight: 500, fontSize: '1.15rem' }}>
                      {p.role}
                    </h3>
                    <p
                      className="ic-typ-p--small mt-3"
                      dangerouslySetInnerHTML={{ __html: p.body }}
                    />
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
