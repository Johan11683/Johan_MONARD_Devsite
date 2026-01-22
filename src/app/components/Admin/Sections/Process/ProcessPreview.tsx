"use client";

import ProcessView from "@/app/components/Process/ProcessView";
import type { LocaleKey } from "../Hero/hero.types";
import type { ProcessContent } from "./process.types";

type ProcessPreviewProps = {
  value: ProcessContent;
  locale: LocaleKey;
};

export default function ProcessPreview({ value, locale }: ProcessPreviewProps) {
  return <ProcessView value={value} locale={locale} />;
}
