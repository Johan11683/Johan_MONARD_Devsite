"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import ContactModal from "./ContactModale";

export default function ContactSection() {
  const { t } = useTranslation("common");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-section__title">{t("contactTitle")}</h2>

      <div className="contact-section__row">
        <a href="tel:+33777842612" className="contact-link" title="Téléphone">
          <Image src="/images/logos/phone.png" alt="Téléphone" width={12} height={12} />
          <span>(+33) 7.77.84.26.12</span>
        </a>

        <button onClick={() => setIsModalOpen(true)} className="contact-link" title="Email">
          <Image src="/images/logos/mail.png" alt="Email" width={12} height={12} />
          <span>monard.johan@yahoo.fr</span>
        </button>

        <a href="https://github.com/Johan11683" target="_blank" rel="noopener noreferrer" title="GitHub">
          <Image className="github-logo" src="/images/logos/github.png" alt="GitHub" width={48} height={48} />
        </a>

        <a href="https://www.linkedin.com/in/johan-monard-a94b251b6" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <Image src="/images/logos/linkedin.png" alt="LinkedIn" width={48} height={48} />
        </a>

        <a href="/docs/cv.pdf" download title="Télécharger mon CV">
          <Image src="/images/logos/cv.png" alt="CV" width={48} height={48} />
        </a>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
