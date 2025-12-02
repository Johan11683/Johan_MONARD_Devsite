import styles from './Prices.module.scss';

export default function Prices() {
  return (
    <section id="prices" className={styles.prices} aria-labelledby="prices-title">
      <div className={styles.inner}>

        <header className={styles.intro}>
          <p className={styles.kicker}>Tarifs</p>
          <h2 id="prices-title" className={styles.title}>Mes prestations</h2>
          <p className={styles.subtitle}>
            Trois offres simples et transparentes.  
            Si vos besoins sortent du cadre, je propose aussi des devis sur mesure.
          </p>
        </header>

        <div className={styles.grid}>

          {/* — 700 € — */}
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Site vitrine simple</h3>
            <p className={styles.price}>700 €*</p>
            <p className={styles.cardDescription}>
              L&apos;essentiel pour présenter votre activité proprement et inspirer confiance.
            </p>

            <ul className={styles.features}>
              <li className={styles.featureItem}>Design moderne et responsive</li>
              <li className={styles.featureItem}>Optimisation SEO local</li>
              <li className={styles.featureItem}>Site en une ou plusieurs pages : Accueil, À propos, Contact</li>
              <li className={styles.featureItem}>Hébergement gratuit sur Vercel</li>
              <li className={styles.featureItem}>Accompagnement nom de domaine (OVH)</li>
              <li className={styles.featureItem}>Petites animations + perfectionnement du rendu</li>
            </ul>
          </article>

          {/* — 900 € — Offre mise en avant */}
          <article className={`${styles.card} ${styles.cardHighlight}`}>

            <h3 className={styles.cardTitle}>Site vitrine + Formulaire email</h3>
            <p className={styles.price}>900 €*</p>
            <p className={styles.cardDescription}>
              La version idéale pour les petites entreprises : un site complet 
              + un vrai formulaire de contact qui envoie des emails.
            </p>

            <ul className={styles.features}>
              <li className={styles.featureItem}>Toutes les fonctionnalités de l’offre précédente</li>
              <li className={styles.featureItem}>Formulaire de contact</li>
              <li className={styles.featureItem}>Vous recevez des mails de la part de vos clients via le site</li>
              <li className={styles.featureItem}>Anti-spam</li>
              
              
            </ul>
          </article>

          {/* — 1100 € — */}
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Site vitrine bilingue</h3>
            <p className={styles.price}>1100 €*</p>
            <p className={styles.cardDescription}>
              Une version bilingue avec bouton de switch
            </p>

            <ul className={styles.features}>
              <li className={styles.featureItem}>Toutes les fonctionnalités précédentes</li>
              <li className={styles.featureItem}>Version bilingue (i18n) avec bouton de switch</li>
              <li className={styles.featureItem}>Support étendu pendant 1 mois</li>
            </ul>
          </article>

        </div>

        {/* Texte additionnel */}
        <div className={styles.custom}>
        <p>
            Vous avez un besoin spécifique ? 
            Nous en parlons ensemble et je vous propose un devis adapté à votre activité.
        </p>

        <p>
            Toutes les prestations incluent un mois de suivi et de petits ajustements après la mise en ligne. 
            Au-delà, les interventions ponctuelles sont facturées <strong>40&nbsp;€/heure</strong>.
        </p>
        </div>

        {/* Mention légale */}
        <footer className={styles.note}>
          *Tarifs non soumis à la TVA selon l’article 293 B du CGI
        </footer>

      </div>

      <div className={styles.separator} />
    </section>
  );
}
