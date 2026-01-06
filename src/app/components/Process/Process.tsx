'use client';

import { useTranslation } from 'react-i18next';
import styles from './Process.module.scss';

export default function Process() {
  const { t } = useTranslation('process');

  return (
    <section id="process" className={styles.process} aria-labelledby="process-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.kicker}>{t('kicker')}</p>
          <h2 id="process-title" className={styles.title}>
            {t('title')}
          </h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </header>

        <ol className={styles.steps}>
          {[1, 2, 3, 4, 5].map((n) => (
            <li key={n} className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">
                {String(n).padStart(2, '0')}
              </span>

              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{t(`steps.step${n}.title`)}</h3>
                <p className={styles.stepText}>{t(`steps.step${n}.text`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.separator} />
    </section>
  );
}
