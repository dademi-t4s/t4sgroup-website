'use client';

import Reveal from '../ui/Reveal';

type Props = {
  id: string;
  title: React.ReactNode;
  body: string;
  align?: 'left' | 'right';
  phase: number;
};

/**
 * Generic horizon section. Snap-target via `data-phase`, which is read by
 * MorphParticles to switch the particle silhouette to the matching shape.
 */
export default function Horizon({
  id,
  title,
  body,
  align = 'left',
  phase,
}: Props) {
  return (
    <section id={id} data-phase={phase} className="relative">
      <div className="ic-fh-section">
        <div className="max-w-[1400px] mx-auto w-full grid md:grid-cols-2">
          <Reveal className={align === 'right' ? 'md:col-start-2' : ''}>
            <h2 className="ic-typ-h2">{title}</h2>
            <p className="ic-typ-p mt-8">{body}</p>
            <a href="#contacts" className="ic-btn mt-8 inline-flex">
              Discover More
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
