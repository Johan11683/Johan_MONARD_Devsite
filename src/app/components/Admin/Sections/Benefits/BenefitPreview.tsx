"use client";

import type { BenefitContent, LocaleKey } from "./benefit.types";
import BenefitView from "../../../Benefit/BenefitView";

type BenefitPreviewProps = {
  value: BenefitContent;
  locale: LocaleKey;
};

export default function BenefitPreview({ value, locale }: BenefitPreviewProps) {
  return <BenefitView value={value} locale={locale} />;
}
