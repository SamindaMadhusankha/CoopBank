// Google Translate Auto-Translation Integration

// Initialize Google Translate Widget
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: 'en', // Default page language
            includedLanguages: 'en,si,ta', // English, Sinhala, Tamil
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true
        },
        'google_translate_element'
    );
}

// Integrate with existing language buttons
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.language-toggle button');
    
    // Map our language codes to Google Translate codes
    const languageMap = {
        'en': 'en',
        'si': 'si', // Sinhala
        'ta': 'ta'  // Tamil
    };
    
    // Function to trigger Google Translate
    const triggerGoogleTranslate = (langCode) => {
        const googleLangCode = languageMap[langCode] || 'en';
        
        // Wait for Google Translate to load
        const checkTranslateReady = setInterval(() => {
            const selectElement = document.querySelector('.goog-te-combo');
            if (selectElement) {
                clearInterval(checkTranslateReady);
                
                // Change the language
                selectElement.value = googleLangCode;
                selectElement.dispatchEvent(new Event('change'));
                
                // Save preference
                localStorage.setItem('coop-language', langCode);
            }
        }, 100);
        
        // Timeout after 5 seconds
        setTimeout(() => clearInterval(checkTranslateReady), 5000);
    };
    
    // Add click handlers to language buttons
    langButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.dataset.lang || 'en';
            
            // Update active state
            langButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Trigger translation
            triggerGoogleTranslate(selectedLang);
        });
    });
    
    // Auto-load saved language preference
    const savedLang = localStorage.getItem('coop-language');
    if (savedLang && savedLang !== 'en') {
        setTimeout(() => {
            triggerGoogleTranslate(savedLang);
            
            // Update button state
            langButtons.forEach((btn) => {
                if (btn.dataset.lang === savedLang) {
                    langButtons.forEach((b) => b.classList.remove('active'));
                    btn.classList.add('active');
                }
            });
        }, 1000);
    }
});

// Hide Google Translate default UI (optional)
window.addEventListener('load', () => {
    // Style adjustments to hide/customize Google Translate bar
    const style = document.createElement('style');
    style.textContent = `
        /* Hide Google Translate banner */
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        
        /* Hide the default Google Translate widget */
        #google_translate_element { display: none; }
        
        /* Optional: Style the Google Translate dropdown if you want to show it */
        .goog-te-gadget { 
            font-family: inherit;
            font-size: 14px;
        }
        
        .goog-te-gadget .goog-te-combo {
            margin: 4px 0;
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
    `;
    document.head.appendChild(style);
});
