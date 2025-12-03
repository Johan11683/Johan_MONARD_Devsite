'use client';

import { useTranslation } from 'react-i18next';
import styles from './Hero.module.scss';

export default function Hero() {
  const { t } = useTranslation('hero');

  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.textBlock}>
          <h1 id="hero-title" className={styles.title}>
            {t('title')}
          </h1>

          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>

          <a href="#prices" className={styles.pricesLink}>
            <span className={styles.pricesInner}>
              <span className={styles.pricesText}>{t('cta')}</span>
              <span className={styles.arrow} aria-hidden="true">↓</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
