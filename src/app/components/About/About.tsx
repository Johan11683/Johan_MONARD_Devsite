"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import AboutView from "./AboutView";
import type { LocaleKey } from "@/app/components/Admin/Sections/Hero/hero.types";
import type { AboutContent } from "@/app/components/Admin/Sections/About/about.types";
import { ABOUT_DEFAULT } from "@/app/components/Admin/Sections/About/about.default";
import { normalizeAbout } from "@/app/components/Admin/Sections/About/about.normalize";

export default function About() {
  const { i18n } = useTranslation();

  const locale = useMemo<LocaleKey>(() => {
    return i18n.language?.startsWith("en") ? "en" : "fr";
  }, [i18n.language]);

  const [draft, setDraft] = useState<AboutContent>(ABOUT_DEFAULT);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/content/about", { cache: "no-store" });
        if (!res.ok) return;

        const data = (await res.json()) as Partial<AboutContent> | null;
        setDraft(normalizeAbout(data));
      } catch (e) {
        console.error("Erreur chargement about public:", e);
      }
    }

    load();
  }, []);

  return <AboutView value={draft} locale={locale} />;
}
