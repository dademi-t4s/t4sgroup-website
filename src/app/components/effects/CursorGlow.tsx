'use client';

import { useEffect, useRef } from 'react';

/**
 * Soft red spotlight that follows the cursor across the page background.
 * Uses CSS variables + a fixed gradient div so the GPU compositor can
 * cheaply update the position every frame. Disabled on touch devices.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(pointer: coarse)').matches
    )
      return;

    // Lerp the displayed position toward the actual pointer for a smooth tail
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cur = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const animate = () => {
      cur.x += (target.x - cur.x) * 0.18;
      cur.y += (target.y - cur.y) * 0.18;
      if (ref.current) {
        ref.current.style.setProperty('--cx', `${cur.x}px`);
        ref.current.style.setProperty('--cy', `${cur.y}px`);
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
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 5,
        background:
          'radial-gradient(360px circle at var(--cx, 50%) var(--cy, 50%), rgba(239, 68, 68, 0.18), rgba(127, 29, 29, 0.08) 35%, transparent 65%)',
        mixBlendMode: 'screen',
      }}
    />
  );
}
