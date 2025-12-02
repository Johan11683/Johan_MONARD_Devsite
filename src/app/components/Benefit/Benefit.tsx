'use client';
import Image from 'next/image';

import styles from './Benefit.module.scss';

export default function Benefit() {
  return (
    <section id="benefit" className={styles.benefit} aria-labelledby="benefit-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.kicker}>Ce que je fais pour vous</p>
          <h2 id="benefit-title" className={styles.title}>
            Un site simple, clair, qui vous aide vraiment à vendre
          </h2>
          <p className={styles.subtitle}>
            Mon rôle : transformer vos idées en une présence en ligne nette et rassurante,
            que vos clients comprennent en quelques secondes.
          </p>
        </header>

        <div className={styles.grid}>
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
                Compréhensible en un coup d&apos;œil
            </h3>

  <p className={styles.cardText}>
    On va droit au but : qui vous êtes, ce que vous proposez, comment vous contacter.
    En un coup d&apos;œil votre client trouve l&apos;essentiel.
  </p>
</article>


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
                Pensé pour vos clients</h3>
            <p className={styles.cardText}>
              J&apos;écris vos textes avec des mots simples, des titres clairs et une mise en page
              qui donne envie de lire. L&apos;objectif : inspirer confiance et donner envie de passer à l&apos;action.
            </p>
          </article>

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
                Une prestation transparente</h3>
            <p className={styles.cardText}>
              Tout est posé noir sur blanc dès le départ : tarif, délais, étapes. Pas de frais cachés, 
              pas de surprise en cours de route. Une fois le design validé ensemble, vous n’avez presque rien à gérer. Votre temps est précieux.
              <br /><br />
              
            </p>
          </article>

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
                Vous êtes propriétaire du site</h3>
            <p className={styles.cardText}>
              Votre site est hébergé gratuitement sur 
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer"> Vercel</a>,
              et vous gardez la propriété de votre nom de domaine acheté sur 
              <a href="https://ovh.com" target="_blank" rel="noopener noreferrer"> OVH</a>. 
              Je vous accompagne pas à pas pour tout mettre en place.
            </p>
          </article>

        </div>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Concrètement, on part de votre réalité : votre métier, vos clients, vos mots. 
            Je m&apos;occupe de traduire tout ça en un site propre, rapide et professionnel. <br/> Un site qui travaille pour vous.
          </p>
          <a href="#contact" className={styles.footerLink}>
            Discuter de votre projet
          </a>
        </footer>
      </div>
    </section>
  );
}
