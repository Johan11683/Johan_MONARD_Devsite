"use client";

import styles from "./process.module.scss";
import type { ProcessContent } from "./process.types";
import type { LocaleKey } from "../Hero/hero.types";

type ProcessEditorProps = {
  value: ProcessContent;
  onChange: (next: ProcessContent) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
};

const STEP_COUNT = 5;

function emptyStep() {
  return { title: { fr: "", en: "" }, text: { fr: "", en: "" } };
}

function ensureFiveSteps(content: ProcessContent): ProcessContent {
  const steps = Array.isArray(content.steps) ? [...content.steps] : [];
  while (steps.length < STEP_COUNT) steps.push(emptyStep());
  if (steps.length > STEP_COUNT) steps.length = STEP_COUNT;
  return { ...content, steps };
}

export default function ProcessEditor({ value, onChange, onSave, isSaving }: ProcessEditorProps) {
  const safeValue = ensureFiveSteps(value);

  function update(next: ProcessContent) {
    onChange(ensureFiveSteps(next));
  }

  function updateLocalized(
    key: "kicker" | "title" | "subtitle",
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...safeValue,
      [key]: { ...safeValue[key], [locale]: nextText },
    });
  }

  function updateStep(
    index: number,
    field: "title" | "text",
    locale: LocaleKey,
    nextText: string
  ) {
    const steps = safeValue.steps.map((s, i) => {
      if (i !== index) return s;
      return { ...s, [field]: { ...s[field], [locale]: nextText } };
    });

    update({ ...safeValue, steps });
  }

  return (
    <div className={styles.editor}>
      <header className={styles.editorHeader}>
        <h2 className={styles.editorTitle}>Process</h2>

        <button
          type="button"
          className={styles.saveButton}
          onClick={() => void onSave()}
          disabled={isSaving}
        >
          {isSaving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </header>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Intro</h3>

        <div className={styles.fieldGrid}>
          <Field
            label="Kicker (FR)"
            value={safeValue.kicker.fr}
            onChange={(v) => updateLocalized("kicker", "fr", v)}
          />
          <Field
            label="Kicker (EN)"
            value={safeValue.kicker.en}
            onChange={(v) => updateLocalized("kicker", "en", v)}
          />

          <Field
            label="Titre (FR)"
            value={safeValue.title.fr}
            onChange={(v) => updateLocalized("title", "fr", v)}
          />
          <Field
            label="Titre (EN)"
            value={safeValue.title.en}
            onChange={(v) => updateLocalized("title", "en", v)}
          />

          <TextAreaField
            label="Sous-titre (FR)"
            value={safeValue.subtitle.fr}
            onChange={(v) => updateLocalized("subtitle", "fr", v)}
            rows={4}
          />
          <TextAreaField
            label="Sous-titre (EN)"
            value={safeValue.subtitle.en}
            onChange={(v) => updateLocalized("subtitle", "en", v)}
            rows={4}
          />
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Étapes</h3>

        <div className={styles.stepsEditor}>
          {safeValue.steps.map((step, index) => {
            const n = index + 1;
            return (
              <div key={`step-${n}`} className={styles.stepEditorCard}>
                <div className={styles.stepEditorHeader}>
                  <p className={styles.stepEditorTitle}>
                    Étape {n}{" "}
                    <span className={styles.stepEditorHint}>
                      ({String(n).padStart(2, "0")})
                    </span>
                  </p>
                </div>

                <div className={styles.fieldGrid}>
                  <Field
                    label="Titre (FR)"
                    value={step.title.fr}
                    onChange={(v) => updateStep(index, "title", "fr", v)}
                  />
                  <Field
                    label="Titre (EN)"
                    value={step.title.en}
                    onChange={(v) => updateStep(index, "title", "en", v)}
                  />

                  <TextAreaField
                    label="Texte (FR)"
                    value={step.text.fr}
                    onChange={(v) => updateStep(index, "text", "fr", v)}
                    rows={3}
                  />
                  <TextAreaField
                    label="Texte (EN)"
                    value={step.text.en}
                    onChange={(v) => updateStep(index, "text", "en", v)}
                    rows={3}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className={styles.note}>Le process reste limité à 5 étapes.</p>
      </section>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (next: string) => void;
};

function Field({ label, value, onChange }: FieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (next: string) => void;
  rows?: number;
};

function TextAreaField({ label, value, onChange, rows = 4 }: TextAreaFieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <textarea
        className={styles.textarea}
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
