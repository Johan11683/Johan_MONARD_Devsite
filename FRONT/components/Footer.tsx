"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent, id: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="site-footer">
      <nav className="footer-nav layout-container">
        <Link href="/#welcome" onClick={(e) => handleClick(e, "welcome")}>
          {t("footer.welcome")}
        </Link>
        <Link href="/#skills" onClick={(e) => handleClick(e, "skills")}>
          {t("footer.skills")}
        </Link>
        <Link href="/#projects" onClick={(e) => handleClick(e, "projects")}>
          {t("footer.projects")}
        </Link>
        <Link href="/#contact" onClick={(e) => handleClick(e, "contact")}>
          {t("footer.contact")}
        </Link>
      </nav>
    </footer>
  );
}
