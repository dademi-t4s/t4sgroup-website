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


        // Animated Dashboard
        (function() {
            const screens = [
                {
                    title: 'CRM DASHBOARD', badge: 'Live', badgeColor: '#10B981',
                    mini: ['Automatizzato', '12 flow attivi'],
                    stats: [
                        { val: 'CHF 1.2<span class="accent">M</span>', lbl: 'Pipeline attiva', bar: 78 },
                        { val: '94<span class="accent">%</span>', lbl: 'Win rate', bar: 94 },
                        { val: '3.2<span class="accent">k</span>', lbl: 'Contatti gestiti', bar: 65 },
                        { val: '↓ 60<span class="accent">%</span>', lbl: 'Lavoro manuale', bar: 40 },
                    ]
                },
                {
                    title: 'SALES PIPELINE', badge: 'Q1 2026', badgeColor: '#29B6F6',
                    mini: ['Pipeline sana', '34 deal aperti'],
                    stats: [
                        { val: '47<span class="accent">%</span>', lbl: 'Conversion rate', bar: 47 },
                        { val: 'CHF 840<span class="accent">k</span>', lbl: 'Forecast Q1', bar: 84 },
                        { val: '12<span class="accent">gg</span>', lbl: 'Tempo medio chiusura', bar: 30 },
                        { val: '↑ 23<span class="accent">%</span>', lbl: 'vs trimestre prec.', bar: 73 },
                    ]
                },
                {
                    title: 'SERVICE METRICS', badge: 'Real-time', badgeColor: '#C8102E',
                    mini: ['SLA rispettati', '99.2% uptime'],
                    stats: [
                        { val: '< 2<span class="accent">h</span>', lbl: 'Tempo risposta medio', bar: 88 },
                        { val: '156', lbl: 'Ticket risolti / mese', bar: 72 },
                        { val: '4.8<span class="accent">/5</span>', lbl: 'CSAT score', bar: 96 },
                        { val: '↓ 35<span class="accent">%</span>', lbl: 'Ticket escalation', bar: 35 },
                    ]
                },
                {
                    title: 'MARKETING KPI', badge: 'Aggiornato', badgeColor: '#F59E0B',
                    mini: ['Campaign attive', '5 journey live'],
                    stats: [
                        { val: '28<span class="accent">%</span>', lbl: 'Open rate email', bar: 56 },
                        { val: '1.4<span class="accent">k</span>', lbl: 'Lead generati', bar: 62 },
                        { val: 'CHF 18', lbl: 'Costo per lead', bar: 25 },
                        { val: '↑ 41<span class="accent">%</span>', lbl: 'ROI campagne', bar: 82 },
                    ]
                }
            ];

            let current = 0;
            const stats = document.querySelectorAll('.float-stat');

            function showScreen(idx) {
                const s = screens[idx];
                document.getElementById('dash-title').textContent = s.title;
                document.getElementById('badge-text').textContent = s.badge;
                document.getElementById('dash-badge').style.background = s.badgeColor;
                document.getElementById('mini-title').textContent = s.mini[0];
                document.getElementById('mini-sub').textContent = s.mini[1];

                stats.forEach(el => el.classList.add('fade-out'));

                setTimeout(() => {
                    s.stats.forEach((st, i) => {
                        document.getElementById('val-' + i).innerHTML = st.val;
                        document.getElementById('lbl-' + i).textContent = st.lbl;
                        document.getElementById('bar-' + i).style.width = '0%';
                    });
                    stats.forEach(el => el.classList.remove('fade-out'));
                    setTimeout(() => {
                        s.stats.forEach((st, i) => {
                            document.getElementById('bar-' + i).style.width = st.bar + '%';
                        });
                    }, 100);
                }, 400);
            }

            showScreen(0);

            setInterval(() => {
                current = (current + 1) % screens.length;
                showScreen(current);
            }, 4000);
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
