'use client';

import { useTranslation } from 'react-i18next';
import styles from './Prices.module.scss';

export default function Prices() {
  const { t } = useTranslation('prices');

  return (
    <section id="prices" className={styles.prices} aria-labelledby="prices-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.kicker}>{t('kicker')}</p>
          <h2 id="prices-title" className={styles.title}>
            {t('title')}
          </h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </header>

        <div className={styles.grid}>
          {/* — 2000 € — */}
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{t('cards.standard.title')}</h3>
            <p className={styles.price}>{t('cards.standard.price')}</p>
            <p className={styles.cardDescription}>{t('cards.standard.description')}</p>

            <ul className={styles.features}>
              <li className={styles.featureItem}>{t('cards.standard.features.item1')}</li>
              <li className={styles.featureItem}>{t('cards.standard.features.item2')}</li>
              <li className={styles.featureItem}>{t('cards.standard.features.item3')}</li>
              <li className={styles.featureItem}>{t('cards.standard.features.item4')}</li>
              <li className={styles.featureItem}>{t('cards.standard.features.item5')}</li>
              <li className={styles.featureItem}>{t('cards.standard.features.item6')}</li>
            </ul>
          </article>

          {/* — 2200 € — Offre mise en avant */}
          <article className={`${styles.card} ${styles.cardHighlight}`}>
            <span className={styles.badge}>{t('badgeMostPopular')}</span>

            <h3 className={styles.cardTitle}>{t('cards.bilingual.title')}</h3>
            <p className={styles.price}>{t('cards.bilingual.price')}</p>
            <p className={styles.cardDescription}>{t('cards.bilingual.description')}</p>

            <ul className={styles.features}>
              <li className={styles.featureItem}>{t('cards.bilingual.features.item1')}</li>
              <li className={styles.featureItem}>{t('cards.bilingual.features.item2')}</li>
              <li className={styles.featureItem}>{t('cards.bilingual.features.item3')}</li>
            </ul>
          </article>

          {/* — 4500 € — */}
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{t('cards.admin.title')}</h3>
            <p className={styles.price}>{t('cards.admin.price')}</p>
            <p className={styles.cardDescription}>{t('cards.admin.description')}</p>

            <ul className={styles.features}>
              <li className={styles.featureItem}>{t('cards.admin.features.item1')}</li>
              <li className={styles.featureItem}>{t('cards.admin.features.item2')}</li>
              <li className={styles.featureItem}>{t('cards.admin.features.item3')}</li>
              <li className={styles.featureItem}>{t('cards.admin.features.item4')}</li>
              <li className={styles.featureItem}>{t('cards.admin.features.item5')}</li>
              <li className={styles.featureItem}>{t('cards.admin.features.item6')}</li>
            </ul>
          </article>
        </div>

        {/* Texte additionnel */}
        <div className={styles.custom}>
          <p>{t('custom.paragraph1')}</p>

          <p><strong>{t('updatesPolicy.title')}</strong></p>
          <p>{t('updatesPolicy.text')}</p>
        </div>

        {/* Mention légale */}
        <footer className={styles.note}>{t('legalNote')}</footer>
      </div>

      <div className={styles.separator} />
    </section>
  );
}
