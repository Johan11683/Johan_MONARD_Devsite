'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import styles from './Benefit.module.scss';

export default function Benefit() {
  const { t } = useTranslation('benefit');

  return (
    <section id="benefit" className={styles.benefit} aria-labelledby="benefit-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.kicker}>{t('kicker')}</p>
          <h2 id="benefit-title" className={styles.title}>
            {t('title')}
          </h2>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
        </header>

        <div className={styles.grid}>
          {/* Carte 1 */}
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Image
                src="/images/recherche.png"
                alt=""
                width={32}
                height={32}
                className={styles.icon}
                aria-hidden="true"
              />
              {t('cards.overview.title')}
            </h3>

            <p className={styles.cardText}>
              {t('cards.overview.text')}
            </p>
          </article>

          {/* Carte 2 */}
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Image
                src="/images/supporter.png"
                alt=""
                width={32}
                height={32}
                className={styles.icon}
                aria-hidden="true"
              />
              {t('cards.clients.title')}
            </h3>
            <p className={styles.cardText}>
              {t('cards.clients.text')}
            </p>
          </article>

          {/* Carte 3 */}
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Image
                src="/images/contracter.png"
                alt=""
                width={32}
                height={32}
                className={styles.icon}
                aria-hidden="true"
              />
              {t('cards.transparent.title')}
            </h3>
            <p className={styles.cardText}>
              {t('cards.transparent.text')}
            </p>
          </article>

          {/* Carte 4 */}
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Image
                src="/images/proprietaire.png"
                alt=""
                width={32}
                height={32}
                className={styles.icon}
                aria-hidden="true"
              />
              {t('cards.ownership.title')}
            </h3>
            <p className={styles.cardText}>
              {t('cards.ownership.textPart1')}{' '}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                Vercel
              </a>
              {t('cards.ownership.textPart2')}{' '}
              <a href="https://ovh.com" target="_blank" rel="noopener noreferrer">
                OVH
              </a>
              {t('cards.ownership.textPart3')}
            </p>
          </article>

          {/* Carte 5 */}
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Image
                src="/images/free-lance.png"
                alt=""
                width={32}
                height={32}
                className={styles.icon}
                aria-hidden="true"
              />
              {t('cards.noMaintenance.title')}
            </h3>

            <p className={styles.cardText}>
              {t('cards.noMaintenance.text')}
            </p>
          </article>
        </div>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            {t('footer.line1')}
            <br />
            {t('footer.line2')}
          </p>
          <a href="#contact" className={styles.footerLink}>
            {t('footer.cta')}
          </a>
        </footer>
      </div>
      <div className={styles.separator} />
    </section>
  );
}
