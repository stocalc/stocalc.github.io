// Shared nav + effects used on every page

// Create animated particle background
function createParticleBackground() {
    const container = document.createElement('div');
    container.className = 'particle-background';
    document.body.insertBefore(container, document.body.firstChild);

    const symbols = ['∫', '∂', 'Σ', 'π', 'λ', 'μ', 'σ', 'Δ', '∞', 'θ', 'α', 'β', 'ρ', 'ε', 'ω'];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top  = Math.random() * 100 + '%';
        particle.style.animationDuration = (15 + Math.random() * 15) + 's';
        particle.style.animationDelay    = Math.random() * 5 + 's';
        particle.style.fontSize          = (15 + Math.random() * 25) + 'px';

        container.appendChild(particle);
    }
}

// 3D Tilt effect for cards (home page)
function init3DTilt() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 10;
            const rotateY = (rect.width / 2 - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// Scroll reveal animation
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .card, .instructor-card, .info-box').forEach(el => {
        if (!el.dataset.revealed) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.dataset.revealed = 'true';
        }
        observer.observe(el);
    });
}

// Highlight the active nav link based on current page filename
function highlightActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === page) {
            a.classList.add('active');
        }
    });
}

window.addEventListener('load', () => {
    createParticleBackground();
    init3DTilt();
    highlightActiveNav();
    setTimeout(initScrollReveal, 100);
});

// Add this to js/nav.js (or paste into your existing nav.js)

(function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    const icon = toggle.querySelector('i');

    function closeMenu() {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }

    function openMenu() {
        links.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    }

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (links.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when a link is tapped
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', closeMenu);
    });

    // Close when clicking outside the nav
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) closeMenu();
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // Close if the viewport grows past mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
})();
