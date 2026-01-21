"use client";

import styles from "./benefit.module.scss";
import type { BenefitContent, LocaleKey, BenefitCardKey } from "./benefit.types";

type BenefitEditorProps = {
  value: BenefitContent;
  onChange: (next: BenefitContent) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
};

const CARD_KEYS: BenefitCardKey[] = [
  "overview",
  "clients",
  "transparent",
  "ownership",
  "noMaintenance",
];

const CARD_LABELS: Record<BenefitCardKey, string> = {
  overview: "Carte 1 — Vue d’ensemble",
  clients: "Carte 2 — Clients",
  transparent: "Carte 3 — Transparent",
  ownership: "Carte 4 — Propriété",
  noMaintenance: "Carte 5 — Sans maintenance",
};

export default function BenefitEditor({ value, onChange, onSave, isSaving }: BenefitEditorProps) {
  function update(next: BenefitContent) {
    onChange(next);
  }

  function updateLocalized(
    key: "kicker" | "title" | "subtitle",
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...value,
      [key]: { ...value[key], [locale]: nextText },
    });
  }

  function updateCardEnabled(cardKey: BenefitCardKey, enabled: boolean) {
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

  function updateCardTitle(cardKey: BenefitCardKey, locale: LocaleKey, nextText: string) {
    update({
      ...value,
      cards: {
        ...value.cards,
        [cardKey]: {
          ...value.cards[cardKey],
          title: { ...value.cards[cardKey].title, [locale]: nextText },
        },
      },
    });
  }

  function updateCardText(cardKey: BenefitCardKey, locale: LocaleKey, nextText: string) {
    const card = value.cards[cardKey];

    update({
      ...value,
      cards: {
        ...value.cards,
        [cardKey]: {
          ...card,
          text: { ...card.text, [locale]: nextText },
        },
      },
    });
  }

  function updateFooterLocalized(
    field: "line1" | "line2" | "ctaText",
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...value,
      footer: {
        ...value.footer,
        [field]: { ...value.footer[field], [locale]: nextText },
      },
    });
  }

  function updateFooterHref(nextHref: string) {
    update({
      ...value,
      footer: {
        ...value.footer,
        ctaHref: nextHref,
      },
    });
  }

  // ✅ validation :
  // - header FR/EN
  // - footer FR/EN + href
  // - cartes activées : title+text FR/EN
  const headerOk =
    !!value.kicker.fr.trim() &&
    !!value.kicker.en.trim() &&
    !!value.title.fr.trim() &&
    !!value.title.en.trim() &&
    !!value.subtitle.fr.trim() &&
    !!value.subtitle.en.trim();

  const footerOk =
    !!value.footer.line1.fr.trim() &&
    !!value.footer.line1.en.trim() &&
    !!value.footer.line2.fr.trim() &&
    !!value.footer.line2.en.trim() &&
    !!value.footer.ctaText.fr.trim() &&
    !!value.footer.ctaText.en.trim() &&
    !!value.footer.ctaHref.trim();

  const cardsOk = CARD_KEYS.every((k) => {
    const c = value.cards[k];
    if (!c.enabled) return true;

    return (
      !!c.title.fr.trim() &&
      !!c.title.en.trim() &&
      !!c.text.fr.trim() &&
      !!c.text.en.trim()
    );
  });

  const isValid = headerOk && footerOk && cardsOk;

  return (
    <div className={styles.editor}>
      <div className={styles.row}>
        <h2 className={styles.panelTitle}>Bénéfices</h2>
        <p className={styles.hint}>FR + EN obligatoires (cartes activées uniquement)</p>
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

      {/* Cards */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Cartes (max 5)</h3>

        {CARD_KEYS.map((key) => {
          const card = value.cards[key];

          return (
            <div key={key} className={styles.cardEditor}>
              <div className={styles.cardEditorHeader}>
                <div>
                  <p className={styles.cardEditorTitle}>{CARD_LABELS[key]}</p>
                  <p className={styles.cardEditorHint}>Icône: en dur pour l’instant</p>
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
                        onChange={(e) => updateCardTitle(key, "fr", e.target.value)}
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label}>Title (EN)</label>
                      <input
                        className={styles.input}
                        value={card.title.en}
                        onChange={(e) => updateCardTitle(key, "en", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.grid2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Texte (FR)</label>
                      <textarea
                        className={styles.textarea}
                        rows={3}
                        value={card.text.fr}
                        onChange={(e) => updateCardText(key, "fr", e.target.value)}
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label}>Text (EN)</label>
                      <textarea
                        className={styles.textarea}
                        rows={3}
                        value={card.text.en}
                        onChange={(e) => updateCardText(key, "en", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Footer</h3>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Ligne 1 (FR)</label>
            <input
              className={styles.input}
              value={value.footer.line1.fr}
              onChange={(e) => updateFooterLocalized("line1", "fr", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Line 1 (EN)</label>
            <input
              className={styles.input}
              value={value.footer.line1.en}
              onChange={(e) => updateFooterLocalized("line1", "en", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Ligne 2 (FR)</label>
            <input
              className={styles.input}
              value={value.footer.line2.fr}
              onChange={(e) => updateFooterLocalized("line2", "fr", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Line 2 (EN)</label>
            <input
              className={styles.input}
              value={value.footer.line2.en}
              onChange={(e) => updateFooterLocalized("line2", "en", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>CTA (FR)</label>
            <input
              className={styles.input}
              value={value.footer.ctaText.fr}
              onChange={(e) => updateFooterLocalized("ctaText", "fr", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>CTA (EN)</label>
            <input
              className={styles.input}
              value={value.footer.ctaText.en}
              onChange={(e) => updateFooterLocalized("ctaText", "en", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Lien CTA</label>
          <input
            className={styles.input}
            value={value.footer.ctaHref}
            onChange={(e) => updateFooterHref(e.target.value)}
            placeholder="#contact"
          />
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
            Il manque des champs (FR/EN + CTA + cartes activées).
          </p>
        )}
      </div>
    </div>
  );
}
