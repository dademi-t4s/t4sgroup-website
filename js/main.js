        window.addEventListener('scroll', () => {
            document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                const t = document.querySelector(a.getAttribute('href'));
                if (t) window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' });
            });
        });
        document.getElementById('footer-copy').textContent = `© ${new Date().getFullYear()} T4S Group Sagl. Tutti i diritti riservati.`;


        // Before/After Animation
        (function() {
            const card = document.getElementById('ba-card');
            const rows = document.getElementById('ba-rows');
            const badge = document.getElementById('ba-badge');
            const label = document.getElementById('ba-label');
            const bar = document.getElementById('ba-bar');
            if (!card || !rows) return;

            const xIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
            const checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';

            const beforeItems = [
                'Excel sparsi ovunque',
                'Lead persi o non assegnati',
                'Zero visibilità sulla pipeline',
                'Follow-up dimenticati'
            ];

            const afterItems = [
                'Pipeline strutturata e visibile',
                'Follow-up automatici',
                'Dashboard KPI in tempo reale',
                'Team formato e autonomo'
            ];

            const SHOW_DURATION = 3000;
            const STAGGER = 120;

            function createRow(text, type) {
                const row = document.createElement('div');
                row.className = 'ba-row ' + type + '-row';
                row.innerHTML = `
                    <div class="ba-row-icon">${type === 'before' ? xIcon : checkIcon}</div>
                    <span class="ba-row-text">${text}</span>
                `;
                return row;
            }

            function showRows(items, type) {
                rows.innerHTML = '';
                const rowEls = items.map(text => {
                    const el = createRow(text, type);
                    rows.appendChild(el);
                    return el;
                });
                rowEls.forEach((el, i) => {
                    setTimeout(() => el.classList.add('visible'), 50 + i * STAGGER);
                });
                return rowEls;
            }

            function exitRows(rowEls) {
                return new Promise(resolve => {
                    rowEls.forEach((el, i) => {
                        setTimeout(() => el.classList.replace('visible', 'exit'), i * 80);
                    });
                    setTimeout(resolve, rowEls.length * 80 + 300);
                });
            }

            function setBefore() {
                badge.className = 'ba-badge before';
                badge.querySelector('svg').outerHTML = xIcon;
                label.textContent = 'PRIMA';
                card.classList.remove('state-after');
                card.classList.add('shaking');
                setTimeout(() => card.classList.remove('shaking'), 400);
                bar.className = 'ba-progress-bar before';
                bar.style.transition = 'none';
                bar.style.width = '0%';
                requestAnimationFrame(() => {
                    bar.style.transition = `width ${SHOW_DURATION}ms linear`;
                    bar.style.width = '100%';
                });
                return showRows(beforeItems, 'before');
            }

            function setAfter() {
                badge.className = 'ba-badge after';
                badge.querySelector('svg').outerHTML = checkIcon;
                label.textContent = 'DOPO';
                card.classList.add('state-after');
                bar.className = 'ba-progress-bar after';
                bar.style.transition = 'none';
                bar.style.width = '0%';
                requestAnimationFrame(() => {
                    bar.style.transition = `width ${SHOW_DURATION}ms linear`;
                    bar.style.width = '100%';
                });
                return showRows(afterItems, 'after');
            }

            async function loop() {
                while (true) {
                    const beforeRows = setBefore();
                    await new Promise(r => setTimeout(r, SHOW_DURATION));
                    await exitRows(beforeRows);

                    const afterRows = setAfter();
                    await new Promise(r => setTimeout(r, SHOW_DURATION));
                    await exitRows(afterRows);
                }
            }

            loop();
        })();

        // T4S Brand animation
        (function() {
            const wordEl = document.getElementById('brand-word');
            const dimEl = document.querySelector('.brand-dim');
            if (!wordEl || !dimEl) return;

            const combos = [
                { t: 'ech',        s: 'wiss' },
                { t: 'rust',       s: 'ervice' },
                { t: 'eam',        s: 'alesforce' },
                { t: 'ransform',   s: 'uccess' },
                { t: 'ools',       s: 'olutions' },
            ];

            let idx = 0;
            const typeSpeed = 65;
            const deleteSpeed = 40;
            const pause = 2500;

            async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

            async function deleteWord(el) {
                const text = el.textContent;
                for (let i = text.length; i >= 0; i--) {
                    el.textContent = text.substring(0, i);
                    await sleep(deleteSpeed);
                }
            }

            async function typeWord(el, text) {
                for (let i = 0; i <= text.length; i++) {
                    el.textContent = text.substring(0, i);
                    await sleep(typeSpeed);
                }
            }

            async function loop() {
                while (true) {
                    await sleep(pause);
                    await Promise.all([deleteWord(dimEl), deleteWord(wordEl)]);
                    idx = (idx + 1) % combos.length;
                    await sleep(300);
                    await Promise.all([typeWord(dimEl, combos[idx].t), typeWord(wordEl, combos[idx].s)]);
                }
            }

            setTimeout(loop, 2000);
        })();
