// Products JavaScript

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Variables
    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    // Tab functionality
    if (tabItems.length > 0) {
        tabItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all tabs
                tabItems.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get the target tab id
                const tabId = this.getAttribute('data-tab');
                
                // Hide all tab panes
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Show the selected tab pane
                document.getElementById(tabId).classList.add('active');
                
                // Scroll to tab content for better UX on mobile
                if (window.innerWidth < 768) {
                    const tabsContent = document.querySelector('.tabs-content');
                    tabsContent.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // Accordion functionality
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', function() {
                // Toggle active class on clicked item
                item.classList.toggle('active');
                
                // Close other open accordions (optional, remove if you want multiple open)
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Hash navigation (to open specific tab from URL)
    if (window.location.hash) {
        const hash = window.location.hash.substring(1); // Remove the # character
        const tabItem = document.querySelector(`.tab-item[data-tab="${hash}"]`);
        
        if (tabItem) {
            // Trigger click on the tab item
            tabItem.click();
            
            // Scroll to the tab section with a slight delay for better UX
            setTimeout(() => {
                const tabsSection = document.querySelector('.product-categories-section');
                tabsSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
    
    // Handle direct links to tabs from other pages
    const productLinks = document.querySelectorAll('a[href^="produtos.html#"]');
    
    if (productLinks.length > 0) {
        productLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const hash = this.getAttribute('href').split('#')[1];
                
                // If on the products page already
                if (window.location.pathname.includes('produtos.html')) {
                    e.preventDefault();
                    
                    const tabItem = document.querySelector(`.tab-item[data-tab="${hash}"]`);
                    
                    if (tabItem) {
                        tabItem.click();
                        
                        const tabsSection = document.querySelector('.product-categories-section');
                        tabsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
});
