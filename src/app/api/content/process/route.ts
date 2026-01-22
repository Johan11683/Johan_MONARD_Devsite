import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { ProcessContent } from "@/app/components/Admin/Sections/Process/process.types";
import { PROCESS_DEFAULT } from "@/app/components/Admin/Sections/Process/process.default";
import { normalizeProcessContent } from "@/app/components/Admin/Sections/Process/process.normalize";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const doc = await col.findOne(
      { key: "process" },
      { projection: { _id: 0, key: 0 } }
    );

    const content = normalizeProcessContent((doc as Partial<ProcessContent> | null) ?? PROCESS_DEFAULT);

    return NextResponse.json(content);
  } catch (error) {
    console.error("GET /api/content/process error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
