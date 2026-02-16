/**
 * T4S - Main JavaScript
 * Handles: Navigation, Scroll animations, Form, Counter animation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initCounterAnimation();
    initSmoothScroll();
    initBrandAnimation();
    initParallax();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };
    
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
    // Select all reveal variants
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .reveal-rotate');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 120; // Trigger a bit earlier
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll(); // Check initial state
}

/**
 * Counter animation for statistics
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    let animated = false;
    
    const animateCounters = () => {
        if (animated) return;
        
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            animated = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (ease-out-quart)
                    const easeProgress = 1 - Math.pow(1 - progress, 4);
                    const currentValue = Math.floor(easeProgress * target);
                    
                    counter.textContent = currentValue;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                requestAnimationFrame(updateCounter);
            });
        }
    };
    
    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters(); // Check initial state
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax effect for hero and sections
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroParticles = document.querySelector('.hero-particles');
    const partnersBanner = document.querySelector('.partners-banner');
    const productsSection = document.querySelector('.products');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.scrollY;
        
        // Hero parallax
        if (hero && heroContent) {
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const progress = scrolled / heroHeight;
                const opacity = 1 - progress * 0.6;
                const translateY = scrolled * 0.4;
                const scale = 1 - progress * 0.1;
                
                heroContent.style.opacity = opacity;
                heroContent.style.transform = `translateY(${translateY}px) scale(${scale})`;
                
                // Particles move slower for depth effect
                if (heroParticles) {
                    heroParticles.style.transform = `translateY(${scrolled * 0.2}px)`;
                }
            }
        }
        
        // Partners banner subtle parallax
        if (partnersBanner) {
            const rect = partnersBanner.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                partnersBanner.style.backgroundPositionY = `${progress * 30}px`;
            }
        }
        
        // Products section subtle parallax
        if (productsSection) {
            const rect = productsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                productsSection.style.backgroundPositionY = `${progress * 20}px`;
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
    
    // Initial call
    updateParallax();
}

/**
 * T4S Brand Animation
 * Cycles through different word combinations
 */
function initBrandAnimation() {
    const taglineText = document.getElementById('tagline-text');
    
    if (!taglineText) return;
    
    // Taglines to cycle through
    const taglines = [
        'Tech 4 Swiss',
        'Trust 4 Service',
        'Team 4 Salesforce',
        'Transform 4 Success',
        'Tools 4 Solutions',
    ];
    
    let currentIndex = 0;
    const typingSpeed = 80; // ms per character
    const deleteSpeed = 50; // ms per character when deleting
    const pauseBeforeDelete = 2500; // pause before starting to delete
    const pauseBeforeType = 500; // pause before typing new word
    
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function typeText(text) {
        for (let i = 0; i <= text.length; i++) {
            taglineText.textContent = text.substring(0, i);
            await sleep(typingSpeed);
        }
    }
    
    async function deleteText() {
        const currentText = taglineText.textContent;
        for (let i = currentText.length; i >= 0; i--) {
            taglineText.textContent = currentText.substring(0, i);
            await sleep(deleteSpeed);
        }
    }
    
    async function animationLoop() {
        while (true) {
            // Wait before deleting
            await sleep(pauseBeforeDelete);
            
            // Delete current text
            await deleteText();
            
            // Move to next tagline
            currentIndex = (currentIndex + 1) % taglines.length;
            
            // Wait before typing
            await sleep(pauseBeforeType);
            
            // Type new text
            await typeText(taglines[currentIndex]);
        }
    }
    
    // Start after initial delay
    setTimeout(() => {
        animationLoop();
    }, 2000);
}
