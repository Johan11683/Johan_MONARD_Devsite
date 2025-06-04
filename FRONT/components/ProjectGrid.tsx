"use client";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  const { t } = useTranslation("common");

  return (
    <section
      id="projects"
      className="project-grid"
      aria-labelledby="projects-heading"
    >
      <h2 id="projects-heading" className="project-grid__title">
        {t("projectsTitle")}
      </h2>

      <div className="project-grid__wrapper">
        <ProjectCard
          title="Cannelle Brunch"
          link="https://www.instagram.com/cannelle.brunch/"
          image="/images/projects/cannelle_logo.webp"
          descriptionKey="projects.cannelle"
        />
        <ProjectCard
          title="Nina Carducci | Photographie"
          link="https://johan11683.github.io/Projet-4/"
          image="/images/projects/camera.webp"
          descriptionKey="projects.nina"
        />
      </div>
    </section>
  );
}
