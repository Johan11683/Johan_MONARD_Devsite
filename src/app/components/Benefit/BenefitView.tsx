"use client";

import Image from "next/image";
import styles from "./Benefit.module.scss";

import type { BenefitContent, BenefitCardKey, LocaleKey } from "../Admin/Sections/Benefits/benefit.types";

type BenefitViewProps = {
  value: BenefitContent;
  locale: LocaleKey;
};

const ICONS: Record<BenefitCardKey, string> = {
  overview: "/images/recherche.png",
  clients: "/images/supporter.png",
  transparent: "/images/contracter.png",
  ownership: "/images/proprietaire.png",
  noMaintenance: "/images/free-lance.png",
};

const ORDER: BenefitCardKey[] = [
  "overview",
  "clients",
  "transparent",
  "ownership",
  "noMaintenance",
];

export default function BenefitView({ value, locale }: BenefitViewProps) {
  const enabledKeys = ORDER.filter((k) => value.cards[k].enabled);

  return (
    <section id="benefit" className={styles.benefit} aria-labelledby="benefit-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.kicker}>{value.kicker[locale]}</p>
          <h2 id="benefit-title" className={styles.title}>
            {value.title[locale]}
          </h2>
          <p className={styles.subtitle}>{value.subtitle[locale]}</p>
        </header>

        <div className={styles.grid}>
          {enabledKeys.map((key) => {
            const card = value.cards[key];

            return (
              <article key={key} className={styles.card}>
                <h3 className={styles.cardTitle}>
                  <Image
                    src={ICONS[key]}
                    alt=""
                    width={32}
                    height={32}
                    className={styles.icon}
                    aria-hidden="true"
                  />
                  {card.title[locale]}
                </h3>

                <p className={styles.cardText}>{card.text[locale]}</p>
              </article>
            );
          })}
        </div>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            {value.footer.line1[locale]}
            <br />
            {value.footer.line2[locale]}
          </p>

          <a href={value.footer.ctaHref} className={styles.footerLink}>
            {value.footer.ctaText[locale]}
          </a>
        </footer>
      </div>

      <div className={styles.separator} />
    </section>
  );
}
