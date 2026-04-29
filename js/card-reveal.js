// Re-animate cards / headings every time they enter the viewport.
// v3: usa data-attributes + CSS !important per vincere su qualsiasi
// inline style che il bundle Next.js (framer-motion) potrebbe applicare.

(function () {
  // Inietta stylesheet con regole !important che sovrascrivono framer.
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
        transition: opacity 0.7s ease-out, transform 0.7s ease-out !important;
      }
    `;
    document.head.appendChild(style);
  }

  function findTargets() {
    // Match qualsiasi elemento con inline style che contenga sia
    // "opacity" che "transform" (catch sia stato iniziale opacity:0
    // sia post-framer opacity:1; transform:none).
    const all = Array.from(
      document.querySelectorAll('div[style], h1[style], h2[style]')
    );
    return all.filter((el) => {
      const s = el.getAttribute('style') || '';
      if (!/opacity\s*:/i.test(s)) return false;
      if (!/transform\s*:/i.test(s)) return false;
      // Esclude lo splash di caricamento e overlay z-index alti
      if (/z-index\s*:\s*\[?100\]?/i.test(s)) return false;
      // Deve avere contenuto figlio (esclude wrapper vuoti)
      if (el.children.length === 0 && !el.textContent.trim()) return false;
      return true;
    });
  }

  function applyObserver(el) {
    // Stato iniziale: nascosto
    el.removeAttribute('style'); // tolgo inline che framer ha lasciato
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
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(el);
  }

  let initialized = new WeakSet();
  function init() {
    injectCSS();
    const targets = findTargets();
    if (targets.length === 0) {
      setTimeout(init, 200);
      return;
    }
    targets.forEach((el) => {
      if (initialized.has(el)) return;
      initialized.add(el);
      applyObserver(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 100));
  } else {
    setTimeout(init, 100);
  }

  // Re-scan periodicamente per catturare elementi aggiunti tardivamente
  // dal bundle Next.js (es. componenti idratati dopo il primo init).
  let rescans = 0;
  const rescanTimer = setInterval(() => {
    init();
    if (++rescans >= 20) clearInterval(rescanTimer);
  }, 500);
})();
