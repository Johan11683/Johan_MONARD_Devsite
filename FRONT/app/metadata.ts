import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "devhook – Portfolio de Johan Monard",
  description: "Développeur web fullstack à Bordeaux. Projets modernes, APIs sécurisées, React, Node.js, MongoDB.",
  metadataBase: new URL("https://www.devhook.fr"),

  alternates: {
    canonical: "https://www.devhook.fr",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "devhook – Portfolio de Johan Monard",
    description: "Découvrez mon site CV interactif en React et Next.js. Interfaces modernes, APIs sécurisées, SEO optimisé.",
    url: "https://www.devhook.fr",
    siteName: "devhook",
    images: [
      {
        url: "https://www.devhook.fr/images/logos/og-cover.webp",
        width: 1200,
        height: 630,
        alt: "devhook - Johan Monard Portfolio",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "devhook – Portfolio de Johan Monard",
    description: "Développeur web à Bordeaux, React, Node.js, SEO, APIs sécurisées.",
    images: ["https://www.devhook.fr/images/logos/og-cover.webp"],
  },

  icons: {
    icon: "/images/logos/og-cover.webp",
  },

  verification: {
    google: "D7cRf1xM3jguO-OXqil81PA_SyLe005TNVD0HY7WmBY",
  },
};
