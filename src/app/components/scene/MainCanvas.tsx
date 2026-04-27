'use client';

import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import SceneBackdrop from './SceneBackdrop';
import MorphParticles from './MorphParticles';
import CameraRig from './CameraRig';

export default function MainCanvas() {
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
        // Cap DPR at 1.5 — on 4K/Retina the native devicePixelRatio is 2-3
        // which means rendering 4× more pixels for marginal visual gain.
        // 1.5 looks indistinguishable from 2 but keeps the GPU cool.
        dpr={[1, 1.5]}
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
