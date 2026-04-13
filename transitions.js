document.addEventListener("DOMContentLoaded", () => {
    // Reveal the page
    requestAnimationFrame(() => {
        document.body.classList.add('page-loaded');
    });

    // Intercept clicks on internal links
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');
            
            // Skip external links, anchors, javascript void, and blank targets
            if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript') || target === "_blank") {
                return;
            }

            e.preventDefault();
            
            // Start fade out by removing the loaded class
            document.body.classList.remove('page-loaded');
            
            // Navigate after transition completes (matching 500ms CSS duration)
            setTimeout(() => {
                window.location.href = href;
            }, 500); 
        });
    });
});

// Safari and BFCache (Back-Forward Cache) prevention
// Sometimes hitting 'Back' loads the page with opacity: 0 because the cache stored the pre-navigation state
window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
        document.body.classList.add('page-loaded');
    }
});
