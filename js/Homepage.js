// Dynamic Hero Section Content Rotation
        //The full code by Radhwane Harres

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('hero');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroParagraph = document.querySelector('.hero-content p');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    // Content variations for rotation
    const contentVariations = [
        {
            title: "Professional <strong>Computing Solutions</strong>",
            paragraph: "Premium workstations, high-performance gaming rigs, and enterprise-grade hardware for professionals who demand excellence.",
            btn1Text: "Explore Products",
            btn1Link: "#Products",
            btn2Text: "Consultation Service",
            btn2Link: "#Vendor-Portal",
            bgClass: "bg-default"
        },
        {
            title: "Enterprise <strong>Workstation Solutions</strong>",
            paragraph: "High-performance workstations optimized for CAD, engineering, data science, and creative professionals.",
            btn1Text: "View Workstations",
            btn1Link: "#Workstations",
            btn2Text: "Request Demo",
            btn2Link: "#Demos",
            bgClass: "bg-workstation"
        },
        {
            title: "Elite <strong>Gaming Systems</strong>",
            paragraph: "Cutting-edge gaming PCs and laptops with top-tier graphics, lightning-fast processors, and immersive cooling solutions.",
            btn1Text: "Gaming Rigs",
            btn1Link: "#Gaming",
            btn2Text: "Custom Builds",
            btn2Link: "#Custom-Builds",
            bgClass: "bg-gaming"
        },
        {
            title: "Server & <strong>Data Center Solutions</strong>",
            paragraph: "Reliable server infrastructure and data center hardware for businesses of all sizes with 24/7 support.",
            btn1Text: "Server Options",
            btn1Link: "#Servers",
            btn2Text: "IT Consultation",
            btn2Link: "#Consultation",
            bgClass: "bg-server"
        }
    ];
    
    // Add CSS for background variations
    const style = document.createElement('style');
    style.textContent = `
        /* Hero background variations */
        .hero.bg-default {
            background: var(--gray-light);
        }
        body.dark-mode .hero.bg-default {
            background: var(--secondary);
        }
        
        .hero.bg-
        
        .hero.bg-workstation {
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0.7)), url('img/7.jpg') center/cover;
        }
        body.dark-mode .hero.bg-workstation {
            background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0.8)), url('img/7.jpg') center/cover;
        }
        
        .hero.bg-gaming {
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0.7)), url('img/9.jpg') center/cover;
        }
        body.dark-mode .hero.bg-gaming {
            background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0.8)), url('img/8.jpg') center/cover;
        }
        
        .hero.bg-server {
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0.7)), url('img/7.jpg') center/cover;
        }
        body.dark-mode .hero.bg-server {
            background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0.8)), url('img/8.jpg') center/cover;
        }
        
        /* Animation for content changes */
        .hero-content h1,
        .hero-content p,
        .hero-buttons {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .hero-content.hidden h1,
        .hero-content.hidden p,
        .hero-content.hidden .hero-buttons {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .hero-content.visible h1,
        .hero-content.visible p,
        .hero-content.visible .hero-buttons {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Navigation dots for hero section */
        .hero-nav-dots {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 5;
        }
        
        .hero-nav-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: background 0.3s ease, transform 0.3s ease;
        }
        
        .hero-nav-dot.active {
            background: var(--light);
            transform: scale(1.2);
        }
        
        body.dark-mode .hero-nav-dot {
            background: rgba(0, 0, 0, 0.5);
        }
        
        body.dark-mode .hero-nav-dot.active {
            background: var(--light);
        }
    `;
    document.head.appendChild(style);
    
    // Create navigation dots
    const navDotsContainer = document.createElement('div');
    navDotsContainer.className = 'hero-nav-dots';
    
    contentVariations.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `hero-nav-dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.dataset.index);
            updateHeroContent();
            resetInterval();
        });
        navDotsContainer.appendChild(dot);
    });
    
    heroSection.appendChild(navDotsContainer);
    
    let currentIndex = 0;
    let rotationInterval;
    
    // Function to update hero content
    function updateHeroContent() {
        const content = contentVariations[currentIndex];
        const heroContent = document.querySelector('.hero-content');
        
        // Add hidden class for fade out effect
        heroContent.classList.add('hidden');
        
        // Wait for fade out then update content
        setTimeout(() => {
            heroTitle.innerHTML = content.title;
            heroParagraph.textContent = content.paragraph;
            heroButtons[0].textContent = content.btn1Text;
            heroButtons[0].setAttribute('onclick', `location.href='${content.btn1Link}'`);
            heroButtons[1].textContent = content.btn2Text;
            heroButtons[1].setAttribute('onclick', `location.href='${content.btn2Link}'`);
            
            // Update background
            heroSection.className = 'hero';
            heroSection.classList.add(content.bgClass);
            
            // Update active dot
            document.querySelectorAll('.hero-nav-dot').forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
            
            // Remove hidden class for fade in effect
            setTimeout(() => {
                heroContent.classList.remove('hidden');
                heroContent.classList.add('visible');
            }, 50);
        }, 500);
    }
    
    // Function to start auto rotation
    function startRotation() {
        rotationInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % contentVariations.length;
            updateHeroContent();
        }, 5000); // Change every 5 seconds
    }
    
    // Function to reset interval
    function resetInterval() {
        clearInterval(rotationInterval);
        startRotation();
    }
    
    // Pause rotation on hover
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(rotationInterval);
    });
    
    heroSection.addEventListener('mouseleave', () => {
        startRotation();
    });
    
    // Pause rotation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(rotationInterval);
        } else {
            startRotation();
        }
    });
    
    // Start the rotation
    startRotation();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + contentVariations.length) % contentVariations.length;
            updateHeroContent();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % contentVariations.length;
            updateHeroContent();
            resetInterval();
        }
    });
    
    console.log('Hero section rotation initialized');
});
        //The full code by Radhwane Harres
