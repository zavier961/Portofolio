// Wow UX Interactions
document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Initialization
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    if(cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move cursor instantly
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follow animation for the outer ring
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();
        
        // Hover effect for interactive elements
        const interactives = document.querySelectorAll('a, button, .workshop-card, .project-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('hover'));
            el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
        });
    }

    // 2. Scroll Reveal Animations via Intersection Observer
    const revealElements = document.querySelectorAll('section > div.container > div, .workshop-card, .project-card, .stat-card, .filter-container-wrapper');
    revealElements.forEach(el => {
        // Skip already visible or statically styled components where translateY might break
        if(!el.classList.contains('navbar-flex-wrapper')) {
            el.classList.add('reveal-on-scroll');
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
});
