import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Punch.Dev – Portfolio de Johan Monard",
  description: "Développeur web fullstack à Bordeaux. Projets modernes, APIs sécurisées, React, Node.js, MongoDB.",
  metadataBase: new URL("https://johan-monard-devsite.vercel.app"),

  alternates: {
    canonical: "https://johan-monard-devsite.vercel.app",
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
    title: "Punch.Dev – Portfolio de Johan Monard",
    description: "Découvrez mon site CV interactif en React et Next.js. Interfaces modernes, APIs sécurisées, SEO optimisé.",
    url: "https://johan-monard-devsite.vercel.app",
    siteName: "Punch.Dev",
    images: [
      {
        url: "https://johan-monard-devsite.vercel.app/images/logos/punch.dev.webp",
        width: 1200,
        height: 630,
        alt: "Punch.Dev - Johan Monard Portfolio",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Punch.Dev – Portfolio de Johan Monard",
    description: "Développeur web à Bordeaux, React, Node.js, SEO, APIs sécurisées.",
    images: ["https://johan-monard-devsite.vercel.app/images/logos/punch.dev.webp"],
  },

  icons: {
    icon: "/favicon.png",
  },

  verification: {
    google: "D7cRf1xM3jguO-OXqil81PA_SyLe005TNVD0HY7WmBY",
  },
};
