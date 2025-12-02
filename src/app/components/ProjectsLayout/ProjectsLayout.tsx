import ProjectCard from '../ProjectCard/ProjectCard';
import { projects } from '../../data/projects.datas';
import styles from './ProjectsLayout.module.scss';

export default function ProjectsLayout() {
  return (
    <section
      id="projects"
      className={styles.projects}
      aria-labelledby="projects-title"
    >
      <header className={styles.intro}>
        <p className={styles.kicker}>Ils me font confiance</p>
        <h2 id="projects-title" className={styles.title}>
          Mes réalisations
        </h2>
        <p className={styles.subtitle}>
          Mes réalisations sont faîtes sur mesure, en échangeant avec vous.<br/>
          Mieux je vous connais, mieux vos clients vous connaîtront.
        </p>
      </header>

      {projects.map((project) => (
        <div key={project.id} className={styles.projectSection}>
          <ProjectCard {...project} />
        </div>
      ))}
      <div className={styles.separator} />
    </section>
  );
}
