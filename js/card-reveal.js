// Re-animate cards / headings every time they enter the viewport.
// Mantiene la stessa animazione che avevano (slide-up + fade staggered)
// ma la ri-applica ad ogni entrata in viewport, non solo al primo refresh.

(function () {
  const STAGGER_STEP = 0.09;  // 90ms tra una card e la successiva
  const STAGGER_MAX  = 0.8;   // max 800ms di delay totale
  const DURATION     = 0.7;   // 700ms slide+fade

  function injectCSS() {
    if (document.getElementById('cr-styles')) return;
    const style = document.createElement('style');
    style.id = 'cr-styles';
    style.textContent = `
      [data-cr-hidden] {
        opacity: 0 !important;
        transform: translateY(60px) !important;
        transition: none !important;
      }
      [data-cr-show] {
        opacity: 1 !important;
        transform: none !important;
        transition:
          opacity ${DURATION}s ease-out var(--cr-d, 0s),
          transform ${DURATION}s ease-out var(--cr-d, 0s) !important;
      }
    `;
    document.head.appendChild(style);
  }

  function findTargets() {
    const all = Array.from(
      document.querySelectorAll('div[style], h1[style], h2[style], form[style]')
    );
    return all.filter((el) => {
      const s = el.getAttribute('style') || '';
      if (!/opacity\s*:/i.test(s)) return false;
      if (!/transform\s*:/i.test(s)) return false;
      if (/z-index/i.test(s)) return false;
      if (!el.firstElementChild && !el.textContent.trim()) return false;
      return true;
    });
  }

  const initialized = new WeakSet();

  function attach(el, staggerIdx) {
    if (initialized.has(el)) return;
    initialized.add(el);

    const delay = Math.min(staggerIdx * STAGGER_STEP, STAGGER_MAX);
    el.style.setProperty('--cr-d', `${delay}s`);
    el.setAttribute('data-cr-hidden', '');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.removeAttribute('data-cr-hidden');
            el.setAttribute('data-cr-show', '');
          } else {
            el.removeAttribute('data-cr-show');
            el.setAttribute('data-cr-hidden', '');
          }
        });
      },
      { threshold: 0.05 }
    );
    io.observe(el);
  }

  function scan() {
    injectCSS();
    const targets = findTargets().filter((el) => !initialized.has(el));
    if (targets.length === 0) return;

    // Raggruppa per "container" (grandparent del wrapper animato).
    // Card di una stessa griglia/processo condividono il grandparent
    // → ricevono stagger sequenziale (0, 1, 2, …).
    const groups = new Map();
    targets.forEach((el) => {
      const key = el.parentElement?.parentElement || el.parentElement || document.body;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(el);
    });

    groups.forEach((arr) => {
      // Sort per ordine DOM
      arr.sort((a, b) =>
        (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1
      );
      arr.forEach((el, idx) => attach(el, idx));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan);
  } else {
    scan();
  }

  // Re-scan periodicamente per i primi 10s (cattura idratazioni tardive)
  let n = 0;
  const t = setInterval(() => {
    scan();
    if (++n >= 20) clearInterval(t);
  }, 500);
})();
