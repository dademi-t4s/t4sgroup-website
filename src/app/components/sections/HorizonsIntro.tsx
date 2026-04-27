'use client';

import Reveal from '../ui/Reveal';

export default function HorizonsIntro() {
  return (
    <section id="horizons" data-phase={1} className="relative">
      <div className="ic-fh-section">
        <div className="max-w-[1400px] mx-auto w-full">
          <Reveal className="max-w-[920px]">
            <h2 className="ic-typ-h2">
              Quattro aree in cui l&apos;IT diventa
              <br />
              <span style={{ color: '#fff' }}>vantaggio competitivo misurabile</span>.
            </h2>
            <p className="ic-typ-p mt-10">
              I nostri progetti si articolano su quattro orizzonti
              complementari: piattaforme cloud, intelligenza artificiale
              applicata, cybersecurity e ingegneria del dato. Ogni orizzonte ha
              metodologie, certificazioni e un team senior dedicato — tenuti
              insieme dalla stessa governance di delivery.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
