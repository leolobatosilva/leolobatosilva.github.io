// Blog JavaScript

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Variables
    const searchForm = document.querySelector('.search-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    const blogCards = document.querySelectorAll('.blog-card');
    
    // Search Form Functionality
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // In a real implementation, this would redirect to search results page
                // For this demo, we'll just show an alert
                alert(`Searching for: ${searchTerm}`);
                
                // You would normally redirect to a search results page like this:
                // window.location.href = `search-results.html?query=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
    
    // Newsletter Form Functionality
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate form submission (would be replaced with actual form submission)
                const submitButton = this.querySelector('button');
                const originalContent = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                submitButton.disabled = true;
                
                // In a real scenario, you would submit the form data to a server here
                // For this demo, we'll just simulate a successful submission after a delay
                setTimeout(function() {
                    emailInput.value = '';
                    submitButton.innerHTML = '<i class="fas fa-check"></i>';
                    
                    // Show success message
                    const successMessage = document.createElement('p');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Obrigado por se inscrever em nossa newsletter!';
                    successMessage.style.color = '#28a745';
                    successMessage.style.marginTop = '10px';
                    
                    newsletterForm.parentNode.appendChild(successMessage);
                    
                    // Reset button after a delay
                    setTimeout(function() {
                        submitButton.innerHTML = originalContent;
                        submitButton.disabled = false;
                        
                        // Remove success message after a delay
                        setTimeout(function() {
                            successMessage.remove();
                        }, 3000);
                    }, 2000);
                }, 1500);
            } else {
                // Show error message
                showError(emailInput, 'Por favor, informe um email válido.');
            }
        });
    }
    
    // Blog Card Animation on Scroll
    if (blogCards.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const blogObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add delay based on the index for sequential animation
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        blogCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            blogObserver.observe(card);
        });
        
        // CSS class to handle animation
        document.addEventListener('animationend', function(e) {
            if (e.target.classList.contains('animate')) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        });
        
        // Apply animation class for already loaded items that are in viewport
        setTimeout(() => {
            blogCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    card.classList.add('animate');
                }
            });
        }, 100);
    }
    
    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show error message for a field
    function showError(field, message) {
        // Remove existing error messages
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class to field
        field.classList.add('error');
        
        // Create and append error message
        const errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = '#dc3545';
        errorMessage.style.fontSize = '14px';
        errorMessage.style.marginTop = '5px';
        errorMessage.style.display = 'block';
        
        field.parentElement.appendChild(errorMessage);
        
        // Remove error after 3 seconds
        setTimeout(function() {
            field.classList.remove('error');
            errorMessage.remove();
        }, 3000);
    }
});
