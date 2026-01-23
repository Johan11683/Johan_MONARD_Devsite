// src/app/components/Admin/Sections/Projects/projects.default.ts

import type { ProjectsContent } from "./projects.types";

export const PROJECTS_DEFAULT: ProjectsContent = {
  kicker: { fr: "Ils me font confiance", en: "They trust me" },

  title: { fr: "Mes réalisations", en: "My work" },

  // ✅ on colle tes 2 lignes i18n dans un seul string (on splitera dans le View si tu veux)
  subtitle: {
    fr: "Mes réalisations sont faîtes sur mesure, en échangeant avec vous.\nMieux je vous connais, mieux vos clients vous connaîtront.",
    en: "Each project is tailor-made, built by talking with you.\nThe better I know you, the better your clients will understand you.",
  },

  items: [
    {
      id: "pascal",
      enabled: true,

      title: { fr: "La Cave de Pascal", en: "La Cave de Pascal" },
      description: { fr: "Caviste premium", en: "Premium wine shop" },

      image: {
        // ✅ admin: tu pourras coller une URL (ou chemin /public/...)
        src: "",
        alt: {
          fr: "Aperçu du site La Cave de Pascal",
          en: "Preview of La Cave de Pascal website",
        },
      },

      link: {
        href: "",
        label: { fr: "Voir le site", en: "Open website" },
        newTab: true,
      },

      tags: { fr: [], en: [] },
    },

    {
      id: "nectar",
      enabled: true,

      title: { fr: "Nectar Wine Merchant", en: "Nectar Wine Merchant" },
      description: { fr: "Négociant de grands vins", en: "Fine wine merchant" },

      image: {
        src: "",
        alt: {
          fr: "Aperçu du site Nectar Wine Merchant",
          en: "Preview of Nectar Wine Merchant website",
        },
      },

      link: {
        href: "",
        label: { fr: "Voir le site", en: "Open website" },
        newTab: true,
      },

      tags: { fr: [], en: [] },
    },

    {
      id: "brunch",
      enabled: true,

      title: { fr: "Cannelle Brunch", en: "Cannelle Brunch" },
      description: {
        fr: "Livraison de Brunch faits maison à domicile",
        en: "Homemade brunch delivery service",
      },

      image: {
        src: "",
        alt: {
          fr: "Aperçu du site Cannelle Brunch",
          en: "Preview of Cannelle Brunch website",
        },
      },

      link: {
        href: "",
        label: { fr: "Voir le site", en: "Open website" },
        newTab: true,
      },

      tags: { fr: [], en: [] },
    },
  ],
};
