"use client";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  link: string;
  image: string;
};

export default function ProjectCard({ title, link, image }: ProjectCardProps) {
    const { t } = useTranslation("common");
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <div className="project-card__image">
        <Image
          src={image}
          alt={`Aperçu de ${title}`}
          width={100}
          height={100}
          loading="lazy"
        />
      </div>
      <div className="project-card__content">
        <h3>{title}</h3>
        <p>→ {t("seeProject")}</p>
      </div>
    </Link>
  );
}
