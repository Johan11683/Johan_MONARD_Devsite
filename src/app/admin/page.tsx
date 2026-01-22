// app/admin/page.tsx (ou ton fichier AdminPage)
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./admin.module.scss";

import HeroEditor from "../components/Admin/Sections/Hero/HeroEditor";
import HeroPreview from "../components/Admin/Sections/Hero/HeroPreview";
import type { HeroContent } from "../components/Admin/Sections/Hero/hero.types";
import { HERO_DEFAULT } from "../components/Admin/Sections/Hero/hero.default";
import { normalizeHero } from "../components/Admin/Sections/Hero/hero.normalize";

import BenefitEditor from "../components/Admin/Sections/Benefits/BenefitEditor";
import BenefitPreview from "../components/Admin/Sections/Benefits/BenefitPreview";
import type { BenefitContent } from "../components/Admin/Sections/Benefits/benefit.types";
import { BENEFIT_DEFAULT } from "../components/Admin/Sections/Benefits/benefit.default";
import { normalizeBenefit } from "../components/Admin/Sections/Benefits/benefit.normalize";

import PricesEditor from "../components/Admin/Sections/Prices/PricesEditor";
import PricesPreview from "../components/Admin/Sections/Prices/PricesPreview";
import type { PricesContent } from "../components/Admin/Sections/Prices/prices.types";
import { PRICES_DEFAULT } from "../components/Admin/Sections/Prices/prices.default";
import { normalizePrices } from "../components/Admin/Sections/Prices/prices.normalize";

import ProcessEditor from "../components/Admin/Sections/Process/ProcessEditor";
import ProcessPreview from "../components/Admin/Sections/Process/ProcessPreview";
import type { ProcessContent } from "../components/Admin/Sections/Process/process.types";
import { PROCESS_DEFAULT } from "../components/Admin/Sections/Process/process.default";
import { normalizeProcessContent } from "../components/Admin/Sections/Process/process.normalize";

// ✅ ABOUT
import AboutEditor from "../components/Admin/Sections/About/AboutEditor";
import AboutPreview from "../components/Admin/Sections/About/AboutPreview";
import type { AboutContent } from "../components/Admin/Sections/About/about.types";
import { ABOUT_DEFAULT } from "../components/Admin/Sections/About/about.default";
import { normalizeAbout } from "../components/Admin/Sections/About/about.normalize";

// ✅ CONTACT
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

export default function AdminPage() {
  const [active, setActive] = useState<SectionKey>("hero");

  // --- drafts
  const [heroDraft, setHeroDraft] = useState<HeroContent>(HERO_DEFAULT);
  const [benefitDraft, setBenefitDraft] = useState<BenefitContent>(BENEFIT_DEFAULT);
  const [pricesDraft, setPricesDraft] = useState<PricesContent>(PRICES_DEFAULT);
  const [processDraft, setProcessDraft] = useState<ProcessContent>(PROCESS_DEFAULT);
  const [aboutDraft, setAboutDraft] = useState<AboutContent>(ABOUT_DEFAULT);
  const [contactDraft, setContactDraft] = useState<ContactContent>(CONTACT_DEFAULT);

  // --- locale (preview)
  const [heroLocale, setHeroLocale] = useState<LocaleKey>("fr");
  const [benefitLocale, setBenefitLocale] = useState<LocaleKey>("fr");
  const [pricesLocale, setPricesLocale] = useState<LocaleKey>("fr");
  const [processLocale, setProcessLocale] = useState<LocaleKey>("fr");
  const [aboutLocale, setAboutLocale] = useState<LocaleKey>("fr");
  const [contactLocale, setContactLocale] = useState<LocaleKey>("fr");

  // --- common
  const [isSaving, setIsSaving] = useState(false);

  // --- load hero
  useEffect(() => {
    async function loadHero() {
      try {
        const res = await fetch("/api/admin/hero", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Partial<HeroContent> | null;
        setHeroDraft(normalizeHero(data));
      } catch (err) {
        console.error("Erreur chargement hero:", err);
      }
    }
    loadHero();
  }, []);

  // --- load benefit
  useEffect(() => {
    async function loadBenefit() {
      try {
        const res = await fetch("/api/admin/benefit", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Partial<BenefitContent> | null;
        setBenefitDraft(normalizeBenefit(data));
      } catch (err) {
        console.error("Erreur chargement benefit:", err);
      }
    }
    loadBenefit();
  }, []);

  // --- load prices
  useEffect(() => {
    async function loadPrices() {
      try {
        const res = await fetch("/api/admin/prices", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Partial<PricesContent> | null;
        setPricesDraft(normalizePrices(data));
      } catch (err) {
        console.error("Erreur chargement prices:", err);
      }
    }
    loadPrices();
  }, []);

  // --- load process
  useEffect(() => {
    async function loadProcess() {
      try {
        const res = await fetch("/api/admin/process", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Partial<ProcessContent> | null;
        setProcessDraft(normalizeProcessContent(data));
      } catch (err) {
        console.error("Erreur chargement process:", err);
      }
    }
    loadProcess();
  }, []);

  // --- load about ✅
  useEffect(() => {
    async function loadAbout() {
      try {
        const res = await fetch("/api/admin/about", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Partial<AboutContent> | null;
        setAboutDraft(normalizeAbout(data));
      } catch (err) {
        console.error("Erreur chargement about:", err);
      }
    }
    loadAbout();
  }, []);

  // --- load contact ✅ (FIX: normalizeContact)
  useEffect(() => {
    async function loadContact() {
      try {
        const res = await fetch("/api/admin/contact", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Partial<ContactContent> | null;
        setContactDraft(normalizeContact(data));
      } catch (err) {
        console.error("Erreur chargement contact:", err);
      }
    }
    loadContact();
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
    processLocale,
    aboutLocale,
    contactLocale,
    heroDraft,
    benefitDraft,
    pricesDraft,
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
    else if (isProcess) setProcessLocale(next);
    else if (isAbout) setAboutLocale(next);
    else if (isContact) setContactLocale(next);
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
                onSave={async () => {
                  if (isSaving) return;
                  setIsSaving(true);

                  const res = await fetch("/api/admin/hero", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(heroDraft),
                  });

                  setIsSaving(false);
                  if (!res.ok) console.error("PUT hero failed:", res.status, await res.text());
                }}
              />
            ) : isBenefit ? (
              <BenefitEditor
                value={benefitDraft}
                onChange={setBenefitDraft}
                isSaving={isSaving}
                onSave={async () => {
                  if (isSaving) return;
                  setIsSaving(true);

                  const res = await fetch("/api/admin/benefit", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(benefitDraft),
                  });

                  setIsSaving(false);
                  if (!res.ok) console.error("PUT benefit failed:", res.status, await res.text());
                }}
              />
            ) : isPrices ? (
              <PricesEditor
                value={pricesDraft}
                onChange={setPricesDraft}
                isSaving={isSaving}
                onSave={async () => {
                  if (isSaving) return;
                  setIsSaving(true);

                  const res = await fetch("/api/admin/prices", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(pricesDraft),
                  });

                  setIsSaving(false);
                  if (!res.ok) console.error("PUT prices failed:", res.status, await res.text());
                }}
              />
            ) : isProcess ? (
              <ProcessEditor
                value={processDraft}
                onChange={setProcessDraft}
                isSaving={isSaving}
                onSave={async () => {
                  if (isSaving) return;
                  setIsSaving(true);

                  const res = await fetch("/api/admin/process", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(processDraft),
                  });

                  setIsSaving(false);
                  if (!res.ok) console.error("PUT process failed:", res.status, await res.text());
                }}
              />
            ) : isAbout ? (
              <AboutEditor
                value={aboutDraft}
                onChange={setAboutDraft}
                isSaving={isSaving}
                onSave={async () => {
                  if (isSaving) return;
                  setIsSaving(true);

                  const res = await fetch("/api/admin/about", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(aboutDraft),
                  });

                  setIsSaving(false);
                  if (!res.ok) console.error("PUT about failed:", res.status, await res.text());
                }}
              />
            ) : isContact ? (
              <ContactEditor
                value={contactDraft}
                onChange={setContactDraft}
                isSaving={isSaving}
                onSave={async () => {
                  if (isSaving) return;
                  setIsSaving(true);

                  const res = await fetch("/api/admin/contact", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contactDraft),
                  });

                  setIsSaving(false);
                  if (!res.ok) console.error("PUT contact failed:", res.status, await res.text());
                }}
              />
            ) : (
              <>
                <h2 className={styles.panelTitle}>Éditeur</h2>
                <p className={styles.panelHint}>
                  Pour l’instant c’est un mock. On branchera chaque section progressivement.
                </p>
              </>
            )}
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
