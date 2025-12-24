import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getOrigin(req: Request) {
  const url = new URL(req.url);
  // 로컬/운영 모두 대응
  return `${url.protocol}//${url.host}`;
}

if (!process.env.NAVER_CLIENT_ID) {
  throw new Error("NAVER_CLIENT_ID is missing");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = getOrigin(req);

  const returnTo = url.searchParams.get("returnTo") || "/my";

  const state = crypto.randomBytes(16).toString("hex");

  // state를 쿠키로 저장 (CSRF 방지)
  const res = NextResponse.redirect(
    `https://nid.naver.com/oauth2/authorize?` +
      new URLSearchParams({
        response_type: "code",
        client_id: process.env.NAVER_CLIENT_ID!,
        redirect_uri: `${origin}/auth/naver/callback`,
        state,
      }).toString()
  );

  // returnTo도 함께 저장
  res.cookies.set("naver_oauth_state", state, {
    httpOnly: true,
    secure: origin.startsWith("https://"),
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });
  res.cookies.set("naver_return_to", returnTo, {
    httpOnly: true,
    secure: origin.startsWith("https://"),
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  return res;
}
