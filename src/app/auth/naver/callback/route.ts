import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { consumeRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getOrigin(req: NextRequest) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return new URL(configured).origin;
  return process.env.NODE_ENV === "production" ? "https://surimstudio.com" : req.nextUrl.origin;
}

// base64url helpers
function b64urlDecodeToString(input: string) {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return Buffer.from(b64, "base64").toString("utf8");
}

function hmacSign(payloadB64: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payloadB64).digest("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function signaturesMatch(provided: string, expected: string) {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

type NaverState = { exp: number; nonce: string; returnTo?: string };

function safeReturnTo(v: unknown) {
  if (typeof v !== "string") return "/my";
  if (!v.startsWith("/")) return "/my";
  if (v.startsWith("//")) return "/my";
  return v;
}

function hmacPassword(naverId: string) {
  const secret = process.env.AUTH_BRIDGE_SECRET!;
  return crypto.createHmac("sha256", secret).update(naverId).digest("hex");
}

function synthEmail(naverId: string) {
  return `naver_${naverId}@oauth.surimstudio.local`;
}

if (!process.env.NAVER_CLIENT_ID) throw new Error("NAVER_CLIENT_ID is missing");
if (!process.env.NAVER_CLIENT_SECRET) throw new Error("NAVER_CLIENT_SECRET is missing");
if (!process.env.AUTH_BRIDGE_SECRET) throw new Error("AUTH_BRIDGE_SECRET is missing");
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing");
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is missing");
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing");

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const origin = getOrigin(req);

  // 네이버가 에러로 돌려보내는 케이스 처리
  const oauthError = url.searchParams.get("error");
  if (oauthError) {
    // 예: access_denied 등
    return NextResponse.redirect(`${origin}/login?error=naver_${oauthError}`);
  }

  const code = url.searchParams.get("code");
  const stateRaw = url.searchParams.get("state");
  if (!code || !stateRaw) {
    return NextResponse.redirect(`${origin}/login?error=naver_missing_code_or_state`);
  }

  // state-less 검증: payloadB64.sig
  const parts = stateRaw.split(".");
  if (parts.length !== 2) {
    return NextResponse.redirect(`${origin}/login?error=naver_bad_state_format`);
  }

  const [payloadB64, sig] = parts;
  const expected = hmacSign(payloadB64, process.env.AUTH_BRIDGE_SECRET!);
  if (!signaturesMatch(sig, expected)) {
    return NextResponse.redirect(`${origin}/login?error=naver_state_invalid_signature`);
  }

  let payload: NaverState;
  try {
    const parsed: unknown = JSON.parse(b64urlDecodeToString(payloadB64));
    if (!parsed || typeof parsed !== "object") throw new Error();
    payload = parsed as NaverState;
  } catch {
    return NextResponse.redirect(`${origin}/login?error=naver_state_payload_parse_failed`);
  }

  const now = Math.floor(Date.now() / 1000);
  if (!Number.isSafeInteger(payload.exp) || payload.exp < now || typeof payload.nonce !== "string" || !/^[a-f0-9]{32}$/.test(payload.nonce)) {
    return NextResponse.redirect(`${origin}/login?error=naver_state_expired`);
  }

  const returnTo = safeReturnTo(payload?.returnTo);

  // 1) code -> token 교환
  const tokenRes = await fetch("https://nid.naver.com/oauth2/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.NAVER_CLIENT_ID!,
      client_secret: process.env.NAVER_CLIENT_SECRET!,
      code,
      state: stateRaw,
      redirect_uri: `${origin}/auth/naver/callback`,
    }),
    cache: "no-store",
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${origin}/login?error=naver_token_failed`);
  }

  const tokenJson = await tokenRes.json();
  const accessToken = tokenJson.access_token as string | undefined;
  if (!accessToken) {
    return NextResponse.redirect(`${origin}/login?error=naver_no_access_token`);
  }

  // 2) profile 조회
  const profileRes = await fetch("https://openapi.naver.com/v1/nid/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!profileRes.ok) {
    return NextResponse.redirect(`${origin}/login?error=naver_profile_failed`);
  }

  const profileJson = await profileRes.json();
  const resp = profileJson?.response;
  const naverId = resp?.id as string | undefined;
  if (!naverId || !/^[A-Za-z0-9_-]{1,100}$/.test(naverId)) {
    return NextResponse.redirect(`${origin}/login?error=naver_no_id`);
  }

  const email = synthEmail(naverId);
  const password = hmacPassword(naverId);
  const rate = await consumeRateLimit("naver-auth", naverId, 10, 60 * 60);
  if (!rate.configured || !rate.allowed) {
    return NextResponse.redirect(`${origin}/login?error=naver_rate_limited`);
  }

  // 3) Supabase 로그인/유저생성
  const supabaseAnon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  let { data: signInData, error: signInError } = await supabaseAnon.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        provider: "naver",
        naver_id: naverId,
        nickname: resp?.nickname ?? null,
        name: resp?.name ?? null,
        profile_image: resp?.profile_image ?? null,
      },
    });

    ({ data: signInData, error: signInError } = await supabaseAnon.auth.signInWithPassword({
      email,
      password,
    }));

    if (signInError || !signInData.session) {
      return NextResponse.redirect(`${origin}/login?error=supabase_signin_failed`);
    }
  }

  if (!signInData.session) {
    return NextResponse.redirect(`${origin}/login?error=supabase_no_session`);
  }

  // 4) 서버 응답 쿠키에 "Supabase 세션"을 정식으로 주입 (@supabase/ssr)
  //    - 우리가 쿠키 이름을 추측하지 않도록, ssr client에 setAll을 위임
  const res = NextResponse.redirect(`${origin}${returnTo}`);

  const supabaseSsr = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll().map((c) => ({ name: c.name, value: c.value }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 세션 강제 주입
  await supabaseSsr.auth.setSession({
    access_token: signInData.session.access_token,
    refresh_token: signInData.session.refresh_token,
  });

  return res;
}
