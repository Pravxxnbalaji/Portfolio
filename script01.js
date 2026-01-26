// ===== MAIN PORTFOLIO SCRIPT =====

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully!');
    
    // Initialize all components
    initCustomCursor();
    initBackgroundParticles();
    initBottomNavigation();
    initScrollAnimations();
    initProjectFiltering();
    initContactForm();
    initSocialLinks();
    initTimelineAnimation();
    
    // Add initial animations
    animateHeroSection();
});

// ===== CUSTOM CURSOR WITH SPARKLES =====
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        // Add hover effects on interactive elements
        const target = e.target;
        if (target.matches('a, button, .btn, .project-btn, .nav-item, .skill-tag')) {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#818cf8';
            cursorDot.style.transform = 'scale(1.5)';
        } else {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#4f46e5';
            cursorDot.style.transform = 'scale(1)';
        }
    });
    
    // Create sparkles on click
    document.addEventListener('click', (e) => {
        createSparkles(e.clientX, e.clientY);
        
        // Add click animation to cursor
        cursor.style.transform = 'scale(0.8)';
        cursorDot.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            cursor.style.transform = 'scale(1)';
            cursorDot.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

function createSparkles(x, y) {
    const colors = ['#818cf8', '#4f46e5', '#3730a3', '#6366f1'];
    const sparkleCount = 12;
    
    for(let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random properties
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 30 + 10;
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 400 + 400;
        
        // Style sparkle
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(sparkle);
        
        // Calculate end position
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        // Animate sparkle
        const animation = sparkle.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)'
        });
        
        // Remove sparkle after animation
        animation.onfinish = () => sparkle.remove();
    }
}

// ===== ANIMATED BACKGROUND PARTICLES =====
function initBackgroundParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 150;
    
    for(let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random indigo shade
        const colors = ['#4f46e5', '#6366f1', '#818cf8', '#3730a3'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ===== BOTTOM NAVIGATION =====
function initBottomNavigation() {
    const bottomNav = document.getElementById('bottomNav');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section, header');
    
    // Show/hide navigation on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Show nav when scrolling down, hide when scrolling up
        if (currentScroll > 100) {
            bottomNav.classList.add('show');
            
            if (currentScroll > lastScroll) {
                bottomNav.style.bottom = '20px';
            } else {
                bottomNav.style.bottom = '30px';
            }
        } else {
            bottomNav.classList.remove('show');
        }
        
        lastScroll = currentScroll;
        
        // Update active nav item
        updateActiveNavItem(sections, navItems);
    });
    
    // Smooth scroll for nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // Update active state
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
}

function updateActiveNavItem(sections, navItems) {
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update nav items
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href').substring(1);
        
        if (href === currentSection || (!currentSection && href === 'home')) {
            item.classList.add('active');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add delay for staggered animations
                if (entry.target.classList.contains('project-card')) {
                    const index = Array.from(fadeElements).indexOf(entry.target);
                    entry.target.style.transitionDelay = (index % 3) * 0.1 + 's';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => observer.observe(el));
}

// ===== PROJECT FILTERING =====
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    
                    // Add animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Add CSS animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
            
            // Remove style after animation
            setTimeout(() => {
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 500);
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (validateForm(formData)) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call (replace with actual API call)
                setTimeout(() => {
                    // Show success message
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Restore button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Add celebration sparkles
                    createSparkles(window.innerWidth / 2, window.innerHeight / 2);
                }, 1500);
            }
        });
    }
}

function validateForm(data) {
    // Basic validation
    if (!data.name || data.name.trim().length < 2) {
        showNotification('Please enter a valid name (at least 2 characters)', 'error');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        showNotification('Please enter a message (at least 10 characters)', 'error');
        return false;
    }
    
    return true;
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    const styles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        }
        .notification.success {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #22c55e;
        }
        .notification.error {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
        }
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            margin-left: auto;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            if (styleSheet.parentNode) {
                styleSheet.parentNode.removeChild(styleSheet);
            }
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                if (styleSheet.parentNode) {
                    styleSheet.parentNode.removeChild(styleSheet);
                }
            }, 300);
        }
    }, 5000);
}

// ===== SOCIAL LINKS =====
function initSocialLinks() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            // Add click animation
            icon.style.transform = 'scale(0.9)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 150);
            
            // Add sparkles
            const rect = icon.getBoundingClientRect();
            createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });
    });
}

// ===== TIMELINE ANIMATION =====
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.5s ${index * 0.2}s, transform 0.5s ${index * 0.2}s`;
        observer.observe(item);
    });
}

// ===== HERO SECTION ANIMATION =====
function animateHeroSection() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    // Reset initial states
    [heroTitle, heroSubtitle, heroDescription, heroButtons].forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        }
    });
    
    // Animate with delays
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.transition = 'opacity 0.8s, transform 0.8s';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
    }, 300);
    
    setTimeout(() => {
        if (heroSubtitle) {
            heroSubtitle.style.transition = 'opacity 0.8s 0.2s, transform 0.8s 0.2s';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }
    }, 500);
    
    setTimeout(() => {
        if (heroDescription) {
            heroDescription.style.transition = 'opacity 0.8s 0.4s, transform 0.8s 0.4s';
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }
    }, 700);
    
    setTimeout(() => {
        if (heroButtons) {
            heroButtons.style.transition = 'opacity 0.8s 0.6s, transform 0.8s 0.6s';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }
    }, 900);
}

// ===== ADDITIONAL UTILITIES =====

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add responsive behavior
window.addEventListener('resize', throttle(() => {
    // Update any responsive elements if needed
}, 250));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }
    
    // Tab key navigation for accessibility
    if (e.key === 'Tab') {
        // Add focus styles
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    // Remove keyboard navigation styles on mouse interaction
    document.body.classList.remove('keyboard-navigation');
});

// ===== EXPORT FUNCTIONS (for module support) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCustomCursor,
        createSparkles,
        initBackgroundParticles,
        initBottomNavigation,
        initScrollAnimations,
        initProjectFiltering,
        initContactForm,
        validateForm,
        showNotification,
        initSocialLinks,
        initTimelineAnimation,
        animateHeroSection,
        debounce,
        throttle
    };
}