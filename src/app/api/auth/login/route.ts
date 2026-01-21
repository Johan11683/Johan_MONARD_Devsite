import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const password = String(body?.password ?? "");

    const adminPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD missing in env");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    if (!secret) {
      console.error("ADMIN_SESSION_SECRET missing in env");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    if (!password || password !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(secret));

    const res = NextResponse.json({ ok: true });

    res.cookies.set("admin_session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("POST /api/auth/login error:", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
