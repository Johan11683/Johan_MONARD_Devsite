// app/components/Admin/Sections/Contact/contact.normalize.ts
import type { ContactContent } from "./contact.types";
import { CONTACT_DEFAULT } from "./contact.default";

type PartialDeep<T> = {
  [K in keyof T]?: T[K] extends object ? PartialDeep<T[K]> : T[K];
};

export function normalizeContact(
  data: PartialDeep<ContactContent> | null | undefined
): ContactContent {
  const d = data ?? {};

  return {
    kicker: { ...CONTACT_DEFAULT.kicker, ...(d.kicker ?? {}) },
    title: { ...CONTACT_DEFAULT.title, ...(d.title ?? {}) },
    lead: { ...CONTACT_DEFAULT.lead, ...(d.lead ?? {}) },

    labels: {
      phone: { ...CONTACT_DEFAULT.labels.phone, ...(d.labels?.phone ?? {}) },
      email: { ...CONTACT_DEFAULT.labels.email, ...(d.labels?.email ?? {}) },
      address: { ...CONTACT_DEFAULT.labels.address, ...(d.labels?.address ?? {}) },
    },

    form: {
      fullName: { ...CONTACT_DEFAULT.form.fullName, ...(d.form?.fullName ?? {}) },
      email: { ...CONTACT_DEFAULT.form.email, ...(d.form?.email ?? {}) },
      phone: { ...CONTACT_DEFAULT.form.phone, ...(d.form?.phone ?? {}) },
      message: { ...CONTACT_DEFAULT.form.message, ...(d.form?.message ?? {}) },
    },

    button: {
      idle: { ...CONTACT_DEFAULT.button.idle, ...(d.button?.idle ?? {}) },
      loading: { ...CONTACT_DEFAULT.button.loading, ...(d.button?.loading ?? {}) },
    },

    status: {
      success: { ...CONTACT_DEFAULT.status.success, ...(d.status?.success ?? {}) },
      errorPart1: { ...CONTACT_DEFAULT.status.errorPart1, ...(d.status?.errorPart1 ?? {}) },
      errorPart2: { ...CONTACT_DEFAULT.status.errorPart2, ...(d.status?.errorPart2 ?? {}) },
    },

    info: {
      phoneText: (d.info?.phoneText ?? CONTACT_DEFAULT.info.phoneText).trim(),
      phoneHref: (d.info?.phoneHref ?? CONTACT_DEFAULT.info.phoneHref).trim(),
      emailText: (d.info?.emailText ?? CONTACT_DEFAULT.info.emailText).trim(),
      emailHref: (d.info?.emailHref ?? CONTACT_DEFAULT.info.emailHref).trim(),
      addressLine1: (d.info?.addressLine1 ?? CONTACT_DEFAULT.info.addressLine1).trim(),
      addressLine2: (d.info?.addressLine2 ?? CONTACT_DEFAULT.info.addressLine2).trim(),
    },
  };
}
