// Page navigation function
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(pageId).classList.add('active');
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Re-initialize effects after page change
    setTimeout(() => {
        init3DTilt();
        initScrollReveal();
    }, 100);
}

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
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation duration and delay
        particle.style.animationDuration = (15 + Math.random() * 15) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Random font size
        particle.style.fontSize = (15 + Math.random() * 25) + 'px';
        
        container.appendChild(particle);
    }
}

// 3D Tilt effect for cards
function init3DTilt() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Remove existing listeners to prevent duplicates
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        newCard.addEventListener('mousemove', (e) => {
            const rect = newCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            newCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        newCard.addEventListener('mouseleave', () => {
            newCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
        
        // Preserve onclick functionality
        newCard.addEventListener('click', () => {
            const pageId = newCard.getAttribute('onclick')?.match(/showPage\('(.+?)'\)/)?.[1];
            if (pageId) {
                showPage(pageId);
            }
        });
    });
}

// Smooth scroll reveal animation
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.section, .card').forEach(el => {
        if (!el.style.opacity) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const pages = ['home', 'intro', 'stochastic', 'explore'];
    const currentPage = document.querySelector('.page.active')?.id;
    if (!currentPage) return;
    
    const currentIndex = pages.indexOf(currentPage);
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        showPage(pages[currentIndex - 1]);
    }
    
    if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        showPage(pages[currentIndex + 1]);
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.page) {
        showPage(e.state.page);
    }
});

// Update URL without page reload
function showPageWithHistory(pageId) {
    showPage(pageId);
    history.pushState({ page: pageId }, '', `#${pageId}`);
}

// Initialize everything when DOM is loaded
window.addEventListener('load', function() {
    // Create particle background
    createParticleBackground();
    
    // Initialize 3D tilt effect
    init3DTilt();
    
    // Initialize scroll reveal
    setTimeout(() => {
        initScrollReveal();
    }, 100);
    
    // Check URL hash on load
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    }
});
