import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const hero = await col.findOne(
      { key: "hero" },
      { projection: { _id: 0, key: 0 } }
    );

    return NextResponse.json(hero ?? null);
  } catch (error) {
    console.error("GET /api/content/hero error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
