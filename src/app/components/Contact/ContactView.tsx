// app/components/Contact/ContactView.tsx
"use client";

import { useState } from "react";
import styles from "./Contact.module.scss";
import type { ContactContent, LocaleKey } from "@/app/components/Admin/Sections/Contact/contact.types";

type Status = "idle" | "loading" | "success" | "error";

type ContactViewProps = {
  value: ContactContent;
  locale: LocaleKey;
};

export default function ContactView({ value, locale }: ContactViewProps) {
  const [status, setStatus] = useState<Status>("idle");

  const t = {
    kicker: value.kicker[locale],
    title: value.title[locale],
    lead: value.lead[locale],

    labels: {
      phone: value.labels.phone[locale],
      email: value.labels.email[locale],
      address: value.labels.address[locale],
    },

    form: {
      fullName: value.form.fullName[locale],
      email: value.form.email[locale],
      phone: value.form.phone[locale],
      message: value.form.message[locale],
    },

    button: {
      idle: value.button.idle[locale],
      loading: value.button.loading[locale],
    },

    status: {
      success: value.status.success[locale],
      errorPart1: value.status.errorPart1[locale],
      errorPart2: value.status.errorPart2[locale],
    },
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      setStatus("loading");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.inner}>
        {/* Colonne infos */}
        <div className={styles.infoColumn}>
          <p className={styles.kicker}>{t.kicker}</p>
          <h2 id="contact-title" className={styles.title}>
            {t.title}
          </h2>

          <p className={styles.lead}>{t.lead}</p>

          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>{t.labels.phone}</span>
              <a href={value.info.phoneHref} className={styles.contactLink}>
                {value.info.phoneText}
              </a>
            </li>

            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>{t.labels.email}</span>
              <a href={value.info.emailHref} className={styles.contactLink}>
                {value.info.emailText}
              </a>
            </li>

            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>{t.labels.address}</span>
              <p className={styles.contactText}>
                {value.info.addressLine1}
                <br />
                {value.info.addressLine2}
              </p>
            </li>
          </ul>
        </div>

        {/* Colonne formulaire */}
        <div className={styles.formColumn}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="fullName" className={styles.label}>
                {t.form.fullName}
              </label>
              <input id="fullName" name="fullName" type="text" required className={styles.input} autoComplete="name" />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                {t.form.email}
              </label>
              <input id="email" name="email" type="email" required className={styles.input} autoComplete="email" />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="phone" className={styles.label}>
                {t.form.phone}
              </label>
              <input id="phone" name="phone" type="tel" className={styles.input} autoComplete="tel" />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="message" className={styles.label}>
                {t.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                className={`${styles.input} ${styles.textarea}`}
                rows={6}
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={status === "loading"}>
              {status === "loading" ? t.button.loading : t.button.idle}
            </button>

            {status === "success" && <p className={styles.statusSuccess}>{t.status.success}</p>}

            {status === "error" && (
              <p className={styles.statusError}>
                {t.status.errorPart1}{" "}
                <a href={value.info.emailHref} className={styles.inlineLink}>
                  {value.info.emailText}
                </a>
                {t.status.errorPart2}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className={styles.separator} />
    </section>
  );
}
