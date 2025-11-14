// src/app/api/admin-login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const password = body?.password as string | undefined;
  const next = (body?.next as string | undefined) || "/admin";

  if (!password) {
    return NextResponse.json({ ok: false, error: "NO_PASSWORD" }, { status: 400 });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "INVALID_PASSWORD" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, redirectTo: next });

  // 7일짜리 관리자 쿠키
  res.cookies.set("admin_auth", "ok", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
