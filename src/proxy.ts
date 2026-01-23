import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

async function isAdmin(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!token) return false;

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET manquant");

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload?.role === "admin";
  } catch {
    return false;
  }
}

export default async function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Laisse passer la page de login et les routes auth
  if (pathname.startsWith("/admin/login")) return NextResponse.next();
  if (pathname.startsWith("/api/auth/")) return NextResponse.next();

  const ok = await isAdmin(req);
  if (ok) return NextResponse.next();

  // Si c’est une route API admin -> 401 JSON
  if (pathname.startsWith("/api/admin/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Sinon -> redirect vers login
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname + (searchParams.toString() ? `?${searchParams}` : ""));
  return NextResponse.redirect(url);
}
