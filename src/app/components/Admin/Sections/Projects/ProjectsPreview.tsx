// src/app/components/Admin/Sections/Projects/ProjectsPreview.tsx
"use client";

import ProjectsView from "@/app/components/ProjectsLayout/ProjectsView";
import type { ProjectsContent, LocaleKey } from "./projects.types";

type ProjectsPreviewProps = {
  value: ProjectsContent;
  locale: LocaleKey;
};

export default function ProjectsPreview({ value, locale }: ProjectsPreviewProps) {
  return <ProjectsView value={value} locale={locale} />;
}
