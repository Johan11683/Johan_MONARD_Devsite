'use client';

import { useTranslation } from 'react-i18next';
import ProjectCard from '../ProjectCard/ProjectCard';
import { projectsBase } from '../../data/projects.datas';
import styles from './ProjectsLayout.module.scss';

export default function ProjectsLayout() {
  const { t } = useTranslation(['ProjectsLayout', 'ProjectsData']);

  return (
    <section
      id="projects"
      className={styles.projects}
      aria-labelledby="projects-title"
    >
      <header className={styles.intro}>
        <p className={styles.kicker}>{t('kicker', { ns: 'ProjectsLayout' })}</p>
        <h2 id="projects-title" className={styles.title}>
          {t('title', { ns: 'ProjectsLayout' })}
        </h2>
        <p className={styles.subtitle}>
          {t('subtitle.line1', { ns: 'ProjectsLayout' })}
          <br />
          {t('subtitle.line2', { ns: 'ProjectsLayout' })}
        </p>
      </header>

      {projectsBase.map((proj) => {
        const data = t(proj.id, {
          ns: 'ProjectsData',
          returnObjects: true,
        }) as {
          title: string;
          subtitle: string;
          imageAlt: string;
        };

        return (
          <div key={proj.id} className={styles.projectSection}>
            <ProjectCard
              id={proj.id}
              title={data.title}
              subtitle={data.subtitle}
              imageAlt={data.imageAlt}
              imageSrc={proj.imageSrc}
              URL={proj.URL}
            />
          </div>
        );
      })}

      <div className={styles.separator} />
    </section>
  );
}
