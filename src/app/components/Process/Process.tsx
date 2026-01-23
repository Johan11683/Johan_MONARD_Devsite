"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import ProcessView from "./ProcessView";
import type { LocaleKey } from "@/app/components/Admin/Sections/Hero/hero.types";
import type { ProcessContent } from "@/app/components/Admin/Sections/Process/process.types";
import { PROCESS_DEFAULT } from "@/app/components/Admin/Sections/Process/process.default";
import { normalizeProcessContent } from "@/app/components/Admin/Sections/Process/process.normalize";

export default function Process() {
  const { i18n } = useTranslation();

  const locale = useMemo<LocaleKey>(() => {
    return i18n.language?.startsWith("en") ? "en" : "fr";
  }, [i18n.language]);

  const [draft, setDraft] = useState<ProcessContent>(PROCESS_DEFAULT);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/content/process", { cache: "no-store" });
        if (!res.ok) return;

        const data = (await res.json()) as Partial<ProcessContent> | null;
        setDraft(normalizeProcessContent(data));
      } catch (e) {
        console.error("Erreur chargement process public:", e);
      }
    }

    load();
  }, []);

  return <ProcessView value={draft} locale={locale} />;
}
