'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from './About.module.scss';

export default function About() {
  const { t } = useTranslation('about');

  return (
    <section
      id="about"
      className={styles.about}
      aria-labelledby="about-title"
    >
      <div className={styles.inner}>
        {/* Colonne photo */}
        <div className={styles.photoColumn}>
          <div className={styles.photoWrapper}>
            <Image
              src="/images/profil.png"
              alt={t('photoAlt')}
              fill
              className={styles.photo}
              sizes="(min-width: 1024px) 320px, 220px"
              priority
            />
          </div>
          <p className={styles.photoCaption}>
            {t('photoCaption')}
          </p>
        </div>

        {/* Colonne texte */}
        <div className={styles.textColumn}>
          <p className={styles.kicker}>{t('kicker')}</p>

          <h2 id="about-title" className={styles.title}>
            {t('title')}
          </h2>

          <p className={styles.lead}>
            {t('lead')}
          </p>

          <p className={styles.text}>
            {t('text1')}
          </p>

          <p className={styles.text}>
            {t('text2')}
          </p>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>{t('bullets.item1.strong')}</strong> {t('bullets.item1.text')}
            </li>
            <li className={styles.listItem}>
              <strong>{t('bullets.item2.strong')}</strong> {t('bullets.item2.text')}
            </li>
            <li className={styles.listItem}>
              <strong>{t('bullets.item3.strong')}</strong> {t('bullets.item3.text')}
            </li>
          </ul>

          <p className={styles.text}>
            {t('outro')}
          </p>
        </div>
      </div>

      {/* Séparateur bas de section */}
      <div className={styles.separator} />
    </section>
  );
}
