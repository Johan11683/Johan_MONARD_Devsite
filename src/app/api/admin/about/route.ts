import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { AboutContent } from "@/app/components/Admin/Sections/About/about.types";
import { ABOUT_DEFAULT } from "@/app/components/Admin/Sections/About/about.default";
import { normalizeAbout } from "@/app/components/Admin/Sections/About/about.normalize";

type LocaleText = { fr: string; en: string };

function isLocaleText(v: unknown): v is LocaleText {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;
  return typeof obj.fr === "string" && typeof obj.en === "string";
}

function nonEmptyLocaleText(v: unknown): v is LocaleText {
  return isLocaleText(v) && !!v.fr.trim() && !!v.en.trim();
}

function isBullet(v: unknown): v is { strong: LocaleText; text: LocaleText } {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;
  return isLocaleText(obj.strong) && isLocaleText(obj.text);
}

function nonEmptyBullet(v: unknown): v is { strong: LocaleText; text: LocaleText } {
  if (!isBullet(v)) return false;
  return nonEmptyLocaleText(v.strong) && nonEmptyLocaleText(v.text);
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const doc = await col.findOne(
      { key: "about" },
      { projection: { _id: 0, key: 0 } }
    );

    // ✅ Toujours renvoyer un contenu complet (prérempli si DB vide)
    const content = normalizeAbout((doc as Partial<AboutContent> | null) ?? ABOUT_DEFAULT);

    return NextResponse.json(content);
  } catch (error) {
    console.error("GET /api/admin/about error:", error);
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

    // photo
    if (!nonEmptyLocaleText(p.photoAlt)) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }
    if (!nonEmptyLocaleText(p.photoCaption)) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    // intro
    if (!nonEmptyLocaleText(p.kicker)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    if (!nonEmptyLocaleText(p.title)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    if (!nonEmptyLocaleText(p.lead)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

    // texts
    if (!nonEmptyLocaleText(p.text1)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    if (!nonEmptyLocaleText(p.text2)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

    // bullets
    if (!Array.isArray(p.bullets)) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }
    if (p.bullets.length !== 3) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }
    for (const b of p.bullets) {
      if (!nonEmptyBullet(b)) {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }
    }

    // outro
    if (!nonEmptyLocaleText(p.outro)) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    // ✅ Normalise avant stockage (sécurité + shape stable)
    const normalized = normalizeAbout(payload as Partial<AboutContent>);

    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    await col.updateOne(
      { key: "about" },
      { $set: { key: "about", ...normalized, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PUT /api/admin/about error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
