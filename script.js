/* Utility Functions */
function toggleElement(element, show, ariaHidden = false) {
    element.style.display = show ? 'flex' : 'none';
    if (ariaHidden !== false) {
        element.setAttribute('aria-hidden', !show);
    }
}

/* Navigation Functions */
function initSmoothScroll() {
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            document.querySelector('.nav-links').classList.remove('active');
            const hamburger = document.querySelector('.hamburger');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        const isActive = !navLinks.classList.contains('active');
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

/* Form Handling */
function initForms() {
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');
    const modal = document.getElementById('form-modal');
    const modalClose = document.querySelector('.modal-close');
    const formError = document.getElementById('form-error');

    function handleFormSubmit(form, isNewsletter = false) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const email = formData.get('email');
            const name = formData.get('name') || '';
            const message = formData.get('message') || '';

            if (email && (!isNewsletter || email) && (!name || name.trim()) && (!message || message.trim())) {
                console.log(isNewsletter ? 'Newsletter Subscribed:' : 'Form Submitted:', { name, email, message });
                toggleElement(modal, true, true);
                modal.querySelector('p').textContent = isNewsletter 
                    ? 'Thank you for subscribing! Stay tuned for updates.'
                    : 'Thank you for your message! We’ll respond within 24 hours.';
                this.reset();
                formError.style.display = 'none';
            } else {
                formError.style.display = 'block';
                formError.textContent = 'Please fill out all required fields correctly.';
            }
        });
    }

    handleFormSubmit(contactForm);
    handleFormSubmit(newsletterForm, true);

    modalClose.addEventListener('click', () => toggleElement(modal, false, true));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) toggleElement(modal, false, true);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            toggleElement(modal, false, true);
        }
    });
}

/* Lazy Load Images */
function initLazyLoad() {
    const images = document.querySelectorAll('.gallery img, .specials img');
    const options = {
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, options);

    images.forEach(img => observer.observe(img));
}

/* Back to Top Button */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => backToTop.style.display = 'none', 300);
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* Preloader */
function initPreloader() {
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    });
}

/* Cookie Consent */
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptButton = document.getElementById('cookie-accept');

    if (!localStorage.getItem('cookieConsent')) {
        toggleElement(cookieConsent, true, true);
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        toggleElement(cookieConsent, false, true);
    });
}

/* Dark Mode Toggle */
function initDarkMode() {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        toggleButton.querySelector('.icon').textContent = '☀️';
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        toggleButton.querySelector('.icon').textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });
}

/* Initialize All Functions */
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initHamburgerMenu();
    initForms();
    initLazyLoad();
    initBackToTop();
    initPreloader();
    initCookieConsent();
    initDarkMode();
});