"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import "@/styles/components.scss";

export default function Hero() {
  const { t } = useTranslation("common");

  return (
    <section id="welcome" className="hero" aria-label="Section d’introduction : bienvenue">
      <div className="hero__container">
        <div className="hero__text">
          <h1>{t("hero_title")}</h1>
          <p className="hero__subtitle">{t("hero_subtitle")}</p>
          <Link
            href="#projects"
            className="hero__cta"
            aria-label="Voir la section de mes projets"
          >
            {t("cta_projects")}
          </Link>
        </div>

        <div className="hero__image">
          <Image
            src="/images/profile-pic.webp"
            alt="Photo de profil de Johan"
            width={160}
            height={160}
            className="hero__profile-pic"
            priority
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
