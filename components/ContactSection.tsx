"use client";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
  const { t } = useTranslation("common");

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-section__title">{t("contactTitle")}</h2>
      <div className="contact-section__wrapper">
        <div className="contact-section__column">
          <p>📱 07 77 77 77 77</p>
          <p>📄 <a href="/cv.pdf" download>{t("dlmoncv")}</a></p>
        </div>
        <div className="contact-section__column">
          <p>📧 mail@mail.com</p>
        </div>
        <div className="contact-section__column">
          <p>
            🔗 <a href="https://linkedin.com/in/tonprofil" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
          <p>
            🔗 <a href="https://github.com/Johan11683" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </div>
      </div>
    </section>
  );
}
