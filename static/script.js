// FlaskDev - Enhanced JavaScript for user interactivity

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navToggle = document.querySelector('.nav-toggle');
                const navMenu = document.querySelector('.nav-links');
                if (navToggle && navToggle.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // ===== Mobile Navigation Toggle =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-links');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });
    }

    // ===== Sticky Navbar =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            navbar.classList.remove('scrolled');
            return;
        }

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });

    // ===== Active Navigation Link =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ===== Scroll to Top Button =====
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Form Validation =====
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, select, textarea');

        // Real-time validation
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending...</span>';

                // Submit form (you can replace this with actual form submission)
                const formData = new FormData(this);
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
                    submitBtn.classList.add('success');
                    
                    // Reset form after 2 seconds
                    setTimeout(() => {
                        this.reset();
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.remove('success');
                    }, 2000);
                }, 1500);

                // Actual form submission (uncomment when ready)
                // fetch('/', {
                //     method: 'POST',
                //     body: formData
                // })
                // .then(response => response.json())
                // .then(data => {
                //     // Handle success
                // })
                // .catch(error => {
                //     // Handle error
                // });
            }
        });
    }

    function validateField(field) {
        const errorMessage = field.parentElement.querySelector('.error-message');
        let isValid = true;
        let message = '';

        // Clear previous error
        field.classList.remove('error');
        if (errorMessage) errorMessage.textContent = '';

        // Check if required field is empty
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }

        // Select validation
        if (field.tagName === 'SELECT' && field.value === '') {
            isValid = false;
            message = 'Please select an option';
        }

        // Show error if invalid
        if (!isValid) {
            field.classList.add('error');
            if (errorMessage) {
                errorMessage.textContent = message;
            }
        }

        return isValid;
    }

    // ===== Scroll Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .service-card, .portfolio-item, .process-step, .about-features, .hero-content'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ===== Counter Animation for Stats (if you add stats) =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // ===== Lazy Loading Images =====
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ===== Performance: Debounce scroll events =====
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Apply debounce to scroll-heavy functions
    window.addEventListener('scroll', debounce(highlightNavigation));

    // ===== Preload critical resources =====
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'font';
    preloadLink.type = 'font/woff2';
    preloadLink.crossOrigin = 'anonymous';
    
    console.log('FlaskDev website initialized successfully! 🚀');
});
