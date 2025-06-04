"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { sendContactMessage } from "@/utils/sendContactMessage";
import "@/styles/contactPage.scss";

export default function ContactPage() {
  const { t } = useTranslation("common");

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Vérifications simples
    if (!email.trim() || !subject.trim() || !message.trim()) {
      setError(t("contactModal.errors.required"));
      setSuccessMessage("");
      setIsSubmitting(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setError(t("contactModal.errors.invalidEmail"));
      setSuccessMessage("");
      setIsSubmitting(false);
      return;
    }

    // Envoi via utils
    const { success, error: sendError } = await sendContactMessage({
      email,
      subject,
      message,
    });

    if (success) {
      setError("");
      setSuccessMessage(t("contactModal.success"));
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      setSuccessMessage("");
      setError(sendError || "Erreur inconnue");
    }

    setIsSubmitting(false);
  };

  return (
    <main className="contact-page layout-container">
      <h1>{t("contactModal.title")}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">{t("contactModal.email")}</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />

        <label htmlFor="subject">{t("contactModal.subject")}</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isSubmitting}
        />

        <label htmlFor="message">{t("contactModal.message")}</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSubmitting}
        />

        {error && <p className="form-error">{error}</p>}
        {successMessage && <p className="form-success">{successMessage}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("contactModal.sending") : t("contactModal.send")}
        </button>
      </form>
    </main>
  );
}
