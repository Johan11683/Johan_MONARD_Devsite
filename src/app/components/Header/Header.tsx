'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';

const navItems = [
  { href: '#benefit', key: 'benefit' },
  { href: '#projects', key: 'projects' },
  { href: '#prices', key: 'prices' },
  { href: '#about', key: 'about' },
  { href: '#contact', key: 'contact' },
];

export default function Header() {
  const { t, i18n } = useTranslation('header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentLang = (i18n.language || 'fr').slice(0, 2) as 'fr' | 'en';

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function handleNavClick() {
    setIsMenuOpen(false);
  }

  function handleChangeLang(lang: 'fr' | 'en') {
    if (lang === currentLang) return;
    i18n.changeLanguage(lang);
  }

  return (
    <>
      {/* Barre accent tout en haut */}
      <div className={styles.topBar} />

      <header className={styles.header}>
        <div className={styles.inner}>
          {/* Logo à gauche */}
          <Link href="#hero" className={styles.brand} onClick={handleNavClick}>
            <Image
              src="/logoGold.webp"
              alt={t('logoAlt')}
              width={50}
              height={15}
              className={styles.logo}
              priority
            />
          </Link>

          {/* NAV DESKTOP */}
          <nav className={styles.navDesktop} aria-label={t('mainNavAria')}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Zone actions : téléphone + switch langue desktop + burger (mobile) */}
          <div className={styles.actions}>
            {/* Tel au milieu (centré sur mobile via le layout CSS) */}
            <a href="tel:+33777842612" className={styles.phoneButton}>
              <span className={styles.phoneIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M6.6 10.8c1.3 2.6 3.5 4.8 6.1 6.1l2-2c.3-.3.7-.4 1.1-.3l3.1.8c.6.1 1 .7 1 1.3v3.2c0 .8-.6 1.4-1.4 1.4C9.9 21.3 2.7 14.1 2.7 4.9c0-.8.6-1.4 1.4-1.4H7c.6 0 1.1.4 1.3 1l.8 3.1c.1.4 0 .8-.3 1.1l-2.2 2.1z" />
                </svg>
              </span>
              <span className={styles.phoneLabel}>{t('phone.button')}</span>
              <span className={styles.srOnly}>{t('phone.srLabel')}</span>
            </a>

            {/* Switch langue DESKTOP (tout à droite du header) */}
            <div
              className={styles.langSwitchDesktop}
              aria-label={t('langSwitchAria')}
            >
              <button
                type="button"
                className={`${styles.langButton} ${
                  currentLang === 'fr' ? styles.langButtonActive : ''
                }`}
                onClick={() => handleChangeLang('fr')}
                aria-pressed={currentLang === 'fr'}
              >
                FR
              </button>
              <button
                type="button"
                className={`${styles.langButton} ${
                  currentLang === 'en' ? styles.langButtonActive : ''
                }`}
                onClick={() => handleChangeLang('en')}
                aria-pressed={currentLang === 'en'}
              >
                EN
              </button>
            </div>

            {/* Burger à droite (mobile) */}
            <button
              type="button"
              className={styles.burger}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? t('burger.close') : t('burger.open')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className={styles.burgerBox}>
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
              </span>
            </button>
          </div>
        </div>

        {/* NAV MOBILE */}
        <div
          id="mobile-menu"
          className={`${styles.navMobile} ${
            isMenuOpen ? styles.navMobileOpen : ''
          }`}
        >
          <nav aria-label={t('mainNavMobileAria')}>
            <ul className={styles.navMobileList}>
              {navItems.map((item) => (
                <li key={item.href} className={styles.navMobileItem}>
                  <a
                    href={item.href}
                    className={styles.navMobileLink}
                    onClick={handleNavClick}
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.navMobileFooter}>
              <div className={styles.langSwitch}>
                {/* Lang switch i18n MOBILE */}
                <button
                  type="button"
                  className={`${styles.langButton} ${
                    currentLang === 'fr' ? styles.langButtonActive : ''
                  }`}
                  onClick={() => handleChangeLang('fr')}
                  aria-pressed={currentLang === 'fr'}
                >
                  FR
                </button>
                <button
                  type="button"
                  className={`${styles.langButton} ${
                    currentLang === 'en' ? styles.langButtonActive : ''
                  }`}
                  onClick={() => handleChangeLang('en')}
                  aria-pressed={currentLang === 'en'}
                >
                  EN
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
