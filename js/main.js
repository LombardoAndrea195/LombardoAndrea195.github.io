/* ==========================================================================
   Andrea Lombardo · Portfolio
   Vanilla JS, no dependencies. Loaded as an ES module (scoped, strict, deferred),
   so every feature is a small top-level function instead of one giant closure.
   ========================================================================== */

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hasIO = 'IntersectionObserver' in window;
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/* i18n (EN lives in the HTML, IT lives here)
   -------------------------------------------------------------------------- */
const IT = {
    skip: 'Vai al contenuto',
    nav_about: 'Percorso',
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

    about_title: 'Il mio <em>percorso</em>',
    about_caption: 'Fuori dal lavoro: a caccia di posti e paesaggi nuovi.',
    about_lead: 'Sono un ingegnere informatico con una forte passione per data science, sistemi cloud e infrastrutture digitali.',
    about_p1: 'Mi piace discutere idee, confrontare approcci con i colleghi e costruire prodotti digitali efficienti: sistemi cyber-fisici, data lake, data warehouse, soluzioni di machine learning e software pensato per semplificare la vita di tutti i giorni.',
    about_p2: 'Oggi sto crescendo sia sul lato tecnico sia su quello manageriale.',
    about_life: 'L\u2019altro lato: viaggi, cibo e corsa',
    s1_title: 'Mentalità analitica',
    s1_desc: 'Solida base in ingegneria, matematica, statistica e pensiero algoritmico.',
    s2_title: 'Lavoro in team',
    s2_desc: 'Team player proattivo, con comunicazione chiara e buone capacità organizzative.',
    s3_title: 'Apprendimento continuo',
    s3_desc: 'Esploro sempre nuove tecnologie e pattern per alzare la qualità del delivery.',

    exp_title: 'Esperienza e <em>formazione</em>',
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

    projects_title: 'Progetti <em>universitari</em>',
    side_title: 'Progetti <em>personali</em>',
    side_lead: 'Quello che costruisco fuori dal lavoro, la sera e nel weekend.',
    personal: 'Personale',
    aria_stack: 'Stack tecnologico',
    email_me: 'Scrivimi',
    ritmo_kind: 'Web app · PWA',
    ritmo_title: 'Ritmo, un coach di corsa adattivo',
    ritmo_desc: 'Un coach basato sui dati che costruisce il piano di allenamento attorno alla tua prossima gara e lo adatta mentre corri. Le attività arrivano da Strava in tempo reale e ogni modifica al piano è accompagnata dal suo motivo.',
    ritmo_h1: 'Motore di allenamento deterministico e versionato: zone di passo da test 3K e 7K o dalle corse recenti, piani dai 5K alla maratona con settimane di scarico e tapering.',
    ritmo_h2: 'Si adatta al feedback: sforzo alto con sonno scarso, stress o dolore alleggerisce la sessione successiva, con uno storico prima/dopo di ogni modifica.',
    ritmo_h3: 'Integrazione con Strava solo via webhook, senza polling, con token OAuth cifrati a riposo (AES-256-GCM).',
    ritmo_h4: 'Un coach AI che spiega i piani partendo da dati strutturati e non può mai modificarli da solo.',
    ritmo_h5: 'Privacy by design: consenso esplicito, esportazione completa dei dati e cancellazione dell\u2019account. Disponibile in inglese e italiano.',
    ritmo_cta: 'Per ora è privato. Vuoi una demo o più informazioni?',
    travel_kind: 'Sito web',
    travel_title: 'Travel blog, il diario dei miei viaggi',
    travel_desc: 'Il mio travel blog: un diario digitale dei viaggi che ho fatto, con consigli, foto e clip. La home è un carosello, una slide per ogni viaggio, che ti invita a entrare.',
    travel_h1: 'Sei viaggi finora: West Coast americana, Thailandia, Bolivia e Cile, Cina, Scozia e Sri Lanka.',
    travel_h2: 'Ogni viaggio ha la sua pagina vlog, più una galleria e le pagine delle destinazioni da esplorare.',
    travel_h3: 'HTML, CSS e JavaScript scritti a mano, senza framework.',
    l_site: 'Visita il sito',
    playlist_title: 'In <em>loop</em>',
    playlist_text: 'La playlist con cui corro. Premi play mentre scorri.',
    playlist_follow: 'Seguimi su Spotify',

    aria_mode: 'Sito',
    mode_work: 'Lavoro',
    mode_life: 'Vita',

    lnav_me: 'Chi sono',
    lnav_motto: 'Motto',
    lnav_playlist: 'Playlist',
    life_status: 'Fuori dal lavoro',
    life_title_sr: 'Mi piace esplorare, cucinare, correre, tuffarmi e osare.',
    life_title_a: 'Mi piace',
    rot_1: 'esplorare.',
    rot_2: 'cucinare.',
    rot_3: 'correre.',
    rot_4: 'osare.',
    rot_5: 'tuffarmi.',
    life_lead: 'Ingegnere di giorno. Il resto del tempo esploro posti nuovi, cucino, corro con gli amici e mi metto alla prova.',
    life_cta: 'Conoscimi meglio',
    life_cta_work: 'Il lato tecnico',
    clip_1: 'Con gli elefanti, Thailandia',
    clip_2: 'Di corsa sul Lungotevere, Roma',
    clip_3: 'Trakai, Lituania',
    aria_love: 'Cose che amo',
    m_1: 'Esplorare',
    m_2: 'Assaggiare nuovi piatti',
    m_3: 'Correre',
    m_4: 'Perdermi nelle città',
    m_5: 'Conoscere persone nuove',
    m_6: 'Mare e snorkeling',
    m_7: 'Cucinare',
    m_8: 'Viaggiare',
    m_10: 'Supportare gli altri',
    me_title: 'Qualche cosa <em>su di me</em>',
    me_lead: 'Non un CV. Solo quello che scopriresti dopo un caffè insieme.',
    t1_title: 'Mi metto in gioco.',
    t1_text: 'Preferisco provare e sbagliare piuttosto che chiedermi come sarebbe andata. Uno sport nuovo, una città nuova, un ruolo nuovo al lavoro: imparo di più fuori dalla mia zona di comfort.',
    t2_title: 'Esploro, sopra e sotto la superficie.',
    t2_text: 'Sulla terraferma viaggio per perdermi un po\u2019: la strada laterale, il sentiero senza cartelli. Quando c\u2019è il mare, metto pinne e maschera e vado a cercare i pesci.',
    t3_title: 'Colleziono esperienze.',
    t3_text: 'Certe cose vanno fatte almeno una volta. Accarezzare e dare da mangiare agli elefanti era una di queste, e lo rifarei domani.',
    t4_title: 'Cucino e assaggio.',
    t4_text: 'Cucinare è il mio modo di staccare, assaggiare è il mio modo di conoscere un posto. Da romano, la carbonara è il piatto che preferisco preparare, ma soprattutto mangiare.',
    lnav_run: 'Running',
    run_title: 'My Running <em>Era</em>',
    run_lead: 'Da tre anni faccio parte di Amor Run Club, una community internazionale di runner. Mi ha portato a correre maratone, spronandomi a dare quel di più, e in posti assurdi, da Versailles a Villa Adriana a Tivoli; mi ha regalato una collezione di medaglie che continua a crescere e mi ha fatto conoscere persone che ormai fanno parte della mia vita.',
    run_badge: 'Pacer',
    run_pacer: 'In alcune uscite sono io il pacer: quello che detta il passo e aiuta gli altri a raggiungere il loro obiettivo per quella singola corsa.',
    r1_title: 'Allenarsi <em>insieme.</em>',
    r1_text: 'La parte più importante. Presentarsi, scaldarsi e correre fianco a fianco trasforma una seduta dura in una bella mattinata.',
    r2_title: 'Poi <em>colazione.</em>',
    r2_text: 'La corsa finisce a tavola, con un caffè e i racconti del percorso o dei propri obiettivi. È lì che i compagni di allenamento diventano amici.',
    p_places_t: 'Posti assurdi',
    p_places_d: 'Una community internazionale vuol dire che una gara all\u2019estero arriva sempre con qualcuno con cui correrla.',
    p_medals_t: 'Medaglie',
    p_medals_d: 'Le gare danno un obiettivo all\u2019allenamento, e ogni medaglia ha la sua storia.',
    run_ritmo: 'Perché sto costruendo Ritmo, un\u2019app di coaching per la corsa',
    motto: 'Viaggia per perderti, per ritrovarti, per lasciare qualcosa di te e riporta nel tuo bagaglio una parte di te che non conoscevi.',
    motto_cite: 'Dal mio',
    motto_link: 'travel blog',
    life_contact_title: 'Un <em>consiglio?</em>',
    life_contact_text: 'Un posto da vedere, un piatto da assaggiare, una gara da correre. Scrivimi.',
    life_to_work: 'Il lato tecnico',
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

    research_title: 'Ricerca e <em>pubblicazioni</em>',
    pub1_desc: 'Un approccio industriale e data-driven a supporto dello smart manufacturing nel settore spaziale.',
    pub2_desc: 'La produzione di pannelli sandwich in composito come caso di studio per produrre costellazioni di satelliti su larga scala.',
    pub3_title: 'Social media per migliorare la consapevolezza nelle situazioni di emergenza',
    pub3_venue: 'Paper tecnico · Sapienza Università di Roma',
    pub3_desc: 'Rilevamento in tempo reale di emergenze dai tweet con preprocessing, TF-IDF, clustering e SVM.',
    certs_title: 'Certificazioni',
    certs_text: '19 certificazioni su cloud, data science e design thinking, rilasciate da Microsoft, IBM, AWS, Google Cloud e Stanford.',
    certs_credly: 'Profilo Credly',

    skills_title: 'Competenze e <em>stack</em>',
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

    contact_title: '<em>Parliamone.</em>',
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

const PAGE = document.body.dataset.page === 'life' ? 'life' : 'work';

const TITLES = {
    work: {
        en: {
            title: 'Andrea Lombardo | Data & DevOps Engineer Portfolio',
            description: 'Official portfolio of Andrea Lombardo, Data & DevOps Engineer. Projects, skills, publications, certifications and contacts.'
        },
        it: {
            title: 'Andrea Lombardo | Portfolio Data & DevOps Engineer',
            description: 'Portfolio ufficiale di Andrea Lombardo, Data & DevOps Engineer. Progetti, competenze, pubblicazioni, certificazioni e contatti.'
        }
    },
    life: {
        en: {
            title: 'Andrea Lombardo | Off the clock',
            description: 'Andrea Lombardo off the clock: travel, food, running with friends and a habit of saying yes to new things.'
        },
        it: {
            title: 'Andrea Lombardo | Fuori dal lavoro',
            description: 'Andrea Lombardo fuori dal lavoro: viaggi, cibo, corse con gli amici e l\u2019abitudine di dire sì alle cose nuove.'
        }
    }
};

const META = {
    en: { toggle: 'Passa in italiano', copied: 'Email copied to clipboard', pause: 'Pause clips', play: 'Play clips' },
    it: { toggle: 'Switch to English', copied: 'Email copiata negli appunti', pause: 'Metti in pausa', play: 'Riproduci' }
};

const textNodes = $$('[data-i18n], [data-i18n-html]');
const ariaNodes = $$('[data-i18n-aria]');
const languageListeners = [];

function currentLang() {
    return root.lang === 'it' ? 'it' : 'en';
}

function translateText(node, lang) {
    const isHtml = node.hasAttribute('data-i18n-html');
    const value = lang === 'it' ? IT[node.dataset.i18nHtml || node.dataset.i18n] : node._en;
    if (value == null) return;
    if (isHtml) node.innerHTML = value;
    else node.textContent = value;
}

function translateAria(node, lang) {
    const value = lang === 'it' ? IT[node.dataset.i18nAria] : node._enAria;
    if (value) node.setAttribute('aria-label', value);
}

// Wrap each word in a span with its position (0..1), so CSS can light the
// words up one after another as the block scrolls by.
function splitWords(el) {
    const words = el.textContent.trim().split(/\s+/);
    const last = Math.max(words.length - 1, 1);
    el.textContent = '';
    words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'w';
        span.style.setProperty('--w', (i / last).toFixed(3));
        span.textContent = word;
        el.append(span, i < words.length - 1 ? ' ' : '');
    });
}

function saveLanguage(lang) {
    try {
        localStorage.setItem('site-language', lang);
    } catch (e) {
        /* storage unavailable: the choice just won't persist */
    }
}

function applyLanguage(lang) {
    textNodes.forEach((node) => translateText(node, lang));
    ariaNodes.forEach((node) => translateAria(node, lang));
    $$('[data-split]').forEach(splitWords);

    root.lang = lang;
    document.title = TITLES[PAGE][lang].title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', TITLES[PAGE][lang].description);
    document.querySelector('[data-lang-toggle]')?.setAttribute('aria-label', META[lang].toggle);

    languageListeners.forEach((listener) => listener(lang));
    saveLanguage(lang);
}

function initLanguage() {
    textNodes.forEach((node) => {
        node._en = node.hasAttribute('data-i18n-html') ? node.innerHTML : node.textContent;
    });
    ariaNodes.forEach((node) => {
        node._enAria = node.getAttribute('aria-label');
    });

    applyLanguage(currentLang());

    document.querySelector('[data-lang-toggle]')?.addEventListener('click', () => {
        applyLanguage(currentLang() === 'it' ? 'en' : 'it');
    });
}

/* Mobile menu
   -------------------------------------------------------------------------- */
function initMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    const isOpen = () => root.hasAttribute('data-menu-open');
    const setMenu = (open) => {
        root.toggleAttribute('data-menu-open', open);
        toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => setMenu(!isOpen()));
    nav.addEventListener('click', (event) => {
        if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || !isOpen()) return;
        setMenu(false);
        toggle.focus();
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', (event) => {
        if (event.matches) setMenu(false);
    });
}

/* Header state + active section (IntersectionObserver, no scroll listeners)
   -------------------------------------------------------------------------- */
function initHeader() {
    const header = document.querySelector('[data-header]');
    if (!header || !hasIO) return;

    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none;';
    document.body.prepend(sentinel);

    new IntersectionObserver(([entry]) => {
        header.dataset.scrolled = String(!entry.isIntersecting);
    }).observe(sentinel);
}

function markCurrentLink(links, id) {
    links.forEach((link) => {
        if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
    });
}

function initActiveSection() {
    const links = $$('.site-nav__list a');
    if (!hasIO || !links.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries
            .filter((entry) => entry.isIntersecting)
            .forEach((entry) => markCurrentLink(links, entry.target.id));
    }, { rootMargin: '-45% 0px -50% 0px' });

    $$('main section').forEach((section) => observer.observe(section));
}

/* Scroll reveal
   -------------------------------------------------------------------------- */
function initReveal() {
    const nodes = $$('[data-reveal]');


    if (!hasIO) {
        nodes.forEach((node) => node.classList.add('is-in'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries
            .filter((entry) => entry.isIntersecting)
            .forEach((entry) => {
                entry.target.classList.add('is-in');
                observer.unobserve(entry.target);
            });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    nodes.forEach((node) => observer.observe(node));
}

/* Project filter
   -------------------------------------------------------------------------- */
function showLevel(cards, value) {
    cards.forEach((card) => {
        card.hidden = value !== 'all' && card.dataset.level !== value;
        // Cards revealed by the filter should not wait for the scroll reveal.
        card.classList.add('is-in');
    });
}

function initFilter() {
    const group = document.querySelector('[data-filter-group]');
    const cards = $$('[data-project-grid] .project');
    if (!group || !cards.length) return;

    const buttons = $$('[data-filter]', group);
    cards.forEach((card, index) => {
        card.style.viewTransitionName = 'project-' + index;
    });

    const select = (button, index) => {
        if (button.getAttribute('aria-pressed') === 'true') return;
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
        group.style.setProperty('--index', index);

        const update = () => showLevel(cards, button.dataset.filter);
        if (document.startViewTransition && !reduceMotion.matches) document.startViewTransition(update);
        else update();
    };

    buttons.forEach((button, index) => button.addEventListener('click', () => select(button, index)));
}

/* Life page: rotating word in the hero
   -------------------------------------------------------------------------- */
function initRotator() {
    const rotator = document.querySelector('[data-rotator]');
    if (!rotator || reduceMotion.matches) return;

    const words = Array.from(rotator.children);
    let current = 0;

    setInterval(() => {
        if (document.hidden) return;
        // Words that left last time drop back below, invisibly, ready to rise again.
        words.forEach((word) => word.classList.remove('is-leaving'));
        words[current].classList.replace('is-active', 'is-leaving');
        current = (current + 1) % words.length;
        words[current].classList.add('is-active');
    }, 2400);
}

/* Life page: every clip plays only while on screen. One shared state, so any
   pause button (hero or card) pauses or resumes them all.
   -------------------------------------------------------------------------- */
function playOrPause(video, shouldPlay) {
    if (!shouldPlay) {
        video.pause();
        return;
    }
    // Autoplay can still be refused (e.g. low-power mode): the poster stays.
    video.play()?.catch(() => { });
}

function labelToggle(button, paused, text) {
    button.toggleAttribute('data-paused', paused);
    const label = button.querySelector('[data-clips-label]');
    if (label) label.textContent = text;
    else button.setAttribute('aria-label', text);
}

function initLoops() {
    const videos = $$('video[data-loop]');
    const toggles = $$('[data-clips-toggle]');
    if (!videos.length) return;

    let paused = reduceMotion.matches || Boolean(navigator.connection?.saveData);

    const sync = () => {
        videos.forEach((video) => playOrPause(video, !paused && (video._visible || !hasIO)));
        const text = META[currentLang()][paused ? 'play' : 'pause'];
        toggles.forEach((button) => labelToggle(button, paused, text));
    };

    toggles.forEach((button) => button.addEventListener('click', () => {
        paused = !paused;
        sync();
    }));
    languageListeners.push(sync);

    if (hasIO) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.target._visible = entry.isIntersecting;
            });
            sync();
        }, { threshold: 0.25 });
        videos.forEach((video) => observer.observe(video));
    }

    sync();
}

/* Copy email
   -------------------------------------------------------------------------- */
function fallbackCopy(text) {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;opacity:0;';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
        ok = document.execCommand('copy');
    } catch (e) {
        ok = false;
    }
    area.remove();
    return ok ? Promise.resolve() : Promise.reject(new Error('copy failed'));
}

function copyText(text) {
    return navigator.clipboard && window.isSecureContext ? navigator.clipboard.writeText(text) : fallbackCopy(text);
}

function initCopy() {
    const button = document.querySelector('[data-copy]');
    const status = document.querySelector('[data-copy-status]');
    if (!button) return;

    let timer;
    const setStatus = (text) => {
        if (status) status.textContent = text;
    };
    const reset = () => {
        button.classList.remove('is-copied');
        setStatus('');
    };
    const confirm = () => {
        button.classList.add('is-copied');
        setStatus(META[currentLang()].copied);
        clearTimeout(timer);
        timer = setTimeout(reset, 1800);
    };

    button.addEventListener('click', () => {
        const text = button.dataset.copy;
        copyText(text).then(confirm).catch(() => {
            window.location.href = 'mailto:' + text;
        });
    });
}

/* Small things: footer year, safe external links
   -------------------------------------------------------------------------- */
function initFooterYear() {
    const year = document.querySelector('[data-year]');
    if (year) year.textContent = String(new Date().getFullYear());
}

function initExternalLinks() {
    $$('a[href^="http"]')
        .filter((link) => link.hostname !== window.location.hostname)
        .forEach((link) => link.setAttribute('rel', 'noopener noreferrer'));
}

initLanguage();
initMenu();
initHeader();
initActiveSection();
initReveal();
initFilter();
initRotator();
initLoops();
initCopy();
initFooterYear();
initExternalLinks();
