"use client";

import AboutView from "@/app/components/About/AboutView";
import type { AboutContent } from "./about.types";
import type { LocaleKey } from "../Hero/hero.types";

type AboutPreviewProps = {
  value: AboutContent;
  locale: LocaleKey;
};

export default function AboutPreview({ value, locale }: AboutPreviewProps) {
  return <AboutView value={value} locale={locale} />;
}
