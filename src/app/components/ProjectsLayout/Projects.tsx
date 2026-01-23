"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import ProjectsView from "./ProjectsView";

import type {
  ProjectsContent,
  LocaleKey,
} from "@/app/components/Admin/Sections/Projects/projects.types";

import { PROJECTS_DEFAULT } from "@/app/components/Admin/Sections/Projects/projects.default";
import { normalizeProjects } from "@/app/components/Admin/Sections/Projects/projects.normalize";

export default function Projects() {
  const { i18n } = useTranslation();

  const locale = useMemo<LocaleKey>(() => {
    return i18n.language?.startsWith("en") ? "en" : "fr";
  }, [i18n.language]);

  const [draft, setDraft] = useState<ProjectsContent>(PROJECTS_DEFAULT);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/content/projects", { cache: "no-store" });
        if (!res.ok) return;

        const data = (await res.json()) as Partial<ProjectsContent> | null;
        setDraft(normalizeProjects(data));
      } catch (e) {
        console.error("Erreur chargement projects public:", e);
      }
    }

    load();
  }, []);

  return <ProjectsView value={draft} locale={locale} />;
}
