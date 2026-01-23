// src/app/api/admin/projects/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type LocaleText = { fr: string; en: string };

function isLocaleText(v: unknown): v is LocaleText {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return typeof o.fr === "string" && typeof o.en === "string";
}

function nonEmptyLocaleText(v: unknown): v is LocaleText {
  return isLocaleText(v) && !!v.fr.trim() && !!v.en.trim();
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

function isUrlOrPath(v: unknown): v is string {
  if (typeof v !== "string") return false;
  const s = v.trim();
  if (!s) return false;
  return s.startsWith("/") || s.startsWith("http://") || s.startsWith("https://");
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const projects = await col.findOne(
      { key: "projects" },
      { projection: { _id: 0, key: 0 } }
    );

    return NextResponse.json(projects ?? null);
  } catch (error) {
    console.error("GET /api/admin/projects error:", error);
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

    // header
    if (!nonEmptyLocaleText(p.kicker)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    if (!nonEmptyLocaleText(p.title)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    if (!nonEmptyLocaleText(p.subtitle)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

    // items
    if (!Array.isArray(p.items)) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    for (const item of p.items) {
      if (!item || typeof item !== "object") {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }

      const it = item as Record<string, unknown>;

      if (typeof it.id !== "string" || !it.id.trim()) {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }

      if (typeof it.enabled !== "boolean") {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }

      // ✅ si disabled: on valide juste le minimum structurel
      if (!it.enabled) {
        continue;
      }

      if (!nonEmptyLocaleText(it.title)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      if (!nonEmptyLocaleText(it.description)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

      // image
      if (!it.image || typeof it.image !== "object") {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }
      const img = it.image as Record<string, unknown>;
      if (!isUrlOrPath(img.src)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      if (!img.alt || typeof img.alt !== "object") return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      if (!nonEmptyLocaleText(img.alt)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

      // link
      if (!it.link || typeof it.link !== "object") {
        return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      }
      const link = it.link as Record<string, unknown>;
      if (!isUrlOrPath(link.href)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      if (!nonEmptyLocaleText(link.label)) return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
      if (typeof link.newTab !== "boolean") return NextResponse.json({ error: "Payload invalide" }, { status: 400 });

      // tags (optionnels)
      if (it.tags !== undefined) {
        if (!it.tags || typeof it.tags !== "object") {
          return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
        }
        const tags = it.tags as Record<string, unknown>;
        if (tags.fr !== undefined && !isStringArray(tags.fr)) {
          return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
        }
        if (tags.en !== undefined && !isStringArray(tags.en)) {
          return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
        }
      }

      // github (optionnel)
      if (it.github !== undefined) {
        if (it.github === null) continue;
        if (typeof it.github !== "object") {
          return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
        }
        const gh = it.github as Record<string, unknown>;
        if (typeof gh.href !== "string") {
          return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
        }
        // ici on autorise vide => côté editor on le met à undefined. Mais si ça arrive, pas grave.
        if (gh.href.trim() && !isUrlOrPath(gh.href)) {
          return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
        }
      }
    }

    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    await col.updateOne(
      { key: "projects" },
      { $set: { key: "projects", ...payload, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PUT /api/admin/projects error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
