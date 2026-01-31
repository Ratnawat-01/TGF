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

    // Hero Text Animation
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const textNodes = Array.from(heroTitle.childNodes);
        heroTitle.innerHTML = ''; // Clear existing content

        let globalDelay = 0;
        const delayIncrement = 0.05; // Delay between characters in seconds

        textNodes.forEach(node => {
            if (node.nodeType === 3) { // Text node
                const text = node.textContent;
                for (let char of text) {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.className = 'char-animate';
                    span.style.animationDelay = `${globalDelay}s`;
                    heroTitle.appendChild(span);
                    globalDelay += delayIncrement;
                }
            } else if (node.nodeType === 1) { // Element node (e.g., BR or SPAN)
                if (node.tagName === 'BR') {
                    heroTitle.appendChild(node.cloneNode(true));
                    // No delay increment for breaks, or maybe a small pause?
                } else {
                    // For nested spans (like the red text), we need to split their content too
                    const innerSpan = document.createElement('span');
                    // Copy attributes (class, style, etc.)
                   Array.from(node.attributes).forEach(attr => {
                        innerSpan.setAttribute(attr.name, attr.value);
                   });
                   
                   const innerText = node.textContent;
                   for (let char of innerText) {
                       const charSpan = document.createElement('span');
                       charSpan.textContent = char;
                       charSpan.className = 'char-animate';
                       charSpan.style.animationDelay = `${globalDelay}s`;
                       innerSpan.appendChild(charSpan);
                       globalDelay += delayIncrement;
                   }
                   heroTitle.appendChild(innerSpan);
                }
            }
        });
    }
});
