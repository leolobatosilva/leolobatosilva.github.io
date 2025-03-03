// Testimonials JavaScript

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Variables
    const filterItems = document.querySelectorAll('.filter-item');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const videoTestimonials = document.querySelectorAll('.video-testimonial');
    const modalTrigger = document.querySelector('.open-testimonial-form');
    const modal = document.getElementById('testimonial-form');
    const closeModal = document.querySelector('.close-modal');
    const ratingStars = document.querySelectorAll('.rating-input i');
    const ratingInput = document.getElementById('rating');
    const photoConsent = document.getElementById('photo-consent');
    const fileUpload = document.querySelector('.file-upload');
    const testimonialForm = document.querySelector('.testimonial-form');
    
    // Filter functionality
    if (filterItems.length > 0) {
        filterItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all filter items
                filterItems.forEach(filter => filter.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter testimonials
                testimonialCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        
                        // Add animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Video testimonials functionality
    if (videoTestimonials.length > 0) {
        videoTestimonials.forEach(video => {
            const playButton = video.querySelector('.play-button');
            const thumbnail = video.querySelector('.video-thumbnail');
            const videoContainer = video.querySelector('.video-container');
            
            playButton.addEventListener('click', function() {
                // Here you would normally replace the thumbnail with the actual video embed
                // For this demo, we'll just show an alert
                alert('Video player would open here in a real implementation.');
                
                // Example of how to replace thumbnail with video iframe
                /*
                const videoId = thumbnail.getAttribute('data-video-id'); // You would add this attribute to each thumbnail
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
                iframe.setAttribute('width', '100%');
                iframe.setAttribute('height', '100%');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', 'true');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                
                videoContainer.innerHTML = '';
                videoContainer.appendChild(iframe);
                */
            });
        });
    }
    
    // Modal functionality
    if (modalTrigger && modal) {
        modalTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
        
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Rating functionality
    if (ratingStars.length > 0) {
        ratingStars.forEach(star => {
            star.addEventListener('mouseover', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                highlightStars(rating);
            });
            
            star.addEventListener('mouseout', function() {
                const currentRating = parseInt(ratingInput.value) || 0;
                highlightStars(currentRating);
            });
            
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                ratingInput.value = rating;
                highlightStars(rating);
            });
        });
    }
    
    // Highlight stars based on rating
    function highlightStars(rating) {
        ratingStars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.className = 'fas fa-star';
            } else {
                star.className = 'far fa-star';
            }
        });
    }
    
    // Toggle file upload section based on photo consent
    if (photoConsent && fileUpload) {
        photoConsent.addEventListener('change', function() {
            if (this.checked) {
                fileUpload.style.display = 'block';
            } else {
                fileUpload.style.display = 'none';
            }
        });
    }
    
    // Form submission
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulate form submission (would be replaced with actual form submission)
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitButton.disabled = true;
                
                // In a real scenario, you would submit the form data to a server here
                // For this demo, we'll just simulate a successful submission after a delay
                setTimeout(function() {
                    showSuccessMessage();
                }, 2000);
            }
        });
    }
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = testimonialForm.querySelectorAll('[required]');
        
        // Remove all existing error messages and classes
        const errorMessages = testimonialForm.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const errorFields = testimonialForm.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
        // Validate each required field
        requiredFields.forEach(field => {
            const fieldValue = field.value.trim();
            
            if (!fieldValue) {
                // Field is empty
                showError(field, 'Este campo é obrigatório');
                isValid = false;
            } else if (field.id === 'rating' && !fieldValue) {
                // Rating not selected
                showError(field.parentElement, 'Por favor, selecione uma avaliação');
                isValid = false;
            } else if (field.type === 'email') {
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(fieldValue)) {
                    showError(field, 'Email inválido');
                    isValid = false;
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
    
    // Show success message
    function showSuccessMessage() {
        const modalContent = modal.querySelector('.modal-content');
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 48px; margin-bottom: 20px; color: #28a745;"></i>
            <h3>Depoimento enviado com sucesso!</h3>
            <p>Obrigado por compartilhar sua experiência conosco.</p>
            <p>Seu depoimento será revisado e publicado em breve.</p>
            <button class="btn btn-primary close-success" style="margin-top: 20px;">Fechar</button>
        `;
        
        // Replace form with success message
        modalContent.innerHTML = '';
        modalContent.appendChild(successMessage);
        
        // Add close button functionality
        const closeButton = modalContent.querySelector('.close-success');
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
});
