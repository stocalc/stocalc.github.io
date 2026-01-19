// Page navigation function
function showPage(pageId) {
    // Remove active class from all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Add active class to selected page
    document.getElementById(pageId).classList.add('active');
    
    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Optional: Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const pages = ['home', 'intro', 'stochastic', 'explore'];
    const currentPage = document.querySelector('.page.active').id;
    const currentIndex = pages.indexOf(currentPage);
    
    // Left arrow - previous page
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        showPage(pages[currentIndex - 1]);
    }
    
    // Right arrow - next page
    if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        showPage(pages[currentIndex + 1]);
    }
});

// Optional: Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.page) {
        showPage(e.state.page);
    }
});

// Optional: Update URL without page reload
function showPageWithHistory(pageId) {
    showPage(pageId);
    history.pushState({ page: pageId }, '', `#${pageId}`);
}

// Check URL on page load
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    }
});