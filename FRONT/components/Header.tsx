"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import i18n from "@/lib/i18n";
import "@/styles/layout.scss";

export default function Header() {
  const [language, setLanguage] = useState<"fr" | "en">(i18n.language as "fr" | "en");

  useEffect(() => {
    const syncLang = () => {
      const currentLang = i18n.language as "fr" | "en";
      setLanguage(currentLang);
    };
    i18n.on("languageChanged", syncLang);
    return () => {
      i18n.off("languageChanged", syncLang);
    };
  }, []);

  const handleLanguageChange = (lang: "fr" | "en") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <header className="header">
      <div className="header__container layout-container">
        <div className="header__logo">
          <Link href="/" className="glove-cursor header__brand" aria-label="Accueil devhook">
            <Image
              src="/images/logos/devhook.webp"
              alt="devhook logo"
              width={60}
              height={85}
              style={{ marginRight: "0.5rem" }}
            />
            Devhook
          </Link>
        </div>

        <nav className="header__nav" role="navigation" aria-label="Navigation principale">
          <ul>
            <li>
              <Link href="/about" className="glove-cursor">
                {language === "fr" ? "Mon profil" : "About me"}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="glove-cursor">
                {language === "fr" ? "Contact" : "Contact"}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <ThemeToggle />

          <div className="lang-switch toggle-group">
            <button
              onClick={() => handleLanguageChange("fr")}
              className={language === "fr" ? "active" : ""}
            >
              <Image src="/images/fr-flag.webp" alt="FR" width={24} height={24} />
            </button>
            <button
              onClick={() => handleLanguageChange("en")}
              className={language === "en" ? "active" : ""}
            >
              <Image src="/images/uk-flag.webp" alt="EN" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
