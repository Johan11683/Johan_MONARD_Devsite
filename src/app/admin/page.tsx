// src/app/admin/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./admin.module.scss";

// ===== HERO
import HeroEditor from "../components/Admin/Sections/Hero/HeroEditor";
import HeroPreview from "../components/Admin/Sections/Hero/HeroPreview";
import type { HeroContent } from "../components/Admin/Sections/Hero/hero.types";
import { HERO_DEFAULT } from "../components/Admin/Sections/Hero/hero.default";
import { normalizeHero } from "../components/Admin/Sections/Hero/hero.normalize";

// ===== BENEFITS
import BenefitEditor from "../components/Admin/Sections/Benefits/BenefitEditor";
import BenefitPreview from "../components/Admin/Sections/Benefits/BenefitPreview";
import type { BenefitContent } from "../components/Admin/Sections/Benefits/benefit.types";
import { BENEFIT_DEFAULT } from "../components/Admin/Sections/Benefits/benefit.default";
import { normalizeBenefit } from "../components/Admin/Sections/Benefits/benefit.normalize";

// ===== PRICES
import PricesEditor from "../components/Admin/Sections/Prices/PricesEditor";
import PricesPreview from "../components/Admin/Sections/Prices/PricesPreview";
import type { PricesContent } from "../components/Admin/Sections/Prices/prices.types";
import { PRICES_DEFAULT } from "../components/Admin/Sections/Prices/prices.default";
import { normalizePrices } from "../components/Admin/Sections/Prices/prices.normalize";

// ===== PROJECTS
import ProjectsEditor from "../components/Admin/Sections/Projects/ProjectsEditor";
import ProjectsPreview from "../components/Admin/Sections/Projects/ProjectsPreview";
import type { ProjectsContent } from "../components/Admin/Sections/Projects/projects.types";
import { PROJECTS_DEFAULT } from "../components/Admin/Sections/Projects/projects.default";
import { normalizeProjects } from "../components/Admin/Sections/Projects/projects.normalize";

// ===== PROCESS
import ProcessEditor from "../components/Admin/Sections/Process/ProcessEditor";
import ProcessPreview from "../components/Admin/Sections/Process/ProcessPreview";
import type { ProcessContent } from "../components/Admin/Sections/Process/process.types";
import { PROCESS_DEFAULT } from "../components/Admin/Sections/Process/process.default";
import { normalizeProcessContent } from "../components/Admin/Sections/Process/process.normalize";

// ===== ABOUT
import AboutEditor from "../components/Admin/Sections/About/AboutEditor";
import AboutPreview from "../components/Admin/Sections/About/AboutPreview";
import type { AboutContent } from "../components/Admin/Sections/About/about.types";
import { ABOUT_DEFAULT } from "../components/Admin/Sections/About/about.default";
import { normalizeAbout } from "../components/Admin/Sections/About/about.normalize";

// ===== CONTACT
import ContactEditor from "../components/Admin/Sections/Contact/ContactEditor";
import ContactPreview from "../components/Admin/Sections/Contact/ContactPreview";
import type { ContactContent, LocaleKey } from "../components/Admin/Sections/Contact/contact.types";
import { CONTACT_DEFAULT } from "../components/Admin/Sections/Contact/contact.default";
import { normalizeContact } from "../components/Admin/Sections/Contact/contact.normalize";

type SectionKey =
  | "hero"
  | "benefit"
  | "prices"
  | "projects"
  | "process"
  | "about"
  | "contact";

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "benefit", label: "Bénéfices" },
  { key: "prices", label: "Tarifs" },
  { key: "projects", label: "Projets" },
  { key: "process", label: "Process" },
  { key: "about", label: "À propos" },
  { key: "contact", label: "Contact" },
];

const PREVIEW_WIDTH = 1440;

async function safeLoad<T>(url: string): Promise<Partial<T> | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Partial<T> | null;
  } catch (e) {
    console.error(`Erreur chargement ${url}:`, e);
    return null;
  }
}

async function safeSave(url: string, payload: unknown): Promise<void> {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error(`PUT ${url} failed:`, res.status, await res.text());
  }
}

export default function AdminPage() {
  const [active, setActive] = useState<SectionKey>("hero");

  // --- drafts
  const [heroDraft, setHeroDraft] = useState<HeroContent>(HERO_DEFAULT);
  const [benefitDraft, setBenefitDraft] = useState<BenefitContent>(BENEFIT_DEFAULT);
  const [pricesDraft, setPricesDraft] = useState<PricesContent>(PRICES_DEFAULT);
  const [projectsDraft, setProjectsDraft] = useState<ProjectsContent>(PROJECTS_DEFAULT);
  const [processDraft, setProcessDraft] = useState<ProcessContent>(PROCESS_DEFAULT);
  const [aboutDraft, setAboutDraft] = useState<AboutContent>(ABOUT_DEFAULT);
  const [contactDraft, setContactDraft] = useState<ContactContent>(CONTACT_DEFAULT);

  // --- locale (preview)
  const [heroLocale, setHeroLocale] = useState<LocaleKey>("fr");
  const [benefitLocale, setBenefitLocale] = useState<LocaleKey>("fr");
  const [pricesLocale, setPricesLocale] = useState<LocaleKey>("fr");
  const [projectsLocale, setProjectsLocale] = useState<LocaleKey>("fr");
  const [processLocale, setProcessLocale] = useState<LocaleKey>("fr");
  const [aboutLocale, setAboutLocale] = useState<LocaleKey>("fr");
  const [contactLocale, setContactLocale] = useState<LocaleKey>("fr");

  // --- common
  const [isSaving, setIsSaving] = useState(false);

  // ===== load all sections
  useEffect(() => {
    void (async () => {
      const data = await safeLoad<HeroContent>("/api/admin/hero");
      setHeroDraft(normalizeHero(data));
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      const data = await safeLoad<BenefitContent>("/api/admin/benefit");
      setBenefitDraft(normalizeBenefit(data));
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      const data = await safeLoad<PricesContent>("/api/admin/prices");
      setPricesDraft(normalizePrices(data));
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      const data = await safeLoad<ProjectsContent>("/api/admin/projects");
      setProjectsDraft(normalizeProjects(data));
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      const data = await safeLoad<ProcessContent>("/api/admin/process");
      setProcessDraft(normalizeProcessContent(data));
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      const data = await safeLoad<AboutContent>("/api/admin/about");
      setAboutDraft(normalizeAbout(data));
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      const data = await safeLoad<ContactContent>("/api/admin/contact");
      setContactDraft(normalizeContact(data));
    })();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin";
  }

  const title = useMemo(() => {
    return SECTIONS.find((s) => s.key === active)?.label ?? "Section";
  }, [active]);

  const isHero = active === "hero";
  const isBenefit = active === "benefit";
  const isPrices = active === "prices";
  const isProjects = active === "projects";
  const isProcess = active === "process";
  const isAbout = active === "about";
  const isContact = active === "contact";

  // =========================
  // PREVIEW
  // =========================
  const stageRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState(1);
  const [viewportHeight, setViewportHeight] = useState(900);

  useEffect(() => {
    function computeScale() {
      const stage = stageRef.current;
      if (!stage) return;

      const cs = window.getComputedStyle(stage);
      const paddingX =
        parseFloat(cs.paddingLeft || "0") + parseFloat(cs.paddingRight || "0");

      const w = stage.clientWidth - paddingX;
      const next = Math.min(1, w / PREVIEW_WIDTH);

      setScale(Number((next - 0.001).toFixed(3)));
    }

    computeScale();
    window.addEventListener("resize", computeScale);
    return () => window.removeEventListener("resize", computeScale);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const h = el.getBoundingClientRect().height;
      setViewportHeight(Math.max(200, Math.round(h)));
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [
    active,
    heroLocale,
    benefitLocale,
    pricesLocale,
    projectsLocale,
    processLocale,
    aboutLocale,
    contactLocale,
    heroDraft,
    benefitDraft,
    pricesDraft,
    projectsDraft,
    processDraft,
    aboutDraft,
    contactDraft,
  ]);

  const currentLocale: LocaleKey = isHero
    ? heroLocale
    : isBenefit
    ? benefitLocale
    : isPrices
    ? pricesLocale
    : isProjects
    ? projectsLocale
    : isProcess
    ? processLocale
    : isAbout
    ? aboutLocale
    : isContact
    ? contactLocale
    : "fr";

  function setCurrentLocale(next: LocaleKey) {
    if (isHero) setHeroLocale(next);
    else if (isBenefit) setBenefitLocale(next);
    else if (isPrices) setPricesLocale(next);
    else if (isProjects) setProjectsLocale(next);
    else if (isProcess) setProcessLocale(next);
    else if (isAbout) setAboutLocale(next);
    else if (isContact) setContactLocale(next);
  }

  async function guardedSave(url: string, payload: unknown) {
    if (isSaving) return;
    setIsSaving(true);
    await safeSave(url, payload);
    setIsSaving(false);
  }

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <p className={styles.brandTitle}>Admin</p>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Déconnecter
          </button>
        </div>

        <nav className={styles.nav}>
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              type="button"
              className={`${styles.navItem} ${active === s.key ? styles.navItemActive : ""}`}
              onClick={() => setActive(s.key)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>À gauche tu modifies, à droite tu vois le rendu.</p>
        </header>

        <div className={styles.mainGrid}>
          {/* Editor */}
          <div className={styles.panel}>
            {isHero ? (
              <HeroEditor
                value={heroDraft}
                onChange={setHeroDraft}
                isSaving={isSaving}
                onSave={() => guardedSave("/api/admin/hero", heroDraft)}
              />
            ) : isBenefit ? (
              <BenefitEditor
                value={benefitDraft}
                onChange={setBenefitDraft}
                isSaving={isSaving}
                onSave={() => guardedSave("/api/admin/benefit", benefitDraft)}
              />
            ) : isPrices ? (
              <PricesEditor
                value={pricesDraft}
                onChange={setPricesDraft}
                isSaving={isSaving}
                onSave={() => guardedSave("/api/admin/prices", pricesDraft)}
              />
            ) : isProjects ? (
              <ProjectsEditor
                value={projectsDraft}
                onChange={setProjectsDraft}
                isSaving={isSaving}
                onSave={() => guardedSave("/api/admin/projects", projectsDraft)}
              />
            ) : isProcess ? (
              <ProcessEditor
                value={processDraft}
                onChange={setProcessDraft}
                isSaving={isSaving}
                onSave={() => guardedSave("/api/admin/process", processDraft)}
              />
            ) : isAbout ? (
              <AboutEditor
                value={aboutDraft}
                onChange={setAboutDraft}
                isSaving={isSaving}
                onSave={() => guardedSave("/api/admin/about", aboutDraft)}
              />
            ) : isContact ? (
              <ContactEditor
                value={contactDraft}
                onChange={setContactDraft}
                isSaving={isSaving}
                onSave={() => guardedSave("/api/admin/contact", contactDraft)}
              />
            ) : null}
          </div>

          {/* Preview */}
          <div className={`${styles.panel} ${styles.panelPreview}`}>
            <div className={styles.previewHeader}>
              <h2 className={styles.panelTitle}>Preview</h2>

              <div className={styles.localeToggle}>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${currentLocale === "fr" ? styles.toggleActive : ""}`}
                  onClick={() => setCurrentLocale("fr")}
                >
                  FR
                </button>

                <button
                  type="button"
                  className={`${styles.toggleBtn} ${currentLocale === "en" ? styles.toggleActive : ""}`}
                  onClick={() => setCurrentLocale("en")}
                >
                  EN
                </button>
              </div>
            </div>

            <div className={styles.previewStage} ref={stageRef}>
              <div
                className={styles.previewSizer}
                style={{
                  width: `${Math.floor(PREVIEW_WIDTH * scale)}px`,
                  height: `${Math.ceil(viewportHeight * scale)}px`,
                }}
              >
                <div
                  className={styles.previewViewport}
                  style={{ transform: `scale(${scale})` }}
                  aria-label="Preview viewport"
                >
                  <div ref={viewportRef} className={styles.previewContent}>
                    {isHero ? (
                      <HeroPreview value={heroDraft} locale={heroLocale} />
                    ) : isBenefit ? (
                      <BenefitPreview value={benefitDraft} locale={benefitLocale} />
                    ) : isPrices ? (
                      <PricesPreview value={pricesDraft} locale={pricesLocale} />
                    ) : isProjects ? (
                      <ProjectsPreview value={projectsDraft} locale={projectsLocale} />
                    ) : isProcess ? (
                      <ProcessPreview value={processDraft} locale={processLocale} />
                    ) : isAbout ? (
                      <AboutPreview value={aboutDraft} locale={aboutLocale} />
                    ) : isContact ? (
                      <ContactPreview value={contactDraft} locale={contactLocale} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Preview */}
        </div>
      </section>
    </main>
  );
}
