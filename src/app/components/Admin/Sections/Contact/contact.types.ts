// app/components/Admin/Sections/Contact/contact.types.ts
export type LocaleKey = "fr" | "en";

export type LocalizedText = {
  fr: string;
  en: string;
};

export type ContactInfo = {
  phoneText: string; // affiché
  phoneHref: string; // tel:+33...
  emailText: string; // affiché
  emailHref: string; // mailto:...
  addressLine1: string;
  addressLine2: string;
};

export type ContactContent = {
  kicker: LocalizedText;
  title: LocalizedText;
  lead: LocalizedText;

  labels: {
    phone: LocalizedText;
    email: LocalizedText;
    address: LocalizedText;
  };

  form: {
    fullName: LocalizedText;
    email: LocalizedText;
    phone: LocalizedText;
    message: LocalizedText;
  };

  button: {
    idle: LocalizedText;
    loading: LocalizedText;
  };

  status: {
    success: LocalizedText;
    errorPart1: LocalizedText;
    errorPart2: LocalizedText;
  };

  info: ContactInfo;
};
