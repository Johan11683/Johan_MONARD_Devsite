"use client";

import Image from "next/image";
import styles from "./About.module.scss";
import type { LocaleKey } from "@/app/components/Admin/Sections/Hero/hero.types";
import type { AboutContent } from "@/app/components/Admin/Sections/About/about.types";

type AboutViewProps = {
  value: AboutContent;
  locale: LocaleKey;
};

export default function AboutView({ value, locale }: AboutViewProps) {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.inner}>
        {/* Colonne photo */}
        <div className={styles.photoColumn}>
          <div className={styles.photoWrapper}>
            <Image
              src="/images/profil.png"
              alt={value.photoAlt[locale]}
              fill
              className={styles.photo}
              sizes="(min-width: 1024px) 320px, 220px"
              priority
            />
          </div>

          <p className={styles.photoCaption}>{value.photoCaption[locale]}</p>
        </div>

        {/* Colonne texte */}
        <div className={styles.textColumn}>
          <p className={styles.kicker}>{value.kicker[locale]}</p>

          <h2 id="about-title" className={styles.title}>
            {value.title[locale]}
          </h2>

          <p className={styles.lead}>{value.lead[locale]}</p>

          <p className={styles.text}>{value.text1[locale]}</p>
          <p className={styles.text}>{value.text2[locale]}</p>

          <ul className={styles.list}>
            {value.bullets.map((b, idx) => (
              <li key={`about-bullet-${idx}`} className={styles.listItem}>
                <strong>{b.strong[locale]}</strong> {b.text[locale]}
              </li>
            ))}
          </ul>

          <p className={styles.text}>{value.outro[locale]}</p>
        </div>
      </div>

      <div className={styles.separator} />
    </section>
  );
}
