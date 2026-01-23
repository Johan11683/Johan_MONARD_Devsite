import type { HeroContent } from "./hero.types";
import { HERO_DEFAULT } from "./hero.default";

type HeroPartial = Partial<HeroContent>;

export function normalizeHero(data: HeroPartial | null): HeroContent {
  return {
    title: {
      fr: data?.title?.fr ?? HERO_DEFAULT.title.fr,
      en: data?.title?.en ?? HERO_DEFAULT.title.en,
    },
    subtitle: {
      fr: data?.subtitle?.fr ?? HERO_DEFAULT.subtitle.fr,
      en: data?.subtitle?.en ?? HERO_DEFAULT.subtitle.en,
    },
    ctaText: {
      fr: data?.ctaText?.fr ?? HERO_DEFAULT.ctaText.fr,
      en: data?.ctaText?.en ?? HERO_DEFAULT.ctaText.en,
    },
    ctaHref: data?.ctaHref ?? HERO_DEFAULT.ctaHref,
    imageUrl: data?.imageUrl ?? HERO_DEFAULT.imageUrl,
  };
}
