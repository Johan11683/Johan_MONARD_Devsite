import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type LocaleText = { fr: string; en: string };

function isLocaleText(v: unknown): v is LocaleText {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;
  return typeof obj.fr === "string" && typeof obj.en === "string";
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const benefit = await col.findOne(
      { key: "benefit" },
      { projection: { _id: 0, key: 0 } }
    );

    return NextResponse.json(benefit ?? null);
  } catch (error) {
    console.error("GET /api/admin/benefit error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const benefit = (await req.json()) as unknown;

    if (!benefit || typeof benefit !== "object") {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    const b = benefit as Record<string, unknown>;

    if (!isLocaleText(b.kicker) || !b.kicker.fr.trim() || !b.kicker.en.trim()) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    if (!isLocaleText(b.title) || !b.title.fr.trim() || !b.title.en.trim()) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    if (
      !isLocaleText(b.subtitle) ||
      !b.subtitle.fr.trim() ||
      !b.subtitle.en.trim()
    ) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    // ✅ cards: on attend un objet avec 5 keys, et chaque card a enabled + title/text
    if (!b.cards || typeof b.cards !== "object") {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    const cards = b.cards as Record<string, unknown>;
    const keys = ["overview", "clients", "transparent", "ownership", "noMaintenance"];

    for (const key of keys) {
      const card = cards[key];

      if (!card || typeof card !== "object") {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }

      const c = card as Record<string, unknown>;

      if (typeof c.enabled !== "boolean") {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }

      if (!isLocaleText(c.title) || !c.title.fr.trim() || !c.title.en.trim()) {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }

      if (!isLocaleText(c.text) || !c.text.fr.trim() || !c.text.en.trim()) {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }
    }

    // footer
    if (
      !b.footer ||
      typeof b.footer !== "object" ||
      !("line1" in b.footer) ||
      !("line2" in b.footer) ||
      !("ctaText" in b.footer) ||
      !("ctaHref" in b.footer)
    ) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    const f = b.footer as Record<string, unknown>;

    if (!isLocaleText(f.line1) || !f.line1.fr.trim() || !f.line1.en.trim()) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    if (!isLocaleText(f.line2) || !f.line2.fr.trim() || !f.line2.en.trim()) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    if (!isLocaleText(f.ctaText) || !f.ctaText.fr.trim() || !f.ctaText.en.trim()) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    if (typeof f.ctaHref !== "string" || !f.ctaHref.trim()) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    await col.updateOne(
      { key: "benefit" },
      { $set: { key: "benefit", ...benefit, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PUT /api/admin/benefit error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
