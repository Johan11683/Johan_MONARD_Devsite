import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { BenefitContent } from "@/app/components/Admin/Sections/Benefits/benefit.types";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const benefit = await col.findOne(
      { key: "benefit" },
      { projection: { _id: 0, key: 0 } }
    );

    return NextResponse.json((benefit as BenefitContent | null) ?? null);
  } catch (error) {
    console.error("GET /api/content/benefit error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
