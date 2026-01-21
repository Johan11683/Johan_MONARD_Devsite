"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./admin.module.scss";

import HeroEditor from "../components/Admin/Sections/Hero/HeroEditor";
import HeroPreview from "../components/Admin/Sections/Hero/HeroPreview";
import type { HeroContent, LocaleKey } from "../components/Admin/Sections/Hero/hero.types";
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

  // --- locale (preview)
  const [heroLocale, setHeroLocale] = useState<LocaleKey>("fr");
  const [benefitLocale, setBenefitLocale] = useState<LocaleKey>("fr");
  const [pricesLocale, setPricesLocale] = useState<LocaleKey>("fr");

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

  // =========================
  // PREVIEW: fixed container + vertical scroll INSIDE + correct scaled size
  // =========================
  const stageRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState(1);
  const [viewportHeight, setViewportHeight] = useState(900);

  // scale based on WIDTH only (you want scrolling vertically like the public site)
  useEffect(() => {
    function computeScale() {
    const stage = stageRef.current;
      if (!stage) return;

      const cs = window.getComputedStyle(stage);
      const paddingX =
        parseFloat(cs.paddingLeft || "0") + parseFloat(cs.paddingRight || "0");

      const w = stage.clientWidth - paddingX;
      const next = Math.min(1, w / PREVIEW_WIDTH);

      // petite marge anti 1px overflow (scrollbar / rounding / subpixel)
      setScale(Number((next - 0.001).toFixed(3)));


      setScale(Number(next.toFixed(3)));
    }

    computeScale();
    window.addEventListener("resize", computeScale);
    return () => window.removeEventListener("resize", computeScale);
  }, []);

  // track real content height to avoid huge empty scroll zones
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      // contentRect.height is reliable here (viewport is not transformed for measurement)
      const h = el.getBoundingClientRect().height;
      setViewportHeight(Math.max(200, Math.round(h)));
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [active, heroLocale, benefitLocale, pricesLocale, heroDraft, benefitDraft, pricesDraft]);

  return (
    <main className={styles.page}>
      {/* Sidebar */}
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

      {/* Content */}
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
                  className={`${styles.toggleBtn} ${
                    (isHero ? heroLocale : isBenefit ? benefitLocale : pricesLocale) === "fr"
                      ? styles.toggleActive
                      : ""
                  }`}
                  onClick={() => {
                    if (isHero) setHeroLocale("fr");
                    else if (isBenefit) setBenefitLocale("fr");
                    else if (isPrices) setPricesLocale("fr");
                  }}
                >
                  FR
                </button>

                <button
                  type="button"
                  className={`${styles.toggleBtn} ${
                    (isHero ? heroLocale : isBenefit ? benefitLocale : pricesLocale) === "en"
                      ? styles.toggleActive
                      : ""
                  }`}
                  onClick={() => {
                    if (isHero) setHeroLocale("en");
                    else if (isBenefit) setBenefitLocale("en");
                    else if (isPrices) setPricesLocale("en");
                  }}
                >
                  EN
                </button>
              </div>
            </div>

            <div className={styles.previewStage} ref={stageRef}>
              {/* Sizer = taille “réelle” de la preview (scaled) => scroll correct, plus de zone noire cheloue */}
              <div
                className={styles.previewSizer}
                style={{
                  width: `${Math.floor(PREVIEW_WIDTH * scale)}px`,
                  height: `${Math.ceil(viewportHeight * scale)}px`,
                }}
              >
                {/* Viewport = contenu à taille 1440px, scalé visuellement */}
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
