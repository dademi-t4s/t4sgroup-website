// Re-animate cards / headings every time they enter the viewport.
// Il bundle Next.js (framer-motion) anima questi elementi solo UNA volta
// (`once: true`). Questo script li intercetta — anche dopo che framer
// li ha già toccati — e li ri-anima ad ogni entrata in viewport.

(function () {
  const ENTER_TRANSITION =
    'opacity 0.7s ease-out, transform 0.7s ease-out';

  // Stato di reset hardcoded (sostituisce il valore originale del bundle
  // se framer-motion l'ha già modificato).
  function resetStyleFor(el) {
    const cls = el.className || '';
    // Heading h1 (es. titolo Strategic by Design): translateY(20px)
    if (el.tagName === 'H1' || cls.includes('ic-typ-h1')) {
      return 'opacity:0;transform:translateY(20px)';
    }
    // Heading h2: translateY(14px) scale(0.94)
    if (el.tagName === 'H2' || cls.includes('ic-typ-h2')) {
      return 'opacity:0;transform:translateY(14px) scale(0.94)';
    }
    // Default per card / paragraph wrapper: translateY(90px)
    return 'opacity:0;transform:translateY(90px)';
  }

  function findAnimatables() {
    // Match SIA gli elementi ancora in stato iniziale (opacity:0) SIA
    // quelli che framer-motion ha già animato a opacity:1+transform:none.
    const allDivs = Array.from(
      document.querySelectorAll('div[style], h1[style], h2[style]')
    );
    return allDivs.filter((el) => {
      const s = el.getAttribute('style') || '';
      const hasOpacity = /opacity\s*:/i.test(s);
      const hasTransform = /transform\s*:/i.test(s);
      // Esclude lo splash di caricamento / overlay vari (z-index alti)
      if (s.includes('z-index:[100]') || s.includes('z-index: 100')) {
        return false;
      }
      return hasOpacity && hasTransform;
    });
  }

  function init() {
    const els = findAnimatables();
    if (els.length === 0) {
      setTimeout(init, 200);
      return;
    }

    const items = els.map((el) => ({
      el,
      reset: resetStyleFor(el),
    }));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = items.find((it) => it.el === entry.target);
          if (!item) return;
          const el = entry.target;
          if (entry.isIntersecting) {
            // Animate in
            el.style.transition = ENTER_TRANSITION;
            el.style.opacity = '1';
            el.style.transform = 'none';
          } else {
            // Snap back allo stato iniziale, pronto per ri-animare
            el.style.transition = 'none';
            el.setAttribute('style', item.reset);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    items.forEach((it) => io.observe(it.el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Aspetta un tick per dare tempo al bundle Next.js di idratare
    setTimeout(init, 50);
  }
})();
