        // =====================================================
        // i18n – Internationalization
        // =====================================================
        (function() {
            const T = {
                it: {
                    'nav.home': 'Home',
                    'nav.method': 'Il Metodo',
                    'nav.services': 'Servizi',
                    'nav.about': 'Chi Siamo',
                    'nav.contact': 'Contattaci',
                    'hero.badge': 'Consulenti Salesforce Certificati in Svizzera',
                    'hero.title': 'Il tuo CRM, <span class="highlight">fatto bene.</span>',
                    'hero.desc': 'Non siamo solo consulenti tecnici, siamo partner di business. Ti aiutiamo a ottenere risultati concreti dall\'implementazione di Salesforce.',
                    'hero.cta1': 'Contattaci',
                    'hero.cta2': 'Scopri i servizi',
                    'hero.trust1': 'Progetti',
                    'hero.trust2': 'Rinnovano',
                    'hero.trust3': 'Esperienza',
                    'pillars.tag': 'Il nostro metodo',
                    'pillars.title': 'Configura. Integra. Cresci.',
                    'pillars.subtitle': 'Tre fasi, un unico obiettivo: farti vendere di più con meno sforzo.',
                    'pillars.p1.title': 'Configura',
                    'pillars.p1.text': 'Creiamo il tuo Salesforce su misura. Pipeline, campi, automazioni: tutto pronto in 4-8 settimane. Voi pensate al cosa, noi al come.',
                    'pillars.p2.title': 'Integra',
                    'pillars.p2.text': 'Colleghiamo Salesforce a ERP, e-commerce e contabilità. I dati viaggiano da soli, un unico sistema, tutto connesso.',
                    'pillars.p3.title': 'Cresci',
                    'pillars.p3.text': 'Formiamo il team e ti affianchiamo nel tempo. Dashboard per decidere, automazioni per risparmiare ore, supporto continuo.',
                    'services.tag': 'Servizi su misura',
                    'services.title': 'Una soluzione per ogni esigenza',
                    'services.subtitle': 'Dalla configurazione al go-live, pensiamo a tutto noi.',
                    'services.s1.title': 'Implementazioni CRM complete',
                    'services.s1.text': 'Configuriamo Salesforce in modo personalizzato per le tue esigenze. Importazione dati, pipeline, automazioni, formazione del team. Il tuo CRM operativo al 100%.',
                    'services.s2.title': 'Integrazioni tecniche complete',
                    'services.s2.text': 'Progettiamo l\'architettura dati e integriamo Salesforce con i sistemi aziendali esistenti. API, automazioni, flussi: tutto connesso.',
                    'services.s3.title': 'Time & Material',
                    'services.s3.text': 'Ti serve supporto specialistico? Mettiamo a disposizione i nostri consulenti certificati in modalità Time & Material. Paghi solo le ore che usi, senza vincoli. Ideale per progetti in corso o competenze che mancano nel tuo team.',
                    'services.s4.title': 'AI & Automazione Intelligente',
                    'services.s4.text': 'Integriamo modelli AI e LLM nei tuoi processi aziendali. Agenti autonomi che qualificano lead, rispondono ai clienti e generano report. Da Agentforce a soluzioni custom: scegliamo la tecnologia giusta per il tuo caso, non il contrario.',
                    'services.sm1.title': 'Dashboard & Report',
                    'services.sm1.text': 'Report automatici e dashboard in tempo reale per decidere meglio.',
                    'services.sm2.title': 'Automazioni',
                    'services.sm2.text': 'Follow-up, lead assignment, reminder: tutto parte in automatico.',
                    'services.sm3.title': 'Portali Clienti',
                    'services.sm3.text': 'Ticket, fatture, prenotazioni: i tuoi clienti fanno da soli.',
                    'services.sm4.title': 'Migrazione Dati',
                    'services.sm4.text': 'Da Excel o vecchi CRM a Salesforce senza perdere uno storico.',
                    'certs.label': 'Certificazioni',
                    'about.tag': 'Chi Siamo',
                    'about.title': 'Il team che semplifica il tuo Salesforce',
                    'about.text1': 'Non siamo solo consulenti tecnici, siamo partner di business. Configuriamo, personalizziamo e integriamo Salesforce per aziende dai 5 ai 100 utenti.',
                    'about.text2': 'Un referente dedicato, tempi di risposta rapidi e la garanzia che ogni franco investito generi valore misurabile. Parliamo la tua lingua: niente gergo tecnico.',
                    'about.card.title': 'Paghi solo quello che usi',
                    'about.card.text': 'Progetti modulari, nessun vincolo annuale. Lavoriamo a obiettivi, non a ore.',
                    'cta.title': 'Prenota la tua consulenza',
                    'cta.text': 'Raccontaci cosa non funziona, ti proponiamo la soluzione. Scegli il canale che preferisci.',
                    'cta.btn': 'Contattaci ora',
                    'contact.email': 'Scrivici un\'email',
                    'contact.wa': 'Scrivici su WhatsApp',
                    'contact.phone': 'Chiamaci',
                    'contact.emailHint': 'Rispondiamo entro 24 ore',
                    'contact.waHint': 'Risposta immediata',
                    'contact.phoneHint': 'Lun-Ven, 9:00-18:00',
                    'footer.tagline': 'Consulenti Salesforce per PMI. Configurazione, integrazione, formazione.',
                    'footer.automation': 'Automazione',
                    'footer.integrations': 'Integrazioni',
                    'footer.reporting': 'Dashboard',
                    'footer.copyright': '© {year} T4S Group Sagl. Tutti i diritti riservati.'
                },
                en: {
                    'nav.home': 'Home',
                    'nav.method': 'Our Method',
                    'nav.services': 'Services',
                    'nav.about': 'About Us',
                    'nav.contact': 'Contact',
                    'hero.badge': 'Certified Salesforce Consultants in Switzerland',
                    'hero.title': 'Your CRM, <span class="highlight">done right.</span>',
                    'hero.desc': 'We\'re not just technical consultants — we\'re business partners. We help you get real results from your Salesforce implementation.',
                    'hero.cta1': 'Get in touch',
                    'hero.cta2': 'Explore services',
                    'hero.trust1': 'Projects',
                    'hero.trust2': 'Renew',
                    'hero.trust3': 'Experience',
                    'pillars.tag': 'Our method',
                    'pillars.title': 'Configure. Integrate. Grow.',
                    'pillars.subtitle': 'Three phases, one goal: help you sell more with less effort.',
                    'pillars.p1.title': 'Configure',
                    'pillars.p1.text': 'We build your Salesforce from scratch. Pipelines, fields, automations — ready in 4-8 weeks. You focus on the what, we handle the how.',
                    'pillars.p2.title': 'Integrate',
                    'pillars.p2.text': 'We connect Salesforce to your ERP, e-commerce and accounting. Data flows on its own — one system, fully connected.',
                    'pillars.p3.title': 'Grow',
                    'pillars.p3.text': 'We train your team and stay by your side. Dashboards for decisions, automations to save hours, ongoing support.',
                    'services.tag': 'Tailored services',
                    'services.title': 'A solution for every need',
                    'services.subtitle': 'From setup to go-live, we handle everything.',
                    'services.s1.title': 'Full CRM implementations',
                    'services.s1.text': 'We configure Salesforce to fit your needs. Data import, pipelines, automations, team training. Your CRM fully operational.',
                    'services.s2.title': 'Complete technical integrations',
                    'services.s2.text': 'We design your data architecture and integrate Salesforce with your existing systems. APIs, automations, flows — all connected.',
                    'services.s3.title': 'Time & Material',
                    'services.s3.text': 'Need specialist support? We provide certified consultants on a Time & Material basis. Pay only for the hours you use, no strings attached. Ideal for ongoing projects or skills gaps in your team.',
                    'services.s4.title': 'AI & Intelligent Automation',
                    'services.s4.text': 'We integrate AI models and LLMs into your business processes. Autonomous agents that qualify leads, respond to clients and generate reports. From Agentforce to custom solutions — we choose the right tech for your case, not the other way around.',
                    'services.sm1.title': 'Dashboards & Reports',
                    'services.sm1.text': 'Automated reports and real-time dashboards for better decisions.',
                    'services.sm2.title': 'Automations',
                    'services.sm2.text': 'Follow-ups, lead assignment, reminders — everything runs on autopilot.',
                    'services.sm3.title': 'Customer Portals',
                    'services.sm3.text': 'Tickets, invoices, bookings: your clients self-serve.',
                    'services.sm4.title': 'Data Migration',
                    'services.sm4.text': 'From Excel or legacy CRMs to Salesforce without losing any history.',
                    'certs.label': 'Certifications',
                    'about.tag': 'About Us',
                    'about.title': 'The team that simplifies your Salesforce',
                    'about.text1': 'We\'re not just technical consultants — we\'re business partners. We configure, customize and integrate Salesforce for companies with 5 to 100 users.',
                    'about.text2': 'A dedicated contact, fast response times and the guarantee that every franc invested generates measurable value. We speak your language — no jargon.',
                    'about.card.title': 'Pay only for what you use',
                    'about.card.text': 'Modular projects, no annual lock-in. We work towards goals, not hours.',
                    'cta.title': 'Book your consultation',
                    'cta.text': 'Tell us what\'s not working — we\'ll propose the solution. Choose the channel you prefer.',
                    'cta.btn': 'Contact us now',
                    'contact.email': 'Send us an email',
                    'contact.wa': 'Message us on WhatsApp',
                    'contact.phone': 'Call us',
                    'contact.emailHint': 'We reply within 24 hours',
                    'contact.waHint': 'Instant reply',
                    'contact.phoneHint': 'Mon-Fri, 9:00-18:00',
                    'footer.tagline': 'Salesforce consultants for SMEs. Setup, integration, training.',
                    'footer.automation': 'Automation',
                    'footer.integrations': 'Integrations',
                    'footer.reporting': 'Dashboards',
                    'footer.copyright': '© {year} T4S Group Sagl. All rights reserved.'
                },
                de: {
                    'nav.home': 'Home',
                    'nav.method': 'Methode',
                    'nav.services': 'Leistungen',
                    'nav.about': 'Über uns',
                    'nav.contact': 'Kontakt',
                    'hero.badge': 'Zertifizierte Salesforce-Berater in der Schweiz',
                    'hero.title': 'Ihr CRM, <span class="highlight">richtig gemacht.</span>',
                    'hero.desc': 'Wir sind nicht nur technische Berater — wir sind Geschäftspartner. Wir helfen Ihnen, konkrete Ergebnisse aus Ihrer Salesforce-Implementierung zu erzielen.',
                    'hero.cta1': 'Kontaktieren Sie uns',
                    'hero.cta2': 'Leistungen entdecken',
                    'hero.trust1': 'Projekte',
                    'hero.trust2': 'Verlängern',
                    'hero.trust3': 'Erfahrung',
                    'pillars.tag': 'Unsere Methode',
                    'pillars.title': 'Konfigurieren. Integrieren. Wachsen.',
                    'pillars.subtitle': 'Drei Phasen, ein Ziel: mehr verkaufen mit weniger Aufwand.',
                    'pillars.p1.title': 'Konfigurieren',
                    'pillars.p1.text': 'Wir bauen Ihr Salesforce massgeschneidert auf. Pipelines, Felder, Automatisierungen — in 4-8 Wochen einsatzbereit. Sie denken ans Was, wir ans Wie.',
                    'pillars.p2.title': 'Integrieren',
                    'pillars.p2.text': 'Wir verbinden Salesforce mit ERP, E-Commerce und Buchhaltung. Die Daten fliessen von selbst — ein System, alles verbunden.',
                    'pillars.p3.title': 'Wachsen',
                    'pillars.p3.text': 'Wir schulen Ihr Team und begleiten Sie langfristig. Dashboards für Entscheidungen, Automatisierungen zum Zeitsparen, laufender Support.',
                    'services.tag': 'Massgeschneiderte Leistungen',
                    'services.title': 'Eine Lösung für jeden Bedarf',
                    'services.subtitle': 'Von der Einrichtung bis zum Go-live — wir übernehmen alles.',
                    'services.s1.title': 'Komplette CRM-Implementierungen',
                    'services.s1.text': 'Wir konfigurieren Salesforce individuell für Ihre Anforderungen. Datenimport, Pipelines, Automatisierungen, Teamschulung. Ihr CRM zu 100% einsatzbereit.',
                    'services.s2.title': 'Komplette technische Integrationen',
                    'services.s2.text': 'Wir entwerfen Ihre Datenarchitektur und integrieren Salesforce mit Ihren bestehenden Systemen. APIs, Automatisierungen, Flows — alles verbunden.',
                    'services.s3.title': 'Time & Material',
                    'services.s3.text': 'Brauchen Sie Spezialisten-Support? Wir stellen unsere zertifizierten Berater auf Time & Material-Basis zur Verfügung. Sie zahlen nur die genutzten Stunden, ohne Bindung. Ideal für laufende Projekte oder fehlende Kompetenzen in Ihrem Team.',
                    'services.s4.title': 'AI & Intelligente Automatisierung',
                    'services.s4.text': 'Wir integrieren KI-Modelle und LLMs in Ihre Geschäftsprozesse. Autonome Agenten, die Leads qualifizieren, Kunden betreuen und Reports erstellen. Von Agentforce bis Custom-Lösungen — wir wählen die richtige Technologie für Ihren Fall.',
                    'services.sm1.title': 'Dashboards & Berichte',
                    'services.sm1.text': 'Automatische Reports und Echtzeit-Dashboards für bessere Entscheidungen.',
                    'services.sm2.title': 'Automatisierungen',
                    'services.sm2.text': 'Follow-ups, Lead-Zuweisung, Erinnerungen — alles läuft automatisch.',
                    'services.sm3.title': 'Kundenportale',
                    'services.sm3.text': 'Tickets, Rechnungen, Buchungen: Ihre Kunden helfen sich selbst.',
                    'services.sm4.title': 'Datenmigration',
                    'services.sm4.text': 'Von Excel oder alten CRMs zu Salesforce, ohne eine Historie zu verlieren.',
                    'certs.label': 'Zertifizierungen',
                    'about.tag': 'Über uns',
                    'about.title': 'Das Team, das Ihr Salesforce vereinfacht',
                    'about.text1': 'Wir sind nicht nur technische Berater — wir sind Geschäftspartner. Wir konfigurieren, passen an und integrieren Salesforce für Unternehmen mit 5 bis 100 Nutzern.',
                    'about.text2': 'Ein fester Ansprechpartner, schnelle Reaktionszeiten und die Garantie, dass jeder investierte Franken messbaren Mehrwert schafft. Wir sprechen Ihre Sprache — kein Fachchinesisch.',
                    'about.card.title': 'Zahlen Sie nur, was Sie nutzen',
                    'about.card.text': 'Modulare Projekte, keine Jahresbindung. Wir arbeiten auf Ziele hin, nicht auf Stunden.',
                    'cta.title': 'Beratung buchen',
                    'cta.text': 'Erzählen Sie uns, was nicht funktioniert — wir schlagen die Lösung vor. Wählen Sie Ihren bevorzugten Kanal.',
                    'cta.btn': 'Jetzt kontaktieren',
                    'contact.email': 'Schreiben Sie uns eine E-Mail',
                    'contact.wa': 'Schreiben Sie uns auf WhatsApp',
                    'contact.phone': 'Rufen Sie uns an',
                    'contact.emailHint': 'Wir antworten innerhalb 24 Stunden',
                    'contact.waHint': 'Sofortige Antwort',
                    'contact.phoneHint': 'Mo-Fr, 9:00-18:00',
                    'footer.tagline': 'Salesforce-Berater für KMU. Einrichtung, Integration, Schulung.',
                    'footer.automation': 'Automatisierung',
                    'footer.integrations': 'Integrationen',
                    'footer.reporting': 'Dashboards',
                    'footer.copyright': '© {year} T4S Group Sagl. Alle Rechte vorbehalten.'
                },
                fr: {
                    'nav.home': 'Accueil',
                    'nav.method': 'Méthode',
                    'nav.services': 'Services',
                    'nav.about': 'À propos',
                    'nav.contact': 'Contactez-nous',
                    'hero.badge': 'Consultants Salesforce certifiés en Suisse',
                    'hero.title': 'Votre CRM, <span class="highlight">bien fait.</span>',
                    'hero.desc': 'Nous ne sommes pas de simples consultants techniques — nous sommes des partenaires business. Nous vous aidons à obtenir des résultats concrets de votre implémentation Salesforce.',
                    'hero.cta1': 'Contactez-nous',
                    'hero.cta2': 'Découvrir nos services',
                    'hero.trust1': 'Projets',
                    'hero.trust2': 'Renouvellent',
                    'hero.trust3': 'Expérience',
                    'pillars.tag': 'Notre méthode',
                    'pillars.title': 'Configurer. Intégrer. Croître.',
                    'pillars.subtitle': 'Trois phases, un seul objectif : vendre plus avec moins d\'effort.',
                    'pillars.p1.title': 'Configurer',
                    'pillars.p1.text': 'Nous créons votre Salesforce sur mesure. Pipelines, champs, automatisations — prêt en 4 à 8 semaines. Vous pensez au quoi, nous au comment.',
                    'pillars.p2.title': 'Intégrer',
                    'pillars.p2.text': 'Nous connectons Salesforce à votre ERP, e-commerce et comptabilité. Les données circulent automatiquement — un seul système, tout connecté.',
                    'pillars.p3.title': 'Croître',
                    'pillars.p3.text': 'Nous formons votre équipe et vous accompagnons dans la durée. Tableaux de bord pour décider, automatisations pour gagner du temps, support continu.',
                    'services.tag': 'Services sur mesure',
                    'services.title': 'Une solution pour chaque besoin',
                    'services.subtitle': 'De la configuration au go-live, nous gérons tout.',
                    'services.s1.title': 'Implémentations CRM complètes',
                    'services.s1.text': 'Nous configurons Salesforce de manière personnalisée selon vos besoins. Import de données, pipelines, automatisations, formation d\'équipe. Votre CRM opérationnel à 100%.',
                    'services.s2.title': 'Intégrations techniques complètes',
                    'services.s2.text': 'Nous concevons l\'architecture de données et intégrons Salesforce à vos systèmes existants. APIs, automatisations, flux — tout connecté.',
                    'services.s3.title': 'Time & Material',
                    'services.s3.text': 'Besoin d\'un support spécialisé ? Nous mettons à disposition nos consultants certifiés en mode Time & Material. Vous payez uniquement les heures utilisées, sans engagement. Idéal pour les projets en cours ou les compétences manquantes.',
                    'services.s4.title': 'IA & Automatisation Intelligente',
                    'services.s4.text': 'Nous intégrons des modèles IA et LLM dans vos processus métier. Agents autonomes qui qualifient les leads, répondent aux clients et génèrent des rapports. D\'Agentforce aux solutions custom — nous choisissons la bonne technologie.',
                    'services.sm1.title': 'Tableaux de bord & Rapports',
                    'services.sm1.text': 'Rapports automatiques et tableaux de bord en temps réel pour mieux décider.',
                    'services.sm2.title': 'Automatisations',
                    'services.sm2.text': 'Follow-up, attribution de leads, rappels — tout se déclenche automatiquement.',
                    'services.sm3.title': 'Portails Clients',
                    'services.sm3.text': 'Tickets, factures, réservations : vos clients se débrouillent seuls.',
                    'services.sm4.title': 'Migration de données',
                    'services.sm4.text': 'D\'Excel ou d\'anciens CRM vers Salesforce, sans perdre un seul historique.',
                    'certs.label': 'Certifications',
                    'about.tag': 'À propos',
                    'about.title': 'L\'équipe qui simplifie votre Salesforce',
                    'about.text1': 'Nous ne sommes pas de simples consultants techniques — nous sommes des partenaires business. Nous configurons, personnalisons et intégrons Salesforce pour les entreprises de 5 à 100 utilisateurs.',
                    'about.text2': 'Un interlocuteur dédié, des temps de réponse rapides et la garantie que chaque franc investi génère une valeur mesurable. Nous parlons votre langue — pas de jargon technique.',
                    'about.card.title': 'Payez uniquement ce que vous utilisez',
                    'about.card.text': 'Projets modulaires, aucun engagement annuel. Nous travaillons par objectifs, pas à l\'heure.',
                    'cta.title': 'Réservez votre consultation',
                    'cta.text': 'Dites-nous ce qui ne fonctionne pas, nous proposons la solution. Choisissez votre canal préféré.',
                    'cta.btn': 'Contactez-nous maintenant',
                    'contact.email': 'Écrivez-nous un email',
                    'contact.wa': 'Écrivez-nous sur WhatsApp',
                    'contact.phone': 'Appelez-nous',
                    'contact.emailHint': 'Réponse sous 24 heures',
                    'contact.waHint': 'Réponse immédiate',
                    'contact.phoneHint': 'Lun-Ven, 9h00-18h00',
                    'footer.tagline': 'Consultants Salesforce pour PME. Configuration, intégration, formation.',
                    'footer.automation': 'Automatisation',
                    'footer.integrations': 'Intégrations',
                    'footer.reporting': 'Tableaux de bord',
                    'footer.copyright': '© {year} T4S Group Sagl. Tous droits réservés.'
                }
            };

            const langNames = { it: 'IT', en: 'EN', de: 'DE', fr: 'FR' };
            let curLang = localStorage.getItem('t4s-lang') || 'it';

            function applyLang(lang) {
                curLang = lang;
                const dict = T[lang] || T.it;

                document.querySelectorAll('[data-t]').forEach(el => {
                    const key = el.getAttribute('data-t');
                    if (dict[key] != null) el.textContent = dict[key];
                });

                document.querySelectorAll('[data-t-html]').forEach(el => {
                    const key = el.getAttribute('data-t-html');
                    if (dict[key] != null) el.innerHTML = dict[key];
                });

                document.documentElement.lang = lang;

                const footerCopy = document.getElementById('footer-copy');
                if (footerCopy) {
                    footerCopy.textContent = (dict['footer.copyright'] || '').replace('{year}', new Date().getFullYear());
                }
            }

            // Language selector
            const langBtn = document.getElementById('langBtn');
            const langDrop = document.getElementById('langDrop');

            if (langBtn && langDrop) {
                langBtn.addEventListener('click', e => {
                    e.stopPropagation();
                    langDrop.classList.toggle('open');
                });

                document.addEventListener('click', () => langDrop.classList.remove('open'));

                langDrop.querySelectorAll('.lang-opt').forEach(opt => {
                    opt.addEventListener('click', () => {
                        const lang = opt.dataset.lang;
                        curLang = lang;
                        localStorage.setItem('t4s-lang', lang);
                        langBtn.textContent = langNames[lang];
                        langDrop.querySelectorAll('.lang-opt').forEach(o => o.classList.remove('active'));
                        opt.classList.add('active');
                        langDrop.classList.remove('open');
                        applyLang(lang);
                    });
                });
            }

            // Apply saved language on load
            if (curLang !== 'it') {
                langBtn.textContent = langNames[curLang];
                langDrop.querySelectorAll('.lang-opt').forEach(o => {
                    o.classList.toggle('active', o.dataset.lang === curLang);
                });
                applyLang(curLang);
            }
        })();
