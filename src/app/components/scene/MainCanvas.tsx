'use client';

import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import SceneBackdrop from './SceneBackdrop';
import MorphParticles from './MorphParticles';
import CameraRig from './CameraRig';

export default function MainCanvas() {
  // Mobile / touch devices get a lower DPR cap so the GPU has fewer pixels
  // to fill — keeps the particle scene smooth on phones.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const m = window.matchMedia('(pointer: coarse), (max-width: 768px)');
    const update = () => setIsMobile(m.matches);
    update();
    m.addEventListener('change', update);
    return () => m.removeEventListener('change', update);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        // Mobile DPR up to 2 → crisp on retina phones (was 1.1, looked
        // pixelated). Desktop stays at 1.5 — already fluid on 4K.
        dpr={isMobile ? [1, 2] : [1, 1.5]}
        camera={{ position: [0, 0, 5.6], fov: 38 }}
      >
        <Suspense fallback={null}>
          <SceneBackdrop />
          <MorphParticles />
          <CameraRig />
          <AdaptiveDpr pixelated={false} />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
}
