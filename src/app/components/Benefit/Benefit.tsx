"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import BenefitView from "./BenefitView";
import type { BenefitContent, LocaleKey } from "../Admin/Sections/Benefits/benefit.types";
import { BENEFIT_DEFAULT } from "../Admin/Sections/Benefits/benefit.default";
import { normalizeBenefit } from "../Admin/Sections/Benefits/benefit.normalize";

export default function Benefit() {
  const { i18n } = useTranslation();
  const locale = useMemo<LocaleKey>(
    () => (i18n.language?.startsWith("en") ? "en" : "fr"),
    [i18n.language]
  );

  const [content, setContent] = useState<BenefitContent>(BENEFIT_DEFAULT);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/content/benefit", { cache: "no-store" });
        if (!res.ok) return;

        const data = (await res.json()) as Partial<BenefitContent> | null;
        setContent(normalizeBenefit(data));
      } catch {
        // fallback: default
      }
    }

    load();
  }, []);

  return <BenefitView value={content} locale={locale} />;
}
