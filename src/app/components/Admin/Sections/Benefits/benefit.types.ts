export type LocaleKey = "fr" | "en";
export type LocalizedText = Record<LocaleKey, string>;

export type BenefitCardKey =
  | "overview"
  | "clients"
  | "transparent"
  | "ownership"
  | "noMaintenance";

export type BenefitCardBase = {
  enabled: boolean;
  title: LocalizedText;
};

export type BenefitCardText = BenefitCardBase & {
  text: LocalizedText;
};

export type BenefitContent = {
  kicker: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;

  cards: {
    overview: BenefitCardText;
    clients: BenefitCardText;
    transparent: BenefitCardText;
    ownership: BenefitCardText; // ✅ ownership devient standard
    noMaintenance: BenefitCardText;
  };

  footer: {
    line1: LocalizedText;
    line2: LocalizedText;
    ctaText: LocalizedText;
    ctaHref: string;
  };
};

export const BENEFIT_CARD_KEYS: readonly BenefitCardKey[] = [
  "overview",
  "clients",
  "transparent",
  "ownership",
  "noMaintenance",
] as const;
