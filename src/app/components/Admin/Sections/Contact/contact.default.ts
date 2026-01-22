// app/components/Admin/Sections/Contact/contact.default.ts
import type { ContactContent } from "./contact.types";

export const CONTACT_DEFAULT: ContactContent = {
  kicker: {
    fr: "Contact",
    en: "Contact",
  },
  title: {
    fr: "Discutons de votre projet",
    en: "Let's talk about your project",
  },
  lead: {
    fr: "Un site, c'est avant tout une discussion. Un mail, un appel, et on voit ensemble ce qui est adapté à votre activité.",
    en: "A website always starts with a conversation. Send an email, give me a call, and we'll see together what fits your business.",
  },

  labels: {
    phone: { fr: "Téléphone", en: "Phone" },
    email: { fr: "E-mail", en: "Email" },
    address: { fr: "Adresse", en: "Address" },
  },

  form: {
    fullName: { fr: "Nom complet *", en: "Full name *" },
    email: { fr: "Adresse e-mail *", en: "Email address *" },
    phone: { fr: "Numéro de téléphone (facultatif)", en: "Phone number (optional)" },
    message: { fr: "Message *", en: "Message *" },
  },

  button: {
    idle: { fr: "Envoyer le message", en: "Send message" },
    loading: { fr: "Envoi en cours…", en: "Sending…" },
  },

  status: {
    success: {
      fr: "Merci, votre message a bien été envoyé.",
      en: "Thank you, your message has been sent.",
    },
    errorPart1: {
      fr: "Une erreur est survenue. Vous pouvez aussi m'écrire directement à",
      en: "Something went wrong. You can also write to me directly at",
    },
    errorPart2: { fr: ".", en: "." },
  },

  info: {
    phoneText: "07 77 84 26 12",
    phoneHref: "tel:+33777842612",
    emailText: "contact.monard.johan@gmail.com",
    emailHref: "mailto:contact.monard.johan@gmail.com",
    addressLine1: "230 avenue d'Eysines",
    addressLine2: "33200 Bordeaux",
  },
};
