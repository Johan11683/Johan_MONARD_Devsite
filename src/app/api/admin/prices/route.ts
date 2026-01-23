import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type LocaleText = { fr: string; en: string };

function isLocaleText(v: unknown): v is LocaleText {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;
  return typeof obj.fr === "string" && typeof obj.en === "string";
}

function nonEmptyLocaleText(v: unknown): v is LocaleText {
  return (
    isLocaleText(v) && !!v.fr.trim() && !!v.en.trim()
  );
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

function nonEmptyStringArray(v: unknown): v is string[] {
  return isStringArray(v) && v.every((s) => !!s.trim());
}

function isFeatures(v: unknown): v is { fr: string[]; en: string[] } {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;

  if (!isStringArray(obj.fr) || !isStringArray(obj.en)) return false;
  if ((obj.fr as string[]).length !== (obj.en as string[]).length) return false;

  return true;
}

function nonEmptyFeatures(v: unknown): v is { fr: string[]; en: string[] } {
  if (!isFeatures(v)) return false;
  const obj = v as { fr: string[]; en: string[] };
  return nonEmptyStringArray(obj.fr) && nonEmptyStringArray(obj.en);
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const prices = await col.findOne(
      { key: "prices" },
      { projection: { _id: 0, key: 0 } }
    );

    return NextResponse.json(prices ?? null);
  } catch (error) {
    console.error("GET /api/admin/prices error:", error);
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
    if (!nonEmptyLocaleText(p.kicker)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    if (!nonEmptyLocaleText(p.title)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    if (!nonEmptyLocaleText(p.subtitle)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

    // badge
    if (!nonEmptyLocaleText(p.badgeMostPopular)) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    // cards
    if (!p.cards || typeof p.cards !== "object") {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    const cards = p.cards as Record<string, unknown>;
    const requiredKeys = ["standard", "bilingual", "admin"] as const;

    for (const key of requiredKeys) {
      const card = cards[key];
      if (!card || typeof card !== "object") {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }

      const c = card as Record<string, unknown>;

      if (typeof c.enabled !== "boolean") {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }

      // base fields
      if (!nonEmptyLocaleText(c.title)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      if (!nonEmptyLocaleText(c.price)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      if (!nonEmptyLocaleText(c.description)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

      // features arrays (illimité)
      if (!nonEmptyFeatures(c.features)) {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }

      // highlight uniquement sur bilingual
      if (key === "bilingual") {
        if (typeof c.highlight !== "boolean") {
          return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
        }
      }
    }

    // custom
    if (!p.custom || typeof p.custom !== "object") {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }
    const custom = p.custom as Record<string, unknown>;
    if (!nonEmptyLocaleText(custom.paragraph1)) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    // updatesPolicy
    if (!p.updatesPolicy || typeof p.updatesPolicy !== "object") {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }
    const upd = p.updatesPolicy as Record<string, unknown>;
    if (!nonEmptyLocaleText(upd.title)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    if (!nonEmptyLocaleText(upd.text)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

    // legalNote
    if (!nonEmptyLocaleText(p.legalNote)) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    await col.updateOne(
      { key: "prices" },
      { $set: { key: "prices", ...payload, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PUT /api/admin/prices error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
