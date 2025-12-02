import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// --- EN ---
import enHeader from "./locales/en/header.json";
import enHero from "./locales/en/hero.json";
import enAbout from "./locales/en/about.json";
import enGallery from "./locales/en/gallery.json";
import enContact from "./locales/en/contact.json";
import enFooter from "./locales/en/footer.json";

// --- FR ---
import frHeader from "./locales/fr/header.json";
import frHero from "./locales/fr/hero.json";
import frAbout from "./locales/fr/about.json";
import frGallery from "./locales/fr/gallery.json";
import frContact from "./locales/fr/contact.json";
import frFooter from "./locales/fr/footer.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    resources: {
      en: {
        header: enHeader,
        hero: enHero,
        about: enAbout,
        gallery: enGallery,
        contact: enContact,
        footer: enFooter,
      },
      fr: {
        header: frHeader,
        hero: frHero,
        about: frAbout,
        gallery: frGallery,
        contact: frContact,
        footer: frFooter,
      },
    },
  });

export default i18n;
