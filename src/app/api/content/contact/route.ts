// app/api/content/contact/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

import type { ContactContent } from "@/app/components/Admin/Sections/Contact/contact.types";
import { CONTACT_DEFAULT } from "@/app/components/Admin/Sections/Contact/contact.default";
import { normalizeContact } from "@/app/components/Admin/Sections/Contact/contact.normalize";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const doc = await col.findOne(
      { key: "contact" },
      { projection: { _id: 0, key: 0 } }
    );

    const content = normalizeContact((doc as Partial<ContactContent> | null) ?? CONTACT_DEFAULT);

    return NextResponse.json(content);
  } catch (error) {
    console.error("GET /api/content/contact error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
