// Services JavaScript

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Variables for scroll animation
    const serviceItems = document.querySelectorAll('.service-item');
    const processSteps = document.querySelectorAll('.process-step');
    const additionalServices = document.querySelectorAll('.additional-service');
    
    // Intersection Observer for animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    // Observer for service items
    if (serviceItems.length > 0) {
        const serviceObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        serviceItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            serviceObserver.observe(item);
        });
    }
    
    // Observer for process steps
    if (processSteps.length > 0) {
        const stepObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add delay based on the index for sequential animation
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        processSteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            stepObserver.observe(step);
        });
    }
    
    // Observer for additional services
    if (additionalServices.length > 0) {
        const additionalObserver = new IntersectionObserver((entries, observer) => {
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
        
        additionalServices.forEach(service => {
            service.style.opacity = '0';
            service.style.transform = 'translateY(20px)';
            service.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            additionalObserver.observe(service);
        });
    }
    
    // CSS class to handle animation
    document.addEventListener('animationend', function(e) {
        if (e.target.classList.contains('animate')) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
    
    // Apply animation class for already loaded items that are in viewport
    setTimeout(() => {
        document.querySelectorAll('.service-item, .process-step, .additional-service').forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                item.classList.add('animate');
            }
        });
    }, 100);
});
