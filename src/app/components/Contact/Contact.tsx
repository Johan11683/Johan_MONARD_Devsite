// app/components/Contact/Contact.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import ContactView from "./ContactView";
import type { ContactContent, LocaleKey } from "@/app/components/Admin/Sections/Contact/contact.types";
import { CONTACT_DEFAULT } from "@/app/components/Admin/Sections/Contact/contact.default";
import { normalizeContact } from "@/app/components/Admin/Sections/Contact/contact.normalize";

export default function Contact() {
  const { i18n } = useTranslation();

  const locale = useMemo<LocaleKey>(
    () => (i18n.language?.startsWith("en") ? "en" : "fr"),
    [i18n.language]
  );

  const [value, setValue] = useState<ContactContent>(CONTACT_DEFAULT);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/content/contact", { cache: "no-store" });
        if (!res.ok) return;

        const data = (await res.json()) as Partial<ContactContent> | null;
        const next = normalizeContact(data);

        if (!cancelled) setValue(next);
      } catch (err) {
        console.error("Erreur chargement contact public:", err);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return <ContactView value={value} locale={locale} />;
}
