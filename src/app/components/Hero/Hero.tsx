"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import HeroView from "./HeroView";
import type { HeroContent } from "../Admin/Sections/Hero/hero.types";

const FALLBACK: HeroContent = {
  title: { fr: "Développeur web à Bordeaux", en: "Web developer in Bordeaux" },
  subtitle: {
    fr: "Sites vitrines rapides, propres, pensés SEO.",
    en: "Fast, clean websites built for SEO.",
  },
  ctaText: { fr: "Voir mes tarifs", en: "See pricing" },
  ctaHref: "#prices",
  imageUrl: "/images/HeroPC.webp",
};

function pickLocale(i18nLang: string): "fr" | "en" {
  return i18nLang.startsWith("en") ? "en" : "fr";
}

export default function Hero() {
  const { i18n } = useTranslation();
  const locale = useMemo(() => pickLocale(i18n.language), [i18n.language]);

  const [data, setData] = useState<HeroContent>(FALLBACK);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/content/hero", { cache: "no-store" });
        if (!res.ok) return;

        const json = (await res.json()) as HeroContent | null;
        if (!json) return;

        if (!cancelled) {
          // merge simple avec fallback pour éviter undefined
          setData({
            title: { fr: json.title?.fr ?? FALLBACK.title.fr, en: json.title?.en ?? FALLBACK.title.en },
            subtitle: { fr: json.subtitle?.fr ?? FALLBACK.subtitle.fr, en: json.subtitle?.en ?? FALLBACK.subtitle.en },
            ctaText: { fr: json.ctaText?.fr ?? FALLBACK.ctaText.fr, en: json.ctaText?.en ?? FALLBACK.ctaText.en },
            ctaHref: json.ctaHref ?? FALLBACK.ctaHref,
            imageUrl: json.imageUrl ?? FALLBACK.imageUrl,
          });
        }
      } catch {
        // fallback silencieux
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <HeroView
      title={data.title[locale]}
      subtitle={data.subtitle[locale]}
      ctaText={data.ctaText[locale]}
      ctaHref={data.ctaHref}
      imageUrl={data.imageUrl}
    />
  );
}
