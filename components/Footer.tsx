"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="site-footer">
      <nav className="footer-nav layout-container">
        <Link href="#welcome">{t("footer.welcome")}</Link>
        <Link href="#skills">{t("footer.skills")}</Link>
        <Link href="#projects">{t("footer.projects")}</Link>
        <Link href="#contact">{t("footer.contact")}</Link>
      </nav>
    </footer>
  );
}
