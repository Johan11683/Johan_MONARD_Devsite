"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import type {
  LocaleKey,
  ProjectsContent,
} from "@/app/components/Admin/Sections/Projects/projects.types";

import layout from "./ProjectsLayout.module.scss";
import card from "../ProjectCard/ProjectCard.module.scss";

type ProjectsViewProps = {
  value: ProjectsContent;
  locale: LocaleKey;
};

function hasText(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function renderMultiline(text: string) {
  const lines = text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (lines.length <= 1) return text;

  return (
    <>
      {lines.map((line, idx) => (
        <span key={`line-${idx}`}>
          {line}
          {idx < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

export default function ProjectsView({ value, locale }: ProjectsViewProps) {
  const { t } = useTranslation("projectCard");

  const enabled = value.items.filter((p) => p.enabled);

  return (
    <section
      id="projects"
      className={layout.projects}
      aria-labelledby="projects-title"
    >
      {/* Intro (ProjectsLayout) */}
      <header className={layout.intro}>
        <p className={layout.kicker}>{value.kicker[locale]}</p>

        <h2 id="projects-title" className={layout.title}>
          {value.title[locale]}
        </h2>

        <p className={layout.subtitle}>{renderMultiline(value.subtitle[locale])}</p>
      </header>

      {/* Projects (ProjectCard style) */}
      {enabled.map((p) => {
        const href = p.link.href?.trim() ?? "";
        const openInNewTab = !!p.link.newTab;

        const src = p.image.src?.trim() ?? "";
        const alt = p.image.alt?.[locale]?.trim() ?? "";

        const hasLink = hasText(href);
        const hasImg = hasText(src);

        const content = (
          <>
            <div className={card.imageWrapper}>
              {hasImg ? (
                <Image
                  src={src}
                  alt={hasText(alt) ? alt : ""}
                  fill
                  className={card.image}
                  sizes="(max-width: 768px) 94vw, (max-width: 1200px) 90vw, 1400px"
                  priority={false}
                />
              ) : (
                <div className={card.image} aria-hidden="true" />
              )}

              <div className={card.imageOverlay} aria-hidden="true" />
            </div>

            <div className={card.text}>
              {/* ✅ kicker i18n comme le public */}
              <p className={card.kicker}>{t("kicker")}</p>

              <h3 className={card.title}>{p.title[locale]}</h3>
              <p className={card.subtitle}>{p.description[locale]}</p>
            </div>
          </>
        );

        return (
          <div key={p.id} className={layout.projectSection}>
            <article className={card.card}>
              {hasLink ? (
                <a
                  className={card.cardLink}
                  href={href}
                  target={openInNewTab ? "_blank" : undefined}
                  rel={openInNewTab ? "noopener noreferrer" : undefined}
                  aria-label={p.title[locale]}
                >
                  {content}
                </a>
              ) : (
                <div className={card.cardLink}>{content}</div>
              )}
            </article>
          </div>
        );
      })}

      <div className={layout.separator} aria-hidden="true" />
    </section>
  );
}
