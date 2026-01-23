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

export default function BenefitEditor({
  value,
  onChange,
  onSave,
  isSaving,
}: BenefitEditorProps) {
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
    const card = value.cards[cardKey];

    update({
      ...value,
      cards: {
        ...value.cards,
        [cardKey]: {
          ...card,
          title: { ...card.title, [locale]: nextText },
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
      <header className={styles.editorHeader}>
        <div>
          <h2 className={styles.editorTitle}>Bénéfices</h2>
          <p className={styles.editorHint}>FR + EN obligatoires (cartes activées uniquement)</p>
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
          Il manque des champs (FR/EN + CTA + cartes activées).
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

      {/* Cards */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Cartes (max 5)</h3>

        <div className={styles.cardsEditor}>
          {CARD_KEYS.map((key) => {
            const card = value.cards[key];

            return (
              <div key={key} className={styles.cardEditor}>
                <div className={styles.cardEditorHeader}>
                  <div>
                    <p className={styles.cardEditorTitle}>{CARD_LABELS[key]}</p>
                    <p className={styles.cardEditorHint}>Icône : en dur pour l’instant</p>
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
                        onChange={(v) => updateCardTitle(key, "fr", v)}
                      />
                      <Field
                        label="Title (EN)"
                        value={card.title.en}
                        onChange={(v) => updateCardTitle(key, "en", v)}
                      />
                    </div>

                    <div className={styles.grid2}>
                      <TextAreaField
                        label="Texte (FR)"
                        value={card.text.fr}
                        rows={3}
                        onChange={(v) => updateCardText(key, "fr", v)}
                      />
                      <TextAreaField
                        label="Text (EN)"
                        value={card.text.en}
                        rows={3}
                        onChange={(v) => updateCardText(key, "en", v)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className={styles.note}>Les cartes désactivées ne sont pas validées.</p>
      </section>

      {/* Footer */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Footer</h3>

        <div className={styles.fieldGrid}>
          <div className={styles.grid2}>
            <Field
              label="Ligne 1 (FR)"
              value={value.footer.line1.fr}
              onChange={(v) => updateFooterLocalized("line1", "fr", v)}
            />
            <Field
              label="Line 1 (EN)"
              value={value.footer.line1.en}
              onChange={(v) => updateFooterLocalized("line1", "en", v)}
            />
          </div>

          <div className={styles.grid2}>
            <Field
              label="Ligne 2 (FR)"
              value={value.footer.line2.fr}
              onChange={(v) => updateFooterLocalized("line2", "fr", v)}
            />
            <Field
              label="Line 2 (EN)"
              value={value.footer.line2.en}
              onChange={(v) => updateFooterLocalized("line2", "en", v)}
            />
          </div>

          <div className={styles.grid2}>
            <Field
              label="CTA (FR)"
              value={value.footer.ctaText.fr}
              onChange={(v) => updateFooterLocalized("ctaText", "fr", v)}
            />
            <Field
              label="CTA (EN)"
              value={value.footer.ctaText.en}
              onChange={(v) => updateFooterLocalized("ctaText", "en", v)}
            />
          </div>

          <Field
            label="Lien CTA"
            value={value.footer.ctaHref}
            onChange={(v) => updateFooterHref(v)}
            placeholder="#contact"
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
  placeholder?: string;
};

function Field({ label, value, onChange, placeholder }: FieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        className={styles.input}
        type="text"
        value={value}
        placeholder={placeholder}
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
