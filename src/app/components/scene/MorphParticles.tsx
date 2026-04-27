'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const N = 6000;

/* 0 — wireframe globe */
function globeShape(): Float32Array {
  const a = new Float32Array(N * 3);
  const R = 1.7;
  const latLines = 15; // parallels (incl. poles excluded — drawn at non-pole offsets)
  const lonLines = 30; // meridians
  const totalLines = latLines + lonLines;
  // Distribute points uniformly across all lines so the wireframe is crisp
  // and there's no random scatter creating "noise stars" on the sphere.
  const perLine = Math.floor(N / totalLines);
  let k = 0;

  // Parallels (latitude rings)
  for (let i = 0; i < latLines && k < N; i++) {
    const phi = ((i + 1) / (latLines + 1)) * Math.PI; // skip the poles
    const y = Math.cos(phi) * R;
    const r = Math.sin(phi) * R;
    for (let j = 0; j < perLine && k < N; j++) {
      const theta = (j / perLine) * Math.PI * 2;
      a[k * 3] = r * Math.cos(theta);
      a[k * 3 + 1] = y;
      a[k * 3 + 2] = r * Math.sin(theta);
      k++;
    }
  }

  // Meridians (longitude lines from pole to pole)
  for (let i = 0; i < lonLines && k < N; i++) {
    const theta = (i / lonLines) * Math.PI * 2;
    for (let j = 0; j < perLine && k < N; j++) {
      const phi = (j / perLine) * Math.PI;
      const r = Math.sin(phi) * R;
      a[k * 3] = r * Math.cos(theta);
      a[k * 3 + 1] = Math.cos(phi) * R;
      a[k * 3 + 2] = r * Math.sin(theta);
      k++;
    }
  }

  // Top up any leftover points on the equator so we always reach N.
  while (k < N) {
    const theta = ((k - latLines * perLine - lonLines * perLine) / 50) *
      Math.PI * 2;
    a[k * 3] = R * Math.cos(theta);
    a[k * 3 + 1] = 0;
    a[k * 3 + 2] = R * Math.sin(theta);
    k++;
  }
  return a;
}

/* 1 — 4-rayed compass star with a dense central bulb (HorizonsIntro: "Quattro aree", Partners) */
function galaxyShape(): Float32Array {
  const a = new Float32Array(N * 3);
  // 32% dense centre, 68% spread across 4 rays — overall reads as a tight
  // bloom radiating in 4 cardinal directions, never as scattered dust.
  const bulbPts = Math.floor(N * 0.32);
  const rayBudget = N - bulbPts;
  const rays: Array<[number, number]> = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const perRay = Math.floor(rayBudget / rays.length);
  const rayLen = 2.3;

  let k = 0;

  // Central bulb — dense Gaussian-ish sphere, slightly flattened
  for (let i = 0; i < bulbPts && k < N; i++) {
    const r = Math.pow(Math.random(), 1.4) * 0.6;
    const u = Math.random() * Math.PI * 2;
    const v = Math.acos(2 * Math.random() - 1);
    a[k * 3] = r * Math.sin(v) * Math.cos(u);
    a[k * 3 + 1] = r * Math.cos(v) * 0.45;
    a[k * 3 + 2] = r * Math.sin(v) * Math.sin(u);
    k++;
  }

  // 4 rays radiating from the centre, density tapering toward each tip
  for (const [dx, dy] of rays) {
    // perpendicular vector for ray-thickness
    const nx = -dy;
    const ny = dx;
    for (let i = 0; i < perRay && k < N; i++) {
      // sqrt distribution → denser near the centre, sparser at the tip
      const t = Math.pow(Math.random(), 0.55);
      const along = t * rayLen;
      const taper = 1 - t * 0.7;
      const perp = (Math.random() - 0.5) * 0.18 * taper;
      a[k * 3] = dx * along + nx * perp;
      a[k * 3 + 1] = dy * along + ny * perp;
      a[k * 3 + 2] = (Math.random() - 0.5) * 0.18 * taper;
      k++;
    }
  }

  // Fill any leftover near the centre
  while (k < N) {
    const r = Math.random() * 0.1;
    const ang = Math.random() * Math.PI * 2;
    a[k * 3] = r * Math.cos(ang);
    a[k * 3 + 1] = r * Math.sin(ang);
    a[k * 3 + 2] = 0;
    k++;
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

/* 4 — heater shield (Cybersecurity) — rounded top, tapered point */
function padlockShape(): Float32Array {
  const a = new Float32Array(N * 3);

  // Shield silhouette parameters
  const W = 1.15;
  const yTop = 1.35;
  const yBot = -1.45;
  const yShoulder = 0.55; // where rounded top transitions into straight body
  const yWaist = -0.45; // where body starts tapering toward the point

  // Inside-shield test (rounded arch + straight body + tapered tip)
  const inside = (x: number, y: number) => {
    if (y > yTop || y < yBot) return false;
    const ax = Math.abs(x);
    if (y >= yShoulder) {
      // Top arch — half-ellipse
      const t = (y - yShoulder) / (yTop - yShoulder);
      const allowed = W * Math.sqrt(Math.max(0, 1 - t * t));
      return ax <= allowed;
    }
    if (y >= yWaist) {
      // Mid body — full width
      return ax <= W;
    }
    // Bottom — taper to point with a slight curve
    const u = (yWaist - y) / (yWaist - yBot); // 0..1
    const allowed = W * (1 - u) * (1 - 0.25 * u);
    return ax <= allowed;
  };

  // Inner emblem: a small "checkmark" shape rendered as two short
  // line segments (sloped down then up).
  const onCheckmark = (x: number, y: number) => {
    // Two segments: (-0.32, 0.05) → (-0.05, -0.18) → (0.40, 0.32)
    const segs: [number, number, number, number][] = [
      [-0.32, 0.05, -0.05, -0.18],
      [-0.05, -0.18, 0.4, 0.32],
    ];
    for (const [x1, y1, x2, y2] of segs) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const lenSq = dx * dx + dy * dy;
      const t = ((x - x1) * dx + (y - y1) * dy) / lenSq;
      if (t < 0 || t > 1) continue;
      const px = x1 + t * dx;
      const py = y1 + t * dy;
      const ddx = x - px;
      const ddy = y - py;
      if (ddx * ddx + ddy * ddy < 0.04 * 0.04) return true;
    }
    return false;
  };

  // 70% body fill, 30% emphasised checkmark
  const bodyPts = Math.floor(N * 0.7);
  const checkPts = N - bodyPts;
  let k = 0;

  // 1. Uniform fill of shield silhouette
  let attempts = 0;
  while (k < bodyPts && attempts < bodyPts * 10) {
    attempts++;
    const x = (Math.random() - 0.5) * 2.5;
    const y = yBot + Math.random() * (yTop - yBot);
    if (!inside(x, y)) continue;
    // Skip points where the checkmark sits — punches the emblem out
    if (onCheckmark(x, y)) continue;
    a[k * 3] = x;
    a[k * 3 + 1] = y;
    a[k * 3 + 2] = (Math.random() - 0.5) * 0.32;
    k++;
  }

  // 2. Dense checkmark — points along the two segments
  for (let i = 0; i < checkPts && k < N; i++) {
    const segs: [number, number, number, number][] = [
      [-0.32, 0.05, -0.05, -0.18],
      [-0.05, -0.18, 0.4, 0.32],
    ];
    // Distribute 40% on first segment, 60% on second (which is longer)
    const seg = i < checkPts * 0.4 ? segs[0] : segs[1];
    const t = Math.random();
    a[k * 3] = seg[0] + (seg[2] - seg[0]) * t + (Math.random() - 0.5) * 0.025;
    a[k * 3 + 1] = seg[1] + (seg[3] - seg[1]) * t + (Math.random() - 0.5) * 0.025;
    a[k * 3 + 2] = (Math.random() - 0.5) * 0.12;
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

/* 9 — three vertical pillars (Partners — "tre profili di cliente") */
function pillarsShape(): Float32Array {
  const a = new Float32Array(N * 3);
  const cols = 3;
  const W = 0.55; // pillar half-width
  const H = 1.4;  // pillar half-height
  const spacing = 1.7;
  const perPillar = Math.floor(N / cols);

  let k = 0;
  for (let c = 0; c < cols && k < N; c++) {
    const cx = (c - 1) * spacing;
    let placed = 0;
    let attempts = 0;
    // Edge-biased rejection sampling so each pillar reads as a solid
    // rectangle with crisp outline, like the other "card-shaped" phases.
    while (placed < perPillar && attempts < perPillar * 6 && k < N) {
      attempts++;
      const x = (Math.random() - 0.5) * 2 * W;
      const y = (Math.random() - 0.5) * 2 * H;
      const dx = W - Math.abs(x);
      const dy = H - Math.abs(y);
      const distEdge = Math.min(dx, dy);
      // Heavy outline + sparse interior for that "particle wireframe" feel
      if (distEdge > 0.07 && Math.random() < 0.78) continue;
      a[k * 3] = cx + x;
      a[k * 3 + 1] = y;
      a[k * 3 + 2] = (Math.random() - 0.5) * 0.4;
      k++;
      placed++;
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
      pillarsShape, // 9 — Partners
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

  // Track the global time at which the current phase started, so each new
  // shape forms upright and the rotation only ramps in afterwards.
  const phaseStartRef = useRef(0);
  const lastPhaseSeenRef = useRef(-1);

  useFrame((state, delta) => {
    const target = getPhase(phaseRef.current) || getPhase(0);
    const cur = positions;
    const k = Math.min(1, delta * 2.6);
    const t = state.clock.elapsedTime;

    // On phase change reset the local clock so rotation starts from zero.
    if (lastPhaseSeenRef.current !== phaseRef.current) {
      lastPhaseSeenRef.current = phaseRef.current;
      phaseStartRef.current = t;
    }
    const tPhase = t - phaseStartRef.current;

    // Per-particle drift around the target — uses global time so the
    // background never feels static across phase transitions.
    const J = 0.025;
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      const px = i * 0.71;
      const py = i * 1.37;
      const pz = i * 0.93;
      const tx = target[i3] + Math.sin(t * 0.65 + px) * J;
      const ty = target[i3 + 1] + Math.sin(t * 0.55 + py) * J;
      const tz = target[i3 + 2] + Math.sin(t * 0.75 + pz) * J;
      cur[i3] += (tx - cur[i3]) * k;
      cur[i3 + 1] += (ty - cur[i3 + 1]) * k;
      cur[i3 + 2] += (tz - cur[i3 + 2]) * k;
    }
    const geom = pointsRef.current.geometry as THREE.BufferGeometry;
    (geom.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    if (pointsRef.current) {
      // Ease-in over ~2.2s after each phase change so the shape forms
      // upright and the rotation gradually picks up from zero.
      const ramp = Math.min(1, tPhase / 2.2);
      const ease = ramp * ramp * (3 - 2 * ramp); // smoothstep
      // Continuous slow rotation around the vertical (Y) axis — the shape
      // spins on its own axis like a turntable, not in a flat screen-plane
      // circle. Tiny X nod adds breathing.
      pointsRef.current.rotation.y = tPhase * 0.025 * ease;
      pointsRef.current.rotation.x = Math.sin(tPhase * 0.10) * 0.04 * ease;
      pointsRef.current.rotation.z = 0;
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
