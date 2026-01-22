import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { AboutContent } from "@/app/components/Admin/Sections/About/about.types";
import { ABOUT_DEFAULT } from "@/app/components/Admin/Sections/About/about.default";
import { normalizeAbout } from "@/app/components/Admin/Sections/About/about.normalize";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const doc = await col.findOne(
      { key: "about" },
      { projection: { _id: 0, key: 0 } }
    );

    const content = normalizeAbout((doc as Partial<AboutContent> | null) ?? ABOUT_DEFAULT);

    return NextResponse.json(content);
  } catch (error) {
    console.error("GET /api/content/about error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
