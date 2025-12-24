// src/app/auth/naver/route.ts
import { NextResponse, type NextRequest } from "next/server";

function must(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function GET(req: NextRequest) {
  const siteUrl = must("NEXT_PUBLIC_SITE_URL");
  const clientId = must("NAVER_CLIENT_ID");

  const state = crypto.randomUUID();
  const redirectUri = `${siteUrl}/auth/naver/callback`;

  const url = new URL("https://nid.naver.com/oauth2.0/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);
  // 필요한 범위(이메일을 받으려면 email 필요)
  url.searchParams.set("scope", "profile,email");

  const res = NextResponse.redirect(url.toString());
  // state 검증용 쿠키
  res.cookies.set("naver_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: siteUrl.startsWith("https://"),
    path: "/",
    maxAge: 60 * 10,
  });

  // (선택) 로그인 후 돌아갈 목적지
  const next = req.nextUrl.searchParams.get("next") ?? "/my";
  res.cookies.set("naver_oauth_next", next, {
    httpOnly: true,
    sameSite: "lax",
    secure: siteUrl.startsWith("https://"),
    path: "/",
    maxAge: 60 * 10,
  });

  return res;
}
