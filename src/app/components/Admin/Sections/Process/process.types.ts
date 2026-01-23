import type { LocaleKey } from "../Hero/hero.types";

export type ProcessStep = {
  title: Record<LocaleKey, string>;
  text: Record<LocaleKey, string>;
};

export type ProcessContent = {
  kicker: Record<LocaleKey, string>;
  title: Record<LocaleKey, string>;
  subtitle: Record<LocaleKey, string>;
  steps: ProcessStep[]; // toujours 5
};
