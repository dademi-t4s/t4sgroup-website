'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position.xy, 1.0, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;

  // hash for grain
  float hash(vec2 p){return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453);}

  void main(){
    vec2 uv = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
    float r = length(uv);

    // Pure deep base — near-black with a hint of warm shadow
    vec3 base = vec3(0.020, 0.012, 0.014);

    // Layered radial glow with two hot tones, slowly breathing.
    float pulse = 0.55 + 0.15 * sin(uTime * 0.18);

    // Inner: ember red, tight
    float coreGlow = exp(-r * 2.4) * 0.55 * pulse;
    vec3 coreCol = vec3(0.95, 0.27, 0.27);

    // Outer: deep wine, wider
    float halo = exp(-r * 1.15) * 0.20 * pulse;
    vec3 haloCol = vec3(0.50, 0.10, 0.12);

    vec3 col = base + coreCol * coreGlow + haloCol * halo;

    // Vignette
    float vig = smoothstep(1.4, 0.25, r);
    col *= 0.6 + 0.55 * vig;

    // Subtle grain
    float g = hash(vUv * uResolution + uTime);
    col += (g - 0.5) * 0.022;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function SceneBackdrop() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame(({ clock, size }) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = clock.elapsedTime;
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
