import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { PricesContent } from "@/app/components/Admin/Sections/Prices/prices.types";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const prices = await col.findOne(
      { key: "prices" },
      { projection: { _id: 0, key: 0 } }
    );

    return NextResponse.json((prices as PricesContent | null) ?? null);
  } catch (error) {
    console.error("GET /api/content/prices error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
