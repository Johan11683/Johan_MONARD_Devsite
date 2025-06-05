"use client";

import { useContactForm } from "@/hooks/useContactForm";
import { useTranslation } from "react-i18next";

export default function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const { t } = useTranslation("common");
  const {
    email,
    subject,
    message,
    setEmail,
    setSubject,
    setMessage,
    error,
    successMessage,
    isSubmitting,
    handleSubmit,
  } = useContactForm();

  const handleSubmitWithCallback = async (e: React.FormEvent) => {
    await handleSubmit(e);
    if (successMessage && onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmitWithCallback}>
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
  );
}