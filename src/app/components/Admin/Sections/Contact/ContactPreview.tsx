// app/components/Admin/Sections/Contact/ContactPreview.tsx
"use client";

import ContactView from "@/app/components/Contact/ContactView";
import type { ContactContent, LocaleKey } from "./contact.types";

type ContactPreviewProps = {
  value: ContactContent;
  locale: LocaleKey;
};

export default function ContactPreview({ value, locale }: ContactPreviewProps) {
  return <ContactView value={value} locale={locale} />;
}
