"use client";

import styles from "./prices.module.scss";
import type { LocaleKey, PricesContent, PriceCardKey } from "./prices.types";

type PricesEditorProps = {
  value: PricesContent;
  onChange: (next: PricesContent) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
};

const CARD_KEYS: PriceCardKey[] = ["standard", "bilingual", "admin"];

const CARD_LABELS: Record<PriceCardKey, string> = {
  standard: "Carte 1 — Standard",
  bilingual: "Carte 2 — Bilingue",
  admin: "Carte 3 — Admin",
};

export default function PricesEditor({
  value,
  onChange,
  onSave,
  isSaving,
}: PricesEditorProps) {
  function update(next: PricesContent) {
    onChange(next);
  }

  function updateLocalized(
    key: "kicker" | "title" | "subtitle" | "badgeMostPopular" | "legalNote",
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...value,
      [key]: { ...value[key], [locale]: nextText },
    });
  }

  function updateCustomParagraph(locale: LocaleKey, nextText: string) {
    update({
      ...value,
      custom: {
        ...value.custom,
        paragraph1: { ...value.custom.paragraph1, [locale]: nextText },
      },
    });
  }

  function updateUpdatesPolicy(
    field: "title" | "text",
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...value,
      updatesPolicy: {
        ...value.updatesPolicy,
        [field]: { ...value.updatesPolicy[field], [locale]: nextText },
      },
    });
  }

  function updateCardEnabled(cardKey: PriceCardKey, enabled: boolean) {
    update({
      ...value,
      cards: {
        ...value.cards,
        [cardKey]: {
          ...value.cards[cardKey],
          enabled,
        },
      },
    });
  }

  function updateCardHighlight(highlight: boolean) {
    update({
      ...value,
      cards: {
        ...value.cards,
        bilingual: {
          ...value.cards.bilingual,
          highlight,
        },
      },
    });
  }

  function updateCardLocalized(
    cardKey: PriceCardKey,
    field: "title" | "price" | "description",
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...value,
      cards: {
        ...value.cards,
        [cardKey]: {
          ...value.cards[cardKey],
          [field]: { ...value.cards[cardKey][field], [locale]: nextText },
        },
      },
    });
  }

  function addFeature(cardKey: PriceCardKey) {
    update({
      ...value,
      cards: {
        ...value.cards,
        [cardKey]: {
          ...value.cards[cardKey],
          features: {
            fr: [...value.cards[cardKey].features.fr, ""],
            en: [...value.cards[cardKey].features.en, ""],
          },
        },
      },
    });
  }

  function removeFeature(cardKey: PriceCardKey, index: number) {
    const fr = value.cards[cardKey].features.fr.filter((_, i) => i !== index);
    const en = value.cards[cardKey].features.en.filter((_, i) => i !== index);

    update({
      ...value,
      cards: {
        ...value.cards,
        [cardKey]: {
          ...value.cards[cardKey],
          features: { fr, en },
        },
      },
    });
  }

  function updateFeature(
    cardKey: PriceCardKey,
    locale: LocaleKey,
    index: number,
    nextText: string
  ) {
    const list = [...value.cards[cardKey].features[locale]];
    list[index] = nextText;

    update({
      ...value,
      cards: {
        ...value.cards,
        [cardKey]: {
          ...value.cards[cardKey],
          features: {
            ...value.cards[cardKey].features,
            [locale]: list,
          },
        },
      },
    });
  }

  function moveFeature(cardKey: PriceCardKey, fromIndex: number, direction: -1 | 1) {
    const fr = value.cards[cardKey].features.fr;
    const en = value.cards[cardKey].features.en;

    if (fr.length !== en.length) return;

    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= fr.length) return;

    const nextFr = [...fr];
    const nextEn = [...en];

    [nextFr[fromIndex], nextFr[toIndex]] = [nextFr[toIndex], nextFr[fromIndex]];
    [nextEn[fromIndex], nextEn[toIndex]] = [nextEn[toIndex], nextEn[fromIndex]];

    update({
      ...value,
      cards: {
        ...value.cards,
        [cardKey]: {
          ...value.cards[cardKey],
          features: { fr: nextFr, en: nextEn },
        },
      },
    });
  }

  // ✅ validation
  const headerOk =
    !!value.kicker.fr.trim() &&
    !!value.kicker.en.trim() &&
    !!value.title.fr.trim() &&
    !!value.title.en.trim() &&
    !!value.subtitle.fr.trim() &&
    !!value.subtitle.en.trim();

  const badgeOk = !!value.badgeMostPopular.fr.trim() && !!value.badgeMostPopular.en.trim();

  const customOk = !!value.custom.paragraph1.fr.trim() && !!value.custom.paragraph1.en.trim();

  const updatesOk =
    !!value.updatesPolicy.title.fr.trim() &&
    !!value.updatesPolicy.title.en.trim() &&
    !!value.updatesPolicy.text.fr.trim() &&
    !!value.updatesPolicy.text.en.trim();

  const legalOk = !!value.legalNote.fr.trim() && !!value.legalNote.en.trim();

  const cardsOk = CARD_KEYS.every((k) => {
    const c = value.cards[k];
    if (!c.enabled) return true;

    const baseOk =
      !!c.title.fr.trim() &&
      !!c.title.en.trim() &&
      !!c.price.fr.trim() &&
      !!c.price.en.trim() &&
      !!c.description.fr.trim() &&
      !!c.description.en.trim();

    if (!baseOk) return false;

    const frList = c.features.fr;
    const enList = c.features.en;
    if (frList.length !== enList.length) return false;

    return frList.every((s) => !!s.trim()) && enList.every((s) => !!s.trim());
  });

  const isValid = headerOk && badgeOk && cardsOk && customOk && updatesOk && legalOk;

  return (
    <div className={styles.editor}>
      <header className={styles.editorHeader}>
        <div>
          <h2 className={styles.editorTitle}>Tarifs</h2>
          <p className={styles.hint}>
            FR + EN obligatoires (cartes activées uniquement). Features illimitées.
          </p>
        </div>

        <button
          type="button"
          className={styles.saveButton}
          onClick={() => void onSave()}
          disabled={!isValid || isSaving}
        >
          {isSaving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </header>

      {!isSaving && !isValid && (
        <p className={styles.errorText}>
          Il manque des champs (FR/EN + cartes activées + features).
        </p>
      )}

      {/* Intro */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Intro</h3>

        <div className={styles.fieldGrid}>
          <div className={styles.grid2}>
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
          </div>

          <div className={styles.grid2}>
            <Field
              label="Titre (FR)"
              value={value.title.fr}
              onChange={(v) => updateLocalized("title", "fr", v)}
            />
            <Field
              label="Title (EN)"
              value={value.title.en}
              onChange={(v) => updateLocalized("title", "en", v)}
            />
          </div>

          <div className={styles.grid2}>
            <TextAreaField
              label="Sous-titre (FR)"
              value={value.subtitle.fr}
              rows={3}
              onChange={(v) => updateLocalized("subtitle", "fr", v)}
            />
            <TextAreaField
              label="Subtitle (EN)"
              value={value.subtitle.en}
              rows={3}
              onChange={(v) => updateLocalized("subtitle", "en", v)}
            />
          </div>
        </div>
      </section>

      {/* Badge */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Badge (carte mise en avant)</h3>

        <div className={styles.fieldGrid}>
          <div className={styles.grid2}>
            <Field
              label="Badge (FR)"
              value={value.badgeMostPopular.fr}
              onChange={(v) => updateLocalized("badgeMostPopular", "fr", v)}
            />
            <Field
              label="Badge (EN)"
              value={value.badgeMostPopular.en}
              onChange={(v) => updateLocalized("badgeMostPopular", "en", v)}
            />
          </div>

          <label className={styles.switch}>
            <span className={styles.switchLabel}>Carte “Bilingue” mise en avant</span>
            <input
              type="checkbox"
              checked={!!value.cards.bilingual.highlight}
              onChange={(e) => updateCardHighlight(e.target.checked)}
            />
          </label>
        </div>
      </section>

      {/* Cards */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Cartes</h3>

        <div className={styles.cardsEditor}>
          {CARD_KEYS.map((key) => {
            const card = value.cards[key];
            const rows = card.features.fr.length;

            return (
              <div key={key} className={styles.cardEditor}>
                <div className={styles.cardEditorHeader}>
                  <div>
                    <p className={styles.cardEditorTitle}>{CARD_LABELS[key]}</p>
                    <p className={styles.cardEditorHint}>
                      Features illimitées (FR/EN, mêmes lignes).
                    </p>
                  </div>

                  <label className={styles.switch}>
                    <span className={styles.switchLabel}>Activée</span>
                    <input
                      type="checkbox"
                      checked={card.enabled}
                      onChange={(e) => updateCardEnabled(key, e.target.checked)}
                    />
                  </label>
                </div>

                {card.enabled && (
                  <div className={styles.fieldGrid}>
                    <div className={styles.grid2}>
                      <Field
                        label="Titre (FR)"
                        value={card.title.fr}
                        onChange={(v) => updateCardLocalized(key, "title", "fr", v)}
                      />
                      <Field
                        label="Title (EN)"
                        value={card.title.en}
                        onChange={(v) => updateCardLocalized(key, "title", "en", v)}
                      />
                    </div>

                    <div className={styles.grid2}>
                      <Field
                        label="Prix (FR)"
                        value={card.price.fr}
                        onChange={(v) => updateCardLocalized(key, "price", "fr", v)}
                      />
                      <Field
                        label="Price (EN)"
                        value={card.price.en}
                        onChange={(v) => updateCardLocalized(key, "price", "en", v)}
                      />
                    </div>

                    <div className={styles.grid2}>
                      <TextAreaField
                        label="Description (FR)"
                        value={card.description.fr}
                        rows={3}
                        onChange={(v) => updateCardLocalized(key, "description", "fr", v)}
                      />
                      <TextAreaField
                        label="Description (EN)"
                        value={card.description.en}
                        rows={3}
                        onChange={(v) => updateCardLocalized(key, "description", "en", v)}
                      />
                    </div>

                    <div className={styles.featuresBlock}>
                      <div className={styles.featuresHeader}>
                        <h4 className={styles.featuresTitle}>Features</h4>
                        <button
                          type="button"
                          className={styles.secondaryButton}
                          onClick={() => addFeature(key)}
                        >
                          + Ajouter une ligne
                        </button>
                      </div>

                      {Array.from({ length: rows }).map((_, idx) => {
                        const frVal = card.features.fr[idx] ?? "";
                        const enVal = card.features.en[idx] ?? "";

                        return (
                          <div key={`${key}-feature-row-${idx}`} className={styles.featureRow}>
                            <div className={styles.grid2}>
                              <Field
                                label={`FR — ligne ${idx + 1}`}
                                value={frVal}
                                onChange={(v) => updateFeature(key, "fr", idx, v)}
                              />
                              <Field
                                label={`EN — line ${idx + 1}`}
                                value={enVal}
                                onChange={(v) => updateFeature(key, "en", idx, v)}
                              />
                            </div>

                            <div className={styles.featureActions}>
                              <button
                                type="button"
                                className={styles.iconButton}
                                onClick={() => moveFeature(key, idx, -1)}
                                disabled={idx === 0}
                                aria-label={`Monter la feature ${idx + 1}`}
                                title="Monter"
                              >
                                ▲
                              </button>

                              <button
                                type="button"
                                className={styles.iconButton}
                                onClick={() => moveFeature(key, idx, +1)}
                                disabled={idx === rows - 1}
                                aria-label={`Descendre la feature ${idx + 1}`}
                                title="Descendre"
                              >
                                ▼
                              </button>

                              <button
                                type="button"
                                className={styles.dangerButton}
                                onClick={() => removeFeature(key, idx)}
                                aria-label={`Supprimer la feature ${idx + 1}`}
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Texte custom</h3>

        <div className={styles.fieldGrid}>
          <div className={styles.grid2}>
            <TextAreaField
              label="Paragraphe (FR)"
              value={value.custom.paragraph1.fr}
              rows={3}
              onChange={(v) => updateCustomParagraph("fr", v)}
            />
            <TextAreaField
              label="Paragraph (EN)"
              value={value.custom.paragraph1.en}
              rows={3}
              onChange={(v) => updateCustomParagraph("en", v)}
            />
          </div>
        </div>
      </section>

      {/* Updates policy */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Politique de mises à jour</h3>

        <div className={styles.fieldGrid}>
          <div className={styles.grid2}>
            <Field
              label="Titre (FR)"
              value={value.updatesPolicy.title.fr}
              onChange={(v) => updateUpdatesPolicy("title", "fr", v)}
            />
            <Field
              label="Title (EN)"
              value={value.updatesPolicy.title.en}
              onChange={(v) => updateUpdatesPolicy("title", "en", v)}
            />
          </div>

          <div className={styles.grid2}>
            <TextAreaField
              label="Texte (FR)"
              value={value.updatesPolicy.text.fr}
              rows={4}
              onChange={(v) => updateUpdatesPolicy("text", "fr", v)}
            />
            <TextAreaField
              label="Text (EN)"
              value={value.updatesPolicy.text.en}
              rows={4}
              onChange={(v) => updateUpdatesPolicy("text", "en", v)}
            />
          </div>
        </div>
      </section>

      {/* Legal note */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Mention légale</h3>

        <div className={styles.fieldGrid}>
          <div className={styles.grid2}>
            <Field
              label="Legal note (FR)"
              value={value.legalNote.fr}
              onChange={(v) => updateLocalized("legalNote", "fr", v)}
            />
            <Field
              label="Legal note (EN)"
              value={value.legalNote.en}
              onChange={(v) => updateLocalized("legalNote", "en", v)}
            />
          </div>
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
