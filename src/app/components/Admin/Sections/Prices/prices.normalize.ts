import type { PricesContent, PriceCardKey } from "./prices.types";
import { PRICES_DEFAULT } from "./prices.default";
import { PRICE_CARD_KEYS } from "./prices.types";

type PricesPartial = Partial<PricesContent>;

function safeStringArray(v: unknown, fallback: string[]): string[] {
  if (!Array.isArray(v)) return fallback;
  const cleaned = v.filter((x) => typeof x === "string").map((s) => s.trim()).filter(Boolean);
  return cleaned.length ? cleaned : fallback;
}

function normalizeCard(
  key: PriceCardKey,
  data: PricesPartial | null
): PricesContent["cards"][PriceCardKey] {
  const base = PRICES_DEFAULT.cards[key];
  const incoming = data?.cards?.[key];

  return {
    enabled: incoming?.enabled ?? base.enabled,
    highlight: incoming?.highlight ?? base.highlight ?? false,

    title: {
      fr: incoming?.title?.fr ?? base.title.fr,
      en: incoming?.title?.en ?? base.title.en,
    },
    price: {
      fr: incoming?.price?.fr ?? base.price.fr,
      en: incoming?.price?.en ?? base.price.en,
    },
    description: {
      fr: incoming?.description?.fr ?? base.description.fr,
      en: incoming?.description?.en ?? base.description.en,
    },

    features: {
      fr: safeStringArray(incoming?.features?.fr, base.features.fr),
      en: safeStringArray(incoming?.features?.en, base.features.en),
    },
  };
}

export function normalizePrices(data: PricesPartial | null): PricesContent {
  const cards = {} as PricesContent["cards"];

  for (const key of PRICE_CARD_KEYS) {
    cards[key] = normalizeCard(key, data);
  }

  return {
    kicker: {
      fr: data?.kicker?.fr ?? PRICES_DEFAULT.kicker.fr,
      en: data?.kicker?.en ?? PRICES_DEFAULT.kicker.en,
    },
    title: {
      fr: data?.title?.fr ?? PRICES_DEFAULT.title.fr,
      en: data?.title?.en ?? PRICES_DEFAULT.title.en,
    },
    subtitle: {
      fr: data?.subtitle?.fr ?? PRICES_DEFAULT.subtitle.fr,
      en: data?.subtitle?.en ?? PRICES_DEFAULT.subtitle.en,
    },

    badgeMostPopular: {
      fr: data?.badgeMostPopular?.fr ?? PRICES_DEFAULT.badgeMostPopular.fr,
      en: data?.badgeMostPopular?.en ?? PRICES_DEFAULT.badgeMostPopular.en,
    },

    cards,

    custom: {
      paragraph1: {
        fr: data?.custom?.paragraph1?.fr ?? PRICES_DEFAULT.custom.paragraph1.fr,
        en: data?.custom?.paragraph1?.en ?? PRICES_DEFAULT.custom.paragraph1.en,
      },
    },

    updatesPolicy: {
      title: {
        fr: data?.updatesPolicy?.title?.fr ?? PRICES_DEFAULT.updatesPolicy.title.fr,
        en: data?.updatesPolicy?.title?.en ?? PRICES_DEFAULT.updatesPolicy.title.en,
      },
      text: {
        fr: data?.updatesPolicy?.text?.fr ?? PRICES_DEFAULT.updatesPolicy.text.fr,
        en: data?.updatesPolicy?.text?.en ?? PRICES_DEFAULT.updatesPolicy.text.en,
      },
    },

    legalNote: {
      fr: data?.legalNote?.fr ?? PRICES_DEFAULT.legalNote.fr,
      en: data?.legalNote?.en ?? PRICES_DEFAULT.legalNote.en,
    },
  };
}
