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
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
        </header>

        <div className={styles.grid}>
          {/* — 700 € — */}
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{t('cards.simple.title')}</h3>
            <p className={styles.price}>{t('cards.simple.price')}</p>
            <p className={styles.cardDescription}>
              {t('cards.simple.description')}
            </p>

            <ul className={styles.features}>
              <li className={styles.featureItem}>{t('cards.simple.features.item1')}</li>
              <li className={styles.featureItem}>{t('cards.simple.features.item2')}</li>
              <li className={styles.featureItem}>{t('cards.simple.features.item3')}</li>
              <li className={styles.featureItem}>{t('cards.simple.features.item4')}</li>
              <li className={styles.featureItem}>{t('cards.simple.features.item5')}</li>
              <li className={styles.featureItem}>{t('cards.simple.features.item6')}</li>
            </ul>
          </article>

          {/* — 900 € — Offre mise en avant */}
          <article className={`${styles.card} ${styles.cardHighlight}`}>
            <h3 className={styles.cardTitle}>{t('cards.form.title')}</h3>
            <p className={styles.price}>{t('cards.form.price')}</p>
            <p className={styles.cardDescription}>
              {t('cards.form.description')}
            </p>

            <ul className={styles.features}>
              <li className={styles.featureItem}>{t('cards.form.features.item1')}</li>
              <li className={styles.featureItem}>{t('cards.form.features.item2')}</li>
              <li className={styles.featureItem}>{t('cards.form.features.item3')}</li>
              <li className={styles.featureItem}>{t('cards.form.features.item4')}</li>
            </ul>
          </article>

          {/* — 1100 € — */}
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{t('cards.bilingual.title')}</h3>
            <p className={styles.price}>{t('cards.bilingual.price')}</p>
            <p className={styles.cardDescription}>
              {t('cards.bilingual.description')}
            </p>

            <ul className={styles.features}>
              <li className={styles.featureItem}>{t('cards.bilingual.features.item1')}</li>
              <li className={styles.featureItem}>{t('cards.bilingual.features.item2')}</li>
              <li className={styles.featureItem}>{t('cards.bilingual.features.item3')}</li>
            </ul>
          </article>
        </div>

        {/* Texte additionnel */}
        <div className={styles.custom}>
          <p>
            {t('custom.paragraph1')}
          </p>

          <p>
            {t('custom.paragraph2.before')}{' '}
            <strong>40&nbsp;€/h</strong>
            {t('custom.paragraph2.after')}
          </p>
        </div>

        {/* Mention légale */}
        <footer className={styles.note}>
          {t('legalNote')}
        </footer>
      </div>

      <div className={styles.separator} />
    </section>
  );
}
