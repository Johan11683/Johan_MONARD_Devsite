"use client";

import styles from "./hero.module.scss";
import type { HeroContent } from "./hero.types";

type HeroEditorProps = {
  value: HeroContent;
  onChange: (next: HeroContent) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
};

export default function HeroEditor({
  value,
  onChange,
  onSave,
  isSaving,
}: HeroEditorProps) {
  function update<K extends keyof HeroContent>(key: K, nextValue: HeroContent[K]) {
    onChange({ ...value, [key]: nextValue });
  }

  function updateLocalized(
    key: "title" | "subtitle" | "ctaText",
    locale: "fr" | "en",
    nextText: string
  ) {
    update(key, { ...(value[key] ?? { fr: "", en: "" }), [locale]: nextText });
  }

  const isValid =
    !!value?.title?.fr?.trim() &&
    !!value?.title?.en?.trim() &&
    !!value?.subtitle?.fr?.trim() &&
    !!value?.subtitle?.en?.trim() &&
    !!value?.ctaText?.fr?.trim() &&
    !!value?.ctaText?.en?.trim() &&
    !!value?.ctaHref?.trim() &&
    !!value?.imageUrl?.trim();

  return (
    <div className={styles.editor}>
      <header className={styles.editorHeader}>
        <div className={styles.row}>
          <h2 className={styles.panelTitle}>Hero</h2>
          <p className={styles.hint}>Champs FR + EN obligatoires</p>
        </div>

        <button
          type="button"
          className={styles.saveButton}
          disabled={!isValid || isSaving}
          onClick={() => void onSave()}
        >
          {isSaving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </header>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label}>Titre (FR)</label>
          <input
            className={styles.input}
            value={value.title.fr}
            onChange={(e) => updateLocalized("title", "fr", e.target.value)}
            placeholder="Ex: Développeur web à Bordeaux"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Title (EN)</label>
          <input
            className={styles.input}
            value={value.title.en}
            onChange={(e) => updateLocalized("title", "en", e.target.value)}
            placeholder="Ex: Web developer in Bordeaux"
          />
        </div>
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label}>Sous-titre (FR)</label>
          <textarea
            className={styles.textarea}
            rows={4}
            value={value.subtitle.fr}
            onChange={(e) => updateLocalized("subtitle", "fr", e.target.value)}
            placeholder="Ex: Sites vitrines rapides, propres, pensés SEO..."
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Subtitle (EN)</label>
          <textarea
            className={styles.textarea}
            rows={4}
            value={value.subtitle.en}
            onChange={(e) => updateLocalized("subtitle", "en", e.target.value)}
            placeholder="Ex: Fast, clean websites built for SEO..."
          />
        </div>
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label}>CTA (FR)</label>
          <input
            className={styles.input}
            value={value.ctaText.fr}
            onChange={(e) => updateLocalized("ctaText", "fr", e.target.value)}
            placeholder="Ex: Voir mes tarifs"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>CTA (EN)</label>
          <input
            className={styles.input}
            value={value.ctaText.en}
            onChange={(e) => updateLocalized("ctaText", "en", e.target.value)}
            placeholder="Ex: See pricing"
          />
        </div>
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label}>Lien CTA (unique)</label>
          <input
            className={styles.input}
            value={value.ctaHref}
            onChange={(e) => update("ctaHref", e.target.value)}
            placeholder="#prices"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Image URL (unique)</label>
          <input
            className={styles.input}
            value={value.imageUrl}
            onChange={(e) => update("imageUrl", e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className={styles.actions}>
        {!isSaving && !isValid && (
          <p className={styles.errorText}>
            Il manque des champs (FR + EN + lien + image obligatoires).
          </p>
        )}
      </div>
    </div>
  );
}
