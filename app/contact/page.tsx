"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import "@/styles/contactPage.scss";

export default function ContactPage() {
  const { t } = useTranslation("common");

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !subject.trim() || !message.trim()) {
      setError(t("contactModal.errors.required"));
      return;
    }

    if (!emailRegex.test(email)) {
      setError(t("contactModal.errors.invalidEmail"));
      return;
    }

    setError("");
    alert(t("contactModal.success"));

    setEmail("");
    setSubject("");
    setMessage("");
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
        />

        <label htmlFor="subject">{t("contactModal.subject")}</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label htmlFor="message">{t("contactModal.message")}</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit">{t("contactModal.send")}</button>
      </form>
    </main>
  );
}
