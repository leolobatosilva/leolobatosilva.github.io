// Contact JavaScript

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Variables
    const contactForm = document.getElementById('contactForm');
    
    // Form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulate form submission (would be replaced with actual form submission)
                showSubmitAnimation();
                
                // In a real scenario, you would submit the form data to a server here
                // For this demo, we'll just simulate a successful submission after a delay
                setTimeout(function() {
                    showSuccessMessage();
                }, 2000);
            }
        });
    }
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        // Remove all existing error messages and classes
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const errorFields = contactForm.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
        // Validate each required field
        requiredFields.forEach(field => {
            const fieldValue = field.value.trim();
            
            if (!fieldValue) {
                // Field is empty
                showError(field, 'Este campo é obrigatório');
                isValid = false;
            } else {
                // Field-specific validations
                if (field.type === 'email') {
                    // Validate email format
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(fieldValue)) {
                        showError(field, 'Email inválido');
                        isValid = false;
                    }
                } else if (field.id === 'phone') {
                    // Basic phone validation (can be enhanced for specific formats)
                    const phoneRegex = /^[0-9\s\-\(\)]{10,15}$/;
                    if (!phoneRegex.test(fieldValue)) {
                        showError(field, 'Telefone inválido');
                        isValid = false;
                    }
                }
            }
        });
        
        return isValid;
    }
    
    // Show error message for a field
    function showError(field, message) {
        field.classList.add('error');
        
        const errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        const formGroup = field.closest('.form-group');
        formGroup.appendChild(errorMessage);
    }
    
    // Show submit animation
    function showSubmitAnimation() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
        // Disable all form fields while submitting
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => field.disabled = true);
    }
    
    // Show success message
    function showSuccessMessage() {
        const formContent = contactForm.innerHTML;
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 48px; margin-bottom: 20px;"></i>
            <h3>Mensagem enviada com sucesso!</h3>
            <p>Obrigado por entrar em contato. Nossa equipe retornará em breve.</p>
        `;
        
        // Replace form with success message
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
        
        // Add button to send another message
        const newMessageBtn = document.createElement('button');
        newMessageBtn.className = 'btn btn-secondary';
        newMessageBtn.style.marginTop = '20px';
        newMessageBtn.textContent = 'Enviar nova mensagem';
        
        newMessageBtn.addEventListener('click', function() {
            // Restore form
            contactForm.innerHTML = formContent;
            
            // Re-attach event listeners
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (validateForm()) {
                    showSubmitAnimation();
                    setTimeout(function() {
                        showSuccessMessage();
                    }, 2000);
                }
            });
        });
        
        contactForm.appendChild(newMessageBtn);
    }
    
    // Phone input mask (simplified version)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                // Format as (XX) XXXXX-XXXX for Brazil format (can be adjusted)
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                } else if (value.length <= 11) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
                } else {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
                }
            }
            
            e.target.value = value;
        });
    }
});
