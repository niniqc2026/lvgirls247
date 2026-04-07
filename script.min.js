// ========================================
// ACE Mobile Massage — Interactive Features
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const floatingCta = document.getElementById('floatingCta');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 60;
        navbar.classList.toggle('scrolled', scrolled);
        floatingCta.classList.toggle('visible', window.scrollY > 400);
    });

    // --- Mobile menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // --- FAQ accordion ---
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Scroll animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to animated elements
    const animatedSelectors = [
        '.therapist-card',
        '.service-card',
        '.pricing-card',
        '.about-card',
        '.review-card',
        '.faq-item',
        '.booking-contact-card',
        '.blog-card',
        '.article-header',
        '.article-cta',
        '.section-title',
        '.section-desc',
        '.vegas-exp-card'
    ];

    animatedSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${i * 0.08}s`;
            observer.observe(el);
        });
    });

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // --- Smooth scroll for all anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Scroll Indicator fade on scroll ---
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            scrollIndicator.classList.toggle('hidden', window.scrollY > 100);
        });
    }

    // --- Social Proof Ticker ---
    const tickerEl = document.getElementById('tickerMessage');
    if (tickerEl) {
        const messages = [
            '14 sessions booked today in Las Vegas',
            'Last booking just 8 minutes ago',
            'Therapists currently available on the Strip',
            '5-star rated on Google — 100% satisfaction',
            'Serving Bellagio, Wynn, Venetian & more tonight'
        ];
        let msgIndex = 0;
        tickerEl.textContent = messages[0];

        setInterval(() => {
            tickerEl.classList.add('fade-out');
            setTimeout(() => {
                msgIndex = (msgIndex + 1) % messages.length;
                tickerEl.textContent = messages[msgIndex];
                tickerEl.classList.remove('fade-out');
            }, 400);
        }, 3500);
    }

    // --- Animated Stats Counter ---
    const statNums = document.querySelectorAll('.stat-num[data-count]');
    if (statNums.length) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNums.forEach(el => statsObserver.observe(el));

        function animateCounter(el) {
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            const isDecimal = el.dataset.decimal === 'true';
            const duration = 1800;
            const start = performance.now();
            el.classList.add('counting');

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                let current = eased * target;

                if (isDecimal) {
                    current = current.toFixed(1);
                } else {
                    current = Math.floor(current);
                    if (current >= 1000) {
                        current = current.toLocaleString();
                    }
                }

                el.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.classList.remove('counting');
                }
            }
            requestAnimationFrame(update);
        }
    }

});
