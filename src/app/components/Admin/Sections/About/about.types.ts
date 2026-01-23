import type { LocaleKey } from "../Hero/hero.types";

export type LocaleText = Record<LocaleKey, string>;

export type AboutBullet = {
  strong: LocaleText;
  text: LocaleText;
};

export type AboutContent = {
  kicker: LocaleText;
  title: LocaleText;

  photoAlt: LocaleText;
  photoCaption: LocaleText;

  lead: LocaleText;
  text1: LocaleText;
  text2: LocaleText;

  bullets: AboutBullet[]; // toujours 3
  outro: LocaleText;
};
