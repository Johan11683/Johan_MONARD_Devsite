import Image from 'next/image';
import styles from './About.module.scss';

export default function About() {
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
              alt="Photo de profil de Johan, développeur web"
              fill
              className={styles.photo}
              sizes="(min-width: 1024px) 320px, 220px"
              priority
            />
          </div>
          <p className={styles.photoCaption}>
            Johan – ancien commerçant dans le vin, aujourd&apos;hui développeur web.
          </p>
        </div>

        {/* Colonne texte */}
        <div className={styles.textColumn}>
          <p className={styles.kicker}>À propos</p>
          <h2 id="about-title" className={styles.title}>
            Un développeur qui vient du monde du commerce
          </h2>

          <p className={styles.lead}>
            Avant de créer des sites, j&apos;ai passé plusieurs années dans le vin :
            en cave à vin en contact direct avec les particuliers en B2C, puis chez un
            négociant de grands vins en B2B avec des professionnels exigeants.
          </p>

          <p className={styles.text}>
            J&apos;ai appris à écouter, comprendre un métier rapidement, expliquer simplement
            des choses techniques et gérer des relations sur la durée. Aujourd&apos;hui,
            j&apos;utilise ces compétences pour traduire votre activité en un site clair,
            rassurant et crédible pour tes clients.
          </p>

          <p className={styles.text}>
            Je me suis ensuite formé au développement web (HTML, CSS, JavaScript, React,
            Next.js, Node), avec un objectif simple&nbsp;: proposer aux TPE / PME des
            sites modernes, rapides et compréhensibles, sans discours technique.
          </p>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>Je comprends vos enjeux&nbsp;:</strong> visibilité, image sérieuse,
              contact facile et gain de temps.
            </li>
            <li className={styles.listItem}>
              <strong>Je parle votre langage&nbsp;:</strong> cave, négoce, artisanat, TPE, PME,
              pas du jargon.
            </li>
            <li className={styles.listItem}>
              <strong>Je travaille simplement&nbsp;:</strong> pour faire de manière artisanale un site propre
              qui vous ressemble et qui rassure vos clients.
            </li>
          </ul>

          <p className={styles.text}>
            Que vous soyez une cave, un négociant, un artisan ou une petite entreprise,
            mon objectif est que vous vous reconnaissiez dans votre site, et que vos clients
            aient envie de vous contacter ou de venir chez vous.
          </p>
        </div>
      </div>

      {/* Séparateur bas de section */}
      <div className={styles.separator} />
    </section>
  );
}
