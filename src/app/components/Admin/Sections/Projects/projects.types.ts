// src/app/components/Admin/Sections/Projects/projects.types.ts

export type LocaleKey = "fr" | "en";

export type LocalizedText = Record<LocaleKey, string>;
export type LocalizedTags = Record<LocaleKey, string[]>;

export type ProjectItem = {
  id: string;
  enabled: boolean;

  title: LocalizedText;
  description: LocalizedText;

  image: {
    src: string;
    publicId?: string;
    alt: LocalizedText;
  };

  link: {
    href: string;
    label: LocalizedText;
    newTab: boolean;
  };

  tags: LocalizedTags;
  github?: { href: string } | null;
};

export type ProjectsContent = {
  kicker: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;

  // ✅ le “Site vitrine réalisé pour” (si tu veux l’éditer ensuite)
  // cardKicker: LocalizedText;

  items: ProjectItem[];
};
