/* ===================================================================
 * Epitome - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {

    "use strict";

    var cfg = {
        scrollDuration: 800, // smoothscroll duration
        mailChimpURL: ''   // mailchimp url
    },

        $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


    /* Adaptive Motion Profile
     * -------------------------------------------------- */
    var ssAdaptiveMotionProfile = function () {

        var root = document.documentElement;
        var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        var saveData = !!(connection && connection.saveData);
        var lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
        var lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
        var isLowPower = saveData || lowCpu || lowMemory;

        if (prefersReducedMotion) {
            root.classList.add('motion-lite');
            root.style.setProperty('--motion-speed', '1');
            root.style.setProperty('--motion-distance', '0.7');
            root.style.setProperty('--motion-glow', '0.8');
            return;
        }

        if (isLowPower) {
            root.classList.add('motion-lite');
            root.style.setProperty('--motion-speed', '0.96');
            root.style.setProperty('--motion-distance', '0.82');
            root.style.setProperty('--motion-glow', '0.9');
        } else {
            root.classList.add('motion-rich');
            root.style.setProperty('--motion-speed', '0.86');
            root.style.setProperty('--motion-distance', '1.08');
            root.style.setProperty('--motion-glow', '1.2');
        }
    };


    /* Preloader
     * -------------------------------------------------- */
    var ssPreloader = function () {

        $("html").addClass('ss-preload');
        var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        $WIN.on('load', function () {

            if (prefersReducedMotion) {
                $('#loader').hide();
                $('#preloader').hide();
            } else {
                // Faster fade helps perceived performance.
                $("#loader").fadeOut(250, function () {
                    $("#preloader").delay(120).fadeOut(250);
                });
            }

            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };


    /* Menu on Scrolldown
     * ------------------------------------------------------ */
    var ssMenuOnScrolldown = function () {

        var hdr = $('.s-header'),
            hdrTop = $('.s-header').offset().top;

        var ticking = false;
        var onScroll = function () {
            if (ticking) return;

            ticking = true;
            window.requestAnimationFrame(function () {
                if ($WIN.scrollTop() > hdrTop) {
                    hdr.addClass('sticky');
                }
                else {
                    hdr.removeClass('sticky');
                }
                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, {
            passive: true
        });
    };


    /* Mobile Menu
     * ---------------------------------------------------- */
    var ssMobileMenu = function () {

        var toggleButton = $('.header-menu-toggle'),
            nav = $('.header-nav-wrap');

        var setMenuState = function (isOpen) {
            toggleButton.toggleClass('is-clicked', isOpen);
            $('body').toggleClass('menu-is-open', isOpen);
            toggleButton.attr('aria-expanded', isOpen ? 'true' : 'false');
        };

        toggleButton.on('click', function (event) {
            event.preventDefault();

            var willOpen = !toggleButton.hasClass('is-clicked');
            setMenuState(willOpen);
            nav.stop(true, true).slideToggle(220);
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function () {
            if (toggleButton.is(':visible')) {
                nav.addClass('mobile');
            } else {
                nav.removeClass('mobile').attr('style', '');
                setMenuState(false);
            }
        });

        nav.find('a').on("click", function () {

            if (nav.hasClass('mobile')) {
                setMenuState(false);
                nav.stop(true, true).slideToggle(220);
            }
        });

    };

    /* Highlight the current section in the navigation bar
     * ------------------------------------------------------ */
    var ssWaypoints = function () {

        var sections = $(".target-section"),
            navigation_links = $(".header-main-nav li a");

        sections.waypoint({

            handler: function (direction) {

                var active_section;

                active_section = $('section#' + this.element.id);

                if (direction === "up") active_section = active_section.prevAll(".target-section").first();

                var active_link = $('.header-main-nav li a[href="#' + active_section.attr("id") + '"]');

                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");

            },

            offset: '25%'

        });

    };


    /* Masonry
     * ---------------------------------------------------- */
    var ssMasonryFolio = function () {

        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });

    };


    /* photoswipe
     * ----------------------------------------------------- */
    var ssPhotoswipe = function () {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

        // get items
        $folioItems.each(function (i) {

            var $folio = $(this),
                $thumbLink = $folio.find('.thumb-link'),
                $title = $folio.find('.item-folio__title'),
                $caption = $folio.find('.item-folio__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width = $size[0],
                $height = $size[1];

            var item = {
                src: $href,
                w: $width,
                h: $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        $folioItems.each(function (i) {

            $(this).find('.thumb-link').on('click', function (e) {
                e.preventDefault();
                var options = {
                    index: i,
                    showHideOpacity: true
                }

                // initialize PhotoSwipe
                var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });
    };


    /* slick slider
     * ------------------------------------------------------ */
    var ssSlickSlider = function () {

        $('.testimonials__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            fade: true,
            cssEase: 'linear'
        });
    };


    /* Smooth Scrolling
     * ------------------------------------------------------ */
    var ssSmoothScroll = function () {

        var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);

            if (!$target.length) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            var targetNode = $target.get(0);

            if (!prefersReducedMotion && targetNode && typeof targetNode.scrollIntoView === 'function') {
                targetNode.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                window.setTimeout(function () {
                    if ($('body').hasClass('menu-is-open')) {
                        $('.header-menu-toggle').trigger('click');
                    }
                    window.location.hash = target;
                }, 280);
                return;
            }

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


    /* Section page-flow motion
     * ------------------------------------------------------ */
    var ssSectionPageFlow = function () {

        var root = document.documentElement;
        var sections = document.querySelectorAll('.target-section');
        var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!sections.length) {
            return;
        }

        root.classList.add('section-flow-enabled');

        sections.forEach(function (section, index) {
            section.style.setProperty('--section-order', index);
        });

        if (prefersReducedMotion) {
            sections.forEach(function (section) {
                section.classList.add('is-section-visible');
            });
            return;
        }

        if ('IntersectionObserver' in window) {
            var sectionObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-section-visible');
                        if (entry.target.id) {
                            document.body.setAttribute('data-active-section', entry.target.id);
                        }
                    }
                });
            }, {
                threshold: 0.24,
                rootMargin: '-8% 0px -10% 0px'
            });

            sections.forEach(function (section) {
                sectionObserver.observe(section);
            });
        } else {
            sections.forEach(function (section) {
                section.classList.add('is-section-visible');
            });
        }
    };


    /* Idle scheduler for non-critical features
     * ------------------------------------------------------ */
    var ssRunWhenIdle = function (fn, timeout) {
        var wait = timeout || 1200;
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(fn, {
                timeout: wait
            });
        } else {
            window.setTimeout(fn, 180);
        }
    };


    /* Alert Boxes
     * ------------------------------------------------------ */
    var ssAlertBoxes = function () {

        $('.alert-box').on('click', '.alert-box__close', function () {
            $(this).parent().fadeOut(500);
        });

    };


    /* Animate On Scroll
     * ------------------------------------------------------ */
    var ssAOS = function () {

        var root = document.documentElement;
        var isLite = root.classList.contains('motion-lite');
        var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        AOS.init({
            offset: 140,
            duration: isLite ? 600 : 760,
            easing: 'ease-in-sine',
            delay: isLite ? 80 : 120,
            once: true,
            disable: prefersReducedMotion
        });

    };

    /* Signature split-text headlines
     * ------------------------------------------------------ */
    var ssSignatureHeadlines = function () {

        var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var targets = document.querySelectorAll('[data-split="letters"]');

        targets.forEach(function (target) {
            if (target.getAttribute('data-split-ready') === 'true') {
                return;
            }

            var text = target.textContent || '';
            var fragment = document.createDocumentFragment();
            var charIndex = 0;

            var words = text.trim().split(/\s+/);

            for (var w = 0; w < words.length; w += 1) {
                var word = words[w];
                var wordSpan = document.createElement('span');
                wordSpan.className = 'signature-word';
                wordSpan.setAttribute('aria-hidden', 'true');

                for (var i = 0; i < word.length; i += 1) {
                    var character = word.charAt(i);
                    var span = document.createElement('span');
                    span.className = 'signature-char';
                    span.setAttribute('aria-hidden', 'true');
                    span.style.setProperty('--char-index', charIndex);
                    span.textContent = character;
                    wordSpan.appendChild(span);
                    charIndex += 1;
                }

                fragment.appendChild(wordSpan);

                if (w < words.length - 1) {
                    var space = document.createElement('span');
                    space.className = 'signature-space';
                    space.setAttribute('aria-hidden', 'true');
                    space.textContent = ' ';
                    fragment.appendChild(space);
                }
            }

            target.setAttribute('aria-label', text.trim());
            target.textContent = '';
            target.appendChild(fragment);
            target.setAttribute('data-split-ready', 'true');
        });

        if (prefersReducedMotion) {
            targets.forEach(function (target) {
                target.classList.add('is-animated');
            });
            return;
        }

        if ('IntersectionObserver' in window) {
            var titleObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.35
            });

            targets.forEach(function (target) {
                titleObserver.observe(target);
            });
        } else {
            targets.forEach(function (target) {
                target.classList.add('is-animated');
            });
        }
    };


    /* Extra attention-grabbing motion
     * ------------------------------------------------------ */
    var ssAttentionMotion = function () {

        var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var isLite = document.documentElement.classList.contains('motion-lite');

        var baseTargets = isLite
            ? document.querySelectorAll('.reveal-on-scroll')
            : document.querySelectorAll('.s-about .row, .s-services .row, .s-works .row, .s-contact .row, .collection-item, .item-service');
        var revealTargets = document.querySelectorAll('.reveal-on-scroll');
        var animatedTargets = Array.prototype.slice.call(baseTargets);

        revealTargets.forEach(function (node) {
            if (animatedTargets.indexOf(node) === -1) {
                animatedTargets.push(node);
            }
        });

        if (prefersReducedMotion) {
            animatedTargets.forEach(function (node) {
                node.classList.add('is-visible');
            });
            return;
        }

        var staggerStep = isLite ? 48 : 66;
        animatedTargets.forEach(function (node, index) {
            node.classList.add('reveal-on-scroll');
            node.style.setProperty('--reveal-delay', ((index % 8) * staggerStep) + 'ms');
        });

        if ('IntersectionObserver' in window) {
            var revealObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.16,
                rootMargin: '0px 0px -8% 0px'
            });

            animatedTargets.forEach(function (node) {
                revealObserver.observe(node);
            });
        } else {
            animatedTargets.forEach(function (node) {
                node.classList.add('is-visible');
            });
        }

        var introSection = document.querySelector('.s-intro');
        if (!introSection || window.innerWidth < 900 || isLite) {
            return;
        }

        var targetX = 50;
        var targetY = 38;
        var currentX = targetX;
        var currentY = targetY;
        var frameId = null;

        var updateIntroLight = function () {
            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;

            introSection.style.setProperty('--pointer-x', currentX.toFixed(2) + '%');
            introSection.style.setProperty('--pointer-y', currentY.toFixed(2) + '%');

            if (Math.abs(currentX - targetX) > 0.05 || Math.abs(currentY - targetY) > 0.05) {
                frameId = window.requestAnimationFrame(updateIntroLight);
            } else {
                frameId = null;
            }
        };

        var queueFrame = function () {
            if (!frameId) {
                frameId = window.requestAnimationFrame(updateIntroLight);
            }
        };

        introSection.addEventListener('pointermove', function (event) {
            var rect = introSection.getBoundingClientRect();
            targetX = Math.max(8, Math.min(92, ((event.clientX - rect.left) / rect.width) * 100));
            targetY = Math.max(8, Math.min(92, ((event.clientY - rect.top) / rect.height) * 100));
            queueFrame();
        });

        introSection.addEventListener('pointerleave', function () {
            targetX = 50;
            targetY = 38;
            queueFrame();
        });
    };


    /* Language switcher (EN/IT)
     * ------------------------------------------------------ */
    var ssLanguageSwitcher = function () {

        var toggle = document.getElementById('lang-toggle');
        if (!toggle) {
            return;
        }

        var root = document.documentElement;
        var freeTextNodes = [];
        var activeLang = null;
        var projectDescriptionMap = [
            {
                match: /Neural\s*Network/i,
                it: 'L\'obiettivo del progetto e creare da zero le S-shaped Rectified Linear Units (SReLU) e confrontarle con altre funzioni di attivazione, analizzando prestazioni e comportamento di diverse reti neurali convoluzionali. Il confronto viene svolto tra funzioni non saturanti come ReLU, Leaky ReLU, PReLU e SReLU; inoltre sono state testate anche funzioni di attivazione esponenziali.'
            },
            {
                match: /Mobile\s*&\s*Cloud/i,
                it: 'Il progetto propone un\'app mobile per lettori: permette di salvare frasi, tracciare i libri letti, gestire preferenze e confrontarsi con gli amici. L\'app Android usa autenticazione Firebase e integra funzionalita home, profilo e impostazioni. Il backend e realizzato in Node.js con API REST e database cloud MongoDB per gestire richieste e persistenza dati.'
            },
            {
                match: /Seminars/i,
                it: 'Questa presentazione analizza il paper su Remote Core Locking (RCL), una tecnica per migliorare le prestazioni delle sezioni critiche in applicazioni multicore. Il lavoro confronta colli di bottiglia, contesa sui lock, cache miss e strategie alternative, mostrando quando RCL offre vantaggi rispetto ad altri algoritmi. Sono inclusi principi di runtime, limiti, metriche e possibili evoluzioni architetturali.'
            },
            {
                match: /\bHCI\b/i,
                it: 'Il progetto HCI descrive la progettazione di un\'app per connettere persone con la stessa passione sportiva, consentendo la creazione e la partecipazione a eventi. Sono presenti documenti di analisi e iterazioni progettuali in LaTeX/Overleaf. L\'obiettivo e favorire comunita, challenge e condivisione di progressi sportivi.'
            },
            {
                match: /\bML\b/i,
                it: 'La sezione raccoglie due homework di Machine Learning con report e codice. Il primo riguarda classificazione tradizionale con varianti di feature extraction e tuning; il secondo affronta classificazione immagini con CNN da zero e transfer learning. I risultati sono valutati con metriche standard e analisi comparativa dei modelli migliori.'
            },
            {
                match: /\bNI\b/i,
                it: 'I tre homework di Network and Internet coprono configurazione e gestione di reti LAN/WAN in ambienti Unix-like con Netkit. I temi principali includono addressing, DHCP, NAT, routing statico e OSPF, oltre a SSH, VPN, DNS e strumenti di debug. Sono disponibili requisiti, soluzioni e appunti per la preparazione scritta.'
            },
            {
                match: /Web\s*Information\s*Retrival|Web\s*Information\s*Retrieval/i,
                it: 'Il progetto mira a rilevare situazioni di emergenza in tempo reale analizzando flussi di tweet tramite machine learning. La pipeline include preprocessing testuale, pesatura TF-IDF, clustering e classificazione SVM per distinguere contenuti rilevanti e non rilevanti. E disponibile anche il paper completo con metodologia e risultati sperimentali.'
            },
            {
                match: /Sistemi\s*Operativi/i,
                it: 'Progetto client-server in linguaggio C sviluppato in ambiente Linux, con comunicazione affidabile su TCP e socket Berkeley. Il caso d\'uso e la prenotazione di una sala cinema con gestione mappa posti, conferma/cancellazione e supporto multi-client tramite server multithread. La persistenza viene gestita tramite file system.'
            },
            {
                match: /Ing\.\s*Internet,\s*Web/i,
                it: 'Progetto client-server in C per trasferimento affidabile di file su UDP, implementando meccanismi applicativi di affidabilita (selective repeat). Il sistema supporta operazioni list, get e put per consultazione e sincronizzazione file tra client e server. La comunicazione usa socket Berkeley e messaggi request/response.'
            },
            {
                match: /Ing\s*Software\s*Web/i,
                it: 'Applicazione web e desktop basata su pattern BCE per la gestione di prenotazioni accademiche (esami, eventi, sessioni). Il sistema definisce ruoli utente con permessi diversi e usa JDBC per l\'integrazione col database. Sono stati implementati diversi use case con test JUnit e componenti concorrenti per simulare prenotazioni automatiche.'
            },
            {
                match: /Mobile\s*Programming/i,
                it: 'Progetto Android sviluppato in Android Studio con focus sulla gestione delle gare e relativa prenotazione runner. Dopo autenticazione, l\'app comunica con backend tramite API REST e JSON per scambio dati. L\'obiettivo e realizzare un flusso mobile completo per visualizzazione e booking di eventi sportivi.'
            },
            {
                match: /Basi\s*di\s*dati/i,
                it: 'Progetto Java desktop con Eclipse/SceneBuilder per importare dati CSV in database PostgreSQL, con modellazione e documentazione UML. L\'applicazione distingue ruoli Administrator/User e usa JDBC per accesso dati. Sono stati applicati pattern MVC e Singleton con test JUnit e deliverable completi di analisi e dump DB.'
            }
        ];
        var metaDescription = document.querySelector('meta[name="description"]');
        var ogDescription = document.querySelector('meta[property="og:description"]');
        var twitterDescription = document.querySelector('meta[name="twitter:description"]');
        var menuToggle = document.querySelector('.header-menu-toggle');
        var freeTextPhraseMap = [
            ['Software projects, data engineering, cloud architecture and automation. Explore my work and professional journey.', 'Progetti software, data engineering, cloud architecture e automazione. Esplora i miei lavori e il mio percorso professionale.'],
            ['I\'m a 30-year-old computer science engineer with a strong passion for data science, cloud systems and digital infrastructure.', 'Sono un ingegnere informatico di 30 anni con una forte passione per data science, sistemi cloud e infrastrutture digitali.'],
            ['-I\'m a 30-year-old computer science engineer with a strong passion for data science, cloud systems and digital infrastructure.', '-Sono un ingegnere informatico di 30 anni con una forte passione per data science, sistemi cloud e infrastrutture digitali.'],
            ['-I’m a 30-year-old computer science engineer with a strong passion for data science, cloud systems and digital infrastructure.', '-Sono un ingegnere informatico di 30 anni con una forte passione per data science, sistemi cloud e infrastrutture digitali.'],
            ['Strong background in engineering, mathematics, statistics and algorithmic thinking.', 'Solida preparazione in ingegneria, matematica, statistica e pensiero algoritmico.'],
            ['Self-motivated team player with clear communication and organizational skills.', 'Team player proattivo con comunicazione chiara e forti competenze organizzative.'],
            ['Constantly exploring new technologies and patterns to improve delivery quality.', 'Esploro costantemente nuove tecnologie e pattern per migliorare la quality del delivery.'],
            ['I graduated from Liceo Scientifico Cavour in 2014, then earned my Bachelor\'s degree in Computer Science Engineering at University of Tor Vergata (2019), followed by my Master\'s degree in Computer Science Engineering at La Sapienza University (20 October 2021).', 'Mi sono diplomato al Liceo Scientifico Cavour nel 2014, poi ho conseguito la laurea triennale in Ingegneria Informatica presso l\'Universita di Tor Vergata (2019), seguita dalla laurea magistrale in Ingegneria Informatica presso La Sapienza (20 ottobre 2021).'],
            ['I enjoy discussing ideas, comparing approaches with peers and building efficient digital products: cyber-physical systems, data lakes, data warehouses, machine learning solutions and software applications designed to improve daily life through technology.', 'Mi piace discutere idee, confrontare approcci con i colleghi e costruire prodotti digitali efficienti: sistemi cyber-fisici, data lake, data warehouse, soluzioni di machine learning e applicazioni software pensate per migliorare la vita quotidiana tramite la tecnologia.'],
            ['I\'m focused on growing both technical and management capabilities. In my spare time I love exploring new places and landscapes around the world.', 'Sono focalizzato sulla crescita sia tecnica sia manageriale. Nel tempo libero adoro esplorare nuovi luoghi e paesaggi nel mondo.'],
            ['As Data Engineer, I support teams across application, platform and delivery streams:', 'Come Data Engineer, supporto i team tra application, platform e stream di delivery:'],
            ['As Solution Developer, I contributed to:', 'Come Solution Developer, ho contribuito a:'],
            ['The task of the project is to create S-shaped Rectified Linear Units(SReLU) from scratch and make a comparison with others activation functions, analyzing performance and behaviour of defferent convolutional neural network. The comparison is done between different non saturated activation function like ReLU and others Leaky ReLU, PReLU and SReLU, in addition to this also exponential activation functions have been tested.', 'L\'obiettivo del progetto e creare da zero le S-shaped Rectified Linear Units (SReLU) e confrontarle con altre funzioni di attivazione, analizzando prestazioni e comportamento di diverse reti neurali convoluzionali. Il confronto viene svolto tra funzioni di attivazione non saturanti come ReLU, Leaky ReLU, PReLU e SReLU; inoltre sono state testate anche funzioni di attivazione esponenziali.'],
            ['Master\'s Degree Projects', 'Progetti Laurea Magistrale'],
            ['Bachelor\'s Degree Projects', 'Progetti Laurea Triennale'],
            ['Knowledge and Soft Skills', 'Conoscenze e Soft Skills'],
            ['Based in Rome', 'Basato a Roma'],
            ['Computer Science Engineering', 'Ingegneria Informatica'],
            ['Analytical Mindset', 'Mentalita Analitica'],
            ['Team Collaboration', 'Collaborazione in Team'],
            ['Technical Skills', 'Competenze Tecniche'],
            ['Programming Skills', 'Competenze di Programmazione'],
            ['Publications', 'Pubblicazioni'],
            ['Research Highlights', 'Punti Chiave della Ricerca'],
            ['Soft Skills', 'Soft Skills'],
            ['How I Work With Teams', 'Come Lavoro con i Team'],
            ['A people-first mindset focused on delivery quality, ownership and clear communication.', 'Un approccio people-first orientato alla qualita del delivery, alla responsabilita e alla comunicazione chiara.'],
            ['Current role', 'Ruolo attuale'],
            ['Junior Information Technology', 'Junior Information Technology'],
            ['Master\'s Degree on Engineering in Computer Science', 'Laurea Magistrale in Ingegneria Informatica'],
            ['Bachelor\'s Degree on Engineering in Computer Science', 'Laurea Triennale in Ingegneria Informatica'],
            ['Address: Software & Web System', 'Indirizzo: Software e Sistemi Web'],
            ['Master\'s thesis:', 'Tesi magistrale:'],
            ['Time range:', 'Periodo:'],
            ['Read publication', 'Leggi pubblicazione'],
            ['Professional Certifications', 'Certificazioni Professionali'],
            ['Updated badges and certificates portfolio', 'Portfolio aggiornato di badge e certificazioni'],
            ['Centralized archive of all certifications and continuous learning milestones.', 'Archivio centralizzato di tutte le certificazioni e dei traguardi di apprendimento continuo.'],
            ['Using Social Media to Enhance Emergency Situation Awareness', 'Uso dei Social Media per migliorare la consapevolezza nelle situazioni di emergenza'],
            ['Technical paper and experiment report', 'Paper tecnico e report sperimentale'],
            ['Work focused on real-time emergency detection from tweets using preprocessing, TF-IDF, clustering and SVM.', 'Lavoro focalizzato sul rilevamento in tempo reale di emergenze da tweet usando preprocessing, TF-IDF, clustering e SVM.'],
            ['Leadership by Example', 'Leadership con l\'Esempio'],
            ['Strategic Communication', 'Comunicazione Strategica'],
            ['Problem Solving', 'Risoluzione Problemi'],
            ['Collaboration', 'Collaborazione'],
            ['Adaptability', 'Adattabilita'],
            ['Continuous Learning', 'Apprendimento Continuo'],
            ['Drive initiatives by execution, mentoring and transparent decision-making.', 'Guido iniziative tramite esecuzione, mentoring e decisioni trasparenti.'],
            ['Translate complex engineering topics into actionable business language.', 'Traduco temi ingegneristici complessi in linguaggio operativo per il business.'],
            ['Break down ambiguity into measurable steps and reproducible solutions.', 'Scompongo l\'ambiguita in passi misurabili e soluzioni riproducibili.'],
            ['Align cross-functional teams around shared milestones and outcomes.', 'Allineo team cross-funzionali su milestone e risultati condivisi.'],
            ['Quickly adjust priorities and architecture choices to evolving contexts.', 'Adatto rapidamente priorita e scelte architetturali a contesti in evoluzione.'],
            ['Keep improving through feedback loops, experimentation and knowledge sharing.', 'Miglioro continuamente tramite feedback, sperimentazione e condivisione della conoscenza.'],
            ['Ownership', 'Responsabilita'],
            ['Empathy', 'Empatia'],
            ['Reliability', 'Affidabilita'],
            ['Critical Thinking', 'Pensiero Critico'],
            ['Facilitation', 'Facilitazione'],
            ['Storytelling', 'Storytelling'],
            ['Read publication', 'Leggi pubblicazione'],
            ['Read full paper', 'Leggi il paper completo'],
            ['Open Credly profile', 'Apri profilo Credly'],
            ['Paper Archive', 'Archivio Paper'],
            ['Read thesis overview', 'Leggi panoramica tesi'],
            ['Project delivered for the course of', 'Progetto sviluppato per il corso di'],
            ['Project made for the course of', 'Progetto realizzato per il corso di'],
            ['Homeworks delivered for the course of', 'Esercizi svolti per il corso di'],
            ['Presentation made for the course of', 'Presentazione realizzata per il corso di'],
            ['Course Project:', 'Progetto del corso:'],
            ['Course Work:', 'Esercizi del corso:'],
            ['Seminar Presentation:', 'Presentazione seminario:'],
            ['Repository', 'Repository'],
            ['Presentation', 'Presentazione'],
            ['Paper', 'Paper'],
            ['Data set', 'Dataset'],
            ['Blind test set', 'Test set cieco'],
            ['Report', 'Report'],
            ['Code', 'Codice'],
            ['Requirement of', 'Requisiti di'],
            ['Solution', 'Soluzione'],
            ['Question and Answer for written part', 'Domande e risposte per la parte scritta'],
            ['Notes of NetKit + written exam\'s Question and answer', 'Note NetKit + domande e risposte esame scritto'],
            ['Current role', 'Ruolo attuale'],
            ['Fast response window: ~24h', 'Tempo medio di risposta: ~24h'],
            ['Rome, Italy · Remote + Hybrid', 'Roma, Italia · Remoto + Ibrido'],
            ['November 2022- Present', 'Novembre 2022 - Oggi'],
            ['December 2021- November 2022', 'Dicembre 2021 - Novembre 2022'],
            ['February 2019- October 2021', 'Febbraio 2019 - Ottobre 2021'],
            ['September 2014 - Februrary 2019', 'Settembre 2014 - Febbraio 2019'],
            ['September 2009 - July 2014', 'Settembre 2009 - Luglio 2014']
        ];
        var compiledFreeTextMap = [];

        var escapeRegex = function (text) {
            return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        };

        var collectFreeTextNodes = function () {
            var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
                acceptNode: function (node) {
                    if (!node || !node.parentElement) return NodeFilter.FILTER_REJECT;
                    var value = (node.nodeValue || '').trim();
                    if (!value) return NodeFilter.FILTER_REJECT;
                    if (node.parentElement.closest('[data-i18n]')) return NodeFilter.FILTER_REJECT;
                    var tagName = node.parentElement.tagName;
                    if (tagName === 'SCRIPT' || tagName === 'STYLE' || tagName === 'NOSCRIPT') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            });

            freeTextNodes = [];
            var current;
            while ((current = walker.nextNode())) {
                freeTextNodes.push({
                    node: current,
                    original: current.nodeValue
                });
            }
        };

        var translateLooseText = function (text, lang) {
            if (lang !== 'it') {
                return text;
            }

            var translated = text;
            compiledFreeTextMap.forEach(function (entry) {
                translated = translated.replace(entry.regex, entry.to);
            });

            return translated;
        };

        var applyFreeTextTranslations = function (lang) {
            freeTextNodes.forEach(function (item) {
                if (!item || !item.node) return;

                if (lang !== 'it') {
                    if (item.node.nodeValue !== item.original) {
                        item.node.nodeValue = item.original;
                    }
                    return;
                }

                var translated = translateLooseText(item.original, lang);
                if (translated !== item.node.nodeValue) {
                    item.node.nodeValue = translated;
                }
            });
        };

        var applyProjectDescriptions = function (lang) {
            var cards = document.querySelectorAll('#works .collection-item.avatar');

            cards.forEach(function (card) {
                var titleNode = card.querySelector('.collapsible');
                if (!titleNode) return;

                var titleText = (titleNode.textContent || '').replace(/\s+/g, ' ').trim();
                var matchEntry = null;

                for (var i = 0; i < projectDescriptionMap.length; i += 1) {
                    if (projectDescriptionMap[i].match.test(titleText)) {
                        matchEntry = projectDescriptionMap[i];
                        break;
                    }
                }

                if (!matchEntry) return;

                var emNode = card.querySelector('.content em');
                if (!emNode) return;

                if (!emNode.dataset.originalContent) {
                    emNode.dataset.originalContent = emNode.innerHTML;
                }

                if (lang === 'it') {
                    emNode.innerHTML = matchEntry.it;
                } else {
                    emNode.innerHTML = emNode.dataset.originalContent;
                }
            });
        };
        var translations = {
            en: {
                title: 'Andrea Lombardo | Data & DevOps Engineer Portfolio',
                description: 'Official portfolio of Andrea Lombardo, Data & DevOps Engineer. Projects, skills, publications, certifications and contacts.',
                nav_intro: 'Intro',
                nav_about: 'About',
                nav_projects: 'Projects',
                nav_skills: 'Skills Acquired',
                nav_contact: 'Contact me',
                intro_kicker: 'Data & DevOps Engineer',
                intro_summary: 'Software projects, data engineering, cloud architecture and automation. Explore my work and professional journey.',
                intro_cta_projects: 'View Projects',
                intro_cta_contact: 'Contact Me',
                intro_scroll: 'Scroll and enjoy',
                about_heading: 'About Me',
                about_cta_contact: 'Contact me',
                about_cta_cv: 'Download CV',
                work_education_heading: 'Work & Education',
                portfolio_heading: 'Portfolio',
                skills_heading: 'Knowledge and Soft Skills',
                skills_desc: 'Research output, communication strengths and delivery mindset.',
                contact_heading: 'Get In Touch',
                contact_desc: 'Direct channel for focused collaborations.',
                contact_eyebrow: 'Direct Channel Online',
                contact_title: 'Build Something Bold',
                contact_copy: 'Data, cloud and DevOps delivery with fast execution and clean architecture.',
                contact_cta_email: 'Open Email Channel',
                contact_response: 'Fast response window: ~24h',
                contact_location: 'Rome, Italy · Remote + Hybrid',
                contact_quick_sync: 'Quick Sync'
            },
            it: {
                title: 'Andrea Lombardo | Portfolio Data & DevOps Engineer',
                description: 'Portfolio ufficiale di Andrea Lombardo, Data & DevOps Engineer. Progetti, competenze, pubblicazioni, certificazioni e contatti.',
                nav_intro: 'Intro',
                nav_about: 'Chi Sono',
                nav_projects: 'Progetti',
                nav_skills: 'Competenze',
                nav_contact: 'Contatti',
                intro_kicker: 'Data & DevOps Engineer',
                intro_summary: 'Progetti software, data engineering, cloud architecture e automazione. Esplora i miei lavori e il mio percorso professionale.',
                intro_cta_projects: 'Vedi Progetti',
                intro_cta_contact: 'Contattami',
                intro_scroll: 'Scorri e scopri',
                about_heading: 'Chi Sono',
                about_cta_contact: 'Contattami',
                about_cta_cv: 'Scarica CV',
                work_education_heading: 'Esperienza e Formazione',
                portfolio_heading: 'Portfolio',
                skills_heading: 'Conoscenze e Soft Skills',
                skills_desc: 'Pubblicazioni, comunicazione efficace e orientamento al delivery.',
                contact_heading: 'Parliamone',
                contact_desc: 'Canale diretto per collaborazioni mirate.',
                contact_eyebrow: 'Canale Diretto Online',
                contact_title: 'Costruiamo Qualcosa di Forte',
                contact_copy: 'Data, cloud e DevOps con esecuzione rapida e architetture pulite.',
                contact_cta_email: 'Apri Canale Email',
                contact_response: 'Tempo medio di risposta: ~24h',
                contact_location: 'Roma, Italia · Remoto + Ibrido',
                contact_quick_sync: 'Call Rapida'
            }
        };

        var safeStorageGet = function (key) {
            try {
                return window.localStorage.getItem(key);
            } catch (e) {
                return null;
            }
        };

        var safeStorageSet = function (key, value) {
            try {
                window.localStorage.setItem(key, value);
            } catch (e) {
                // ignore storage errors
            }
        };

        var applyLanguage = function (lang, force) {
            if (!force && activeLang === lang) {
                return;
            }

            var dict = translations[lang] || translations.en;
            var nodes = document.querySelectorAll('[data-i18n]');

            nodes.forEach(function (node) {
                var key = node.getAttribute('data-i18n');
                if (dict[key]) {
                    node.textContent = dict[key];
                }
            });

            document.title = dict.title;
            if (metaDescription) metaDescription.setAttribute('content', dict.description);
            if (ogDescription) ogDescription.setAttribute('content', dict.description);
            if (twitterDescription) twitterDescription.setAttribute('content', dict.description);
            if (menuToggle) {
                menuToggle.setAttribute('aria-label', lang === 'it' ? 'Apri menu di navigazione' : 'Open navigation menu');
            }

            var skillsSplitHeading = document.querySelector('#Capabilities .signature-headline[data-split="letters"]');
            if (skillsSplitHeading) {
                skillsSplitHeading.textContent = dict.skills_heading;
                skillsSplitHeading.removeAttribute('data-split-ready');
                ssSignatureHeadlines();
            }

            root.setAttribute('lang', lang);
            safeStorageSet('site-language', lang);
            applyFreeTextTranslations(lang);
            applyProjectDescriptions(lang);

            toggle.classList.toggle('is-en', lang === 'en');
            toggle.classList.toggle('is-it', lang === 'it');
            toggle.setAttribute('aria-label', lang === 'it' ? 'Switch to English' : 'Passa in italiano');

            activeLang = lang;
        };

        var applyCurrentLanguage = function () {
            var current = root.getAttribute('lang') === 'it' ? 'it' : 'en';
            applyLanguage(current);
        };

        var stored = safeStorageGet('site-language');
        var initialLang = (stored === 'it' || stored === 'en') ? stored : 'en';

        compiledFreeTextMap = freeTextPhraseMap
            .slice()
            .sort(function (a, b) {
                return b[0].length - a[0].length;
            })
            .map(function (entry) {
                var from = entry[0] || '';
                var tokens = from.trim().split(/\s+/).map(escapeRegex);
                var pattern = tokens.join('\\s+');
                return {
                    regex: new RegExp(pattern, 'gi'),
                    to: entry[1]
                };
            });

        collectFreeTextNodes();
        applyLanguage(initialLang);

        // Expose helpers for dynamic sections updated outside main.js (e.g. project accordion normalization).
        window.refreshSiteLanguageNodes = function () {
            collectFreeTextNodes();
            var current = root.getAttribute('lang') === 'it' ? 'it' : 'en';
            applyLanguage(current, true);
        };

        window.applyCurrentSiteLanguage = function () {
            applyCurrentLanguage();
        };

        toggle.addEventListener('click', function () {
            var nextLang = root.getAttribute('lang') === 'it' ? 'en' : 'it';
            applyLanguage(nextLang);
        });
    };


    /* Initialize
     * ------------------------------------------------------ */
    (function clInit() {

        ssAdaptiveMotionProfile();
        ssPreloader();
        ssMenuOnScrolldown();
        ssMobileMenu();
        ssSmoothScroll();
        ssAlertBoxes();
        ssLanguageSwitcher();
        ssSignatureHeadlines();
        ssSectionPageFlow();

        ssRunWhenIdle(function () {
            ssWaypoints();
            ssMasonryFolio();
            ssPhotoswipe();
            ssSlickSlider();
            ssAOS();
            ssAttentionMotion();
        }, 1400);

    })();

})(jQuery);