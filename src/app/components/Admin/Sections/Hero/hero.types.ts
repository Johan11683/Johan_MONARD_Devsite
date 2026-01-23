export type LocaleKey = "fr" | "en";

export type LocalizedString = {
  fr: string;
  en: string;
};

export type HeroContent = {
  title: LocalizedString;
  subtitle: LocalizedString;
  ctaText: LocalizedString;
  ctaHref: string;
  imageUrl: string;
};

export {};
