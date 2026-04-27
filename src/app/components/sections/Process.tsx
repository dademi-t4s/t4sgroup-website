'use client';

import { Fragment } from 'react';
import Reveal from '../ui/Reveal';

const phases = [
  {
    title: 'Define',
    body:
      'Discovery con stakeholder business e IT. Mappatura dei processi reali, dei vincoli normativi e degli obiettivi misurabili. In output: scope, RACI, criteri di accettazione condivisi.',
  },
  {
    title: 'Design',
    body:
      'Architettura, modello dati, flussi di integrazione, sicurezza, modello AI dove serve. Tutte le decisioni motivate, tracciate e validate con il cliente prima di una sola riga di codice.',
  },
  {
    title: 'Develop',
    body:
      'Sprint di due settimane, demo live di feature reali, code review interna senior, test automatici e manuali. Cliente e team T4S lavorano sullo stesso backlog, con visibilità continua sull&apos;avanzamento.',
  },
  {
    title: 'Deliver',
    body:
      'Go-live controllato, hyper-care 30/60/90, KPI di adozione monitorati, runbook operativi in italiano. Trasferimento completo della conoscenza al team interno del cliente al termine del mandato.',
  },
];

const Arrow = () => (
  <svg
    width="32"
    height="9"
    viewBox="0 0 32 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-60"
  >
    <path
      d="M31.3536 4.85355C31.5488 4.65829 31.5488 4.34171 31.3536 4.14645L28.1716 0.964466C27.9763 0.769204 27.6597 0.769204 27.4645 0.964466C27.2692 1.15973 27.2692 1.47631 27.4645 1.67157L30.2929 4.5L27.4645 7.32843C27.2692 7.52369 27.2692 7.84027 27.4645 8.03553C27.6597 8.2308 27.9763 8.2308 28.1716 8.03553L31.3536 4.85355ZM0 4.5V5H31V4.5V4H0V4.5Z"
      fill="#ef4444"
    />
  </svg>
);

export default function Process() {
  return (
    <section id="from-vision" data-phase={3} className="relative">
      <div className="ic-fh-section">
        <div className="max-w-[1400px] mx-auto w-full">
          <Reveal mode="rise" className="text-center">
            <h1 className="ic-typ-h1">From Vision to Visible</h1>
            <p className="ic-typ-p mt-10 mx-auto max-w-[60ch]">
              Ogni mandato T4S Group segue una metodologia in quattro fasi.
              Forfait per fase concordato in anticipo, deliverable
              verificabili, change request gestite formalmente. Niente time
              &amp; material che esplode a fine trimestre.
            </p>
          </Reveal>

          <div className="ic-process-row">
            {phases.map((p, i) => (
              <Fragment key={p.title}>
                <Reveal mode="rise" delay={i * 0.1}>
                  <div className="ic-card">
                    <div className="ic-card-content">
                      <h3>{p.title}</h3>
                      <p
                        className="ic-typ-p--small"
                        dangerouslySetInnerHTML={{ __html: p.body }}
                      />
                    </div>
                  </div>
                </Reveal>
                {i < phases.length - 1 && <Arrow />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
