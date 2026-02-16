/**
 * Internationalization (i18n) Module
 * Supports: Italian (it), English (en), Swiss German (de)
 */

const translations = {
    it: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'Chi Siamo',
        'nav.services': 'Servizi',
        'nav.products': 'Prodotti',
        'nav.contact': 'Contattaci',
        
        // Hero
        'hero.badge': '✦ Salesforce Partner Certificato',
        'hero.title1': 'CRM e automazione',
        'hero.title2': 'per PMI che vogliono crescere',
        'hero.subtitle': 'Implementiamo Salesforce, integriamo i tuoi sistemi e automatizziamo i processi. Meno lavoro manuale, più tempo per vendere.',
        'hero.cta1': 'Prenota una call gratuita',
        'hero.cta2': 'Scopri come lavoriamo',
        'hero.note': 'Nessun impegno • Risposta entro 24h',
        'hero.scroll': 'Scorri',
        
        // About
        'about.tag': 'Chi Siamo',
        'about.title': 'Il team che semplifica il tuo Salesforce',
        'about.text1': 'Configuriamo, personalizziamo e integriamo Salesforce per aziende dai 5 ai 100 utenti. Parliamo la tua lingua: niente gergo tecnico, solo soluzioni che funzionano.',
        'about.text2': 'Lavoriamo come estensione del tuo team. Un referente dedicato, tempi di risposta rapidi e la garanzia che ogni euro investito generi valore misurabile.',
        'about.stat1': 'Progetti Salesforce',
        'about.stat2': 'Clienti rinnovano',
        'about.stat3': 'Anni su Salesforce',
        'about.card.title': 'Paghi solo quello che usi',
        'about.card.text': 'Progetti modulari, nessun vincolo annuale',
        'about.cta.text': 'Vuoi capire se possiamo aiutarti?',
        'about.cta.button': 'Parliamone in 15 minuti',
        
        // Services
        'services.tag': 'Cosa Facciamo',
        'services.title': 'Dalla configurazione al go-live, pensiamo a tutto noi',
        'services.subtitle': 'Ogni servizio include formazione, supporto e documentazione',
        'services.s1.title': 'Implementazione CRM',
        'services.s1.text': 'Configuri Salesforce una volta, vendi meglio per sempre. Importiamo i tuoi dati, creiamo le pipeline e formiamo il team in 4-8 settimane.',
        'services.s2.title': 'Dashboard e Report',
        'services.s2.text': 'Vedi in tempo reale chi sta vendendo, cosa funziona e dove intervenire. Report automatici ogni lunedì nella tua inbox.',
        'services.s3.title': 'Integrazioni',
        'services.s3.text': 'Colleghiamo Salesforce al gestionale, all\'e-commerce, alla contabilità. I dati viaggiano da soli, tu smetti di copiarli a mano.',
        'services.s4.title': 'Portali Clienti',
        'services.s4.text': 'I tuoi clienti aprono ticket, scaricano fatture e prenotano appuntamenti da soli. Meno telefonate, più autonomia.',
        'services.s5.title': 'Automazioni',
        'services.s5.text': 'Email di follow-up, assegnazione lead, reminder scadenze: tutto parte in automatico. Il tuo team si concentra solo sulle attività ad alto valore.',
        'services.s6.title': 'Migrazione Dati',
        'services.s6.text': 'Passi da Excel, Access o un vecchio CRM? Migriamo tutto senza perdere uno storico. Garantito.',
        'services.cta.text': 'Non sai da dove iniziare? Ti guidiamo noi.',
        'services.cta.button': 'Richiedi una consulenza gratuita',
        'services.cta.note': 'Rispondiamo entro 24 ore',
        
        // Products
        'products.tag': 'Prodotti',
        'products.title': 'Software pronti per il tuo settore',
        'products.subtitle': 'Soluzioni già testate sul campo, attive in pochi giorni',
        'products.cliniksup.badge': 'Per Dentisti',
        'products.cliniksup.tagline': 'Gestisci lo studio, non le scartoffie',
        'products.cliniksup.description': 'Agenda, pazienti, preventivi e incassi in un\'unica schermata. Pensato da chi conosce il lavoro in studio.',
        'products.cliniksup.f1': 'Agenda drag & drop',
        'products.cliniksup.f2': 'Schede pazienti',
        'products.cliniksup.f5': 'Accesso da ovunque',
        'products.cliniksup.cta': 'Vedi come funziona',
        
        // Partners
        'partners.label': 'Certificazioni',
        
        // Contact
        'contact.tag': 'Iniziamo',
        'contact.title': 'Raccontaci cosa non funziona',
        'contact.text': 'Descrivi il problema, ti proponiamo la soluzione. Scegli il canale che preferisci.',
        'contact.location': 'Svizzera',
        'contact.email.title': 'Scrivici un\'email',
        'contact.email.hint': 'Rispondiamo entro 24 ore',
        'contact.wa.title': 'Scrivici su WhatsApp',
        'contact.wa.hint': 'Risposta immediata',
        'contact.phone.title': 'Chiamaci',
        'contact.phone.hint': 'Lun-Ven, 9:00-18:00',
        
        // Footer
        'footer.tagline': 'Salesforce Partner per PMI. Configurazione, integrazione, formazione.',
        'footer.automation': 'Automazione',
        'footer.copyright': '© {year} T4S. Tutti i diritti riservati.',
        'footer.vat': 'CHE-000.000.000 IVA'
    },
    
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.products': 'Products',
        'nav.contact': 'Contact',
        
        // Hero
        'hero.badge': '✦ Certified Salesforce Partner',
        'hero.title1': 'CRM and automation',
        'hero.title2': 'for SMEs ready to grow',
        'hero.subtitle': 'We implement Salesforce, integrate your systems and automate processes. Less manual work, more time to sell.',
        'hero.cta1': 'Book a free call',
        'hero.cta2': 'See how we work',
        'hero.note': 'No commitment • Reply within 24h',
        'hero.scroll': 'Scroll',
        
        // About
        'about.tag': 'About Us',
        'about.title': 'The team that simplifies your Salesforce',
        'about.text1': 'We configure, customize and integrate Salesforce for companies with 5 to 100 users. We speak your language: no tech jargon, just solutions that work.',
        'about.text2': 'We work as an extension of your team. A dedicated contact, fast response times and the guarantee that every euro invested generates measurable value.',
        'about.stat1': 'Salesforce projects',
        'about.stat2': 'Clients renew',
        'about.stat3': 'Years on Salesforce',
        'about.card.title': 'Pay only for what you use',
        'about.card.text': 'Modular projects, no annual lock-in',
        'about.cta.text': 'Want to find out if we can help?',
        'about.cta.button': 'Let\'s talk for 15 minutes',
        
        // Services
        'services.tag': 'What We Do',
        'services.title': 'From setup to go-live, we handle everything',
        'services.subtitle': 'Every service includes training, support and documentation',
        'services.s1.title': 'CRM Implementation',
        'services.s1.text': 'Set up Salesforce once, sell better forever. We import your data, build pipelines and train your team in 4-8 weeks.',
        'services.s2.title': 'Dashboards & Reports',
        'services.s2.text': 'See in real-time who\'s selling, what\'s working and where to act. Automated reports in your inbox every Monday.',
        'services.s3.title': 'Integrations',
        'services.s3.text': 'We connect Salesforce to your ERP, e-commerce and accounting. Data flows automatically, you stop copying it by hand.',
        'services.s4.title': 'Customer Portals',
        'services.s4.text': 'Your clients open tickets, download invoices and book appointments on their own. Fewer calls, more autonomy.',
        'services.s5.title': 'Automations',
        'services.s5.text': 'Follow-up emails, lead assignment, deadline reminders: everything runs automatically. Your team focuses only on high-value activities.',
        'services.s6.title': 'Data Migration',
        'services.s6.text': 'Moving from Excel, Access or an old CRM? We migrate everything without losing any history. Guaranteed.',
        'services.cta.text': 'Don\'t know where to start? We\'ll guide you.',
        'services.cta.button': 'Request a free consultation',
        'services.cta.note': 'We reply within 24 hours',
        
        // Products
        'products.tag': 'Products',
        'products.title': 'Software ready for your industry',
        'products.subtitle': 'Field-tested solutions, live in days',
        'products.cliniksup.badge': 'For Dentists',
        'products.cliniksup.tagline': 'Run your practice, not paperwork',
        'products.cliniksup.description': 'Calendar, patients, quotes and payments in one screen. Built by people who know how clinics work.',
        'products.cliniksup.f1': 'Drag & drop calendar',
        'products.cliniksup.f2': 'Patient records',
        'products.cliniksup.f5': 'Access from anywhere',
        'products.cliniksup.cta': 'See how it works',
        
        // Partners
        'partners.label': 'Certifications',
        
        // Contact
        'contact.tag': 'Get Started',
        'contact.title': 'Tell us what\'s not working',
        'contact.text': 'Describe the problem, we\'ll propose the solution. Choose the channel you prefer.',
        'contact.location': 'Switzerland',
        'contact.email.title': 'Send us an email',
        'contact.email.hint': 'We reply within 24 hours',
        'contact.wa.title': 'Message us on WhatsApp',
        'contact.wa.hint': 'Instant reply',
        'contact.phone.title': 'Call us',
        'contact.phone.hint': 'Mon-Fri, 9:00-18:00',
        
        // Footer
        'footer.tagline': 'Salesforce Partner for SMEs. Setup, integration, training.',
        'footer.automation': 'Automation',
        'footer.copyright': '© {year} T4S. All rights reserved.',
        'footer.vat': 'CHE-000.000.000 VAT'
    },
    
    de: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'Über uns',
        'nav.services': 'Leistungen',
        'nav.products': 'Produkte',
        'nav.contact': 'Kontakt',
        
        // Hero
        'hero.badge': '✦ Zertifizierter Salesforce Partner',
        'hero.title1': 'CRM und Automatisierung',
        'hero.title2': 'für wachstumsorientierte KMU',
        'hero.subtitle': 'Wir implementieren Salesforce, integrieren Ihre Systeme und automatisieren Prozesse. Weniger manuelle Arbeit, mehr Zeit zum Verkaufen.',
        'hero.cta1': 'Kostenloses Gespräch buchen',
        'hero.cta2': 'So arbeiten wir',
        'hero.note': 'Keine Verpflichtung • Antwort innerhalb 24h',
        'hero.scroll': 'Scrollen',
        
        // About
        'about.tag': 'Über uns',
        'about.title': 'Das Team, das Ihr Salesforce vereinfacht',
        'about.text1': 'Wir konfigurieren, passen an und integrieren Salesforce für Unternehmen mit 5 bis 100 Nutzern. Wir sprechen Ihre Sprache: kein Fachchinesisch, nur Lösungen, die funktionieren.',
        'about.text2': 'Wir arbeiten als Erweiterung Ihres Teams. Ein fester Ansprechpartner, schnelle Reaktionszeiten und die Garantie, dass jeder investierte Franken messbaren Mehrwert schafft.',
        'about.stat1': 'Salesforce-Projekte',
        'about.stat2': 'Kunden verlängern',
        'about.stat3': 'Jahre mit Salesforce',
        'about.card.title': 'Zahlen Sie nur, was Sie nutzen',
        'about.card.text': 'Modulare Projekte, keine Jahresbindung',
        'about.cta.text': 'Möchten Sie wissen, ob wir Ihnen helfen können?',
        'about.cta.button': 'Sprechen wir 15 Minuten',
        
        // Services
        'services.tag': 'Unsere Leistungen',
        'services.title': 'Von der Einrichtung bis zum Go-live – wir übernehmen alles',
        'services.subtitle': 'Jede Leistung inklusive Schulung, Support und Dokumentation',
        'services.s1.title': 'CRM-Implementierung',
        'services.s1.text': 'Salesforce einmal einrichten, für immer besser verkaufen. Wir importieren Ihre Daten, bauen Pipelines und schulen Ihr Team in 4-8 Wochen.',
        'services.s2.title': 'Dashboards & Berichte',
        'services.s2.text': 'Sehen Sie in Echtzeit, wer verkauft, was funktioniert und wo Sie handeln müssen. Automatische Reports jeden Montag in Ihrem Postfach.',
        'services.s3.title': 'Integrationen',
        'services.s3.text': 'Wir verbinden Salesforce mit ERP, E-Commerce und Buchhaltung. Die Daten fliessen automatisch, Sie hören auf, sie von Hand zu kopieren.',
        'services.s4.title': 'Kundenportale',
        'services.s4.text': 'Ihre Kunden eröffnen Tickets, laden Rechnungen herunter und buchen Termine selbst. Weniger Anrufe, mehr Autonomie.',
        'services.s5.title': 'Automatisierungen',
        'services.s5.text': 'Follow-up-E-Mails, Lead-Zuweisung, Fristenerinnerungen: alles läuft automatisch. Ihr Team konzentriert sich nur auf wertschöpfende Tätigkeiten.',
        'services.s6.title': 'Datenmigration',
        'services.s6.text': 'Wechsel von Excel, Access oder einem alten CRM? Wir migrieren alles, ohne eine einzige Historie zu verlieren. Garantiert.',
        'services.cta.text': 'Wissen Sie nicht, wo Sie anfangen sollen? Wir helfen Ihnen.',
        'services.cta.button': 'Kostenlose Beratung anfordern',
        'services.cta.note': 'Wir antworten innerhalb 24 Stunden',
        
        // Products
        'products.tag': 'Produkte',
        'products.title': 'Branchensoftware, sofort einsatzbereit',
        'products.subtitle': 'Praxiserprobte Lösungen, in wenigen Tagen live',
        'products.cliniksup.badge': 'Für Zahnärzte',
        'products.cliniksup.tagline': 'Führen Sie Ihre Praxis, nicht Papierkram',
        'products.cliniksup.description': 'Kalender, Patienten, Kostenvoranschläge und Zahlungen auf einem Bildschirm. Entwickelt von Leuten, die wissen, wie Praxen funktionieren.',
        'products.cliniksup.f1': 'Drag & Drop Kalender',
        'products.cliniksup.f2': 'Patientenakten',
        'products.cliniksup.f5': 'Zugriff von überall',
        'products.cliniksup.cta': 'So funktioniert es',
        
        // Partners
        'partners.label': 'Zertifizierungen',
        
        // Contact
        'contact.tag': 'Loslegen',
        'contact.title': 'Erzählen Sie uns, was nicht funktioniert',
        'contact.text': 'Beschreiben Sie das Problem, wir schlagen die Lösung vor. Wählen Sie Ihren bevorzugten Kanal.',
        'contact.location': 'Schweiz',
        'contact.email.title': 'Schreiben Sie uns eine E-Mail',
        'contact.email.hint': 'Wir antworten innerhalb 24 Stunden',
        'contact.wa.title': 'Schreiben Sie uns auf WhatsApp',
        'contact.wa.hint': 'Sofortige Antwort',
        'contact.phone.title': 'Rufen Sie uns an',
        'contact.phone.hint': 'Mo-Fr, 9:00-18:00',
        
        // Footer
        'footer.tagline': 'Salesforce Partner für KMU. Einrichtung, Integration, Schulung.',
        'footer.automation': 'Automatisierung',
        'footer.copyright': '© {year} T4S. Alle Rechte vorbehalten.',
        'footer.vat': 'CHE-000.000.000 MwSt'
    }
};

// Current language (default: Italian)
let currentLang = localStorage.getItem('lang') || 'it';

/**
 * Get translation for a key
 */
function t(key) {
    const raw = translations[currentLang]?.[key] || translations['it'][key] || key;
    return raw.replace('{year}', new Date().getFullYear());
}

/**
 * Update all elements with data-i18n attribute
 */
function updatePageLanguage() {
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Update language selector button
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        const flagSpan = langBtn.querySelector('.lang-flag');
        if (flagSpan) {
            flagSpan.textContent = currentLang.toUpperCase();
        }
    }
    
    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.lang === currentLang) {
            opt.classList.add('active');
        }
    });
}

/**
 * Change language
 */
function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        updatePageLanguage();
    }
}

/**
 * Initialize language selector
 */
function initLanguageSelector() {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (!langBtn || !langDropdown) return;
    
    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
        langBtn.classList.toggle('active');
    });
    
    // Language selection
    langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.dataset.lang;
            setLanguage(lang);
            langDropdown.classList.remove('active');
            langBtn.classList.remove('active');
        });
    });
    
    // Close dropdown on outside click
    document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
        langBtn.classList.remove('active');
    });
    
    // Prevent dropdown from closing when clicking inside
    langDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
    updatePageLanguage();
});
