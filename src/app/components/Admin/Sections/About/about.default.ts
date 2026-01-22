import type { AboutContent } from "./about.types";

export const ABOUT_DEFAULT: AboutContent = {
  kicker: { fr: "À propos", en: "About" },

  title: {
    fr: "Un développeur qui vient du monde du commerce",
    en: "A developer who comes from the world of sales",
  },

  photoAlt: {
    fr: "Photo de profil de Johan, développeur web",
    en: "Profile picture of Johan, web developer",
  },
  photoCaption: {
    fr: "Johan – ancien commerçant dans le vin, aujourd'hui développeur web.",
    en: "Johan – former wine merchant, now web developer.",
  },

  lead: {
    fr: "Avant de créer des sites, j'ai passé plusieurs années dans le vin : en cave à vin en contact direct avec les particuliers en B2C, puis chez un négociant de grands vins en B2B avec des professionnels exigeants.",
    en: "Before building websites, I spent several years working in wine: first in a wine shop, dealing directly with retail customers (B2C), then at a fine wine merchant, working with demanding professionals (B2B).",
  },

  text1: {
    fr: "J'ai appris à écouter, comprendre un métier rapidement, expliquer simplement des choses techniques et gérer des relations sur la durée. Aujourd'hui, j'utilise ces compétences pour traduire votre activité en un site clair, rassurant et crédible pour vos clients.",
    en: "I learned how to listen, quickly understand a business, explain technical things in simple terms and build long-term relationships. Today, I use these skills to turn your activity into a clear, reassuring and credible website for your clients.",
  },

  text2: {
    fr: "Je me suis ensuite formé au développement web (HTML, CSS, JavaScript, React, Next.js, Node), avec un objectif simple : proposer aux TPE / PME des sites modernes, rapides et compréhensibles, sans discours technique.",
    en: "I then trained as a web developer (HTML, CSS, JavaScript, React, Next.js, Node) with a simple goal: to offer small businesses modern, fast and easy-to-understand websites, without technical jargon.",
  },

  bullets: [
    {
      strong: { fr: "Je comprends vos enjeux :", en: "I understand your challenges:" },
      text: {
        fr: "visibilité, image sérieuse, contact facile et gain de temps.",
        en: "visibility, a serious image, easy contact and saving time.",
      },
    },
    {
      strong: { fr: "Je parle votre langage :", en: "I speak your language:" },
      text: {
        fr: "commerçant, négoce, artisant, TPE, PME, pas du jargon.",
        en: "wine trade, retail, craftsmanship, small businesses – not jargon.",
      },
    },
    {
      strong: { fr: "Je travaille simplement :", en: "I work in a simple way:" },
      text: {
        fr: "pour faire de manière artisanale un site propre qui vous ressemble et qui rassure vos clients.",
        en: "to craft, step by step, a clean website that reflects who you are and reassures your clients.",
      },
    },
  ],

  outro: {
    fr: "Que vous soyez un commerçant, un négociant, un artisan ou une petite entreprise, mon objectif est que vous vous reconnaissiez dans votre site, et que vos clients aient envie de vous contacter ou de venir chez vous.",
    en: "Whether you are a wine shop, a wine merchant, a craftsman or a small business, my goal is that you recognise yourself in your website – and that your clients feel like contacting you or coming to see you.",
  },
};
