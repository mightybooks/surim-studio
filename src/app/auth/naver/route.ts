import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getOrigin(req: NextRequest) {
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}

// base64url helpers
function b64urlEncode(input: string) {
  return Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function hmacSign(payloadB64: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payloadB64).digest("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function safeReturnTo(v: string | null) {
  if (!v) return "/my";
  // 오픈 리다이렉트 방지: 내부 경로만 허용
  if (!v.startsWith("/")) return "/my";
  if (v.startsWith("//")) return "/my";
  return v;
}

if (!process.env.NAVER_CLIENT_ID) throw new Error("NAVER_CLIENT_ID is missing");
if (!process.env.AUTH_BRIDGE_SECRET) throw new Error("AUTH_BRIDGE_SECRET is missing");

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const origin = getOrigin(req);

  const returnTo = safeReturnTo(url.searchParams.get("returnTo"));
  const nonce = crypto.randomBytes(16).toString("hex");
  const exp = Math.floor(Date.now() / 1000) + 60 * 5; // 5분 유효

  // state payload에 returnTo까지 포함 (쿠키 저장 없음)
  const payload = { v: 1, exp, nonce, returnTo };
  const payloadB64 = b64urlEncode(JSON.stringify(payload));
  const sig = hmacSign(payloadB64, process.env.AUTH_BRIDGE_SECRET);
  const state = `${payloadB64}.${sig}`;

  const authorizeUrl =
    "https://nid.naver.com/oauth2/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: process.env.NAVER_CLIENT_ID!,
      redirect_uri: `${origin}/auth/naver/callback`,
      state,
      // 필요 시 scope 추가 가능. 우선 최소로 갑니다.
      // scope: "profile",
    }).toString();

  return NextResponse.redirect(authorizeUrl);
}
