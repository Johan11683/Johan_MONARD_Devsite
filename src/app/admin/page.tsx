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

type SectionKey =
  | "hero"
  | "benefit"
  | "projects"
  | "prices"
  | "process"
  | "about"
  | "contact";

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "benefit", label: "Bénéfices" },
  { key: "projects", label: "Projets" },
  { key: "prices", label: "Tarifs" },
  { key: "process", label: "Process" },
  { key: "about", label: "À propos" },
  { key: "contact", label: "Contact" },
];

export default function AdminPage() {
  const [active, setActive] = useState<SectionKey>("hero");

  // ✅ Hero
  const [heroDraft, setHeroDraft] = useState<HeroContent>(HERO_DEFAULT);
  const [heroLocale, setHeroLocale] = useState<LocaleKey>("fr");

  // ✅ Benefit
  const [benefitDraft, setBenefitDraft] = useState<BenefitContent>(BENEFIT_DEFAULT);
  const [benefitLocale, setBenefitLocale] = useState<LocaleKey>("fr");

  // ✅ état commun
  const [isSaving, setIsSaving] = useState(false);

  // ✅ Load Hero
  useEffect(() => {
    async function loadHero() {
      try {
        const res = await fetch("/api/admin/hero", { cache: "no-store" });

        if (!res.ok) {
          const text = await res.text();
          console.error("GET hero failed:", res.status, text);
          return;
        }

        const data = (await res.json()) as Partial<HeroContent> | null;
        setHeroDraft(normalizeHero(data));
      } catch (err) {
        console.error("Erreur chargement hero:", err);
      }
    }

    loadHero();
  }, []);

  // ✅ Load Benefit
  useEffect(() => {
    async function loadBenefit() {
      try {
        const res = await fetch("/api/admin/benefit", { cache: "no-store" });

        if (!res.ok) {
          const text = await res.text();
          console.error("GET benefit failed:", res.status, text);
          return;
        }

        const data = (await res.json()) as Partial<BenefitContent> | null;
        setBenefitDraft(normalizeBenefit(data));
      } catch (err) {
        console.error("Erreur chargement benefit:", err);
      }
    }

    loadBenefit();
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

  // ✅ Preview scaling (même scaling pour toutes les previews)
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  const PREVIEW_WIDTH = 1440;
  const PREVIEW_HEIGHT = 900;

  useEffect(() => {
    function computeScale() {
      const el = stageRef.current;
      if (!el) return;

      const availableWidth = el.clientWidth;
      const availableHeight = el.clientHeight;

      const widthScale = availableWidth / PREVIEW_WIDTH;
      const heightScale = availableHeight / PREVIEW_HEIGHT;

      const nextScale = Math.min(widthScale, heightScale);
      setScale(Number(nextScale.toFixed(3)));
    }

    computeScale();

    window.addEventListener("resize", computeScale);
    return () => window.removeEventListener("resize", computeScale);
  }, []);

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
              className={`${styles.navItem} ${
                active === s.key ? styles.navItemActive : ""
              }`}
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

                  if (!res.ok) {
                    const text = await res.text();
                    console.error("PUT hero failed:", res.status, text);
                    return;
                  }
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

                  if (!res.ok) {
                    const text = await res.text();
                    console.error("PUT benefit failed:", res.status, text);
                    return;
                  }
                }}
              />
            ) : (
              <>
                <h2 className={styles.panelTitle}>Éditeur</h2>
                <p className={styles.panelHint}>
                  Pour l’instant c’est un mock. On branchera chaque section progressivement.
                </p>

                <div className={styles.formMock}>
                  <div className={styles.field}>
                    <label className={styles.label}>Titre</label>
                    <input className={styles.input} placeholder="Ex: Bienvenue" />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Texte</label>
                    <textarea
                      className={styles.textarea}
                      placeholder="Ex: Développeur web…"
                      rows={5}
                    />
                  </div>

                  <button className={styles.primaryButton} type="button">
                    Sauvegarder (mock)
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Preview */}
          <div className={`${styles.panel} ${styles.panelPreview}`}>
            {isHero ? (
              <>
                <div className={styles.previewHeader}>
                  <h2 className={styles.panelTitle}>Preview</h2>

                  <div className={styles.localeToggle}>
                    <button
                      type="button"
                      className={`${styles.toggleBtn} ${
                        heroLocale === "fr" ? styles.toggleActive : ""
                      }`}
                      onClick={() => setHeroLocale("fr")}
                    >
                      FR
                    </button>

                    <button
                      type="button"
                      className={`${styles.toggleBtn} ${
                        heroLocale === "en" ? styles.toggleActive : ""
                      }`}
                      onClick={() => setHeroLocale("en")}
                    >
                      EN
                    </button>
                  </div>
                </div>

                <div className={styles.previewStage} ref={stageRef}>
                  <div
                    className={styles.previewViewport}
                    style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
                  >
                    <HeroPreview value={heroDraft} locale={heroLocale} />
                  </div>
                </div>
              </>
            ) : isBenefit ? (
              <>
                <div className={styles.previewHeader}>
                  <h2 className={styles.panelTitle}>Preview</h2>

                  <div className={styles.localeToggle}>
                    <button
                      type="button"
                      className={`${styles.toggleBtn} ${
                        benefitLocale === "fr" ? styles.toggleActive : ""
                      }`}
                      onClick={() => setBenefitLocale("fr")}
                    >
                      FR
                    </button>

                    <button
                      type="button"
                      className={`${styles.toggleBtn} ${
                        benefitLocale === "en" ? styles.toggleActive : ""
                      }`}
                      onClick={() => setBenefitLocale("en")}
                    >
                      EN
                    </button>
                  </div>
                </div>

                <div className={styles.previewStage} ref={stageRef}>
                  <div
                    className={styles.previewViewport}
                    style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
                  >
                    <BenefitPreview value={benefitDraft} locale={benefitLocale} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className={styles.panelTitle}>Preview</h2>
                <p className={styles.panelHint}>
                  Cette zone affichera la section telle qu’elle apparaît sur le site.
                </p>

                <div className={styles.previewMock}>
                  <div className={styles.previewBlock} />
                  <div className={styles.previewBlock} />
                  <div className={styles.previewBlockSmall} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
