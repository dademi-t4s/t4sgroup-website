'use client';

import Reveal from '../ui/Reveal';

const people = [
  {
    name: 'Deiv Ademi',
    phone: '+41 76 793 08 88',
    phoneHref: 'tel:+41767930888',
    email: 'dademi@t4sgroup.com',
  },
  {
    name: 'Osteljano Doka',
    phone: '+41 76 788 76 90',
    phoneHref: 'tel:+41767887690',
    email: 'odoka@t4sgroup.com',
  },
];

const inputClass =
  'w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[0.95rem] text-white placeholder-white/35 outline-none focus:border-white/30 focus:bg-white/[0.05] transition-colors';

export default function Contacts() {
  return (
    <section id="contacts" data-phase={0} className="relative">
      <div className="ic-fh-section" style={{ paddingBottom: '4vh' }}>
        <div className="max-w-[1100px] mx-auto w-full text-center">
          <Reveal mode="rise">
            <h1 className="ic-typ-h1">Parliamone</h1>
            <p className="ic-typ-p mt-10 mx-auto">
              Una call diagnostica iniziale per capire dove sei, dove vuoi
              andare e se T4S Group è il partner giusto per il tuo programma
              IT. Senza pitch commerciali, senza fretta — solo una valutazione
              tecnica condivisa.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px max-w-[860px] mx-auto rounded-2xl overflow-hidden glass-border">
            {people.map((p, i) => (
              <Reveal mode="rise" key={p.name} delay={i * 0.1}>
                <div
                  className="h-full px-10 py-12 text-left"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(20,7,7,0.6), rgba(8,4,5,0.5))',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                  }}
                >
                  <h3
                    className="text-white"
                    style={{
                      fontWeight: 500,
                      fontSize: '1.5rem',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {p.name}
                  </h3>

                  <div
                    className="my-7 h-px w-full"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  />

                  <div className="space-y-3">
                    <a
                      href={p.phoneHref}
                      className="flex items-center gap-4 text-white/85 hover:text-white transition-colors"
                    >
                      <span className="text-[0.7rem] tracking-[0.22em] uppercase text-white/45 w-8">
                        Tel
                      </span>
                      <span className="text-[0.95rem]">{p.phone}</span>
                    </a>
                    <a
                      href={`mailto:${p.email}`}
                      className="flex items-center gap-4 text-white/85 hover:text-white transition-colors"
                    >
                      <span className="text-[0.7rem] tracking-[0.22em] uppercase text-white/45 w-8">
                        Mail
                      </span>
                      <span className="text-[0.95rem]">{p.email}</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Salesforce Web-to-Lead — same configuration as t4sgroup.com */}
          <Reveal mode="rise" delay={0.2}>
            <form
              id="leadForm"
              action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Dbk000002apin"
              method="POST"
              className="mt-20 max-w-[860px] mx-auto text-left p-8 md:p-10 rounded-2xl glass-border"
              style={{
                background:
                  'linear-gradient(180deg, rgba(20,7,7,0.55), rgba(8,4,5,0.45))',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
              }}
            >
              <input type="hidden" name="oid" value="00Dbk000002apin" />
              <input
                type="hidden"
                name="retURL"
                value="https://www.t4sgroup.com/?lead=ok#contatti"
              />
              <input type="hidden" name="lead_source" value="Web" />

              <h3
                className="text-white text-center"
                style={{
                  fontWeight: 500,
                  fontSize: '1.45rem',
                  letterSpacing: '-0.015em',
                }}
              >
                Richiedi una consulenza
              </h3>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-[0.72rem] tracking-[0.18em] uppercase text-white/55 mb-2"
                  >
                    Nome
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    maxLength={40}
                    required
                    autoComplete="given-name"

                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-[0.72rem] tracking-[0.18em] uppercase text-white/55 mb-2"
                  >
                    Cognome
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    maxLength={80}
                    required
                    autoComplete="family-name"

                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-[0.72rem] tracking-[0.18em] uppercase text-white/55 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    maxLength={80}
                    required
                    autoComplete="email"

                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="company"
                    className="block text-[0.72rem] tracking-[0.18em] uppercase text-white/55 mb-2"
                  >
                    Azienda
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    maxLength={40}
                    required
                    autoComplete="organization"

                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-[0.72rem] tracking-[0.18em] uppercase text-white/55 mb-2"
                  >
                    Città
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    maxLength={40}
                    autoComplete="address-level2"

                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-[0.72rem] tracking-[0.18em] uppercase text-white/55 mb-2"
                  >
                    Cantone / Regione
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    maxLength={20}
                    autoComplete="address-level1"

                    className={inputClass}
                  />
                </div>
              </div>

              <p className="text-[0.78rem] text-white/45 mt-6 text-center">
                Inviando i dati accetti che ti ricontattiamo per la consulenza.
              </p>

              <div className="flex justify-center mt-7">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-[0.95rem] font-medium text-white transition-transform hover:scale-[1.02]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(239,68,68,0.95), rgba(127,29,29,0.95))',
                    boxShadow:
                      '0 12px 40px -8px rgba(239,68,68,0.55), inset 0 1px 0 rgba(255,255,255,0.22)',
                  }}
                >
                  Invia richiesta
                  <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal mode="rise" delay={0.3}>
            <div className="mt-12 flex justify-center">
              <a
                href="https://www.linkedin.com/company/t4s-group/"
                target="_blank"
                rel="noreferrer"
                className="ic-btn"
              >
                Seguici su LinkedIn
              </a>
            </div>
          </Reveal>

          <footer
            className="mt-24 pt-10 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-left"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <p className="ic-typ-p--small">
              © {new Date().getFullYear()} T4S Group®. All rights reserved.
              <br />
              P. IVA CHE-172.693.419 · Transparency by design.
            </p>
            <div className="flex items-center gap-6 text-[0.8rem] text-white/55">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
