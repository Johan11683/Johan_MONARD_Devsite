"use client";

import styles from "./Prices.module.scss";
import type { LocaleKey } from "../Admin/Sections/Hero/hero.types"; // si tu as déjà LocaleKey ailleurs, ajuste
import type { PricesContent, PriceCardKey } from "../Admin/Sections/Prices/prices.types";

type PricesViewProps = {
  value: PricesContent;
  locale: LocaleKey;
};

const ORDER: PriceCardKey[] = ["standard", "bilingual", "admin"];

export default function PricesView({ value, locale }: PricesViewProps) {
  const enabledKeys = ORDER.filter((k) => value.cards[k].enabled);

  return (
    <section id="prices" className={styles.prices} aria-labelledby="prices-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.kicker}>{value.kicker[locale]}</p>
          <h2 id="prices-title" className={styles.title}>
            {value.title[locale]}
          </h2>
          <p className={styles.subtitle}>{value.subtitle[locale]}</p>
        </header>

        <div className={styles.grid}>
          {enabledKeys.map((key) => {
            const card = value.cards[key];
            const isHighlight = key === "bilingual" && !!card.highlight;

            return (
              <article
                key={key}
                className={`${styles.card} ${isHighlight ? styles.cardHighlight : ""}`}
              >
                {isHighlight && (
                  <span className={styles.badge}>{value.badgeMostPopular[locale]}</span>
                )}

                <h3 className={styles.cardTitle}>{card.title[locale]}</h3>
                <p className={styles.price}>{card.price[locale]}</p>
                <p className={styles.cardDescription}>{card.description[locale]}</p>

                <ul className={styles.features}>
                  {card.features[locale].map((item, idx) => (
                    <li key={`${key}-feature-${idx}`} className={styles.featureItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className={styles.custom}>
          <p>{value.custom.paragraph1[locale]}</p>

          <p>
            <strong>{value.updatesPolicy.title[locale]}</strong>
          </p>
          <p>{value.updatesPolicy.text[locale]}</p>
        </div>

        <footer className={styles.note}>{value.legalNote[locale]}</footer>
      </div>

      <div className={styles.separator} />
    </section>
  );
}
