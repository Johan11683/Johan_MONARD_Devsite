"use client";

import PricesView from "@/app/components/Prices/PricesView";
import type { PricesContent, LocaleKey } from "./prices.types";

type PricesPreviewProps = {
  value: PricesContent;
  locale: LocaleKey;
};

export default function PricesPreview({ value, locale }: PricesPreviewProps) {
  return <PricesView value={value} locale={locale} />;
}
