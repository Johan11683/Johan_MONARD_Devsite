"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import PricesView from "./PricesView";
import type { PricesContent, LocaleKey } from "@/app/components/Admin/Sections/Prices/prices.types";
import { PRICES_DEFAULT } from "@/app/components/Admin/Sections/Prices/prices.default";
import { normalizePrices } from "@/app/components/Admin/Sections/Prices/prices.normalize";

export default function Prices() {
  const { i18n } = useTranslation();

  const locale = useMemo<LocaleKey>(() => {
    return i18n.language?.startsWith("en") ? "en" : "fr";
  }, [i18n.language]);

  const [draft, setDraft] = useState<PricesContent>(PRICES_DEFAULT);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/content/prices", { cache: "no-store" });
        if (!res.ok) return;

        const data = (await res.json()) as Partial<PricesContent> | null;
        setDraft(normalizePrices(data));
      } catch (e) {
        // fallback = hardcode
        console.error("Erreur chargement prices public:", e);
      }
    }

    load();
  }, []);

  return <PricesView value={draft} locale={locale} />;
}
