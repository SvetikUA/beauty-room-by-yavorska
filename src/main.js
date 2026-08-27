import './style.css';

// Simple Dictionary for Localization
const translations = {
  en: {
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.book': 'Book Now',
    'hero.title1': 'Perfect Brows.',
    'hero.title2': 'Flawless Look.',
    'hero.subtitle': 'Professional eyebrow styling, lamination, and tinting in an elegant atmosphere.',
    'hero.cta': 'Book Appointment',
    'services.title': 'Our Services'
  },
  nl: {
    'nav.about': 'Over Mij',
    'nav.services': 'Diensten',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.book': 'Boek Nu',
    'hero.title1': 'Perfecte Wenkbrauwen.',
    'hero.title2': 'Foutloze Look.',
    'hero.subtitle': 'Professionele wenkbrauwstyling, lamineren en verven in een elegante sfeer.',
    'hero.cta': 'Maak een Afspraak',
    'services.title': 'Onze Diensten'
  }
};

let currentLang = 'nl'; // default language

function setLanguage(lang) {
  currentLang = lang;
  
  // Update active state of language buttons
  document.getElementById('lang-nl').classList.toggle('opacity-50', lang !== 'nl');
  document.getElementById('lang-nl').classList.toggle('opacity-100', lang === 'nl');
  
  document.getElementById('lang-en').classList.toggle('opacity-50', lang !== 'en');
  document.getElementById('lang-en').classList.toggle('opacity-100', lang === 'en');
  
  // Translate elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

// Event Listeners for language switcher
document.getElementById('lang-nl').addEventListener('click', () => setLanguage('nl'));
document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));

// Initialize with default language
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});
