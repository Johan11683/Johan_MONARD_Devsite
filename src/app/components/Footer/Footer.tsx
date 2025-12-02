'use client';

import styles from './Footer.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.accentBar} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <p className={styles.brandName}>Devhook - Johan MONARD - développement web</p>
          <p className={styles.brandBaseline}>
            Sites vitrines modernes pour caves, négociants et TPE.
          </p>
        </div>

        <div className={styles.metaBlock}>
          <p className={styles.copy}>
            © {year} Johan Monard. Tous droits réservés.
          </p>
          <a href="/legal" className={styles.legalLink}>
            Mentions légales
          </a>
        </div>
      </div>
    </footer>
  );
}
