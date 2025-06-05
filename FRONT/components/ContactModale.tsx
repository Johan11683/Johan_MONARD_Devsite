"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "./ContactForm";
import "@/styles/contactModal.scss";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useTranslation();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === overlayRef.current && onClose()}
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
        <ContactForm onSuccess={onClose} />
      </div>
    </div>
  );
}