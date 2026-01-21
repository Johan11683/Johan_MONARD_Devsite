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

  // ✅ NEW: move feature up/down (FR + EN en même temps)
  function moveFeature(cardKey: PriceCardKey, fromIndex: number, direction: -1 | 1) {
    const fr = value.cards[cardKey].features.fr;
    const en = value.cards[cardKey].features.en;

    // sécurité : on garde FR/EN synchronisés
    if (fr.length !== en.length) return;

    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= fr.length) return;

    const nextFr = [...fr];
    const nextEn = [...en];

    // swap d’un cran
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

  // ✅ validation :
  // - header FR/EN
  // - badge FR/EN
  // - cards activées : title/price/description FR/EN + features FR/EN (toutes remplies)
  // - custom paragraph1 FR/EN
  // - updatesPolicy title/text FR/EN
  // - legalNote FR/EN
  const headerOk =
    !!value.kicker.fr.trim() &&
    !!value.kicker.en.trim() &&
    !!value.title.fr.trim() &&
    !!value.title.en.trim() &&
    !!value.subtitle.fr.trim() &&
    !!value.subtitle.en.trim();

  const badgeOk =
    !!value.badgeMostPopular.fr.trim() && !!value.badgeMostPopular.en.trim();

  const customOk =
    !!value.custom.paragraph1.fr.trim() && !!value.custom.paragraph1.en.trim();

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

    // on exige même longueur
    if (frList.length !== enList.length) return false;

    // toutes remplies
    const featuresOk =
      frList.every((s) => !!s.trim()) && enList.every((s) => !!s.trim());

    return featuresOk;
  });

  const isValid =
    headerOk && badgeOk && cardsOk && customOk && updatesOk && legalOk;

  return (
    <div className={styles.editor}>
      <div className={styles.row}>
        <h2 className={styles.panelTitle}>Tarifs</h2>
        <p className={styles.hint}>
          FR + EN obligatoires (cartes activées uniquement). Features illimitées.
        </p>
      </div>

      {/* Intro */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Intro</h3>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Kicker (FR)</label>
            <input
              className={styles.input}
              value={value.kicker.fr}
              onChange={(e) => updateLocalized("kicker", "fr", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Kicker (EN)</label>
            <input
              className={styles.input}
              value={value.kicker.en}
              onChange={(e) => updateLocalized("kicker", "en", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Titre (FR)</label>
            <input
              className={styles.input}
              value={value.title.fr}
              onChange={(e) => updateLocalized("title", "fr", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Title (EN)</label>
            <input
              className={styles.input}
              value={value.title.en}
              onChange={(e) => updateLocalized("title", "en", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Sous-titre (FR)</label>
            <textarea
              className={styles.textarea}
              rows={3}
              value={value.subtitle.fr}
              onChange={(e) => updateLocalized("subtitle", "fr", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Subtitle (EN)</label>
            <textarea
              className={styles.textarea}
              rows={3}
              value={value.subtitle.en}
              onChange={(e) => updateLocalized("subtitle", "en", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Badge */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Badge (carte mise en avant)</h3>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Badge (FR)</label>
            <input
              className={styles.input}
              value={value.badgeMostPopular.fr}
              onChange={(e) =>
                updateLocalized("badgeMostPopular", "fr", e.target.value)
              }
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Badge (EN)</label>
            <input
              className={styles.input}
              value={value.badgeMostPopular.en}
              onChange={(e) =>
                updateLocalized("badgeMostPopular", "en", e.target.value)
              }
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.switch}>
            <span className={styles.switchLabel}>
              Carte “Bilingue” mise en avant
            </span>
            <input
              type="checkbox"
              checked={!!value.cards.bilingual.highlight}
              onChange={(e) => updateCardHighlight(e.target.checked)}
            />
          </label>
        </div>
      </div>

      {/* Cards */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Cartes</h3>

        {CARD_KEYS.map((key) => {
          const card = value.cards[key];
          // ✅ mieux: longueur FR (vu que tu imposes la synchro)
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
                <>
                  <div className={styles.grid2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Titre (FR)</label>
                      <input
                        className={styles.input}
                        value={card.title.fr}
                        onChange={(e) =>
                          updateCardLocalized(key, "title", "fr", e.target.value)
                        }
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label}>Title (EN)</label>
                      <input
                        className={styles.input}
                        value={card.title.en}
                        onChange={(e) =>
                          updateCardLocalized(key, "title", "en", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.grid2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Prix (FR)</label>
                      <input
                        className={styles.input}
                        value={card.price.fr}
                        onChange={(e) =>
                          updateCardLocalized(key, "price", "fr", e.target.value)
                        }
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label}>Price (EN)</label>
                      <input
                        className={styles.input}
                        value={card.price.en}
                        onChange={(e) =>
                          updateCardLocalized(key, "price", "en", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.grid2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Description (FR)</label>
                      <textarea
                        className={styles.textarea}
                        rows={3}
                        value={card.description.fr}
                        onChange={(e) =>
                          updateCardLocalized(
                            key,
                            "description",
                            "fr",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label}>Description (EN)</label>
                      <textarea
                        className={styles.textarea}
                        rows={3}
                        value={card.description.en}
                        onChange={(e) =>
                          updateCardLocalized(
                            key,
                            "description",
                            "en",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Features */}
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
                        <div
                          key={`${key}-feature-row-${idx}`}
                          className={styles.featureRow}
                        >
                          <div className={styles.grid2}>
                            <div className={styles.field}>
                              <label className={styles.label}>
                                FR — ligne {idx + 1}
                              </label>
                              <input
                                className={styles.input}
                                value={frVal}
                                onChange={(e) =>
                                  updateFeature(key, "fr", idx, e.target.value)
                                }
                              />
                            </div>

                            <div className={styles.field}>
                              <label className={styles.label}>
                                EN — line {idx + 1}
                              </label>
                              <input
                                className={styles.input}
                                value={enVal}
                                onChange={(e) =>
                                  updateFeature(key, "en", idx, e.target.value)
                                }
                              />
                            </div>
                          </div>

                          {/* ✅ NEW: flèches haut/bas + supprimer */}
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
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Custom */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Texte custom</h3>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Paragraphe (FR)</label>
            <textarea
              className={styles.textarea}
              rows={3}
              value={value.custom.paragraph1.fr}
              onChange={(e) => updateCustomParagraph("fr", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Paragraph (EN)</label>
            <textarea
              className={styles.textarea}
              rows={3}
              value={value.custom.paragraph1.en}
              onChange={(e) => updateCustomParagraph("en", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Updates policy */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Politique de mises à jour</h3>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Titre (FR)</label>
            <input
              className={styles.input}
              value={value.updatesPolicy.title.fr}
              onChange={(e) => updateUpdatesPolicy("title", "fr", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Title (EN)</label>
            <input
              className={styles.input}
              value={value.updatesPolicy.title.en}
              onChange={(e) => updateUpdatesPolicy("title", "en", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Texte (FR)</label>
            <textarea
              className={styles.textarea}
              rows={4}
              value={value.updatesPolicy.text.fr}
              onChange={(e) => updateUpdatesPolicy("text", "fr", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Text (EN)</label>
            <textarea
              className={styles.textarea}
              rows={4}
              value={value.updatesPolicy.text.en}
              onChange={(e) => updateUpdatesPolicy("text", "en", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Legal note */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Mention légale</h3>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Legal note (FR)</label>
            <input
              className={styles.input}
              value={value.legalNote.fr}
              onChange={(e) => updateLocalized("legalNote", "fr", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Legal note (EN)</label>
            <input
              className={styles.input}
              value={value.legalNote.en}
              onChange={(e) => updateLocalized("legalNote", "en", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          className={styles.primaryButton}
          type="button"
          disabled={!isValid || isSaving}
          onClick={onSave}
        >
          {isSaving ? "Sauvegarde..." : "Sauvegarder"}
        </button>

        {!isValid && (
          <p className={styles.errorText}>
            Il manque des champs (FR/EN + cartes activées + features).
          </p>
        )}
      </div>
    </div>
  );
}
