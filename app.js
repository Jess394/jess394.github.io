// Jess Cadena Portfolio - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const themeToggle = document.getElementById('theme-toggle');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    const navbar = document.getElementById('navbar');

    // Theme switching functionality
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        const themeIcon = document.querySelector('.theme-icon');
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
        currentTheme = theme;
        localStorage.setItem('theme', theme);
    }

    // Initialize theme
    setTheme(currentTheme);

    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Mobile navigation toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = currentTheme === 'dark' 
                ? 'rgba(31, 33, 33, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.background = currentTheme === 'dark' 
                ? 'rgba(31, 33, 33, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.experience-item, .project-card, .leadership-card, .stat-card, .skill-category');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in', 'visible');
            }
        });
    }

    // Add fade-in class to animated elements
    function initializeAnimations() {
        const elements = document.querySelectorAll('.experience-item, .project-card, .leadership-card, .stat-card, .skill-category');
        elements.forEach(element => {
            element.classList.add('fade-in');
        });
    }

    // Contact form handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
    });

    // Show form message
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message status status--${type}`;
        messageElement.textContent = message;
        messageElement.style.marginTop = 'var(--space-16)';
        
        contactForm.appendChild(messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateNavbar();
        updateActiveNavLink();
        animateOnScroll();
    });

    // Initialize
    initializeAnimations();
    updateNavbar();
    updateActiveNavLink();
    animateOnScroll();

    // Hero buttons functionality
    const viewProjectsBtn = document.querySelector('.hero-buttons .btn--primary');
    const contactBtn = document.querySelector('.hero-buttons .btn--outline');

    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Project and social link handling
    const projectButtons = document.querySelectorAll('.project-card .btn');
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Since these are placeholder links, show a message
            showProjectMessage('Project details coming soon!');
        });
    });

    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.toLowerCase();
            showProjectMessage(`${linkText.charAt(0).toUpperCase() + linkText.slice(1)} profile coming soon!`);
        });
    });

    function showProjectMessage(message) {
        // Create temporary message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'status status--info';
        messageDiv.textContent = message;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '100px';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translateX(-50%)';
        messageDiv.style.zIndex = '9999';
        messageDiv.style.padding = 'var(--space-12) var(--space-20)';
        messageDiv.style.borderRadius = 'var(--radius-base)';
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Add focus styles for keyboard navigation
    document.addEventListener('focusin', function(e) {
        if (e.target.matches('.nav-link, .btn, .form-control, .theme-toggle')) {
            e.target.style.outline = 'var(--focus-outline)';
            e.target.style.outlineOffset = '2px';
        }
    });

    document.addEventListener('focusout', function(e) {
        if (e.target.matches('.nav-link, .btn, .form-control, .theme-toggle')) {
            e.target.style.outline = 'none';
        }
    });

    // Performance optimization: throttle scroll events
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateNavbar();
                updateActiveNavLink();
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Replace the existing scroll listener
    window.removeEventListener('scroll', window.addEventListener);
    window.addEventListener('scroll', handleScroll, { passive: true });
});