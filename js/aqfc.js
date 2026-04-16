// Sub-page (tab) navigation – only used on aqfc.html
function showSubPage(subPageId, btnEl) {
    const target = document.getElementById(subPageId);
    if (!target) return;
    const container = target.closest('.content-page');
    if (!container) return;

    container.querySelectorAll('.sub-page').forEach(sp => sp.classList.remove('active'));
    target.classList.add('active');

    if (btnEl) {
        const subNav = btnEl.closest('.sub-nav');
        if (subNav) {
            subNav.querySelectorAll('.sub-nav-btn').forEach(b => b.classList.remove('active'));
            btnEl.classList.add('active');
        }
    }

    // Re-run reveal on freshly shown content
    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        target.querySelectorAll('.section, .instructor-card, .info-box').forEach(el => {
            if (!el.dataset.revealed) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                el.dataset.revealed = 'true';
            }
            observer.observe(el);
        });
    }, 50);
}

// Support deep-linking via hash: aqfc.html#deepdives
window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['aqfc-about', 'aqfc-deepdives', 'aqfc-team'];
    if (hash && validTabs.includes(hash)) {
        const btn = document.querySelector(`[onclick*="${hash}"]`);
        showSubPage(hash, btn);
    }
});
