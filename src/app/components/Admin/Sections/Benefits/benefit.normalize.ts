import type { BenefitContent } from "./benefit.types";
import { BENEFIT_DEFAULT } from "./benefit.default";

type BenefitPartial = Partial<BenefitContent>;

export function normalizeBenefit(data: BenefitPartial | null): BenefitContent {
  return {
    kicker: {
      fr: data?.kicker?.fr ?? BENEFIT_DEFAULT.kicker.fr,
      en: data?.kicker?.en ?? BENEFIT_DEFAULT.kicker.en,
    },
    title: {
      fr: data?.title?.fr ?? BENEFIT_DEFAULT.title.fr,
      en: data?.title?.en ?? BENEFIT_DEFAULT.title.en,
    },
    subtitle: {
      fr: data?.subtitle?.fr ?? BENEFIT_DEFAULT.subtitle.fr,
      en: data?.subtitle?.en ?? BENEFIT_DEFAULT.subtitle.en,
    },

    cards: {
      overview: {
        enabled: data?.cards?.overview?.enabled ?? BENEFIT_DEFAULT.cards.overview.enabled,
        title: {
          fr: data?.cards?.overview?.title?.fr ?? BENEFIT_DEFAULT.cards.overview.title.fr,
          en: data?.cards?.overview?.title?.en ?? BENEFIT_DEFAULT.cards.overview.title.en,
        },
        text: {
          fr: data?.cards?.overview?.text?.fr ?? BENEFIT_DEFAULT.cards.overview.text.fr,
          en: data?.cards?.overview?.text?.en ?? BENEFIT_DEFAULT.cards.overview.text.en,
        },
      },

      clients: {
        enabled: data?.cards?.clients?.enabled ?? BENEFIT_DEFAULT.cards.clients.enabled,
        title: {
          fr: data?.cards?.clients?.title?.fr ?? BENEFIT_DEFAULT.cards.clients.title.fr,
          en: data?.cards?.clients?.title?.en ?? BENEFIT_DEFAULT.cards.clients.title.en,
        },
        text: {
          fr: data?.cards?.clients?.text?.fr ?? BENEFIT_DEFAULT.cards.clients.text.fr,
          en: data?.cards?.clients?.text?.en ?? BENEFIT_DEFAULT.cards.clients.text.en,
        },
      },

      transparent: {
        enabled: data?.cards?.transparent?.enabled ?? BENEFIT_DEFAULT.cards.transparent.enabled,
        title: {
          fr: data?.cards?.transparent?.title?.fr ?? BENEFIT_DEFAULT.cards.transparent.title.fr,
          en: data?.cards?.transparent?.title?.en ?? BENEFIT_DEFAULT.cards.transparent.title.en,
        },
        text: {
          fr: data?.cards?.transparent?.text?.fr ?? BENEFIT_DEFAULT.cards.transparent.text.fr,
          en: data?.cards?.transparent?.text?.en ?? BENEFIT_DEFAULT.cards.transparent.text.en,
        },
      },

      ownership: {
        enabled: data?.cards?.ownership?.enabled ?? BENEFIT_DEFAULT.cards.ownership.enabled,
        title: {
          fr: data?.cards?.ownership?.title?.fr ?? BENEFIT_DEFAULT.cards.ownership.title.fr,
          en: data?.cards?.ownership?.title?.en ?? BENEFIT_DEFAULT.cards.ownership.title.en,
        },
        text: {
          fr: data?.cards?.ownership?.text?.fr ?? BENEFIT_DEFAULT.cards.ownership.text.fr,
          en: data?.cards?.ownership?.text?.en ?? BENEFIT_DEFAULT.cards.ownership.text.en,
        },
      },

      noMaintenance: {
        enabled: data?.cards?.noMaintenance?.enabled ?? BENEFIT_DEFAULT.cards.noMaintenance.enabled,
        title: {
          fr: data?.cards?.noMaintenance?.title?.fr ?? BENEFIT_DEFAULT.cards.noMaintenance.title.fr,
          en: data?.cards?.noMaintenance?.title?.en ?? BENEFIT_DEFAULT.cards.noMaintenance.title.en,
        },
        text: {
          fr: data?.cards?.noMaintenance?.text?.fr ?? BENEFIT_DEFAULT.cards.noMaintenance.text.fr,
          en: data?.cards?.noMaintenance?.text?.en ?? BENEFIT_DEFAULT.cards.noMaintenance.text.en,
        },
      },
    },

    footer: {
      line1: {
        fr: data?.footer?.line1?.fr ?? BENEFIT_DEFAULT.footer.line1.fr,
        en: data?.footer?.line1?.en ?? BENEFIT_DEFAULT.footer.line1.en,
      },
      line2: {
        fr: data?.footer?.line2?.fr ?? BENEFIT_DEFAULT.footer.line2.fr,
        en: data?.footer?.line2?.en ?? BENEFIT_DEFAULT.footer.line2.en,
      },
      ctaText: {
        fr: data?.footer?.ctaText?.fr ?? BENEFIT_DEFAULT.footer.ctaText.fr,
        en: data?.footer?.ctaText?.en ?? BENEFIT_DEFAULT.footer.ctaText.en,
      },
      ctaHref: data?.footer?.ctaHref ?? BENEFIT_DEFAULT.footer.ctaHref,
    },
  };
}
