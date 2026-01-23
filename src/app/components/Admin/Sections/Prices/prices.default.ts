import type { PricesContent } from "./prices.types";

export const PRICES_DEFAULT: PricesContent = {
  kicker: { fr: "Tarifs", en: "Pricing" },
  title: { fr: "Mes prestations", en: "My services" },
  subtitle: {
    fr: "Trois offres simples et transparentes. Si vos besoins sortent du cadre, je propose aussi des devis sur mesure.",
    en: "Three simple and transparent offers. If your needs go beyond this scope, I also provide custom quotes.",
  },

  badgeMostPopular: { fr: "Offre la plus demandée", en: "Most popular offer" },

  cards: {
    standard: {
      enabled: true,
      title: { fr: "Site vitrine + formulaire email", en: "Showcase website + contact form" },
      price: { fr: "1400 €*", en: "€1400*" },
      description: {
        fr: "Un site complet et professionnel, incluant un formulaire de contact pour recevoir des emails.",
        en: "A complete and professional website, including a contact form to receive emails.",
      },
      features: {
        fr: [
          "Design moderne et responsive, adapté à tous les formats d’écran",
          "Site en une ou plusieurs pages (Accueil, À propos, Services, Contact, Galerie)",
          "Animations légères et perfectionnement du rendu selon votre univers visuel",
          "Formulaire de contact intégré et sécurisé",
          "Mise en ligne et accompagnement pour le nom de domaine (votreentreprise.com / .fr)",
          "Optimisation SEO local pour améliorer votre visibilité en ligne",
        ],
        en: [
          "Modern, responsive design adapted to all screen sizes",
          "One or multiple pages (Home, About, Services, Contact, Gallery)",
          "Light animations and visual refinements aligned with your brand identity",
          "Integrated and secure contact form",
          "Deployment and assistance with domain name setup (yourbusiness.com / .fr)",
          "Local SEO optimisation to improve your online visibility",
        ],
      },
      highlight: false,
    },

    bilingual: {
      enabled: true,
      title: {
        fr: "Site vitrine + maintenance incluse\nOption traduction FR / EN",
        en: "Showcase website + maintenance included\nOptional FR / EN translation",
      },
      price: { fr: "1600 €*", en: "€1600*" },
      description: {
        fr: "La formule la plus choisie : un site vitrine professionnel avec du temps de maintenance inclus pour gérer sereinement les mises à jour.",
        en: "The most popular option: a professional showcase website with included maintenance time for stress-free updates.",
      },
      features: {
        fr: [
          "Toutes les fonctionnalités de l’offre précédente",
          "Forfait modifications mineures : 2h offertes (textes et photos)",
          "Internationalisation (FR / EN) possible si besoin",
        ],
        en: [
          "All features from the previous offer",
          "Minor updates package: 2 hours included (texts and photos)",
          "Internationalisation (FR / EN) available if needed",
        ],
      },
      highlight: true,
    },

    admin: {
      enabled: true,
      title: { fr: "Site administrable (autonome)", en: "Self-managed website (admin access)" },
      price: { fr: "2500 €*", en: "€2500*" },
      description: {
        fr: "Un site conçu pour être entièrement administré par vos soins, sans intervention du prestataire.",
        en: "A website designed to be fully managed by you, without any intervention from the provider.",
      },
      features: {
        fr: [
          "Toutes les fonctionnalités de l’offre précédente",
          "Espace administrateur sécurisé avec accès personnel",
          "Modification autonome des textes et des images",
          "Bandeau promotionnel personnalisable, activable ou désactivable",
          "Base de données au nom du client",
          "Formation courte à la prise en main",
        ],
        en: [
          "All features from the previous offer",
          "Secure admin area with personal access",
          "Independent editing of texts and images",
          "Customisable promotional banner, toggle on / off",
          "Database owned by the client",
          "Short onboarding and training session",
        ],
      },
      highlight: false,
    },
  },

  custom: {
    paragraph1: {
      fr: "Une refonte de votre site actuel ou un besoin spécifique ? Nous en parlons ensemble et je vous propose un devis adapté à votre activité.",
      en: "A redesign of your existing website or a specific need? Let’s discuss it together and I’ll provide a quote tailored to your activity.",
    },
  },

  updatesPolicy: {
    title: { fr: "Fonctionnement des mises à jour", en: "Update policy" },
    text: {
      fr: "Pour les offres Site vitrine, les mises à jour se font simplement par email. Selon la formule choisie, un temps de modification peut être inclus. Au-delà, les interventions sont facturées au forfait : 100€ minimum, puis 50€/h.",
      en: "For showcase website offers, updates are handled simply by email. Depending on the selected package, some update time may be included. Beyond that, interventions are billed as a package: €100 minimum, then €50/hour.",
    },
  },

  legalNote: {
    fr: "*Tarifs non soumis à la TVA selon l’article 293 B du CGI",
    en: "*Prices not subject to VAT according to article 293 B of the French General Tax Code",
  },
};
