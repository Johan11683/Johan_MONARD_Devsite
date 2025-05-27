"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import "@/styles/layout.scss";
import i18n from "@/lib/i18n";

export default function Header() {
  const [language, setLanguage] = useState<"fr" | "en">("fr");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as "fr" | "en" | null;
    const initialLang = storedLang || "fr";
    setLanguage(initialLang);
    i18n.changeLanguage(initialLang); // synchronise i18n au chargement
  }, []);

  const handleLanguageChange = (lang: "fr" | "en") => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang); // applique le changement de langue immédiatement
  };

  return (
    <header className="header">
  <div className="header__container layout-container">
    <div className="header__logo">
      <Link href="/">Johan.dev</Link>
    </div>

    <nav className="header__nav">
      <ul>
        <li>
          <Link href="/">{language === "fr" ? "Accueil" : "Home"}</Link>
        </li>
        <li>
          <Link href="/about">{language === "fr" ? "À propos" : "About"}</Link>
        </li>
        <li>
          <Link href="/projects">{language === "fr" ? "Projets" : "Projects"}</Link>
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
