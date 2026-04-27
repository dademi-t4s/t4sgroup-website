'use client';

import { useEffect, useRef } from 'react';

/**
 * Smooth custom cursor: a small dot with mix-blend-difference, lerp-tracked
 * to the pointer, scales up over interactive elements. Mirrors the Infracorp
 * `.cursor` element using transform3d.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cur = { x: target.x, y: target.y };
    let scale = 1;
    let scaleTarget = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest('a, button, [role="button"]');
      scaleTarget = interactive ? 2.6 : 1;
    };

    const animate = () => {
      cur.x += (target.x - cur.x) * 0.18;
      cur.y += (target.y - cur.y) * 0.18;
      scale += (scaleTarget - scale) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed top-0 left-0 pointer-events-none z-[80]"
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: '#fff',
        mixBlendMode: 'difference',
        transition: 'background 0.3s ease',
      }}
    />
  );
}
