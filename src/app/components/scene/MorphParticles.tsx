'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const N = 6000;

/* 0 — wireframe globe */
function globeShape(): Float32Array {
  const a = new Float32Array(N * 3);
  const R = 1.7;
  const latLines = 12;
  const lonLines = 24;
  const perLat = Math.floor((N * 0.45) / latLines);
  const perLon = Math.floor((N * 0.4) / lonLines);
  let k = 0;
  for (let i = 0; i < latLines && k < N; i++) {
    const phi = ((i + 0.5) / latLines) * Math.PI;
    const y = Math.cos(phi) * R;
    const r = Math.sin(phi) * R;
    for (let j = 0; j < perLat && k < N; j++) {
      const theta = (j / perLat) * Math.PI * 2;
      a[k * 3] = r * Math.cos(theta);
      a[k * 3 + 1] = y;
      a[k * 3 + 2] = r * Math.sin(theta);
      k++;
    }
  }
  for (let i = 0; i < lonLines && k < N; i++) {
    const theta = (i / lonLines) * Math.PI * 2;
    for (let j = 0; j < perLon && k < N; j++) {
      const phi = (j / perLon) * Math.PI;
      const r = Math.sin(phi) * R;
      a[k * 3] = r * Math.cos(theta);
      a[k * 3 + 1] = Math.cos(phi) * R;
      a[k * 3 + 2] = r * Math.sin(theta);
      k++;
    }
  }
  while (k < N) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    a[k * 3] = R * Math.sin(phi) * Math.cos(theta);
    a[k * 3 + 1] = R * Math.cos(phi);
    a[k * 3 + 2] = R * Math.sin(phi) * Math.sin(theta);
    k++;
  }
  return a;
}

/* 1 — galaxy with 5 spiral arms (natural scatter wobble) */
function galaxyShape(): Float32Array {
  const a = new Float32Array(N * 3);
  const arms = 5;
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const arm = i % arms;
    const r = Math.pow(t, 0.6) * 2.6;
    const angle = (arm / arms) * Math.PI * 2 + t * 6;
    const wobble = (Math.random() - 0.5) * 0.32;
    a[i * 3] = Math.cos(angle) * r + wobble;
    a[i * 3 + 1] = (Math.random() - 0.5) * 0.18 * (1 + r * 0.4);
    a[i * 3 + 2] = Math.sin(angle) * r + wobble;
  }
  return a;
}

/* 2 — cloud silhouette: 5 distinct bumps on top + flat base */
function cloudShape(): Float32Array {
  const a = new Float32Array(N * 3);
  // Classic cloud icon profile — clear bumps on top, flat baseline below.
  const puffs = [
    // Big central bump
    { x: 0.0, y: 0.55, r: 0.95 },
    // Left shoulder
    { x: -1.05, y: 0.32, r: 0.78 },
    // Right shoulder
    { x: 1.05, y: 0.32, r: 0.78 },
    // Far left edge
    { x: -1.75, y: 0.0, r: 0.6 },
    // Far right edge
    { x: 1.75, y: 0.0, r: 0.6 },
    // Base bridge (flattens the bottom)
    { x: -0.5, y: -0.05, r: 0.62 },
    { x: 0.5, y: -0.05, r: 0.62 },
  ];
  const inside = (x: number, y: number) => {
    for (const p of puffs) {
      const dx = x - p.x;
      const dy = y - p.y;
      if (dx * dx + dy * dy < p.r * p.r) return true;
    }
    return false;
  };
  let k = 0;
  let attempts = 0;
  while (k < N && attempts < N * 12) {
    attempts++;
    const x = (Math.random() - 0.5) * 5;
    const y = -0.4 + Math.random() * 1.8;
    if (!inside(x, y)) continue;
    a[k * 3] = x;
    a[k * 3 + 1] = y;
    // shallower depth so the silhouette reads (was ±1.3 → blob)
    a[k * 3 + 2] = (Math.random() - 0.5) * 0.45;
    k++;
  }
  while (k < N) {
    a[k * 3] = a[k * 3 + 1] = a[k * 3 + 2] = 0;
    k++;
  }
  return a;
}

/* 3 — chip: edge-biased body + random pin extension + concentric inner traces */
function chipShape(): Float32Array {
  const a = new Float32Array(N * 3);
  const W = 1.4;
  const H = 1.4;
  const PIN_LEN = 0.5;
  const PIN_COUNT = 9;
  const bodyPts = Math.floor(N * 0.45);
  const pinsPts = Math.floor(N * 0.30);
  const tracePts = N - bodyPts - pinsPts;
  let k = 0;
  for (let i = 0; i < bodyPts && k < N; i++) {
    if (Math.random() < 0.62) {
      const side = Math.floor(Math.random() * 4);
      let x = 0;
      let y = 0;
      if (side === 0) { x = -W + Math.random() * 2 * W; y = H; }
      else if (side === 1) { x = W; y = -H + Math.random() * 2 * H; }
      else if (side === 2) { x = -W + Math.random() * 2 * W; y = -H; }
      else { x = -W; y = -H + Math.random() * 2 * H; }
      a[k * 3] = x + (Math.random() - 0.5) * 0.04;
      a[k * 3 + 1] = y + (Math.random() - 0.5) * 0.04;
    } else {
      a[k * 3] = (Math.random() - 0.5) * 2 * W;
      a[k * 3 + 1] = (Math.random() - 0.5) * 2 * H;
    }
    a[k * 3 + 2] = (Math.random() - 0.5) * 0.08;
    k++;
  }
  for (let i = 0; i < pinsPts && k < N; i++) {
    const side = i % 4;
    const idx = Math.floor(i / 4) % PIN_COUNT;
    const t = (idx + 0.5) / PIN_COUNT;
    const u = -0.85 + t * 1.7;
    const ext = Math.random() * PIN_LEN;
    let x = 0;
    let y = 0;
    if (side === 0) { x = u; y = H + ext; }
    else if (side === 1) { x = W + ext; y = u; }
    else if (side === 2) { x = u; y = -H - ext; }
    else { x = -W - ext; y = u; }
    a[k * 3] = x + (Math.random() - 0.5) * 0.02;
    a[k * 3 + 1] = y + (Math.random() - 0.5) * 0.02;
    a[k * 3 + 2] = (Math.random() - 0.5) * 0.04;
    k++;
  }
  for (let i = 0; i < tracePts && k < N; i++) {
    const ring = Math.floor(Math.random() * 3);
    const r = 0.32 + ring * 0.25;
    const side = Math.floor(Math.random() * 4);
    let x = 0;
    let y = 0;
    if (side === 0) { x = -r + Math.random() * 2 * r; y = r; }
    else if (side === 1) { x = r; y = -r + Math.random() * 2 * r; }
    else if (side === 2) { x = -r + Math.random() * 2 * r; y = -r; }
    else { x = -r; y = -r + Math.random() * 2 * r; }
    a[k * 3] = x + (Math.random() - 0.5) * 0.025;
    a[k * 3 + 1] = y + (Math.random() - 0.5) * 0.025;
    a[k * 3 + 2] = (Math.random() - 0.5) * 0.04;
    k++;
  }
  return a;
}

/* 4 — padlock (closed): rounded body + half-annulus shackle + keyhole */
function padlockShape(): Float32Array {
  const a = new Float32Array(N * 3);

  // Body — rounded rectangle, slightly taller than wide
  const bodyW = 1.0;
  const bodyH = 0.92;
  const bodyCy = -0.45;
  const cornerR = 0.2;

  // Shackle — half-annulus sitting on body top
  const shackleR = 0.58;
  const shackleStroke = 0.18;
  const shackleBaseY = bodyCy + bodyH;

  // Keyhole — circle + tapered slot
  const khR = 0.13;
  const khSlot = 0.3;
  const khCy = bodyCy + 0.18;

  // Inside-rounded-rectangle test
  const inBody = (x: number, y: number) => {
    const ax = Math.abs(x);
    const ay = Math.abs(y - bodyCy);
    if (ax > bodyW || ay > bodyH) return false;
    const dx = ax - (bodyW - cornerR);
    const dy = ay - (bodyH - cornerR);
    if (dx > 0 && dy > 0) return dx * dx + dy * dy < cornerR * cornerR;
    return true;
  };

  // Inside-keyhole test (circle ∪ tapered slot)
  const inKeyhole = (x: number, y: number) => {
    const dx = x;
    const dy = y - khCy;
    if (dx * dx + dy * dy < khR * khR) return true;
    const slotTop = khCy;
    const slotBot = khCy - khSlot;
    if (y < slotTop && y > slotBot) {
      const u = (slotTop - y) / khSlot;
      const halfW = khR * (1 - u * 0.5);
      if (Math.abs(x) < halfW) return true;
    }
    return false;
  };

  // Inside-shackle (half-annulus, plus a thin overlap into the body so the
  // arc visually anchors to the body top)
  const inShackle = (x: number, y: number) => {
    const dx = x;
    const dy = y - shackleBaseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return (
      dist >= shackleR - shackleStroke &&
      dist <= shackleR &&
      y >= shackleBaseY - shackleStroke * 0.4
    );
  };

  // Allocations: 60% body, 38% shackle, 2% explicit keyhole ring for clarity.
  const bodyPts = Math.floor(N * 0.6);
  const shacklePts = Math.floor(N * 0.38);
  const khRingPts = N - bodyPts - shacklePts;

  let k = 0;

  // 1. Uniform body fill (rounded rect minus keyhole)
  let attempts = 0;
  while (k < bodyPts && attempts < bodyPts * 10) {
    attempts++;
    const x = (Math.random() - 0.5) * 2 * bodyW;
    const y = bodyCy + (Math.random() - 0.5) * 2 * bodyH;
    if (!inBody(x, y) || inKeyhole(x, y)) continue;
    a[k * 3] = x;
    a[k * 3 + 1] = y;
    a[k * 3 + 2] = (Math.random() - 0.5) * 0.18;
    k++;
  }

  // 2. Uniform shackle fill (half-annulus)
  attempts = 0;
  let placed = 0;
  while (placed < shacklePts && attempts < shacklePts * 12 && k < N) {
    attempts++;
    const x = (Math.random() - 0.5) * 2 * shackleR;
    const y = shackleBaseY + Math.random() * (shackleR + shackleStroke);
    if (!inShackle(x, y)) continue;
    a[k * 3] = x;
    a[k * 3 + 1] = y;
    a[k * 3 + 2] = (Math.random() - 0.5) * 0.14;
    k++;
    placed++;
  }

  // 3. Explicit keyhole circle ring — emphasises the hole
  for (let i = 0; i < khRingPts && k < N; i++) {
    const angle = (i / khRingPts) * Math.PI * 2;
    const rr = khR + (Math.random() - 0.5) * 0.018;
    a[k * 3] = Math.cos(angle) * rr + (Math.random() - 0.5) * 0.008;
    a[k * 3 + 1] = khCy + Math.sin(angle) * rr;
    a[k * 3 + 2] = (Math.random() - 0.5) * 0.1;
    k++;
  }

  while (k < N) {
    a[k * 3] = a[k * 3 + 1] = a[k * 3 + 2] = 0;
    k++;
  }
  return a;
}

/* 5 — database cylinder — 3 stacks of ellipse fill + side mantle scatter */
function databaseShape(): Float32Array {
  const a = new Float32Array(N * 3);
  const radius = 1.25;
  const depthRatio = 0.32;
  const totalH = 2.6;
  const stacks = 3;
  const stackH = totalH / stacks;
  const perStack = Math.floor(N / stacks);
  let k = 0;
  for (let s = 0; s < stacks && k < N; s++) {
    const yTop = totalH / 2 - s * stackH;
    const yBot = yTop - stackH;
    const ellipsePts = Math.floor(perStack * 0.45);
    const sidePts = perStack - ellipsePts;
    for (let i = 0; i < ellipsePts && k < N; i++) {
      const angle = (i / ellipsePts) * Math.PI * 2 + Math.random() * 0.05;
      const rNorm = Math.sqrt(Math.random());
      const r = rNorm * radius;
      a[k * 3] = Math.cos(angle) * r;
      a[k * 3 + 1] = yTop + (Math.random() - 0.5) * 0.04;
      a[k * 3 + 2] = Math.sin(angle) * r * depthRatio;
      k++;
    }
    for (let i = 0; i < sidePts && k < N; i++) {
      const angle = Math.random() * Math.PI * 2;
      a[k * 3] = Math.cos(angle) * radius;
      a[k * 3 + 1] = yBot + Math.random() * stackH;
      a[k * 3 + 2] = Math.sin(angle) * radius * depthRatio;
      k++;
    }
  }
  while (k < N) {
    const angle = Math.random() * Math.PI * 2;
    const rNorm = Math.sqrt(Math.random());
    const r = rNorm * radius;
    a[k * 3] = Math.cos(angle) * r;
    a[k * 3 + 1] = -totalH / 2;
    a[k * 3 + 2] = Math.sin(angle) * r * depthRatio;
    k++;
  }
  return a;
}

/* 6 — solid filled stacked discs (T4SCore) */
function layeredDisksShape(): Float32Array {
  const a = new Float32Array(N * 3);
  const layers = 7;
  const radius = 1.55;
  const spacing = 0.42;
  const perLayer = Math.floor(N / layers);
  let k = 0;
  for (let l = 0; l < layers && k < N; l++) {
    const y = (l - (layers - 1) / 2) * spacing;
    for (let i = 0; i < perLayer && k < N; i++) {
      const u = Math.random();
      const r = Math.sqrt(u) * radius;
      const theta = Math.random() * Math.PI * 2;
      a[k * 3] = r * Math.cos(theta);
      a[k * 3 + 1] = y + (Math.random() - 0.5) * 0.03;
      a[k * 3 + 2] = r * Math.sin(theta);
      k++;
    }
  }
  while (k < N) {
    a[k * 3] = a[k * 3 + 1] = a[k * 3 + 2] = 0;
    k++;
  }
  return a;
}

/* 7 — orthogonal grid of soft cells (Team) */
function gridShape(): Float32Array {
  const a = new Float32Array(N * 3);
  const cols = 14;
  const rows = 8;
  const cells = cols * rows;
  const perCell = Math.floor(N / cells);
  const w = 4.6;
  const h = 2.6;
  let k = 0;
  for (let r = 0; r < rows && k < N; r++) {
    for (let c = 0; c < cols && k < N; c++) {
      const cx = (c - (cols - 1) / 2) * (w / cols);
      const cy = (r - (rows - 1) / 2) * (h / rows);
      for (let i = 0; i < perCell && k < N; i++) {
        const dr = Math.random() * 0.07;
        const dt = Math.random() * Math.PI * 2;
        a[k * 3] = cx + dr * Math.cos(dt);
        a[k * 3 + 1] = cy + dr * Math.sin(dt);
        a[k * 3 + 2] = (Math.random() - 0.5) * 0.4;
        k++;
      }
    }
  }
  while (k < N) {
    a[k * 3] = a[k * 3 + 1] = a[k * 3 + 2] = 0;
    k++;
  }
  return a;
}

/* 8 — tiles: edge-biased rectangles with sparse interior scatter (TechStack) */
function tilesShape(): Float32Array {
  const a = new Float32Array(N * 3);
  const cols = 4;
  const rows = 3;
  const tileW = 0.78;
  const tileH = 0.55;
  const spacingX = 1.15;
  const spacingY = 0.88;
  const cells = cols * rows;
  const perCell = Math.floor(N / cells);
  let k = 0;
  for (let r = 0; r < rows && k < N; r++) {
    for (let c = 0; c < cols && k < N; c++) {
      const cx = (c - (cols - 1) / 2) * spacingX;
      const cy = (r - (rows - 1) / 2) * -spacingY;
      let placed = 0;
      let attempts = 0;
      while (placed < perCell && attempts < perCell * 6 && k < N) {
        attempts++;
        const x = (Math.random() - 0.5) * tileW;
        const y = (Math.random() - 0.5) * tileH;
        const dx = tileW / 2 - Math.abs(x);
        const dy = tileH / 2 - Math.abs(y);
        const distEdge = Math.min(dx, dy);
        if (distEdge > 0.05 && Math.random() < 0.78) continue;
        a[k * 3] = cx + x + (Math.random() - 0.5) * 0.012;
        a[k * 3 + 1] = cy + y + (Math.random() - 0.5) * 0.012;
        a[k * 3 + 2] = (Math.random() - 0.5) * 0.22;
        k++;
        placed++;
      }
    }
  }
  while (k < N) {
    a[k * 3] = a[k * 3 + 1] = a[k * 3 + 2] = 0;
    k++;
  }
  return a;
}

export default function MorphParticles() {
  const pointsRef = useRef<THREE.Points>(null!);

  const cache = useRef<Float32Array[]>([]);
  const getPhase = (i: number): Float32Array => {
    if (cache.current[i]) return cache.current[i];
    const fns: Array<() => Float32Array> = [
      globeShape,
      galaxyShape,
      cloudShape,
      chipShape,
      padlockShape,
      databaseShape,
      layeredDisksShape,
      gridShape,
      tilesShape,
    ];
    cache.current[i] = (fns[i] || fns[0])();
    return cache.current[i];
  };

  const positions = useMemo(() => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      a[i * 3] = (Math.random() - 0.5) * 0.05;
      a[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      a[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    return a;
  }, []);

  const sprite = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,250,245,1)');
    g.addColorStop(0.25, 'rgba(254,205,211,0.9)');
    g.addColorStop(0.55, 'rgba(239,68,68,0.55)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const phaseRef = useRef(0);

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
    const target = getPhase(phaseRef.current) || getPhase(0);
    const cur = positions;
    const k = Math.min(1, delta * 2.6);
    for (let i = 0; i < N * 3; i++) {
      cur[i] += (target[i] - cur[i]) * k;
    }
    const geom = pointsRef.current.geometry as THREE.BufferGeometry;
    (geom.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    if (pointsRef.current) {
      const t = state.clock.elapsedTime;
      pointsRef.current.rotation.y = Math.sin(t * 0.16) * 0.10;
      pointsRef.current.rotation.x = Math.sin(t * 0.11) * 0.045;
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        color="#ffd1cf"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}
