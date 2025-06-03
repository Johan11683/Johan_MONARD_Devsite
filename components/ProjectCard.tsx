"use client";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  link: string;
  image: string;
  descriptionKey: string; // ex: "projects.cannelle"
};

export default function ProjectCard({ title, link, image, descriptionKey }: ProjectCardProps) {
  const { t } = useTranslation("common");

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("seeProject")} – ${title}`}
      className="project-card"
    >
      <article className="project-card__content">
        <div className="project-card__image">
          <Image
            src={image}
            alt={`Logo ou visuel du projet ${title}`}
            width={100}
            height={100}
            loading="lazy"
          />
        </div>

        <h3>{title}</h3>
        <p className="project-card__desc-title">{t(`${descriptionKey}.descriptionTitle`)}</p>
        <p className="project-card__desc">{t(`${descriptionKey}.descriptionContent`)}</p>

        <span className="project-card__link">→ {t("seeProject")}</span>
      </article>
    </Link>
  );
}
