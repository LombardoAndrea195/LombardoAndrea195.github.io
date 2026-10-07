/* ==========================================================================
   Andrea Lombardo · Portfolio
   Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
    'use strict';

    var root = document.documentElement;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* i18n (EN lives in the HTML, IT lives here)
       ---------------------------------------------------------------------- */
    var IT = {
        skip: 'Vai al contenuto',
        nav_about: 'Chi sono',
        nav_experience: 'Esperienza',
        nav_projects: 'Progetti',
        nav_research: 'Ricerca',
        nav_contact: 'Contatti',
        menu: 'Menu',

        aria_brand: 'Andrea Lombardo, torna su',
        aria_nav: 'Principale',
        aria_marquee: 'Tecnologie con cui lavoro',
        aria_filter: 'Filtra progetti',

        hero_status: 'Data & DevOps Engineer in Enel Group',
        hero_lead: 'Costruisco piattaforme dati, infrastrutture cloud e le pipeline di delivery che le collegano. Vivo a Roma.',
        hero_cta_projects: 'Vedi i progetti',
        hero_cta_cv: 'Scarica il CV',
        hero_place: 'Roma, IT',
        hero_caption: 'Remoto e ibrido',
        fact1_label: 'Entrato in Enel Group',
        fact2_label: 'Paper peer-reviewed',
        fact3_label: 'Magistrale in Ing. Informatica',

        about_title: 'Chi sono',
        about_caption: 'Fuori dal lavoro: a caccia di posti e paesaggi nuovi.',
        about_lead: 'Sono un ingegnere informatico con una forte passione per data science, sistemi cloud e infrastrutture digitali.',
        about_p1: 'Mi piace discutere idee, confrontare approcci con i colleghi e costruire prodotti digitali efficienti: sistemi cyber-fisici, data lake, data warehouse, soluzioni di machine learning e software pensato per semplificare la vita di tutti i giorni.',
        about_p2: 'Oggi sto crescendo sia sul lato tecnico sia su quello manageriale. Nel tempo libero adoro esplorare nuovi posti in giro per il mondo.',
        s1_title: 'Mentalità analitica',
        s1_desc: 'Solida base in ingegneria, matematica, statistica e pensiero algoritmico.',
        s2_title: 'Lavoro in team',
        s2_desc: 'Team player proattivo, con comunicazione chiara e buone capacità organizzative.',
        s3_title: 'Apprendimento continuo',
        s3_desc: 'Esploro sempre nuove tecnologie e pattern per alzare la qualità del delivery.',

        exp_title: 'Esperienza e formazione',
        exp_work: 'Lavoro',
        exp_edu: 'Formazione',
        current: 'Attuale',
        d_enel: 'Nov 2022 – Oggi',
        d_ey: 'Dic 2021 – Nov 2022',
        d_msc: 'Feb 2019 – Ott 2021',
        d_bsc: 'Set 2014 – Feb 2019',
        d_hs: 'Set 2009 – Lug 2014',
        enel_intro: 'Costruisco soluzioni di business per gli hub delle società Enel e supporto i team su application, platform e delivery:',
        enel_b1: 'Microservizi backend in Python con FastAPI, SQLAlchemy (ORM) e Beanie (ODM), basati sui pattern Repository e Factory.',
        enel_b2: 'Pipeline ETL su Apache Spark per diversi progetti del gruppo.',
        enel_b3: 'Un data access layer basato su LLM che combina RAG, OpenAPI e un DSL per casi d’uso di analytics aziendale.',
        enel_b4: 'AWS API Gateway definito come codice con stack CDK, più monitoraggio della latenza e manutenzione delle soluzioni AWS.',
        ey_intro: 'Ho mantenuto soluzioni esistenti e ne ho costruite di nuove sulle esigenze dei clienti:',
        ey_b1: 'Microservizi Python che leggono le API di Azure e Prometheus per gestire costi e billing, con dashboard in Power BI.',
        ey_b2: 'Power Apps su misura su Microsoft Power Platform.',
        sapienza: 'Sapienza Università di Roma',
        msc_degree: 'Laurea magistrale in Ingegneria Informatica',
        thesis: 'Tesi',
        thesis_more: 'Leggi la sintesi della tesi',
        thesis_body: 'L\u2019obiettivo era migliorare la linea produttiva di RUAG per i pannelli satellitari con un approccio di smart manufacturing, a supporto della spinta di ESA verso la produzione in serie di piccoli satelliti per costellazioni. L\u2019architettura digitalizza la linea: Apache Flink elabora grandi volumi di dati macchina, dashboard Kibana (costruite con eland e Altair) permettono agli ingegneri di filtrare e ispezionare ogni pannello, e un processo decisionale di Markov predice il passo successivo della macchina automatica per segnalare quando serve l\u2019intervento umano.',
        torvergata: 'Università di Roma Tor Vergata',
        bsc_degree: 'Laurea triennale in Ingegneria Informatica',
        bsc_track: 'Indirizzo: Software e Sistemi Web',
        hs_degree: 'Diploma di maturità scientifica',

        projects_title: 'Progetti universitari',
        filter_all: 'Tutti',
        filter_msc: 'Magistrale',
        filter_bsc: 'Triennale',
        l_presentation: 'Presentazione',
        l_docs: 'Documentazione',
        l_lab: 'Lab',
        l_notes: 'Appunti',
        p1_course: 'Neural Networks',
        p1_title: 'Attivazioni SReLU, da zero',
        p1_desc: 'Implementazione delle S-shaped Rectified Linear Units e confronto con ReLU, Leaky ReLU, PReLU e attivazioni esponenziali su diverse reti convoluzionali.',
        p2_course: 'Web Information Retrieval',
        p2_title: 'Rilevare emergenze dai tweet',
        p2_desc: 'Rileva situazioni di emergenza in tempo reale usando le persone come sensori: preprocessing dei tweet, vettori TF-IDF, clustering per topic e un classificatore SVM di rilevanza.',
        p3_course: 'Mobile & Cloud Computing',
        p3_title: 'LibraryApp, diario di lettura social',
        p3_desc: 'App Android per salvare citazioni, tenere traccia dei libri letti e confrontarsi con gli amici. Autenticazione Firebase, Google Books API e backend REST in Node.js su MongoDB.',
        p4_course: 'Machine Learning',
        p4_title: 'Dai modelli classici al transfer learning',
        p4_desc: 'Due homework: predizione di compilatore e ottimizzazione con classificatori classici, poi classificazione di immagini meteo con una CNN addestrata da zero contro un modello pre-addestrato con fine-tuning.',
        p5_course: 'Network Infrastructures',
        p5_title: 'Laboratori di rete con Netkit',
        p5_desc: 'Tre laboratori di configurazione di LAN e WAN su host Unix emulati: indirizzamento, DHCP, NAT, routing statico, OSPF, iptables, SSH, VPN, x509 e DNS.',
        p6_course: 'Human-Computer Interaction',
        p6_desc: 'Progettazione di un\u2019app che unisce le persone attraverso lo sport: creare e partecipare a eventi, condividere allenamenti e lanciare sfide pubbliche. Sviluppata per iterazioni documentate.',
        p7_course: 'Seminars in Advanced Computing',
        p7_title: 'Remote Core Locking, spiegato',
        p7_desc: 'Un talk sul paper RCL: spostare l\u2019esecuzione delle sezioni critiche su un core server dedicato per ridurre contesa sui lock e cache miss su macchine multicore.',
        p8_course: 'Ingegneria del Software',
        p8_title: 'Piattaforma di prenotazioni accademiche',
        p8_desc: 'App web e desktop in Java, basata sul pattern BCE, per prenotare esami, eventi e aule. Ruoli utente, JDBC, Servlet e test JUnit, più un thread concorrente che simula prenotazioni casuali.',
        p9_course: 'Sistemi Operativi',
        p9_title: 'Server di prenotazione multithread in C',
        p9_desc: 'Client-server TCP per prenotare posti al cinema tramite socket Berkeley: mappa dei posti, codici di cancellazione, client concorrenti e persistenza su file.',
        p10_course: 'Ingegneria di Internet e Web',
        p10_title: 'Trasferimento file affidabile su UDP',
        p10_desc: 'Client-server in C che implementa selective repeat sopra UDP con perdita di pacchetti simulata, più i comandi list, get e put.',
        p11_course: 'Basi di Dati',
        p11_title: 'Importatore di dati astrofisici',
        p11_desc: 'App desktop JavaFX che importa in PostgreSQL i dati CSV INAF su stelle e filamenti, con modello ER, utenti con ruoli, MVC e JUnit.',
        p12_course: 'Programmazione Mobile',
        p12_title: 'App di iscrizione alle gare per runner',
        p12_desc: 'App Android in cui i runner accedono e si iscrivono alle gare, scambiando JSON con un backend PHP tramite chiamate REST.',

        research_title: 'Ricerca e pubblicazioni',
        pub1_desc: 'Un approccio industriale e data-driven a supporto dello smart manufacturing nel settore spaziale.',
        pub2_desc: 'La produzione di pannelli sandwich in composito come caso di studio per produrre costellazioni di satelliti su larga scala.',
        pub3_title: 'Social media per migliorare la consapevolezza nelle situazioni di emergenza',
        pub3_venue: 'Paper tecnico · Sapienza Università di Roma',
        pub3_desc: 'Rilevamento in tempo reale di emergenze dai tweet con preprocessing, TF-IDF, clustering e SVM.',
        certs_title: 'Certificazioni',
        certs_text: '19 certificazioni su cloud, data science e design thinking, rilasciate da Microsoft, IBM, AWS, Google Cloud e Stanford.',
        certs_credly: 'Profilo Credly',

        skills_title: 'Competenze',
        sk_tech: 'Basi di ingegneria',
        sk_t1: 'Ciclo di vita completo del software: requisiti, design, implementazione e test',
        sk_t2: 'Machine learning: classificazione, regressione, apprendimento non supervisionato e per rinforzo, reti neurali',
        sk_t3: 'Microservizi, SOA e web service',
        sk_t4: 'Reti: TCP/IP, UDP, DHCP, NAT, RIP, OSPF; reti di accesso, telefoniche e core',
        sk_t5: 'Information retrieval e NLP: SVM, Rocchio, KNN',
        sk_t6: 'Metodologie: Scrum, Agile, CMMI, iterativo e waterfall',
        sk_t7: 'UML e design pattern',
        sk_lang: 'Linguaggi',
        sk_soft: 'Come lavoro con i team',
        soft1_t: 'Guidare con l\u2019esempio',
        soft1_d: 'Porto avanti le iniziative con esecuzione, mentoring e decisioni trasparenti.',
        soft2_t: 'Comunicazione chiara',
        soft2_d: 'Ascolto, condivido idee apertamente e traduco i temi tecnici in un linguaggio su cui il business può agire.',
        soft3_t: 'Problem solving',
        soft3_d: 'Scompongo i problemi e scelgo l’algoritmo più adatto ai vincoli del sistema.',
        soft4_t: 'Collaborazione',
        soft4_d: 'Allineo team cross-funzionali su milestone condivise.',
        soft5_t: 'Adattabilità',
        soft5_d: 'Mi inserisco rapidamente in nuovi ambienti, team e stack tecnologici.',
        soft6_t: 'Cura del dettaglio e curiosità',
        soft6_d: 'Imparo in modo creativo e sono attratto da strumenti e tecnologie che non ho ancora provato.',

        contact_title: 'Parliamone.',
        contact_text: 'Disponibile a parlare di piattaforme dati, infrastrutture cloud e DevOps. Di solito rispondo entro un giorno.',
        copy: 'Copia',
        copied: 'Copiata',
        contact_location: 'Roma, Italia · Remoto e ibrido',
        nav_skills: 'Competenze',
        enel_b5: 'Gestione di cluster Kubernetes e migrazioni di database con Alembic.',
        enel_b6: 'Librerie e moduli condivisi usati in tutto il gruppo Enel, e supporto al design di soluzioni end-to-end.',
        ey_b3: 'Data architect per architetture kappa e lambda su Google Cloud, collegando data lake, data warehouse e modelli di AI.',
        ey_b4: 'Design del Cloud Operating Model e definizione della roadmap di implementazione secondo il framework EY.',
        ey_b5: 'Esperienze nel metaverso su AltspaceVR, Roblox e Decentraland.',
        certs_all: 'Tutte le certificazioni',
        certs_more: 'Altro',
        sk_stack: 'Stack attuale',
        sk_g_data: 'Dati e messaging',
        sk_arch: 'Architettura e pattern',
        sk_a1: 'Design di soluzioni end-to-end insieme ai team di prodotto',
        sk_a2: 'Microservizi Python basati sui pattern Repository e Factory',
        sk_a3: 'Pipeline ETL su Spark, architetture kappa e lambda',
        sk_a4: 'Data lake e data warehouse che alimentano modelli di AI',
        sk_a5: 'Data access layer per LLM che combinano RAG, OpenAPI e un DSL',
        sk_a6: 'Messaging e RPC con Kafka, RabbitMQ e JMS',
        sk_a7: 'Infrastructure as code con AWS CDK',
        sk_t8: 'Catene di Markov, processi decisionali di Markov e random walk',
        sk_t9: 'Algoritmi e strutture dati',
        sk_t10: 'Sistemi operativi: Linux, Unix, Windows; web server Apache e IIS',
        back_top: 'Torna su'
    };

    var META = {
        en: {
            title: 'Andrea Lombardo | Data & DevOps Engineer Portfolio',
            description: 'Official portfolio of Andrea Lombardo, Data & DevOps Engineer. Projects, skills, publications, certifications and contacts.',
            toggle: 'Passa in italiano',
            copied: 'Email copied to clipboard'
        },
        it: {
            title: 'Andrea Lombardo | Portfolio Data & DevOps Engineer',
            description: 'Portfolio ufficiale di Andrea Lombardo, Data & DevOps Engineer. Progetti, competenze, pubblicazioni, certificazioni e contatti.',
            toggle: 'Switch to English',
            copied: 'Email copiata negli appunti'
        }
    };

    var textNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n], [data-i18n-html]'));
    var ariaNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-aria]'));
    var langToggle = document.querySelector('[data-lang-toggle]');
    var metaDescription = document.querySelector('meta[name="description"]');

    textNodes.forEach(function (node) {
        node._en = node.hasAttribute('data-i18n-html') ? node.innerHTML : node.textContent;
    });
    ariaNodes.forEach(function (node) {
        node._enAria = node.getAttribute('aria-label');
    });

    function currentLang() {
        return root.lang === 'it' ? 'it' : 'en';
    }

    function applyLanguage(lang) {
        textNodes.forEach(function (node) {
            var isHtml = node.hasAttribute('data-i18n-html');
            var key = isHtml ? node.getAttribute('data-i18n-html') : node.getAttribute('data-i18n');
            var value = lang === 'it' ? IT[key] : node._en;
            if (value == null) return;
            if (isHtml) node.innerHTML = value;
            else node.textContent = value;
        });

        ariaNodes.forEach(function (node) {
            var value = lang === 'it' ? IT[node.getAttribute('data-i18n-aria')] : node._enAria;
            if (value) node.setAttribute('aria-label', value);
        });

        root.lang = lang;
        document.title = META[lang].title;
        if (metaDescription) metaDescription.setAttribute('content', META[lang].description);
        if (langToggle) langToggle.setAttribute('aria-label', META[lang].toggle);

        try {
            localStorage.setItem('site-language', lang);
        } catch (e) { /* storage unavailable */ }
    }

    applyLanguage(currentLang());

    if (langToggle) {
        langToggle.addEventListener('click', function () {
            applyLanguage(currentLang() === 'it' ? 'en' : 'it');
        });
    }

    /* Mobile menu
       ---------------------------------------------------------------------- */
    var menuToggle = document.querySelector('[data-menu-toggle]');
    var nav = document.getElementById('site-nav');

    function setMenu(open) {
        root.toggleAttribute('data-menu-open', open);
        if (menuToggle) menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            setMenu(!root.hasAttribute('data-menu-open'));
        });

        nav.addEventListener('click', function (event) {
            if (event.target.closest('a')) setMenu(false);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && root.hasAttribute('data-menu-open')) {
                setMenu(false);
                menuToggle.focus();
            }
        });

        window.matchMedia('(min-width: 861px)').addEventListener('change', function (event) {
            if (event.matches) setMenu(false);
        });
    }

    /* Header state + active section (IntersectionObserver, no scroll listeners)
       ---------------------------------------------------------------------- */
    var header = document.querySelector('[data-header]');
    var hasIO = 'IntersectionObserver' in window;

    if (header && hasIO) {
        var sentinel = document.createElement('div');
        sentinel.setAttribute('aria-hidden', 'true');
        sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none;';
        document.body.prepend(sentinel);

        new IntersectionObserver(function (entries) {
            header.setAttribute('data-scrolled', entries[0].isIntersecting ? 'false' : 'true');
        }).observe(sentinel);
    }

    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav__list a'));

    if (hasIO && navLinks.length) {
        var linkFor = function (id) {
            return navLinks.filter(function (a) { return a.getAttribute('href') === '#' + id; })[0];
        };

        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var id = entry.target.id;
                var link = linkFor(id);
                navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
                if (link) link.setAttribute('aria-current', 'true');
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        document.querySelectorAll('main section').forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    /* Scroll reveal
       ---------------------------------------------------------------------- */
    var revealNodes = document.querySelectorAll('[data-reveal]');

    // Stagger project cards by column so a row cascades left to right.
    document.querySelectorAll('[data-project-grid] .project').forEach(function (card, index) {
        card.style.setProperty('--i', index % 3);
    });

    if (hasIO) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in');
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

        revealNodes.forEach(function (node) { revealObserver.observe(node); });
    } else {
        revealNodes.forEach(function (node) { node.classList.add('is-in'); });
    }

    /* Project filter
       ---------------------------------------------------------------------- */
    var filterGroup = document.querySelector('[data-filter-group]');
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-project-grid] .project'));

    if (filterGroup && cards.length) {
        var buttons = Array.prototype.slice.call(filterGroup.querySelectorAll('[data-filter]'));

        cards.forEach(function (card, index) {
            card.style.viewTransitionName = 'project-' + index;
        });

        var applyFilter = function (value) {
            cards.forEach(function (card) {
                card.hidden = value !== 'all' && card.getAttribute('data-level') !== value;
                // Cards revealed by the filter should not wait for the scroll reveal.
                card.classList.add('is-in');
            });
        };

        buttons.forEach(function (button, index) {
            button.addEventListener('click', function () {
                if (button.getAttribute('aria-pressed') === 'true') return;

                buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === button ? 'true' : 'false'); });
                filterGroup.style.setProperty('--index', index);

                var value = button.getAttribute('data-filter');
                if (document.startViewTransition && !reduceMotion.matches) {
                    document.startViewTransition(function () { applyFilter(value); });
                } else {
                    applyFilter(value);
                }
            });
        });
    }

    /* Copy email
       ---------------------------------------------------------------------- */
    var copyButton = document.querySelector('[data-copy]');
    var copyStatus = document.querySelector('[data-copy-status]');
    var copyTimer;

    function fallbackCopy(text) {
        var area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(area);
        area.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        area.remove();
        return ok ? Promise.resolve() : Promise.reject();
    }

    if (copyButton) {
        copyButton.addEventListener('click', function () {
            var text = copyButton.getAttribute('data-copy');
            var write = navigator.clipboard && window.isSecureContext
                ? navigator.clipboard.writeText(text)
                : fallbackCopy(text);

            write.then(function () {
                copyButton.classList.add('is-copied');
                if (copyStatus) copyStatus.textContent = META[currentLang()].copied;
                clearTimeout(copyTimer);
                copyTimer = setTimeout(function () {
                    copyButton.classList.remove('is-copied');
                    if (copyStatus) copyStatus.textContent = '';
                }, 1800);
            }).catch(function () {
                window.location.href = 'mailto:' + text;
            });
        });
    }

    /* Footer year
       ---------------------------------------------------------------------- */
    var year = document.querySelector('[data-year]');
    if (year) year.textContent = String(new Date().getFullYear());

    /* External links open safely
       ---------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="http"]').forEach(function (link) {
        if (link.hostname !== window.location.hostname) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
})();
