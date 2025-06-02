import "../styles/index.scss";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Oswald } from "next/font/google";


export const metadata: Metadata = {
  title: "Johan | Développeur Web",
  description: "Portfolio de développeur web interactif de Johan Monard",
  icons: {
    icon: "/favicon.png",
  },
};


const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-oswald"
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
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