        //The full code by Radhwane Harres
// Scroll transition effects for TechPro Market
document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const config = {
        // Which sections to animate (can use any CSS selector)
        sections: ['section', '.feature-card', '.product-card', '.dashboard'],
        // Animation class prefix
        animationClass: 'scroll-animate-',
        // Offset before element comes into view (0-1)
        offset: 0.15,
        // Enable/disable animations
        enabled: true,
        // Animation duration in ms
        duration: 800
    };

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .scroll-animate-fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity ${config.duration}ms ease, transform ${config.duration}ms ease;
        }
        
        .scroll-animate-fade-in.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-animate-slide-left {
            opacity: 0;
            transform: translateX(50px);
            transition: opacity ${config.duration}ms ease, transform ${config.duration}ms ease;
        }
        
        .scroll-animate-slide-left.animated {
            opacity: 1;
            transform: translateX(0);
        }
        
        .scroll-animate-slide-right {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity ${config.duration}ms ease, transform ${config.duration}ms ease;
        }
        
        .scroll-animate-slide-right.animated {
            opacity: 1;
            transform: translateX(0);
        }
        
        .scroll-animate-scale {
            opacity: 0;
            transform: scale(0.95);
            transition: opacity ${config.duration}ms ease, transform ${config.duration}ms ease;
        }
        
        .scroll-animate-scale.animated {
            opacity: 1;
            transform: scale(1);
        }
        
        .scroll-animate-flip {
            opacity: 0;
            transform: perspective(1000px) rotateX(30deg);
            transition: opacity ${config.duration}ms ease, transform ${config.duration}ms ease;
        }
        
        .scroll-animate-flip.animated {
            opacity: 1;
            transform: perspective(1000px) rotateX(0);
        }
        
        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            .scroll-animate-fade-in,
            .scroll-animate-slide-left,
            .scroll-animate-slide-right,
            .scroll-animate-scale,
            .scroll-animate-flip {
                transition: opacity 0.5s ease;
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Check if reduced motion is preferred
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        console.log('Reduced motion preference detected, simplifying animations');
    }

    // Initialize animation elements
    function initScrollAnimations() {
        if (!config.enabled) return;
        
        const elements = [];
        
        // Get all elements to animate
        config.sections.forEach(selector => {
            const foundElements = document.querySelectorAll(selector);
            foundElements.forEach(el => elements.push(el));
        });
        
        // Remove duplicates
        const uniqueElements = [...new Set(elements)];
        
        // Apply initial animation classes
        uniqueElements.forEach((element, index) => {
            // Skip if already animated
            if (element.classList.contains('scroll-animate-init')) return;
            
            // Add initialization class
            element.classList.add('scroll-animate-init');
            
            // Determine animation type based on element type and position
            let animationType = 'fade-in';
            
            if (element.classList.contains('feature-card')) {
                // Alternate between animations for feature cards
                animationType = index % 3 === 0 ? 'slide-left' : 
                               index % 3 === 1 ? 'slide-right' : 'fade-in';
            } else if (element.classList.contains('product-card')) {
                // Use scale animation for product cards
                animationType = 'scale';
            } else if (element.classList.contains('dashboard')) {
                // Use flip animation for dashboard
                animationType = 'flip';
            }
            
            // Apply the animation class
            element.classList.add(`${config.animationClass}${animationType}`);
            
            // Add delay based on position for staggered animations
            if (element.classList.contains('feature-card') || 
                element.classList.contains('product-card')) {
                element.style.transitionDelay = `${index * 0.1}s`;
            }
        });
        
        // Set up intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animated class when element is in view
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, 50);
                } else if (entry.boundingClientRect.top > 0) {
                    // Remove animated class when element scrolls out of view (above)
                    // This allows re-animating when scrolling back up
                    entry.target.classList.remove('animated');
                }
            });
        }, {
            threshold: config.offset
        });
        
        // Observe all elements
        uniqueElements.forEach(element => {
            observer.observe(element);
        });
        
        // Handle page load when elements might already be in view
        setTimeout(() => {
            uniqueElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const isInView = (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (1 - config.offset) &&
                    rect.bottom >= 0
                );
                
                if (isInView) {
                    element.classList.add('animated');
                }
            });
        }, 100);
    }
    
    // Initialize on load
    initScrollAnimations();
    
    // Reinitialize on dynamic content changes (if needed)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                setTimeout(initScrollAnimations, 100);
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Reinitialize on resize (in case layout changes affect positioning)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initScrollAnimations, 250);
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '&uarr;';
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '80px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.width = '50px';
    scrollTopBtn.style.height = '50px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.background = 'var(--primary)';
    scrollTopBtn.style.color = 'var(--light)';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.transition = 'opacity 0.3s';
    scrollTopBtn.style.zIndex = '98';
    scrollTopBtn.style.fontSize = '1.5rem';
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
        }
    });
    
    console.log('Scroll animations initialized successfully');
});
// Smooth scroll to section implementation
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Add click event listeners to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Get the target section ID from href attribute
            const href = this.getAttribute('href');
            
            // Only process if it's a hash link (internal section)
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                // If target section exists, scroll to it
                if (targetSection) {
                    smoothScrollTo(targetSection);
                }
            } else {
                // For external links, allow default behavior
                window.location.href = href;
            }
        });
    });
    
    // Smooth scroll function
    function smoothScrollTo(targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800; // Animation duration in ms
        let startTime = null;
        
        // Animation function
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        // Easing function for smooth animation
        function ease(t, b, c, d) {
            // Cubic ease-in-out
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }
        
        // Start the animation
        requestAnimationFrame(animation);
    }
    
    // Update navigation active state on scroll
    let sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li');
    
    // Function to update active nav item
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Listen for scroll events to update active nav
    window.addEventListener('scroll', updateActiveNav);
    
    // Add CSS for active state and smooth scrolling
    const style = document.createElement('style');
    style.textContent = `
        /* Smooth scrolling for the whole page */
        html {
            scroll-behavior: smooth;
        }
        
        /* Active state for navigation items */
        nav ul li.active a {
            color: var(--accent) !important;
            font-weight: 600;
        }
        
        nav ul li.active {
            border-bottom: 2px solid var(--accent);
        }
        
        /* Focus styles for accessibility */
        nav a:focus {
            outline: 2px solid var(--accent);
            outline-offset: 4px;
        }
        
        /* Highlight target section when navigated to */
        section:target {
            animation: highlight 2s ease;
        }
        
        @keyframes highlight {
            0% { background-color: transparent; }
            20% { background-color: rgba(0, 0, 0, 0.05); }
            100% { background-color: transparent; }
        }
        
        body.dark-mode section:target {
            animation: highlight-dark 2s ease;
        }
        
        @keyframes highlight-dark {
            0% { background-color: transparent; }
            20% { background-color: rgba(255, 255, 255, 0.05); }
            100% { background-color: transparent; }
        }
    `;
    document.head.appendChild(style);
    
    // Add IDs to sections if they don't have them
    const mainSections = document.querySelectorAll('section');
    mainSections.forEach((section, index) => {
        if (!section.id) {
            // Create an ID based on the section's heading or its position
            const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
            if (heading) {
                section.id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
            } else {
                section.id = `section-${index + 1}`;
            }
        }
    });
    
    // Update navigation links to point to section IDs
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.includes('#') && href !== '#' && href !== '/') {
            // Find a section that might match this link text
            const linkText = link.textContent.toLowerCase().replace(/\s+/g, '-');
            const matchingSection = document.getElementById(linkText);
            
            if (matchingSection) {
                link.setAttribute('href', `#${linkText}`);
            } else {
                // Assign to first section as fallback
                link.setAttribute('href', `#${mainSections[0].id}`);
            }
        } else if (href === '#' || href === '/') {
            // Scroll to top for home link
            link.setAttribute('href', '#');
            link.addEventListener('click', function(e) {
                e.preventDefault();
                smoothScrollTo(document.body);
            });
        }
    });
    
    console.log('Smooth scroll navigation initialized');
});
        //The full code by Radhwane Harres
