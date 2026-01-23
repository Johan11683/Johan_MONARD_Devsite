"use client";

import type { CSSProperties } from "react";
import styles from "./Hero.module.scss";

type HeroViewProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  imageUrl?: string;
  isPreview?: boolean; // ✅
  headingId?: string;  // optionnel
};

type HeroStyle = CSSProperties & { ["--hero-bg"]?: string };

export default function HeroView({
  title,
  subtitle,
  ctaText,
  ctaHref,
  imageUrl,
  isPreview = false,
  headingId = "hero-title",
}: HeroViewProps) {
  const cleanedUrl = imageUrl?.trim();

  const heroStyle: HeroStyle | undefined = cleanedUrl
    ? { "--hero-bg": `url("${cleanedUrl}")` }
    : undefined;

  return (
    <section
      id="hero"
      className={`${styles.hero} ${isPreview ? styles.heroPreview : ""}`}
      aria-labelledby={headingId}
      style={heroStyle}
    >
      <div className={styles.inner}>
        <div className={styles.textBlock}>
          <h1 id={headingId} className={styles.title}>
            {title}
          </h1>

          <p className={styles.subtitle}>{subtitle}</p>

          <a href={ctaHref} className={styles.pricesLink}>
            <span className={styles.pricesInner}>
              <span className={styles.pricesText}>{ctaText}</span>
              <span className={styles.arrow} aria-hidden="true">
                ↓
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
