"use client";

import styles from "./about.module.scss";
import type { AboutContent } from "./about.types";
import type { LocaleKey } from "../Hero/hero.types";

type AboutEditorProps = {
  value: AboutContent;
  onChange: (next: AboutContent) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
};

type LocaleFieldKey =
  | "kicker"
  | "title"
  | "photoAlt"
  | "photoCaption"
  | "lead"
  | "text1"
  | "text2"
  | "outro";

export default function AboutEditor({ value, onChange, onSave, isSaving }: AboutEditorProps) {
  function update(next: AboutContent) {
    onChange(next);
  }

  function updateLocalized(key: LocaleFieldKey, locale: LocaleKey, nextText: string) {
    update({
      ...value,
      [key]: { ...value[key], [locale]: nextText },
    });
  }

  function updateBullet(
    index: number,
    field: "strong" | "text",
    locale: LocaleKey,
    nextText: string
  ) {
    const bullets = value.bullets.map((b, i) => {
      if (i !== index) return b;
      return { ...b, [field]: { ...b[field], [locale]: nextText } };
    });

    update({ ...value, bullets });
  }

  return (
    <div className={styles.editor}>
      <header className={styles.editorHeader}>
        <h2 className={styles.editorTitle}>À propos</h2>

        <button
          type="button"
          className={styles.saveButton}
          onClick={() => void onSave()}
          disabled={isSaving}
        >
          {isSaving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </header>

      {/* PHOTO */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Photo</h3>

        <div className={styles.fieldGrid}>
          <Field
            label="Alt photo (FR)"
            value={value.photoAlt.fr}
            onChange={(v) => updateLocalized("photoAlt", "fr", v)}
          />
          <Field
            label="Alt photo (EN)"
            value={value.photoAlt.en}
            onChange={(v) => updateLocalized("photoAlt", "en", v)}
          />

          <Field
            label="Légende photo (FR)"
            value={value.photoCaption.fr}
            onChange={(v) => updateLocalized("photoCaption", "fr", v)}
          />
          <Field
            label="Légende photo (EN)"
            value={value.photoCaption.en}
            onChange={(v) => updateLocalized("photoCaption", "en", v)}
          />
        </div>
      </section>

      {/* INTRO */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Intro</h3>

        <div className={styles.fieldGrid}>
          <Field
            label="Kicker (FR)"
            value={value.kicker.fr}
            onChange={(v) => updateLocalized("kicker", "fr", v)}
          />
          <Field
            label="Kicker (EN)"
            value={value.kicker.en}
            onChange={(v) => updateLocalized("kicker", "en", v)}
          />

          <Field
            label="Titre (FR)"
            value={value.title.fr}
            onChange={(v) => updateLocalized("title", "fr", v)}
          />
          <Field
            label="Titre (EN)"
            value={value.title.en}
            onChange={(v) => updateLocalized("title", "en", v)}
          />

          <TextAreaField
            label="Lead (FR)"
            value={value.lead.fr}
            onChange={(v) => updateLocalized("lead", "fr", v)}
            rows={4}
          />
          <TextAreaField
            label="Lead (EN)"
            value={value.lead.en}
            onChange={(v) => updateLocalized("lead", "en", v)}
            rows={4}
          />
        </div>
      </section>

      {/* PARAGRAPHES */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Paragraphes</h3>

        <div className={styles.fieldGrid}>
          <TextAreaField
            label="Texte 1 (FR)"
            value={value.text1.fr}
            onChange={(v) => updateLocalized("text1", "fr", v)}
            rows={4}
          />
          <TextAreaField
            label="Texte 1 (EN)"
            value={value.text1.en}
            onChange={(v) => updateLocalized("text1", "en", v)}
            rows={4}
          />

          <TextAreaField
            label="Texte 2 (FR)"
            value={value.text2.fr}
            onChange={(v) => updateLocalized("text2", "fr", v)}
            rows={4}
          />
          <TextAreaField
            label="Texte 2 (EN)"
            value={value.text2.en}
            onChange={(v) => updateLocalized("text2", "en", v)}
            rows={4}
          />
        </div>
      </section>

      {/* BULLETS */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Points forts (3)</h3>

        <div className={styles.stepsEditor}>
          {value.bullets.map((b, index) => {
            const n = index + 1;
            return (
              <div key={`about-bullet-${n}`} className={styles.stepEditorCard}>
                <div className={styles.stepEditorHeader}>
                  <p className={styles.stepEditorTitle}>
                    Point fort {n}
                    <span className={styles.stepEditorHint}>({String(n).padStart(2, "0")})</span>
                  </p>
                </div>

                <div className={styles.fieldGrid}>
                  <Field
                    label="Strong (FR)"
                    value={b.strong.fr}
                    onChange={(v) => updateBullet(index, "strong", "fr", v)}
                  />
                  <Field
                    label="Strong (EN)"
                    value={b.strong.en}
                    onChange={(v) => updateBullet(index, "strong", "en", v)}
                  />

                  <TextAreaField
                    label="Texte (FR)"
                    value={b.text.fr}
                    onChange={(v) => updateBullet(index, "text", "fr", v)}
                    rows={3}
                  />
                  <TextAreaField
                    label="Texte (EN)"
                    value={b.text.en}
                    onChange={(v) => updateBullet(index, "text", "en", v)}
                    rows={3}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className={styles.note}>Les points forts restent limités à 3.</p>
      </section>

      {/* OUTRO */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Outro</h3>

        <div className={styles.fieldGrid}>
          <TextAreaField
            label="Outro (FR)"
            value={value.outro.fr}
            onChange={(v) => updateLocalized("outro", "fr", v)}
            rows={4}
          />
          <TextAreaField
            label="Outro (EN)"
            value={value.outro.en}
            onChange={(v) => updateLocalized("outro", "en", v)}
            rows={4}
          />
        </div>
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
