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

import { getServices, getPortfolioImages } from './sanity.js';

let currentLang = 'nl'; // default language
let servicesData = [];

function setLanguage(lang) {
  currentLang = lang;
  
  // Update active state of language buttons
  document.getElementById('lang-nl').classList.toggle('opacity-50', lang !== 'nl');
  document.getElementById('lang-nl').classList.toggle('opacity-100', lang === 'nl');
  
  document.getElementById('lang-en').classList.toggle('opacity-50', lang !== 'en');
  document.getElementById('lang-en').classList.toggle('opacity-100', lang === 'en');
  
  // Translate static elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Re-render dynamic content
  renderServices();
}

async function loadSanityData() {
  try {
    const [services, portfolio] = await Promise.all([
      getServices(),
      getPortfolioImages()
    ]);
    
    servicesData = services;
    renderServices();
    renderPortfolio(portfolio);
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
  }
}

function renderServices() {
  const container = document.getElementById('services-list');
  if (!container) return;
  
  if (servicesData.length === 0) {
    container.innerHTML = '<p class="text-center text-warm-brown/70">Loading services...</p>';
    return;
  }
  
  container.innerHTML = servicesData.map(service => {
    const title = currentLang === 'nl' ? (service.titleNl || service.titleEn) : (service.titleEn || service.titleNl);
    const description = currentLang === 'nl' ? (service.descriptionNl || service.descriptionEn) : (service.descriptionEn || service.descriptionNl);
    
    return `
      <div class="border-b border-cappuccino/20 pb-4">
         <div class="flex justify-between items-baseline mb-2">
           <h3 class="text-xl font-serif text-warm-brown">${title}</h3>
           <span class="text-lg font-serif">€${service.price}</span>
         </div>
         ${description ? `<p class="text-sm font-light text-warm-brown/70">${description}</p>` : ''}
      </div>
    `;
  }).join('');
}

function renderPortfolio(images) {
  const container = document.querySelector('#portfolio .grid');
  if (!container) return;
  
  if (images.length === 0) {
    return; // Keep placeholders if no images
  }
  
  container.innerHTML = images.map(img => `
    <div class="aspect-square overflow-hidden bg-ivory group">
      <img src="${img.imageUrl}" alt="${img.title || 'Portfolio Image'}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
    </div>
  `).join('');
}

// Event Listeners for language switcher
document.getElementById('lang-nl').addEventListener('click', () => setLanguage('nl'));
document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));

// Form Submission Logic
const form = document.getElementById('booking-form');
const formMessage = document.getElementById('form-message');
const GOOGLE_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycby6XzSM1M1VecanXMMpX7U2DCY5_m-QirgBAacCVqk0ffFOoF2uqUBmLqcKdsh3pSge/exec';

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable button to prevent double-click
    const btn = form.querySelector('button[type="submit"]');
    const originalBtnText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      service: formData.get('service')
    };

    try {
      if (GOOGLE_WEB_APP_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        throw new Error('Google Script URL is not set yet!');
      }

      await fetch(GOOGLE_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data)
      });
      
      form.reset();
      formMessage.classList.remove('hidden');
      formMessage.textContent = currentLang === 'nl' ? 'Aanvraag succesvol verzonden!' : 'Request sent successfully!';
    } catch (error) {
      console.error(error);
      formMessage.classList.remove('hidden');
      formMessage.classList.add('text-red-500');
      formMessage.textContent = currentLang === 'nl' ? 'Er is een fout opgetreden.' : 'An error occurred.';
    } finally {
      btn.textContent = originalBtnText;
      btn.disabled = false;
      setTimeout(() => {
        formMessage.classList.add('hidden');
        formMessage.classList.remove('text-red-500');
      }, 5000);
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  loadSanityData();
});
