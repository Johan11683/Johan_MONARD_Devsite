import type { ProcessContent } from "./process.types";

export const PROCESS_DEFAULT: ProcessContent = {
  kicker: {
    en: "Steps",
    fr: "Étapes",
  },
  title: {
    en: "How it works",
    fr: "Comment ça se passe",
  },
  subtitle: {
    en: "A simple, clear process with no hassle. The website is usually completed within one to two weeks, depending on the content provided and the responsiveness of our exchanges.",
    fr: "Un processus simple, clair, et sans prise de tête. La création du site prend généralement une à deux semaines, selon les éléments transmis et la réactivité de nos échanges.",
  },
  steps: [
    {
      title: { en: "Discussion & scope", fr: "Échange & cadrage" },
      text: {
        en: "We discuss your business, your goals, your pages, and the overall direction of the website.",
        fr: "On échange sur votre activité, vos objectifs, vos pages et l’orientation générale du site.",
      },
    },
    {
      title: { en: "Structure & mockup", fr: "Structure & maquette" },
      text: {
        en: "I prepare the website structure and a mockup. Once validated, a 30% deposit is required to start the project.",
        fr: "Je prépare la structure et une maquette du site. Après validation, un acompte de 30 % est demandé pour lancer le projet.",
      },
    },
    {
      title: { en: "Content delivery", fr: "Transmission des contenus" },
      text: {
        en: "Once the mockup is approved, you send me your texts and photos (I can guide you if needed).",
        fr: "Une fois la maquette validée, vous m’envoyez vos textes et vos photos (je peux vous guider si besoin).",
      },
    },
    {
      title: { en: "Development & launch", fr: "Développement & mise en ligne" },
      text: {
        en: "I develop the website, then assist you with purchasing a domain name in your name (annual cost) and deploy the site on Vercel, under your account (free hosting).",
        fr: "Je développe le site, puis je vous accompagne pour l’achat du nom de domaine à votre nom (coût annuel) et je mets le site en ligne sur Vercel, sous votre compte (hébergement gratuit).",
      },
    },
    {
      title: { en: "Handover & follow-up", fr: "Remise des clés & suivi" },
      text: {
        en: "Once the website is completed and the balance paid, I provide you with the full source code and all access credentials. You fully own your website, while I remain available if needed.",
        fr: "Une fois le site finalisé et le solde réglé, je vous transmets le code et l’ensemble des accès. Vous êtes pleinement propriétaire de votre site, tout en me laissant intervenir si nécessaire.",
      },
    },
  ],
};
