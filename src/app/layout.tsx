import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './styles/globals.scss';
import { Alumni_Sans } from 'next/font/google';
import I18nProvider from './I18nProvider';

const alumniSans = Alumni_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://devhook.fr'),
  title: 'Création de Sites Vitrines',
  description: 'Création de sites vitrines modernes pour TPE et commerçants : design pro, SEO local, formulaire email. Basé à Bordeaux. Devis rapide.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Johan MONARD',
    description: 'Création de sites vitrines modernes pour TPE et commerçants : design pro, SEO local, formulaire email. Basé à Bordeaux. Devis rapide.',
    url: 'https://devhook.fr',
    siteName: 'devhook.fr',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'logo devhook',
      },
    ],
    locale: 'fr',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Johan MONARD création de sites vitrines',
    description: 'Création de sites vitrines modernes pour TPE et commerçants : design pro, SEO local, formulaire email. Basé à Bordeaux. Devis rapide.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={alumniSans.className}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
