// layout.tsx
import "../styles/index.scss";
import { metadata } from "./metadata"; // ✅ import du metadata complet
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Oswald } from "next/font/google";
import Head from "next/head";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-oswald",
});

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <Head>
        <meta
          name="google-site-verification"
          content="D7cRf1xM3jguO-OXqil81PA_SyLe005TNVD0HY7WmBY"
        />
        <link
          rel="preload"
          href="/fonts/orbitron/Orbitron-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter/Inter-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>

      <body className={oswald.variable}>
        <div className="layout-container">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
