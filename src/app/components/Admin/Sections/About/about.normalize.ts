import type { AboutContent } from "./about.types";
import { ABOUT_DEFAULT } from "./about.default";

type AboutPartial = Partial<AboutContent>;

function safeString(v: unknown, fallback: string): string {
  return typeof v === "string" && v.trim() ? v : fallback;
}

function normalizeLocaleText(
  incoming: unknown,
  fallback: { fr: string; en: string }
): { fr: string; en: string } {
  const obj = incoming && typeof incoming === "object" ? (incoming as Record<string, unknown>) : {};
  return {
    fr: safeString(obj.fr, fallback.fr),
    en: safeString(obj.en, fallback.en),
  };
}

function normalizeBullets(incoming: unknown): AboutContent["bullets"] {
  const base = ABOUT_DEFAULT.bullets;
  const arr = Array.isArray(incoming) ? incoming : [];

  return base.map((baseItem, i) => {
    const item = arr[i] && typeof arr[i] === "object" ? (arr[i] as Record<string, unknown>) : {};
    return {
      strong: normalizeLocaleText(item.strong, baseItem.strong),
      text: normalizeLocaleText(item.text, baseItem.text),
    };
  });
}

export function normalizeAbout(data: AboutPartial | null): AboutContent {
  return {
    kicker: normalizeLocaleText(data?.kicker, ABOUT_DEFAULT.kicker),
    title: normalizeLocaleText(data?.title, ABOUT_DEFAULT.title),

    photoAlt: normalizeLocaleText(data?.photoAlt, ABOUT_DEFAULT.photoAlt),
    photoCaption: normalizeLocaleText(data?.photoCaption, ABOUT_DEFAULT.photoCaption),

    lead: normalizeLocaleText(data?.lead, ABOUT_DEFAULT.lead),
    text1: normalizeLocaleText(data?.text1, ABOUT_DEFAULT.text1),
    text2: normalizeLocaleText(data?.text2, ABOUT_DEFAULT.text2),

    bullets: normalizeBullets(data?.bullets),
    outro: normalizeLocaleText(data?.outro, ABOUT_DEFAULT.outro),
  };
}
