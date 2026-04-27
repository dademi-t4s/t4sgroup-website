'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Pointer parallax + scroll dolly + per-section zoom.
 * Some sections (currently T4S Core) deserve a "camera approaches" feel like
 * Infracorp's timecode sections — when their <section data-phase> becomes
 * dominant in the viewport we pull the camera closer; we ease back out when
 * the user moves on.
 */

// Per-phase Z offset (negative = camera moves closer to scene). 0 = default.
const ZOOM_PER_PHASE: Record<number, number> = {
  0: -0.6, // Hero — gentle approach toward the globe
  6: -1.7, // T4S Core — strong approach
};

export default function CameraRig() {
  const { camera, size } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const pointer = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const phaseRef = useRef(0);
  const zoomRef = useRef(0); // current eased zoom offset

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / size.width) * 2 - 1;
      pointer.current.y = (e.clientY / size.height) * 2 - 1;
    };
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [size.width, size.height]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[data-phase]'),
    );
    if (sections.length === 0) return;

    const visibility = new Map<HTMLElement, number>();
    sections.forEach((s) => visibility.set(s, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visibility.set(e.target as HTMLElement, e.intersectionRatio);
        });
        let bestEl: HTMLElement | null = null;
        let bestRatio = -1;
        visibility.forEach((ratio, el) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestEl = el;
          }
        });
        if (bestEl) {
          const p = parseInt(
            (bestEl as HTMLElement).getAttribute('data-phase') || '0',
            10,
          );
          if (!Number.isNaN(p)) phaseRef.current = p;
        }
      },
      { threshold: [0, 0.2, 0.45, 0.7, 0.9, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useFrame((state, delta) => {
    const docH =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docH > 0 ? scrollY.current / docH : 0;

    // Slower lerp so the per-phase approach is felt rather than instant
    const zoomTarget = ZOOM_PER_PHASE[phaseRef.current] ?? 0;
    zoomRef.current += (zoomTarget - zoomRef.current) * Math.min(1, delta * 1.1);

    // Auto-fit base distance: on portrait / narrow viewports we need to be
    // further back so the largest shape (~radius 1.7) still fits horizontally.
    const persp = camera as THREE.PerspectiveCamera;
    const aspect = size.width / Math.max(1, size.height);
    const halfFovTan = Math.tan(((persp.fov ?? 38) * Math.PI) / 360);
    const desiredHalfWidth = 2.0; // give the globe ~15 % margin on each side
    const fitZ = desiredHalfWidth / (halfFovTan * aspect);
    const baseZ = Math.max(6.0, fitZ);

    const tx = pointer.current.x * 0.5;
    const ty = -pointer.current.y * 0.3;
    const tz =
      baseZ -
      progress * 2.4 +
      zoomRef.current +
      Math.sin(state.clock.elapsedTime * 0.25) * 0.04;

    const lerp = Math.min(1, delta * 2.5);
    camera.position.x += (tx - camera.position.x) * lerp;
    camera.position.y += (ty - camera.position.y) * lerp;
    camera.position.z += (tz - camera.position.z) * lerp;

    target.current.set(0, -progress * 0.3, 0);
    camera.lookAt(target.current);
  });

  return null;
}
