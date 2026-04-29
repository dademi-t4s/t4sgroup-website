// T4S Core particle orb (Infracorp-style).
//
// Comportamento:
//   - Su Applied AI il chip nativo viene nascosto e compare la palla
//     particellare a SINISTRA (la sezione "Applied AI" ha la scritta
//     sulla colonna destra → spazio vuoto a sinistra).
//   - Mentre scorri, la palla SCENDE: stesso lato (sinistra), si sposta
//     verso il fondo del viewport.
//   - Su T4S Core la palla è a SINISTRA, mezzo-tagliata sul bordo
//     inferiore (Infracorp half-cut). Lo sfondo della sola sezione T4S
//     Core diventa un dark caldo (più scuro del default ma non nero).
//   - Sulle altre sezioni (Cloud, Data, Security, Stack, ...) niente:
//     overlay invisibile, chip nativo intatto, palla nascosta.

import * as THREE from 'https://esm.sh/three@0.169.0';

const ORB_ID = 't4s-core-orb-canvas';
const OVERLAY_ID = 't4s-core-orb-overlay';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const smooth = (t) => {
  t = clamp(t, 0, 1);
  return t * t * (3 - 2 * t);
};

function init() {
  if (document.getElementById(ORB_ID)) return;

  const tCore = document.getElementById('t4s-core');
  const tApplied = document.getElementById('horizon-ai');
  const tStack = document.getElementById('tech-stack');
  if (!tCore || !tApplied) return setTimeout(init, 200);

  // ── Overlay warm-dark sulla sola T4S Core ─────────────────────────
  // Più scuro del default, NON nero: tono burgundy/wine quasi opaco
  // con leggerissimo radial verso il centro per dare profondità.
  const overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    pointerEvents: 'none',
    zIndex: '1', // sopra al canvas nativo (z 0), sotto la palla (z 2) e contenuto (z 10)
    opacity: '0',
    transition: 'opacity 0.25s linear',
    background:
      'radial-gradient(ellipse 120% 95% at 50% 45%, ' +
      'rgba(34, 14, 18, 0.96) 0%, ' +
      'rgba(22, 10, 13, 0.98) 55%, ' +
      'rgba(14, 6, 8, 0.99) 100%)',
  });
  document.body.appendChild(overlay);

  // ── Ambient su Applied AI ─────────────────────────────────────────
  // Quando nascondiamo il chip nativo, la sezione resterebbe solo bg
  // body = visibilmente più scura delle altre. Questo overlay molto
  // leggero (alpha ~0.18) restituisce la stessa "warmth" ambient delle
  // altre sezioni horizon SENZA disegnare nulla — è solo un radial soft.
  const appliedOverlay = document.createElement('div');
  appliedOverlay.id = 't4s-applied-ambient';
  appliedOverlay.setAttribute('aria-hidden', 'true');
  Object.assign(appliedOverlay.style, {
    position: 'fixed',
    inset: '0',
    pointerEvents: 'none',
    zIndex: '1',
    opacity: '0',
    transition: 'opacity 0.25s linear',
    background:
      'radial-gradient(ellipse 95% 75% at 55% 50%, ' +
      'rgba(72, 28, 34, 0.22) 0%, ' +
      'rgba(46, 18, 24, 0.14) 45%, ' +
      'rgba(20, 8, 12, 0) 80%)',
  });
  document.body.appendChild(appliedOverlay);

  // ── Canvas nativo (chip / sfera del bundle Next.js) ───────────────
  // Lo nascondiamo solo dove ci interessa: Applied AI (no chip) e T4S
  // Core (sotto al nostro overlay). Sulle altre sezioni resta intatto.
  const bgWrapper = document.querySelector(
    'div[aria-hidden="true"][class*="fixed"][class*="inset-0"][class*="pointer-events-none"][style*="z-index:0"]'
  );
  if (bgWrapper && !bgWrapper.style.transition) {
    bgWrapper.style.transition = 'opacity 0.25s linear';
  }

  function visibilityForRect(rect, vh) {
    if (rect.bottom < 0 || rect.top > vh) return 0;
    const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
    // Banda strettissima: overlay/bg-hide a piena intensità solo quando
    // la sezione copre ≥8% del viewport. Fade in/out in pochissimi px di
    // scroll → niente residui visibili sulle sezioni adiacenti.
    return clamp(visible / (vh * 0.08), 0, 1);
  }

  function updateBackground() {
    const vh = window.innerHeight;
    const aFade = visibilityForRect(tApplied.getBoundingClientRect(), vh);

    // Overlay dark T4S Core: disabilitato (T4S Core mantiene bg nativo)
    overlay.style.opacity = '0';
    // Soft warm glow solo su Applied AI (compensa il chip rimosso)
    appliedOverlay.style.opacity = String(aFade);
    if (bgWrapper) {
      // Chip nativo nascosto SOLO quando Applied AI è in vista.
      // Tutte le altre sezioni (T4S Core, Stack, Security, Engineer,
      // Cloud, Home, Horizons, From Vision, Team, Contatti) → bg nativo
      // intatto.
      if (aFade > 0) {
        bgWrapper.style.opacity = String(1 - aFade);
      } else {
        bgWrapper.style.removeProperty('opacity');
      }
    }
  }
  window.addEventListener('scroll', updateBackground, { passive: true });
  window.addEventListener('resize', updateBackground);
  updateBackground();

  // ── Canvas orb (three.js) ─────────────────────────────────────────
  const canvas = document.createElement('canvas');
  canvas.id = ORB_ID;
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '2',
    opacity: '0',
    transition: 'opacity 0.45s ease',
  });
  document.body.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });

  // Mezza altezza viewport in world units a z=0 (FOV 38°, z=5).
  const HALF_H = Math.tan((38 * Math.PI) / 360) * 5; // ≈ 1.72

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 2600;
  const BASE_RADIUS = 1.25; // leggermente più grande del default (era 1.0)
  const positions = new Float32Array(COUNT * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const radius = BASE_RADIUS * (0.96 + Math.random() * 0.08);
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const sprite = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 22);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.45, 'rgba(255,200,200,0.85)');
    g.addColorStop(1, 'rgba(248,113,113,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  })();

  const material = new THREE.PointsMaterial({
    size: 0.045,
    sizeAttenuation: true,
    map: sprite,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: 0xffc8c8,
    opacity: 0.95,
  });

  const orb = new THREE.Points(geometry, material);
  scene.add(orb);

  // ── Trajectory ────────────────────────────────────────────────────
  // Su Applied AI: palla a SINISTRA (testo in colonna destra → spazio
  // vuoto a sinistra), centro-verticale.
  // Transizione → T4S Core: scivola in basso E al CENTRO orizzontale.
  // Su T4S Core: CENTRATA orizzontalmente, mezzo-tagliata in basso
  // (Infracorp half-cut classico).
  function leftX(vw, vh) {
    const halfW = HALF_H * (vw / vh);
    // Centro al ~30% del viewport da sinistra: copre lo spazio vuoto a
    // sinistra del titolo Applied AI senza essere tagliato dal bordo.
    const desired = -halfW * 0.42;
    // Cap interno: il bordo sinistro della palla (radius * scale ≈ 1.25)
    // deve restare nel viewport.
    const minX = -halfW + 1.3;
    return Math.max(minX, Math.min(-0.4, desired));
  }

  function getTrajectory(coreRect, appliedRect, vw, vh) {
    const xL = leftX(vw, vh);
    const Y_MID = 0.05;          // centro verticale (Applied AI)
    const SCALE_APP = 1.0;

    // Palla SOLO su Applied AI. Niente transizione, niente half-cut su
    // T4S Core, niente fade su Security/Engineer. Visibile solo quando
    // Applied AI è dominantemente nel viewport.
    const ratioApp = appliedRect.top / vh;

    // Fuori dalla banda visibile → palla nascosta
    if (ratioApp > 0.5 || ratioApp < -0.5) {
      return { x: xL, y: Y_MID, vis: 0, scale: SCALE_APP };
    }

    // Banda di fade-in alta [0.5, 0.3]
    if (ratioApp > 0.3) {
      return {
        x: xL,
        y: Y_MID,
        vis: smooth((0.5 - ratioApp) / 0.2),
        scale: SCALE_APP,
      };
    }

    // Banda di fade-out bassa [-0.3, -0.5]
    if (ratioApp < -0.3) {
      return {
        x: xL,
        y: Y_MID,
        vis: smooth((ratioApp + 0.5) / 0.2),
        scale: SCALE_APP,
      };
    }

    // Centrale: piena visibilità su Applied AI
    return { x: xL, y: Y_MID, vis: 1, scale: SCALE_APP };
  }

  const target = { x: leftX(window.innerWidth, window.innerHeight), y: 0, vis: 0, scale: 1.0 };

  function updateTarget() {
    const traj = getTrajectory(
      tCore.getBoundingClientRect(),
      tApplied.getBoundingClientRect(),
      window.innerWidth,
      window.innerHeight
    );
    target.x = traj.x;
    target.y = traj.y;
    target.vis = traj.vis;
    target.scale = traj.scale;
  }

  window.addEventListener('scroll', updateTarget, { passive: true });
  window.addEventListener('resize', updateTarget);
  updateTarget();
  orb.position.set(target.x, target.y, 0);
  orb.scale.setScalar(target.scale);

  const clock = new THREE.Clock();
  const POS_DAMP = 8;
  const VIS_DAMP = 14; // più reattivo: il fade-out finisce in pochi frame, niente "ombra"
  let curVis = 0;
  let curScale = target.scale;

  function tick() {
    requestAnimationFrame(tick);
    const dt = clock.getDelta();

    const k = 1 - Math.exp(-POS_DAMP * dt);
    orb.position.x += (target.x - orb.position.x) * k;
    orb.position.y += (target.y - orb.position.y) * k;
    curScale += (target.scale - curScale) * k;
    orb.scale.setScalar(curScale);

    const kv = 1 - Math.exp(-VIS_DAMP * dt);
    curVis += (target.vis - curVis) * kv;
    canvas.style.opacity = curVis.toFixed(3);

    orb.rotation.y += dt * 0.16;
    orb.rotation.x += dt * 0.04;
    renderer.render(scene, camera);
  }
  tick();
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
