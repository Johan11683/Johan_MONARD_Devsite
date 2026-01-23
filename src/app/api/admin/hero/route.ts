import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

async function requireAdmin() {
  const store = await cookies();
  const token = store.get("admin_session")?.value;

  if (!token) return false;

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET manquant dans .env.local");
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    return payload?.role === "admin";
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const ok = await requireAdmin();
    if (!ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const hero = await col.findOne(
      { key: "hero" },
      { projection: { _id: 0, key: 0 } }
    );

    return NextResponse.json(hero ?? null);
  } catch (error) {
    console.error("GET /api/admin/hero error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const ok = await requireAdmin();
    if (!ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const hero = await req.json();

    if (
      !hero?.title?.fr?.trim() ||
      !hero?.title?.en?.trim() ||
      !hero?.subtitle?.fr?.trim() ||
      !hero?.subtitle?.en?.trim() ||
      !hero?.ctaText?.fr?.trim() ||
      !hero?.ctaText?.en?.trim() ||
      !hero?.ctaHref?.trim() ||
      !hero?.imageUrl?.trim()
    ) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    await col.updateOne(
      { key: "hero" },
      { $set: { key: "hero", ...hero, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PUT /api/admin/hero error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
