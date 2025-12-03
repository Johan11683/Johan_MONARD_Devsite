'use client';

import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

export default function Footer() {
  const { t } = useTranslation('footer');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.accentBar} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <p className={styles.brandName}>
            {t('brandName')}
          </p>
          <p className={styles.brandBaseline}>
            {t('brandBaseline')}
          </p>
        </div>

        <div className={styles.metaBlock}>
          <p className={styles.copy}>
            {t('copy', { year })}
          </p>
          <a href="/legal" className={styles.legalLink}>
            {t('legalLink')}
          </a>
        </div>
      </div>
    </footer>
  );
}
