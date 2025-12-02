import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.textBlock}>
          <h1 id="hero-title" className={styles.title}>
            Création de sites web
          </h1>

          <p className={styles.subtitle}>
            Je crée des sites à votre image afin de développer votre visibilité en ligne.
          </p>

          <a href="#prices" className={styles.pricesLink}>
            <span className={styles.pricesInner}>
              <span className={styles.pricesText}>Tarifs</span>
              <span className={styles.arrow} aria-hidden="true">↓</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
