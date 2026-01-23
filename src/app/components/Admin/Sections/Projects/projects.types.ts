// src/app/components/Admin/Sections/Projects/projects.types.ts

export type LocaleKey = "fr" | "en";
export type LocalizedText = Record<LocaleKey, string>;

export type ProjectItem = {
  id: string; // stable (sert au reorder + keys React)
  enabled: boolean;

  title: LocalizedText;
  description: LocalizedText;

  image: {
    src: string; // URL (Cloudinary/Vercel/public/...).
    alt: LocalizedText; // accessible + trad
  };

  link: {
    href: string; // URL vers le site / demo / repo
    label: LocalizedText; // ex: "Voir le site" / "Open project"
    newTab: boolean;
  };

  tags: {
    fr: string[];
    en: string[];
  };

  // optionnel mais utile : si tu veux afficher GitHub séparément
  github?: {
    href: string;
  };
};

export type ProjectsContent = {
  kicker: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;

  items: ProjectItem[];
};
