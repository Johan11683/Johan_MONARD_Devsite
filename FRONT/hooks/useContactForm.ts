import { useState } from "react";
import { useTranslation } from "react-i18next";
import { sendContactMessage } from "@/utils/sendContactMessage";

export function useContactForm() {
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
    if (isSubmitting) return;

    setIsSubmitting(true);

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

  return {
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
  };
}
