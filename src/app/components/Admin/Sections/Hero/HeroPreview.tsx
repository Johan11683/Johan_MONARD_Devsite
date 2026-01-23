"use client";

import styles from "./hero.module.scss";
import type { HeroContent, LocaleKey } from "./hero.types";
import HeroView from "../../../Hero/HeroView";

type HeroPreviewProps = {
  value: HeroContent;
  locale: LocaleKey;
};

export default function HeroPreview({ value, locale }: HeroPreviewProps) {
  return (
    <div className={styles.preview}>
      <HeroView
        isPreview
        headingId="admin-hero-title"
        title={value.title[locale]}
        subtitle={value.subtitle[locale]}
        ctaText={value.ctaText[locale]}
        ctaHref={value.ctaHref}
        imageUrl={value.imageUrl || "/images/HeroPC.webp"}
      />
    </div>
  );
}
