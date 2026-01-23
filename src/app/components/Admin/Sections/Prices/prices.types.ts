export type LocaleKey = "fr" | "en";
export type LocalizedText = Record<LocaleKey, string>;

export type PriceCardKey = "standard" | "bilingual" | "admin";

export type PriceFeatures = Record<LocaleKey, string[]>;

export type PriceCardBase = {
  enabled: boolean;
  title: LocalizedText;
  price: LocalizedText;
  description: LocalizedText;
};

export type PriceCard = PriceCardBase & {
  features: PriceFeatures;
  highlight?: boolean; // seulement utile pour bilingual, mais optionnel simplifie tout
};

export type PricesContent = {
  kicker: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;

  badgeMostPopular: LocalizedText;

  cards: Record<PriceCardKey, PriceCard>;

  custom: {
    paragraph1: LocalizedText;
  };

  updatesPolicy: {
    title: LocalizedText;
    text: LocalizedText;
  };

  legalNote: LocalizedText;
};

export const PRICE_CARD_KEYS: readonly PriceCardKey[] = [
  "standard",
  "bilingual",
  "admin",
] as const;
