import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function requireAdmin(req: NextRequest) {
  const isAdmin = req.cookies.get("admin_session")?.value === "1";
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
