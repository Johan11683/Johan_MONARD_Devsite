import type { BenefitContent } from "./benefit.types";

export const BENEFIT_DEFAULT: BenefitContent = {
  kicker: { fr: "Ce que je fais pour vous", en: "What I do for you" },
  title: {
    fr: "Un site simple, clair, qui vous aide vraiment à vendre",
    en: "A simple, clear website that really helps you sell",
  },
  subtitle: {
    fr: "Mon rôle : transformer vos idées en une présence en ligne nette et rassurante, que vos clients comprennent en quelques secondes.",
    en: "My role is to turn your ideas into a clean, reassuring online presence that your clients understand in just a few seconds.",
  },

  cards: {
    overview: {
      enabled: true,
      title: {
        fr: "Compréhensible en un coup d'œil",
        en: "Clear at a glance",
      },
      text: {
        fr: "On va droit au but : qui vous êtes, ce que vous proposez, comment vous contacter. En un coup d'œil votre client trouve l'essentiel.",
        en: "We go straight to the point: who you are, what you offer, how to contact you. In one glance, your client finds the essentials.",
      },
    },

    clients: {
      enabled: true,
      title: { fr: "Pensé pour vos clients", en: "Designed for your clients" },
      text: {
        fr: "J'écris vos textes avec des mots simples, des titres clairs et une mise en page qui donne envie de lire. L'objectif : inspirer confiance et donner envie de passer à l'action.",
        en: "I write your content with simple words, clear headings and a layout that makes people want to read. The goal: inspire trust and encourage them to take action.",
      },
    },

    transparent: {
      enabled: true,
      title: { fr: "Une prestation transparente", en: "A transparent service" },
      text: {
        fr: "Tout est posé noir sur blanc dès le départ : tarif, délais, étapes. Pas de frais cachés, pas de surprise en cours de route. Une fois le design validé ensemble, vous n'avez presque rien à gérer. Votre temps est précieux.",
        en: "Everything is laid out from the start: price, timeline, steps. No hidden fees, no nasty surprises along the way. Once the design is validated together, you have almost nothing left to manage. Your time is valuable.",
      },
    },

    ownership: {
      enabled: true,
      title: { fr: "Vous êtes propriétaire du site", en: "You own your website" },
      text: {
        fr: "Votre site est hébergé gratuitement sur Vercel, et vous gardez la propriété de votre nom de domaine acheté sur OVH. Je vous accompagne pas à pas pour tout mettre en place.",
        en: "Your site is hosted for free on Vercel, and you keep full ownership of your domain name, purchased on OVH. I guide you step by step to set everything up.",
      },
    },

    noMaintenance: {
      enabled: true,
      title: { fr: "Sans contrat de maintenance", en: "No maintenance contract" },
      text: {
        fr: "Vous restez propriétaire de votre site à 100 %, sans aucun abonnement ni engagement. Une fois le site livré, vous êtes totalement autonome. Besoin d'évolutions par la suite ? Je vous accompagne sur devis, uniquement lorsque vous en avez besoin.",
        en: "You remain 100% owner of your website, with no subscription and no long-term commitment. Once the site is delivered, you stay fully autonomous. Need new features later on? I help you on a quote basis, only when you need it.",
      },
    },
  },

  footer: {
    line1: {
      fr: "Concrètement, on part de votre réalité : votre métier, vos clients, vos mots. Je m'occupe de traduire tout ça en un site propre, rapide et professionnel.",
      en: "In practice, we start from your reality: your business, your clients, your own words. I turn all of that into a clean, fast and professional website.",
    },
    line2: { fr: "Un site qui travaille pour vous.", en: "A website that works for you." },
    ctaText: { fr: "Discuter de votre projet", en: "Talk about your project" },
    ctaHref: "#contact",
  },
};
