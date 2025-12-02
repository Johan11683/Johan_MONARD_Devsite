import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

const navItems = [
  { href: '#projects', label: 'Réalisations' },
  { href: '#prices', label: 'Tarifs' },
  { href: '#about', label: 'À propos' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <>
      {/* Barre accent tout en haut */}
      <div className={styles.topBar} />

      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="#hero" className={styles.brand}>
            <Image
              src="/logo.png"
              alt="Logo Devhook"
              width={50}
              height={15}
              className={styles.logo}
              priority
            />
          </Link>

          <nav className={styles.nav} aria-label="Navigation principale">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <a href="tel:+33777842612" className={styles.phoneButton}>
            <span className={styles.phoneIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.3 2.6 3.5 4.8 6.1 6.1l2-2c.3-.3.7-.4 1.1-.3l3.1.8c.6.1 1 .7 1 1.3v3.2c0 .8-.6 1.4-1.4 1.4C9.9 21.3 2.7 14.1 2.7 4.9c0-.8.6-1.4 1.4-1.4H7c.6 0 1.1.4 1.3 1l.8 3.1c.1.4 0 .8-.3 1.1l-2.2 2.1z" />
              </svg>
            </span>
            <span className={styles.phoneLabel}>Appeler</span>
            <span className={styles.srOnly}>Appeler le 07 77 84 26 12</span>
          </a>
        </div>
      </header>
    </>
  );
}
