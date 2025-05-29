import "../styles/index.scss";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Johan | Développeur Web",
  description: "Portfolio de développeur web interactif de Johan Monard",
  icons: {
    icon: "/favicon.png", // placé dans /public
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="layout-container">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}