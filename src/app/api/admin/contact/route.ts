// app/api/admin/contact/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

import { CONTACT_DEFAULT } from "@/app/components/Admin/Sections/Contact/contact.default";
import { normalizeContact } from "@/app/components/Admin/Sections/Contact/contact.normalize";
import type { ContactContent } from "@/app/components/Admin/Sections/Contact/contact.types";

type LocaleText = { fr: string; en: string };

function isLocaleText(v: unknown): v is LocaleText {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;
  return typeof obj.fr === "string" && typeof obj.en === "string";
}

function nonEmptyLocaleText(v: unknown): v is LocaleText {
  return isLocaleText(v) && v.fr.trim().length > 0 && v.en.trim().length > 0;
}

function isInfo(v: unknown): v is ContactContent["info"] {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;

  return (
    typeof obj.phoneText === "string" &&
    typeof obj.phoneHref === "string" &&
    typeof obj.emailText === "string" &&
    typeof obj.emailHref === "string" &&
    typeof obj.addressLine1 === "string" &&
    typeof obj.addressLine2 === "string"
  );
}

function nonEmptyInfo(v: unknown): v is ContactContent["info"] {
  if (!isInfo(v)) return false;

  return (
    v.phoneText.trim().length > 0 &&
    v.phoneHref.trim().length > 0 &&
    v.emailText.trim().length > 0 &&
    v.emailHref.trim().length > 0 &&
    v.addressLine1.trim().length > 0 &&
    v.addressLine2.trim().length > 0
  );
}

function isLabels(v: unknown): v is ContactContent["labels"] {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;
  return isLocaleText(obj.phone) && isLocaleText(obj.email) && isLocaleText(obj.address);
}

function nonEmptyLabels(v: unknown): v is ContactContent["labels"] {
  if (!isLabels(v)) return false;
  return nonEmptyLocaleText(v.phone) && nonEmptyLocaleText(v.email) && nonEmptyLocaleText(v.address);
}

function isForm(v: unknown): v is ContactContent["form"] {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;

  return (
    isLocaleText(obj.fullName) &&
    isLocaleText(obj.email) &&
    isLocaleText(obj.phone) &&
    isLocaleText(obj.message)
  );
}

function nonEmptyForm(v: unknown): v is ContactContent["form"] {
  if (!isForm(v)) return false;

  return (
    nonEmptyLocaleText(v.fullName) &&
    nonEmptyLocaleText(v.email) &&
    nonEmptyLocaleText(v.phone) &&
    nonEmptyLocaleText(v.message)
  );
}

function isButton(v: unknown): v is ContactContent["button"] {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;
  return isLocaleText(obj.idle) && isLocaleText(obj.loading);
}

function nonEmptyButton(v: unknown): v is ContactContent["button"] {
  if (!isButton(v)) return false;
  return nonEmptyLocaleText(v.idle) && nonEmptyLocaleText(v.loading);
}

function isStatus(v: unknown): v is ContactContent["status"] {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;

  return (
    isLocaleText(obj.success) &&
    isLocaleText(obj.errorPart1) &&
    isLocaleText(obj.errorPart2)
  );
}

function nonEmptyStatus(v: unknown): v is ContactContent["status"] {
  if (!isStatus(v)) return false;

  return (
    nonEmptyLocaleText(v.success) &&
    nonEmptyLocaleText(v.errorPart1) &&
    nonEmptyLocaleText(v.errorPart2)
  );
}

function badRequest() {
  return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const doc = await col.findOne(
      { key: "contact" },
      { projection: { _id: 0, key: 0 } }
    );

    // ✅ Toujours renvoyer un contenu complet
    const content = normalizeContact((doc as Partial<ContactContent> | null) ?? CONTACT_DEFAULT);

    return NextResponse.json(content);
  } catch (error) {
    console.error("GET /api/admin/contact error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const payload = (await req.json()) as unknown;

    if (!payload || typeof payload !== "object") return badRequest();
    const p = payload as Record<string, unknown>;

    // intro
    if (!nonEmptyLocaleText(p.kicker)) return badRequest();
    if (!nonEmptyLocaleText(p.title)) return badRequest();
    if (!nonEmptyLocaleText(p.lead)) return badRequest();

    // labels
    if (!nonEmptyLabels(p.labels)) return badRequest();

    // form
    if (!nonEmptyForm(p.form)) return badRequest();

    // button
    if (!nonEmptyButton(p.button)) return badRequest();

    // status
    if (!nonEmptyStatus(p.status)) return badRequest();

    // info
    if (!nonEmptyInfo(p.info)) return badRequest();

    // ✅ normalise avant stockage (nettoie + complète si besoin)
    const normalized = normalizeContact(payload as Partial<ContactContent>);

    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    await col.updateOne(
      { key: "contact" },
      { $set: { key: "contact", ...normalized, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PUT /api/admin/contact error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
