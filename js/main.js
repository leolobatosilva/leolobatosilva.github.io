// Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Variables
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const menuItems = document.querySelectorAll('.menu-item a');
    const backToTopBtn = document.getElementById('backToTop');
    
    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Close mobile menu when clicking menu items
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Back to Top Button Visibility
        if (backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
    });
    
    // Back to Top Functionality
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Testimonials Slider (if needed, can be implemented with a library like Swiper.js)
    // Here we can implement a simple slider with JavaScript or integrate a library
    
    // Animation on Scroll (Optional)
    // Can be implemented with libraries like AOS (Animate on Scroll)
    
    // Form Validation for Contact and Newsletter Forms
    const forms = document.querySelectorAll('form');
    
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                let valid = true;
                const requiredInputs = form.querySelectorAll('[required]');
                
                requiredInputs.forEach(input => {
                    if (!input.value.trim()) {
                        valid = false;
                        showError(input, 'Este campo é obrigatório');
                    } else {
                        removeError(input);
                        
                        // Email validation
                        if (input.type === 'email') {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(input.value)) {
                                valid = false;
                                showError(input, 'Email inválido');
                            }
                        }
                    }
                });
                
                if (!valid) {
                    e.preventDefault();
                }
            });
        });
    }
    
    // Show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('span');
        
        if (!formGroup.querySelector('.error-message')) {
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('error');
    }
    
    // Remove error message
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('error');
    }
    
    // Count Statistics (Optional - for animation counting effect)
    const statistics = document.querySelectorAll('.stat-number');
    
    if (statistics.length > 0) {
        const countStats = () => {
            statistics.forEach(stat => {
                const target = parseInt(stat.textContent);
                const count = function(current) {
                    current = Math.ceil(current);
                    stat.textContent = current;
                    
                    if (current < target) {
                        setTimeout(function() {
                            count(current + target/20);
                        }, 50);
                    } else {
                        stat.textContent = target + '+';
                    }
                };
                
                count(0);
            });
        };
        
        // Trigger counting when element is in viewport
        const statSection = document.querySelector('.about-stats');
        
        if (statSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        countStats();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(statSection);
        }
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value.trim()) {
                // Here we would normally send the data to the server
                // For demonstration, we'll show a success message
                const successMessage = document.createElement('p');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Obrigado por se inscrever!';
                
                // Replace the form with the success message
                this.innerHTML = '';
                this.appendChild(successMessage);
            }
        });
    }
});
