import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { PROCESS_DEFAULT } from "@/app/components/Admin/Sections/Process/process.default";
import { normalizeProcessContent } from "@/app/components/Admin/Sections/Process/process.normalize";
import type { ProcessContent } from "@/app/components/Admin/Sections/Process/process.types";

type LocaleText = { fr: string; en: string };

function isLocaleText(v: unknown): v is LocaleText {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;
  return typeof obj.fr === "string" && typeof obj.en === "string";
}

function nonEmptyLocaleText(v: unknown): v is LocaleText {
  return isLocaleText(v) && !!v.fr.trim() && !!v.en.trim();
}

function isStep(v: unknown): v is { title: LocaleText; text: LocaleText } {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;
  return isLocaleText(obj.title) && isLocaleText(obj.text);
}

function nonEmptyStep(v: unknown): v is { title: LocaleText; text: LocaleText } {
  if (!isStep(v)) return false;
  return nonEmptyLocaleText(v.title) && nonEmptyLocaleText(v.text);
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const doc = await col.findOne(
      { key: "process" },
      { projection: { _id: 0, key: 0 } }
    );

    // ✅ Toujours renvoyer un contenu complet (prérempli si DB vide)
    const content = normalizeProcessContent((doc as Partial<ProcessContent> | null) ?? PROCESS_DEFAULT);

    return NextResponse.json(content);
  } catch (error) {
    console.error("GET /api/admin/process error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const payload = (await req.json()) as unknown;

    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    const p = payload as Record<string, unknown>;

    // intro
    if (!nonEmptyLocaleText(p.kicker))
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

    if (!nonEmptyLocaleText(p.title))
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

    if (!nonEmptyLocaleText(p.subtitle))
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

    // steps
    if (!Array.isArray(p.steps))
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

    if (p.steps.length !== 5)
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

    for (const step of p.steps) {
      if (!nonEmptyStep(step)) {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }
    }

    // ✅ Normalise avant stockage
    const normalized = normalizeProcessContent(payload as Partial<ProcessContent>);

    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    await col.updateOne(
      { key: "process" },
      { $set: { key: "process", ...normalized, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PUT /api/admin/process error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
