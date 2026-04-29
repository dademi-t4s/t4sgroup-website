// Re-animate cards / titles every time they enter the viewport.
// Il bundle Next.js (framer-motion) anima questi elementi solo UNA volta
// (`once: true`). Questo script intercetta gli stessi elementi: salva il
// loro stato iniziale (opacity:0 + transform:translateY(...)/scale(...)),
// li osserva con IntersectionObserver e li ri-anima ad ogni entrata in
// viewport — incluso quando lo scroll torna su una sezione già vista.

(function () {
  const ENTER_TRANSITION =
    'opacity 0.7s ease-out, transform 0.7s ease-out';
  const RESET_BUFFER_VH = 0.15; // 15% di buffer prima del reset

  function init() {
    const candidates = Array.from(document.querySelectorAll('div[style]'));
    const items = [];

    candidates.forEach((el) => {
      const s = el.getAttribute('style') || '';
      if (/opacity\s*:\s*0/.test(s) && /translateY\(/.test(s)) {
        items.push({ el, initialStyle: s });
      }
    });

    if (items.length === 0) {
      // Framer-motion potrebbe aver già hidratato. Riprova fra poco.
      setTimeout(init, 150);
      return;
    }

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
            // Reset allo stato iniziale (no transition → snap istantaneo)
            el.style.transition = 'none';
            el.setAttribute('style', item.initialStyle);
          }
        });
      },
      { threshold: 0.12, rootMargin: `0px 0px -${RESET_BUFFER_VH * 100}% 0px` }
    );

    items.forEach((it) => io.observe(it.el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
