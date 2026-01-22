// app/components/Admin/Sections/Contact/ContactEditor.tsx
"use client";

import styles from "./contact.module.scss";
import type { ContactContent, LocaleKey } from "./contact.types";

type ContactEditorProps = {
  value: ContactContent;
  onChange: (next: ContactContent) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
};

export default function ContactEditor({
  value,
  onChange,
  onSave,
  isSaving,
}: ContactEditorProps) {
  function update(next: ContactContent) {
    onChange(next);
  }

  // =========================
  // Intro (kicker/title/lead)
  // =========================
  function updateIntro(
    key: "kicker" | "title" | "lead",
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...value,
      [key]: { ...value[key], [locale]: nextText },
    });
  }

  // =========================
  // Labels (phone/email/address)
  // =========================
  function updateLabel(
    key: keyof ContactContent["labels"],
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...value,
      labels: {
        ...value.labels,
        [key]: { ...value.labels[key], [locale]: nextText },
      },
    });
  }

  // =========================
  // Infos (non i18n) -> value.info.*
  // =========================
  function updateInfo(key: keyof ContactContent["info"], nextText: string) {
    update({
      ...value,
      info: {
        ...value.info,
        [key]: nextText,
      },
    });
  }

  // =========================
  // Form labels
  // =========================
  function updateForm(
    key: keyof ContactContent["form"],
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...value,
      form: {
        ...value.form,
        [key]: { ...value.form[key], [locale]: nextText },
      },
    });
  }

  // =========================
  // Button
  // =========================
  function updateButton(
    key: keyof ContactContent["button"],
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...value,
      button: {
        ...value.button,
        [key]: { ...value.button[key], [locale]: nextText },
      },
    });
  }

  // =========================
  // Status
  // =========================
  function updateStatus(
    key: keyof ContactContent["status"],
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...value,
      status: {
        ...value.status,
        [key]: { ...value.status[key], [locale]: nextText },
      },
    });
  }

  // =========================
  // Validation
  // =========================
  const introOk =
    value.kicker.fr.trim().length > 0 &&
    value.kicker.en.trim().length > 0 &&
    value.title.fr.trim().length > 0 &&
    value.title.en.trim().length > 0 &&
    value.lead.fr.trim().length > 0 &&
    value.lead.en.trim().length > 0;

  const labelsOk =
    value.labels.phone.fr.trim().length > 0 &&
    value.labels.phone.en.trim().length > 0 &&
    value.labels.email.fr.trim().length > 0 &&
    value.labels.email.en.trim().length > 0 &&
    value.labels.address.fr.trim().length > 0 &&
    value.labels.address.en.trim().length > 0;

  const infosOk =
    value.info.phoneText.trim().length > 0 &&
    value.info.phoneHref.trim().length > 0 &&
    value.info.emailText.trim().length > 0 &&
    value.info.emailHref.trim().length > 0 &&
    value.info.addressLine1.trim().length > 0 &&
    value.info.addressLine2.trim().length > 0;

  const formOk =
    value.form.fullName.fr.trim().length > 0 &&
    value.form.fullName.en.trim().length > 0 &&
    value.form.email.fr.trim().length > 0 &&
    value.form.email.en.trim().length > 0 &&
    value.form.phone.fr.trim().length > 0 &&
    value.form.phone.en.trim().length > 0 &&
    value.form.message.fr.trim().length > 0 &&
    value.form.message.en.trim().length > 0;

  const buttonOk =
    value.button.idle.fr.trim().length > 0 &&
    value.button.idle.en.trim().length > 0 &&
    value.button.loading.fr.trim().length > 0 &&
    value.button.loading.en.trim().length > 0;

  const statusOk =
    value.status.success.fr.trim().length > 0 &&
    value.status.success.en.trim().length > 0 &&
    value.status.errorPart1.fr.trim().length > 0 &&
    value.status.errorPart1.en.trim().length > 0 &&
    value.status.errorPart2.fr.trim().length > 0 &&
    value.status.errorPart2.en.trim().length > 0;

  const isValid = introOk && labelsOk && infosOk && formOk && buttonOk && statusOk;

  return (
    <div className={styles.editor}>
      <header className={styles.editorHeader}>
        <h2 className={styles.editorTitle}>Contact</h2>

        <button
          type="button"
          className={styles.saveButton}
          onClick={() => void onSave()}
          disabled={!isValid || isSaving}
        >
          {isSaving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </header>

      {/* Intro */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Intro</h3>

        <div className={styles.fieldGrid}>
          <Field label="Kicker (FR)" value={value.kicker.fr} onChange={(v) => updateIntro("kicker", "fr", v)} />
          <Field label="Kicker (EN)" value={value.kicker.en} onChange={(v) => updateIntro("kicker", "en", v)} />

          <Field label="Titre (FR)" value={value.title.fr} onChange={(v) => updateIntro("title", "fr", v)} />
          <Field label="Title (EN)" value={value.title.en} onChange={(v) => updateIntro("title", "en", v)} />

          <TextAreaField label="Lead (FR)" value={value.lead.fr} onChange={(v) => updateIntro("lead", "fr", v)} rows={3} />
          <TextAreaField label="Lead (EN)" value={value.lead.en} onChange={(v) => updateIntro("lead", "en", v)} rows={3} />
        </div>
      </section>

      {/* Labels */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Labels</h3>

        <div className={styles.fieldGrid}>
          <Field label="Téléphone (FR)" value={value.labels.phone.fr} onChange={(v) => updateLabel("phone", "fr", v)} />
          <Field label="Phone (EN)" value={value.labels.phone.en} onChange={(v) => updateLabel("phone", "en", v)} />

          <Field label="E-mail (FR)" value={value.labels.email.fr} onChange={(v) => updateLabel("email", "fr", v)} />
          <Field label="Email (EN)" value={value.labels.email.en} onChange={(v) => updateLabel("email", "en", v)} />

          <Field label="Adresse (FR)" value={value.labels.address.fr} onChange={(v) => updateLabel("address", "fr", v)} />
          <Field label="Address (EN)" value={value.labels.address.en} onChange={(v) => updateLabel("address", "en", v)} />
        </div>
      </section>

      {/* Infos */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Infos affichées</h3>

        <div className={styles.fieldGrid}>
          <Field label="Téléphone (affiché)" value={value.info.phoneText} onChange={(v) => updateInfo("phoneText", v)} />
          <Field label="Lien téléphone (tel:...)" value={value.info.phoneHref} onChange={(v) => updateInfo("phoneHref", v)} />

          <Field label="Email (affiché)" value={value.info.emailText} onChange={(v) => updateInfo("emailText", v)} />
          <Field label="Lien email (mailto:...)" value={value.info.emailHref} onChange={(v) => updateInfo("emailHref", v)} />

          <Field label="Adresse ligne 1" value={value.info.addressLine1} onChange={(v) => updateInfo("addressLine1", v)} />
          <Field label="Adresse ligne 2" value={value.info.addressLine2} onChange={(v) => updateInfo("addressLine2", v)} />
        </div>
      </section>

      {/* Form */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Formulaire</h3>

        <div className={styles.fieldGrid}>
          <Field label="Nom complet (FR)" value={value.form.fullName.fr} onChange={(v) => updateForm("fullName", "fr", v)} />
          <Field label="Full name (EN)" value={value.form.fullName.en} onChange={(v) => updateForm("fullName", "en", v)} />

          <Field label="Email (FR)" value={value.form.email.fr} onChange={(v) => updateForm("email", "fr", v)} />
          <Field label="Email (EN)" value={value.form.email.en} onChange={(v) => updateForm("email", "en", v)} />

          <Field label="Téléphone (FR)" value={value.form.phone.fr} onChange={(v) => updateForm("phone", "fr", v)} />
          <Field label="Phone (EN)" value={value.form.phone.en} onChange={(v) => updateForm("phone", "en", v)} />

          <TextAreaField label="Message (FR)" value={value.form.message.fr} onChange={(v) => updateForm("message", "fr", v)} rows={3} />
          <TextAreaField label="Message (EN)" value={value.form.message.en} onChange={(v) => updateForm("message", "en", v)} rows={3} />
        </div>
      </section>

      {/* Button + status */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Bouton & status</h3>

        <div className={styles.fieldGrid}>
          <Field label="Bouton (FR)" value={value.button.idle.fr} onChange={(v) => updateButton("idle", "fr", v)} />
          <Field label="Button (EN)" value={value.button.idle.en} onChange={(v) => updateButton("idle", "en", v)} />

          <Field label="Loading (FR)" value={value.button.loading.fr} onChange={(v) => updateButton("loading", "fr", v)} />
          <Field label="Loading (EN)" value={value.button.loading.en} onChange={(v) => updateButton("loading", "en", v)} />

          <Field label="Succès (FR)" value={value.status.success.fr} onChange={(v) => updateStatus("success", "fr", v)} />
          <Field label="Success (EN)" value={value.status.success.en} onChange={(v) => updateStatus("success", "en", v)} />

          <Field label="Erreur part 1 (FR)" value={value.status.errorPart1.fr} onChange={(v) => updateStatus("errorPart1", "fr", v)} />
          <Field label="Error part 1 (EN)" value={value.status.errorPart1.en} onChange={(v) => updateStatus("errorPart1", "en", v)} />

          <Field label="Erreur part 2 (FR)" value={value.status.errorPart2.fr} onChange={(v) => updateStatus("errorPart2", "fr", v)} />
          <Field label="Error part 2 (EN)" value={value.status.errorPart2.en} onChange={(v) => updateStatus("errorPart2", "en", v)} />
        </div>
      </section>

      {!isValid && (
        <p className={styles.note}>
          Il manque des champs obligatoires (FR + EN + infos de contact).
        </p>
      )}
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
