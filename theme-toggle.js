// theme-toggle.js
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Theme toggle element not found');
        return;
    }

    // Check if running in Chrome extension environment
    const isChromeExtension = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;

    // Default to light theme initially
    body.setAttribute('data-theme', 'light');
    themeToggle.checked = false;

    // If in extension context, load saved theme
    if (isChromeExtension) {
        chrome.storage.local.get(['theme'], (result) => {
            if (chrome.runtime.lastError) {
                console.error('Error getting theme:', chrome.runtime.lastError);
                return;
            }
            if (result.theme === 'dark') {
                body.setAttribute('data-theme', 'dark');
                themeToggle.checked = true;
            }
        });
    }

    // Handle theme toggle
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.setAttribute('data-theme', 'dark');
            if (isChromeExtension) {
                chrome.storage.local.set({ theme: 'dark' }, () => {
                    if (chrome.runtime.lastError) {
                        console.error('Error setting theme:', chrome.runtime.lastError);
                    }
                });
            }
        } else {
            body.setAttribute('data-theme', 'light');
            if (isChromeExtension) {
                chrome.storage.local.set({ theme: 'light' }, () => {
                    if (chrome.runtime.lastError) {
                        console.error('Error setting theme:', chrome.runtime.lastError);
                    }
                });
            }
        }
    });
});