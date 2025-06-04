import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Punch.Dev – Portfolio de Johan Monard",
  description: "Développeur web fullstack à Bordeaux. Projets modernes, APIs sécurisées, React, Node.js, MongoDB.",
  metadataBase: new URL("https://www.punch.dev"),
  alternates: {
    canonical: "https://www.punch.dev",
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
    url: "https://www.punch.dev",
    siteName: "Punch.Dev",
    images: [
      {
        url: "/images/opengraph-cover.png",
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
    images: ["/images/logos/punch.dev.webp"],
  },
  icons: {
    icon: "/favicon.png",
  },
};
