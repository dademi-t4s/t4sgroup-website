// Re-animate cards / headings every time they enter the viewport.
// Mantiene la stessa animazione che avevano (slide-up + fade) ma la
// ri-applica ad ogni entrata in viewport, non solo al primo refresh.

(function () {
  function injectCSS() {
    if (document.getElementById('cr-styles')) return;
    const style = document.createElement('style');
    style.id = 'cr-styles';
    // !important per vincere su qualsiasi inline style applicato dal
    // bundle Next.js / framer-motion.
    style.textContent = `
      [data-cr-hidden] {
        opacity: 0 !important;
        transform: translateY(60px) !important;
        transition: opacity 0.5s ease-out, transform 0.5s ease-out !important;
      }
      [data-cr-show] {
        opacity: 1 !important;
        transform: none !important;
        transition: opacity 0.7s ease-out, transform 0.7s ease-out !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Match elementi che hanno (avevano) animazione: hanno style inline con
  // opacity + transform. Esclude lo splash di caricamento (z-index 100).
  function findTargets() {
    const all = Array.from(
      document.querySelectorAll('div[style], h1[style], h2[style], form[style]')
    );
    return all.filter((el) => {
      const s = el.getAttribute('style') || '';
      if (!/opacity\s*:/i.test(s)) return false;
      if (!/transform\s*:/i.test(s)) return false;
      // Esclude splash + overlay
      if (/z-index/i.test(s)) return false;
      // Deve essere un wrapper con contenuto
      if (!el.firstElementChild && !el.textContent.trim()) return false;
      return true;
    });
  }

  const initialized = new WeakSet();

  function attach(el) {
    if (initialized.has(el)) return;
    initialized.add(el);

    // Stato iniziale: nascosto (sotto, opacity 0)
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
    findTargets().forEach(attach);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan);
  } else {
    scan();
  }

  // Re-scan periodicamente per i primi 10 secondi: cattura componenti
  // che il bundle Next.js idrata in ritardo.
  let n = 0;
  const t = setInterval(() => {
    scan();
    if (++n >= 20) clearInterval(t);
  }, 500);
})();
