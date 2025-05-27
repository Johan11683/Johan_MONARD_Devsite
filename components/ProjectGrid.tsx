"use client";
import { useTranslation } from "react-i18next";

import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
    const { t } = useTranslation("common");
  return (
    <section id="projects" className="project-grid">
      <h2 className="project-grid__title">{t("projectsTitle")}</h2>
      <div className="project-grid__wrapper">
        <ProjectCard
          title="Cannelle Brunch"
          link="https://www.instagram.com/cannelle.brunch/"
          image="/images/projects/cannelle_logo.webp"
        />
        <ProjectCard
          title="SEO - Nina Carducci"
          link="https://johan11683.github.io/Projet-4/"
          image="/images/projects/camera.webp"
        />
      </div>
    </section>
  );
}
