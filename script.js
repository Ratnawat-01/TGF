document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');
    const bottomCta = document.querySelector('.mobile-bottom-cta');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Hide/Show CTA based on menu state
        if (navLinks.classList.contains('active')) {
            bottomCta.classList.add('hidden');
        } else {
            bottomCta.classList.remove('hidden');
        }
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            bottomCta.classList.remove('hidden'); // Ensure CTA shows when navigating
        });
    });

    // Smooth Scroll with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Header height is approx 80px
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Animation (Fade In)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.feature-card, .service-card, .review-card, .gallery-item, .info-column');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Scroll Logic for Bottom CTA
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        // If menu is open, keep CTA hidden and do nothing
        if (navLinks.classList.contains('active')) {
            bottomCta.classList.add('hidden');
            return;
        }

        const currentScrollY = window.scrollY;

        // Scroll Down -> Hide
        if (currentScrollY > lastScrollY + 10) {
            bottomCta.classList.add('hidden');
        }
        // Scroll Up -> Show
        else if (currentScrollY < lastScrollY - 10) {
            bottomCta.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    });
});
