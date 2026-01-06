import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// --- EN ---
import enHeader from './app/locales/en/Header.json';
import enHero from './app/locales/en/Hero.json';
import enAbout from './app/locales/en/About.json';
import enBenefit from './app/locales/en/Benefit.json';
import enPrices from './app/locales/en/Prices.json';
import enProjectCard from './app/locales/en/ProjectCard.json';
import enProjectsLayout from './app/locales/en/ProjectsLayout.json';
import enProjectsData from './app/locales/en/ProjectsData.json';
import enContact from './app/locales/en/Contact.json';
import enFooter from './app/locales/en/Footer.json';
import enProcess from './app/locales/en/Process.json';

// --- FR ---
import frHeader from './app/locales/fr/Header.json';
import frHero from './app/locales/fr/Hero.json';
import frAbout from './app/locales/fr/About.json';
import frBenefit from './app/locales/fr/Benefit.json';
import frPrices from './app/locales/fr/Prices.json';
import frProjectCard from './app/locales/fr/ProjectCard.json';
import frProjectsLayout from './app/locales/fr/ProjectsLayout.json';
import frProjectsData from './app/locales/fr/ProjectsData.json';
import frContact from './app/locales/fr/Contact.json';
import frFooter from './app/locales/fr/Footer.json';
import frProcess from './app/locales/fr/Process.json';

i18n.use(initReactI18next).init({
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
  resources: {
    en: {
      header: enHeader,
      hero: enHero,
      about: enAbout,
      benefit: enBenefit,
      prices: enPrices,
      projectCard: enProjectCard,
      projectsLayout: enProjectsLayout,
      projectsData: enProjectsData,
      process: enProcess,
      contact: enContact,
      footer: enFooter
    },
    fr: {
      header: frHeader,
      hero: frHero,
      about: frAbout,
      benefit: frBenefit,
      prices: frPrices,
      projectCard: frProjectCard,
      projectsLayout: frProjectsLayout,
      projectsData: frProjectsData,
      process: frProcess,
      contact: frContact,
      footer: frFooter
    }
  }
});

export default i18n;
