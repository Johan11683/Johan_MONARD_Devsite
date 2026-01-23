// src/app/api/content/projects/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { ProjectsContent } from "@/app/components/Admin/Sections/Projects/projects.types";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cv");
    const col = db.collection("content");

    const projects = await col.findOne(
      { key: "projects" },
      { projection: { _id: 0, key: 0 } }
    );

    return NextResponse.json((projects as ProjectsContent | null) ?? null);
  } catch (error) {
    console.error("GET /api/content/projects error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
