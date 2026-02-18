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
            const floatTop = document.getElementById('ba-float-top');
            const floatTopText = document.getElementById('ba-float-top-text');
            const floatBottom = document.getElementById('ba-float-bottom');
            const floatBotTitle = document.getElementById('ba-float-bot-title');
            const floatBotSub = document.getElementById('ba-float-bot-sub');
            if (!card || !rows) return;

            const xIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
            const checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';

            const texts = {
                it: {
                    before: ['Excel sparsi ovunque', 'Lead persi o non assegnati', 'Zero visibilità sulla pipeline', 'Follow-up dimenticati'],
                    after: ['Pipeline strutturata e visibile', 'Follow-up automatici', 'Dashboard KPI in tempo reale', 'Team formato e autonomo'],
                    labelBefore: 'PRIMA', labelAfter: 'DOPO',
                    floatTopBefore: 'Senza CRM', floatTopAfter: 'Salesforce Ready',
                    floatTitle: 'T4S Group', floatSub: 'Il tuo partner CRM'
                },
                en: {
                    before: ['Spreadsheets everywhere', 'Lost or unassigned leads', 'No pipeline visibility', 'Forgotten follow-ups'],
                    after: ['Structured, visible pipeline', 'Automated follow-ups', 'Real-time KPI dashboards', 'Trained, autonomous team'],
                    labelBefore: 'BEFORE', labelAfter: 'AFTER',
                    floatTopBefore: 'No CRM', floatTopAfter: 'Salesforce Ready',
                    floatTitle: 'T4S Group', floatSub: 'Your CRM partner'
                },
                de: {
                    before: ['Excel-Dateien überall', 'Verlorene oder nicht zugewiesene Leads', 'Keine Pipeline-Übersicht', 'Vergessene Follow-ups'],
                    after: ['Strukturierte, sichtbare Pipeline', 'Automatische Follow-ups', 'Echtzeit-KPI-Dashboards', 'Geschultes, autonomes Team'],
                    labelBefore: 'VORHER', labelAfter: 'NACHHER',
                    floatTopBefore: 'Ohne CRM', floatTopAfter: 'Salesforce Ready',
                    floatTitle: 'T4S Group', floatSub: 'Ihr CRM-Partner'
                },
                fr: {
                    before: ['Fichiers Excel partout', 'Leads perdus ou non assignés', 'Aucune visibilité pipeline', 'Follow-ups oubliés'],
                    after: ['Pipeline structurée et visible', 'Follow-ups automatiques', 'Tableaux de bord KPI en temps réel', 'Équipe formée et autonome'],
                    labelBefore: 'AVANT', labelAfter: 'APRÈS',
                    floatTopBefore: 'Sans CRM', floatTopAfter: 'Salesforce Ready',
                    floatTitle: 'T4S Group', floatSub: 'Votre partenaire CRM'
                }
            };

            function getLang() {
                return localStorage.getItem('t4s-lang') || 'it';
            }
            function t() { return texts[getLang()] || texts.it; }

            const SHOW_DURATION = 3000;
            const CHART_DURATION = 2200;
            const STAGGER = 120;

            function showChart() {
                return new Promise(resolve => {
                    const l = t();
                    rows.innerHTML = `
                        <div class="ba-chart" id="ba-chart">
                            <div class="ba-chart-label">Crescita con Salesforce</div>
                            <svg viewBox="0 0 300 120" preserveAspectRatio="none">
                                <g class="ba-chart-grid">
                                    <line x1="0" y1="30" x2="300" y2="30"/>
                                    <line x1="0" y1="60" x2="300" y2="60"/>
                                    <line x1="0" y1="90" x2="300" y2="90"/>
                                </g>
                                <path class="ba-chart-area area1" id="chart-area1" d=""/>
                                <path class="ba-chart-area area2" id="chart-area2" d=""/>
                                <path class="ba-chart-line line1" id="chart-line1" d=""/>
                                <path class="ba-chart-line line2" id="chart-line2" d=""/>
                                <circle class="ba-chart-dot dot1" id="chart-dot1" cx="0" cy="0"/>
                                <circle class="ba-chart-dot dot2" id="chart-dot2" cx="0" cy="0"/>
                            </svg>
                            <div class="ba-chart-legend">
                                <div class="ba-chart-legend-item"><div class="ba-chart-legend-dot l1"></div>Leads</div>
                                <div class="ba-chart-legend-item"><div class="ba-chart-legend-dot l2"></div>Revenue</div>
                            </div>
                        </div>
                    `;

                    const chart = document.getElementById('ba-chart');
                    const line1 = document.getElementById('chart-line1');
                    const line2 = document.getElementById('chart-line2');
                    const area1 = document.getElementById('chart-area1');
                    const area2 = document.getElementById('chart-area2');
                    const dot1 = document.getElementById('chart-dot1');
                    const dot2 = document.getElementById('chart-dot2');

                    const pts1 = [[0,85],[40,70],[80,80],[120,55],[160,60],[200,35],[240,25],[280,18],[300,15]];
                    const pts2 = [[0,95],[40,90],[80,85],[120,75],[160,50],[200,55],[240,38],[280,30],[300,22]];

                    requestAnimationFrame(() => chart.classList.add('visible'));

                    let step = 0;
                    const totalSteps = pts1.length;
                    const stepTime = CHART_DURATION / totalSteps;

                    function drawStep() {
                        if (step >= totalSteps) {
                            dot1.classList.add('visible');
                            dot2.classList.add('visible');
                            setTimeout(() => {
                                chart.classList.remove('visible');
                                setTimeout(resolve, 400);
                            }, 600);
                            return;
                        }

                        const slice1 = pts1.slice(0, step + 1);
                        const slice2 = pts2.slice(0, step + 1);

                        const d1 = 'M' + slice1.map(p => p.join(',')).join(' L');
                        const d2 = 'M' + slice2.map(p => p.join(',')).join(' L');

                        line1.setAttribute('d', d1);
                        line2.setAttribute('d', d2);

                        const lastPt1 = slice1[slice1.length - 1];
                        const lastPt2 = slice2[slice2.length - 1];
                        area1.setAttribute('d', d1 + ` L${lastPt1[0]},120 L0,120 Z`);
                        area2.setAttribute('d', d2 + ` L${lastPt2[0]},120 L0,120 Z`);

                        dot1.setAttribute('cx', lastPt1[0]);
                        dot1.setAttribute('cy', lastPt1[1]);
                        dot2.setAttribute('cx', lastPt2[0]);
                        dot2.setAttribute('cy', lastPt2[1]);

                        if (step > 0) {
                            dot1.classList.add('visible');
                            dot2.classList.add('visible');
                        }

                        step++;
                        setTimeout(drawStep, stepTime);
                    }

                    setTimeout(drawStep, 300);
                });
            }

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
                const l = t();
                badge.className = 'ba-badge before';
                badge.querySelector('svg').outerHTML = xIcon;
                label.textContent = l.labelBefore;
                card.classList.remove('state-after');
                card.classList.add('shaking');
                setTimeout(() => card.classList.remove('shaking'), 400);
                floatTop.classList.remove('visible');
                floatTop.classList.add('state-before');
                floatBottom.classList.remove('visible');
                setTimeout(() => {
                    floatTopText.textContent = l.floatTopBefore;
                    floatTop.classList.add('visible');
                    floatBotTitle.textContent = l.floatTitle;
                    floatBotSub.textContent = l.floatSub;
                    floatBottom.classList.add('visible');
                }, 400);
                bar.className = 'ba-progress-bar before';
                bar.style.transition = 'none';
                bar.style.width = '0%';
                requestAnimationFrame(() => {
                    bar.style.transition = `width ${SHOW_DURATION}ms linear`;
                    bar.style.width = '100%';
                });
                return showRows(l.before, 'before');
            }

            function setAfter() {
                const l = t();
                badge.className = 'ba-badge after';
                badge.querySelector('svg').outerHTML = checkIcon;
                label.textContent = l.labelAfter;
                card.classList.add('state-after');
                floatTop.classList.remove('visible', 'state-before');
                floatBottom.classList.remove('visible');
                setTimeout(() => {
                    floatTopText.textContent = l.floatTopAfter;
                    floatTop.classList.add('visible');
                    floatBottom.classList.add('visible');
                }, 400);
                bar.className = 'ba-progress-bar after';
                bar.style.transition = 'none';
                bar.style.width = '0%';
                requestAnimationFrame(() => {
                    bar.style.transition = `width ${SHOW_DURATION}ms linear`;
                    bar.style.width = '100%';
                });
                return showRows(l.after, 'after');
            }

            async function loop() {
                while (true) {
                    const beforeRows = setBefore();
                    await new Promise(r => setTimeout(r, SHOW_DURATION));
                    await exitRows(beforeRows);

                    floatTop.classList.remove('visible');
                    floatBottom.classList.remove('visible');
                    await showChart();

                    const afterRows = setAfter();
                    await new Promise(r => setTimeout(r, SHOW_DURATION));
                    await exitRows(afterRows);

                    floatTop.classList.remove('visible');
                    floatBottom.classList.remove('visible');
                    await new Promise(r => setTimeout(r, 400));
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
