"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { sendContactMessage } from "@/utils/sendContactMessage";
import "@/styles/contactModal.scss";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!email.trim() || !subject.trim() || !message.trim()) {
      setError(t("contactModal.errors.required"));
      setSuccessMessage("");
      setIsSubmitting(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError(t("contactModal.errors.invalidEmail"));
      setSuccessMessage("");
      setIsSubmitting(false);
      return;
    }

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

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
      ref={overlayRef}
    >
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label={t("contactModal.close")}
        >
          ×
        </button>

        <h2>{t("contactModal.title")}</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">{t("contactModal.email")}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />

          <label htmlFor="subject">{t("contactModal.subject")}</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={isSubmitting}
            required
          />

          <label htmlFor="message">{t("contactModal.message")}</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            required
          />

          {error && <p className="form-error">{error}</p>}
          {successMessage && <p className="form-success">{successMessage}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("contactModal.sending") : t("contactModal.send")}
          </button>
        </form>
      </div>
    </div>
  );
}
