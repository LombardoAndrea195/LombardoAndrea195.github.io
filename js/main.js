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

        $WIN.on('scroll', function () {

            if ($WIN.scrollTop() > hdrTop) {
                hdr.addClass('sticky');
            }
            else {
                hdr.removeClass('sticky');
            }

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

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);

            e.preventDefault();
            e.stopPropagation();

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

        var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        AOS.init({
            offset: 140,
            duration: 720,
            easing: 'ease-in-sine',
            delay: 120,
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

        var baseTargets = document.querySelectorAll('.s-about .row, .s-services .row, .s-works .row, .s-contact .row, .collection-item, .item-service');
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

        animatedTargets.forEach(function (node, index) {
            node.classList.add('reveal-on-scroll');
            node.style.setProperty('--reveal-delay', ((index % 6) * 80) + 'ms');
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
        if (!introSection || window.innerWidth < 900) {
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


    /* Initialize
     * ------------------------------------------------------ */
    (function clInit() {

        ssPreloader();
        ssMenuOnScrolldown();
        ssMobileMenu();
        ssWaypoints();
        ssMasonryFolio();
        ssPhotoswipe();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssSignatureHeadlines();
        ssAOS();
        ssAttentionMotion();

    })();

})(jQuery);