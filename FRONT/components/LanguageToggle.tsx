"use client";
import { useState } from "react";
import Image from "next/image";

export default function LanguageToggle() {
  const [lang, setLang] = useState<"fr" | "en">("fr");

  const handleLang = (l: "fr" | "en") => {
    setLang(l);
    // Ici tu déclencheras le changement de langue avec i18n plus tard
  };

  return (
    <div className="toggle-group">
      <button
        onClick={() => handleLang("fr")}
        className={lang === "fr" ? "active" : ""}
      >
        <Image src="/images/fr-flag.webp" alt="FR" width={24} height={24} />
      </button>
      <button
        onClick={() => handleLang("en")}
        className={lang === "en" ? "active" : ""}
      >
        <Image src="/images/uk-flag.webp" alt="EN" width={24} height={24} />
      </button>
    </div>
  );
}
