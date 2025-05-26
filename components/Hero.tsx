"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import "@/styles/components.scss";

export default function Hero() {
  const { t } = useTranslation("common");

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__text">
          <h1>{t("hero_title")}</h1>
          <p className="hero__subtitle">{t("hero_subtitle")}</p>
          <a href="#projects" className="hero__cta">
            {t("cta_projects")}
          </a>
        </div>

        <div className="hero__image">
          <Image
            src="/images/profile-pic.webp"
            alt="Photo de Johan"
            width={160}
            height={160}
            className="hero__profile-pic"
          />
        </div>
      </div>
    </section>
  );
}
