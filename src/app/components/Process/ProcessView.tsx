"use client";

import styles from "./Process.module.scss";
import type { LocaleKey } from "../Admin/Sections/Hero/hero.types";
import type { ProcessContent } from "../Admin/Sections/Process/process.types";

type ProcessViewProps = {
  value: ProcessContent;
  locale: LocaleKey;
};

export default function ProcessView({ value, locale }: ProcessViewProps) {
  return (
    <section id="process" className={styles.process} aria-labelledby="process-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.kicker}>{value.kicker[locale]}</p>

          <h2 id="process-title" className={styles.title}>
            {value.title[locale]}
          </h2>

          <p className={styles.subtitle}>{value.subtitle[locale]}</p>
        </header>

        <ol className={styles.steps}>
          {value.steps.map((step, index) => {
            const n = index + 1;

            return (
              <li key={`process-step-${n}`} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {String(n).padStart(2, "0")}
                </span>

                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title[locale]}</h3>
                  <p className={styles.stepText}>{step.text[locale]}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className={styles.separator} />
    </section>
  );
}
