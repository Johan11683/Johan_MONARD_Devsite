import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectCard.module.scss';

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  URL: string;
};

export default function ProjectCard({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  URL,
}: Project) {
  return (
    <article className={styles.card}>
      <Link
        href={URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLink}
      >
        <div className={styles.imageWrapper}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={styles.image}
            sizes="100vw"
            priority
          />
          <div className={styles.imageOverlay} />
        </div>

        <div className={styles.text}>
          <p className={styles.kicker}>Site vitrine réalisé pour</p>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </Link>
    </article>
  );
}
