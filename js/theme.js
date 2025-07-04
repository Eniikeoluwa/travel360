// Global Theme Management System
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('travel360-theme') || 'light';
        console.log('Initializing with theme:', savedTheme);
        this.setTheme(savedTheme);
        this.createToggleButton();
    }

    setTheme(theme) {
        console.log('Setting theme to:', theme);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('travel360-theme', theme);
        this.updateToggleButton(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        console.log('Toggling from', currentTheme, 'to', newTheme);
        this.setTheme(newTheme);
    }

    createToggleButton() {
        // Remove existing button if any
        const existingButton = document.querySelector('.theme-toggle');
        if (existingButton) {
            existingButton.remove();
        }

        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Toggle theme');
        button.setAttribute('title', 'Toggle between light and dark theme');
        
        // Add icon
        button.innerHTML = '🌙';
        
        // Use arrow function to preserve 'this' context
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Theme toggle clicked');
            this.toggleTheme();
        });
        
        document.body.appendChild(button);
        console.log('Theme toggle button created');
    }

    updateToggleButton(theme) {
        const button = document.querySelector('.theme-toggle');
        if (button) {
            button.innerHTML = theme === 'dark' ? '☀️' : '🌙';
            button.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
            console.log('Updated button icon for theme:', theme);
        }
    }
}

// Global instance
let themeManager;

// Initialize theme manager
function initTheme() {
    if (!themeManager) {
        themeManager = new ThemeManager();
        console.log('Theme manager initialized');
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme);

// Also initialize immediately if DOM is already loaded
if (document.readyState !== 'loading') {
    initTheme();
}