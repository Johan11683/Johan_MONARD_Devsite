// src/app/components/Admin/Sections/Projects/projects.normalize.ts

import type { ProjectsContent, ProjectItem, LocaleKey } from "./projects.types";
import { PROJECTS_DEFAULT } from "./projects.default";

type ProjectsPartial = Partial<ProjectsContent>;

function safeText(v: unknown, fallback: string): string {
  return typeof v === "string" && v.trim() ? v : fallback;
}

function safeBool(v: unknown, fallback: boolean): boolean {
  return typeof v === "boolean" ? v : fallback;
}

function safeUrl(v: unknown, fallback = ""): string {
  if (typeof v !== "string") return fallback;
  const s = v.trim();
  if (!s) return fallback;
  // on accepte http(s) et aussi les chemins relatifs (/images/..)
  if (s.startsWith("/") || s.startsWith("http://") || s.startsWith("https://")) return s;
  return fallback;
}

function safeStringArray(v: unknown, fallback: string[]): string[] {
  if (!Array.isArray(v)) return fallback;
  const cleaned = v
    .filter((x) => typeof x === "string")
    .map((s) => s.trim())
    .filter(Boolean);
  return cleaned;
}

function safeLocalizedText(
  v: unknown,
  fallback: Record<LocaleKey, string>
): Record<LocaleKey, string> {
  if (!v || typeof v !== "object") return fallback;
  const obj = v as Record<string, unknown>;
  return {
    fr: safeText(obj.fr, fallback.fr),
    en: safeText(obj.en, fallback.en),
  };
}

function normalizeItem(incoming: unknown, index: number): ProjectItem {
  const baseById: Record<string, ProjectItem> = Object.fromEntries(
    PROJECTS_DEFAULT.items.map((it) => [it.id, it])
  );

  const inc = (incoming && typeof incoming === "object" ? (incoming as Record<string, unknown>) : null) ?? null;

  const incomingId = typeof inc?.id === "string" ? inc.id.trim() : "";
  const base = (incomingId && baseById[incomingId]) || PROJECTS_DEFAULT.items[index] || PROJECTS_DEFAULT.items[0];

  const id = incomingId || base.id || `project-${index + 1}`;

  const title = safeLocalizedText(inc?.title, base.title);
  const description = safeLocalizedText(inc?.description, base.description);

  const imageObj = (inc?.image && typeof inc.image === "object" ? (inc.image as Record<string, unknown>) : null) ?? null;
  const linkObj = (inc?.link && typeof inc.link === "object" ? (inc.link as Record<string, unknown>) : null) ?? null;
  const tagsObj = (inc?.tags && typeof inc.tags === "object" ? (inc.tags as Record<string, unknown>) : null) ?? null;

  const imageAlt = safeLocalizedText(imageObj?.alt, base.image.alt);

  const githubObj =
    inc?.github && typeof inc.github === "object" ? (inc.github as Record<string, unknown>) : null;

  return {
    id,
    enabled: safeBool(inc?.enabled, base.enabled),

    title,
    description,

    image: {
      src: safeUrl(imageObj?.src, base.image.src ?? ""),
      alt: imageAlt,
    },

    link: {
      href: safeUrl(linkObj?.href, base.link.href ?? ""),
      label: safeLocalizedText(linkObj?.label, base.link.label),
      newTab: safeBool(linkObj?.newTab, base.link.newTab ?? true),
    },

    tags: {
      fr: safeStringArray(tagsObj?.fr, base.tags.fr ?? []),
      en: safeStringArray(tagsObj?.en, base.tags.en ?? []),
    },

    github:
      githubObj && typeof githubObj.href === "string" && safeUrl(githubObj.href, "") // allow empty -> omit
        ? { href: safeUrl(githubObj.href, "") }
        : base.github && safeUrl(base.github.href, "") ? { href: base.github.href } : undefined,
  };
}

export function normalizeProjects(data: ProjectsPartial | null): ProjectsContent {
  const fallback = PROJECTS_DEFAULT;

  const kicker = safeLocalizedText(data?.kicker, fallback.kicker);
  const title = safeLocalizedText(data?.title, fallback.title);
  const subtitle = safeLocalizedText(data?.subtitle, fallback.subtitle);

  const incomingItems = Array.isArray(data?.items) ? data!.items : null;

  const items: ProjectItem[] = incomingItems
    ? incomingItems.map((it, idx) => normalizeItem(it, idx))
    : fallback.items.map((it, idx) => normalizeItem(it, idx));

  // ✅ sécurité : IDs uniques + pas vides
  const seen = new Set<string>();
  const deduped = items.map((it, idx) => {
    let id = it.id.trim() || `project-${idx + 1}`;
    while (seen.has(id)) id = `${id}-${Math.random().toString(16).slice(2, 6)}`;
    seen.add(id);
    return { ...it, id };
  });

  // ✅ sécurité : tags FR/EN mêmes longueurs ? (ici on s’en fout, c’est pas “ligne à ligne”)
  return {
    kicker,
    title,
    subtitle,
    items: deduped,
  };
}
