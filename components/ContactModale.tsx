"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next"; // ⬅️ i18n
import "@/styles/contactModal.scss";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useTranslation(); // ⬅️ Hook i18n
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !subject.trim() || !message.trim()) {
      return;
    }

    if (!isValidEmail(email)) {
      return;
    }

    alert(t("contactModal.success"));
    onClose();
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
        <button className="modal-close" onClick={onClose} aria-label={t("contactModal.close")}>
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
            required
          />

          <label htmlFor="subject">{t("contactModal.subject")}</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <label htmlFor="message">{t("contactModal.message")}</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />


          <button type="submit">{t("contactModal.send")}</button>
        </form>
      </div>
    </div>
  );
}
