"use client";

import { useTranslation } from "react-i18next";
import ContactForm from "@/components/ContactForm";
import "@/styles/contactPage.scss";

export default function ContactPage() {
  const { t } = useTranslation("common");

  return (
    <main className="contact-page layout-container">
      <h1>{t("contactModal.title")}</h1>
      <ContactForm />
    </main>
  );
}