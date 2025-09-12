// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeProjectFilters();
    initializeContactForm();
    initializeSkillBars();
    initializeScrollAnimations();
    infiniteTypeWriter('Khalid Jamil', 'typingName');
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const toggleButton = document.querySelector('.navbar-toggler');
                    toggleButton.click();
                }
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNavigation() {
        let current = 'home';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);
    updateActiveNavigation(); // Initial call
}

// Project filtering functionality
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('input[name="projectFilter"]');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('change', function() {
            const filterValue = this.id;
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.style.display = 'block';
                    // Add fade-in animation
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transition = 'opacity 0.3s ease';
                    }, 100);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Simulate form submission
                showFormSuccess();
                this.reset();
            }
        });
    }
}

// Form validation
function validateForm(data) {
    const { name, email, subject, message } = data;
    
    // Basic validation
    if (!name || name.trim().length < 2) {
        showFormError('Please enter a valid name (at least 2 characters)');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showFormError('Please enter a valid email address');
        return false;
    }
    
    if (!subject || subject.trim().length < 3) {
        showFormError('Please enter a subject (at least 3 characters)');
        return false;
    }
    
    if (!message || message.trim().length < 10) {
        showFormError('Please enter a message (at least 10 characters)');
        return false;
    }
    
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form success message
function showFormSuccess() {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success alert-dismissible fade show mt-3';
    successMessage.innerHTML = `
        <strong>Success!</strong> Thank you for your message! I'll get back to you soon.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 5000);
}

// Show form error message
function showFormError(message) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.alert-danger');
    existingErrors.forEach(error => error.remove());
    
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-danger alert-dismissible fade show mt-3';
    errorMessage.innerHTML = `
        <strong>Error!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(errorMessage, form.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorMessage.parentNode) {
            errorMessage.remove();
        }
    }, 5000);
}

// Animate skill bars when they come into view
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Reset width and animate
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.highlight-card, .skill-category, .project-card, .education-item, .certification-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// Typing effect functionality
function infiniteTypeWriter(text, elementId, speed = 120, pause = 1500) {
    const element = document.getElementById(elementId);
    let i = 0;

    function type() {
        if (i <= text.length) {
            element.textContent = text.substring(0, i);
            i++;
            setTimeout(type, speed);
        } else {
            // Optionally, you can loop or just stop here
            setTimeout(() => {
                // Uncomment below to loop the animation
                // i = 0;
                // type();
            }, pause);
        }
    }
    type();
}

function infiniteSmoothTypeWriter(text, elementId, speed = 120, pause = 1200) {
    const element = document.getElementById(elementId);
    let i = 0;
    let isDeleting = false;

    function type() {
        if (!isDeleting) {
            element.textContent = text.substring(0, i + 1);
            i++;
            if (i === text.length) {
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, pause);
            } else {
                setTimeout(type, speed);
            }
        } else {
            element.textContent = text.substring(0, i - 1);
            i--;
            if (i === 0) {
                setTimeout(() => {
                    isDeleting = false;
                    type();
                }, pause);
            } else {
                setTimeout(type, speed);
            }
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    infiniteSmoothTypeWriter('Khalid Jamil', 'typingName', 120, 1200);
});

// Utility functions
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

// Handle navbar scroll effect
window.addEventListener('scroll', debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
}, 10));

// Download resume functionality (placeholder)
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href="#contact"]') && e.target.textContent.includes('Download Resume')) {
        e.preventDefault();
        // Here you would implement actual resume download
        alert('Resume download feature will be implemented with actual resume file.');
    }
});

// Add loading state for external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i data-lucide="loader" class="me-2"></i>Loading...';
        
        // Reset after 3 seconds (in case the link doesn't navigate away)
        setTimeout(() => {
            this.innerHTML = originalText;
            lucide.createIcons(); // Reinitialize icons
        }, 3000);
    });
});

// Console welcome message
console.log(`
%c👋 Hi there! 
%cWelcome to Khalid Jamil's Portfolio
%cBuilt with HTML5, CSS3, Bootstrap & JavaScript
%cFeel free to explore the code!
`, 
'font-size: 16px; font-weight: bold; color: #3b82f6;',
'font-size: 14px; color: #1e293b;',
'font-size: 12px; color: #64748b;',
'font-size: 12px; color: #64748b; font-style: italic;'
);
