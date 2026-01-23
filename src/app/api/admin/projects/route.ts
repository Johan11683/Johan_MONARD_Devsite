// src/app/api/admin/projects/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type LocaleText = { fr: string; en: string };

function bad(path: string) {
  return NextResponse.json({ error: "Payload invalide", path }, { status: 400 });
}

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

    if (!payload || typeof payload !== "object") return bad("$");

    const p = payload as Record<string, unknown>;

    // header
    if (!nonEmptyLocaleText(p.kicker)) return bad("kicker");
    if (!nonEmptyLocaleText(p.title)) return bad("title");
    if (!nonEmptyLocaleText(p.subtitle)) return bad("subtitle");

    // items
    if (!Array.isArray(p.items)) return bad("items");

    for (let i = 0; i < p.items.length; i++) {
      const item = p.items[i];

      if (!item || typeof item !== "object") return bad(`items[${i}]`);

      const it = item as Record<string, unknown>;

      if (typeof it.id !== "string" || !it.id.trim()) return bad(`items[${i}].id`);
      if (typeof it.enabled !== "boolean") return bad(`items[${i}].enabled`);

      // ✅ si disabled: on valide juste le minimum structurel
      if (!it.enabled) continue;

      if (!nonEmptyLocaleText(it.title)) return bad(`items[${i}].title`);
      if (!nonEmptyLocaleText(it.description)) return bad(`items[${i}].description`);

      // image
      if (!it.image || typeof it.image !== "object") return bad(`items[${i}].image`);
      const img = it.image as Record<string, unknown>;

      if (!isUrlOrPath(img.src)) return bad(`items[${i}].image.src`);
      if (!img.alt || typeof img.alt !== "object") return bad(`items[${i}].image.alt`);
      if (!nonEmptyLocaleText(img.alt)) return bad(`items[${i}].image.alt`);

      // link
      if (!it.link || typeof it.link !== "object") return bad(`items[${i}].link`);
      const link = it.link as Record<string, unknown>;

      if (!isUrlOrPath(link.href)) return bad(`items[${i}].link.href`);
      if (!nonEmptyLocaleText(link.label)) return bad(`items[${i}].link.label`);
      if (typeof link.newTab !== "boolean") return bad(`items[${i}].link.newTab`);

      // tags (optionnels, mais si présents => on veut fr+en arrays)
      if (it.tags !== undefined) {
        if (!it.tags || typeof it.tags !== "object") return bad(`items[${i}].tags`);
        const tags = it.tags as Record<string, unknown>;

        if (!("fr" in tags) || !("en" in tags)) return bad(`items[${i}].tags.(fr|en)`);
        if (!isStringArray(tags.fr)) return bad(`items[${i}].tags.fr`);
        if (!isStringArray(tags.en)) return bad(`items[${i}].tags.en`);
        // optionnel : même longueur si tu veux “miroir” FR/EN
        // if ((tags.fr as string[]).length !== (tags.en as string[]).length) return bad(`items[${i}].tags.(len)`);
      }

      // github (optionnel)
      if (it.github !== undefined) {
        if (it.github === null) continue;
        if (typeof it.github !== "object") return bad(`items[${i}].github`);
        const gh = it.github as Record<string, unknown>;

        if (typeof gh.href !== "string") return bad(`items[${i}].github.href`);
        if (gh.href.trim() && !isUrlOrPath(gh.href)) return bad(`items[${i}].github.href`);
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
