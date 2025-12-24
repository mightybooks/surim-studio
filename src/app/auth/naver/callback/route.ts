import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getOrigin(req: Request) {
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}

function hmacPassword(naverId: string) {
  const secret = process.env.AUTH_BRIDGE_SECRET!;
  return crypto.createHmac("sha256", secret).update(naverId).digest("hex");
}

function synthEmail(naverId: string) {
  // 충돌 방지/식별용: 내부 도메인
  return `naver_${naverId}@oauth.surimstudio.local`;
}

if (!process.env.NAVER_CLIENT_SECRET) {
  throw new Error("NAVER_CLIENT_SECRET is missing");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = getOrigin(req);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = cookies();
  const savedState = cookieStore.get("naver_oauth_state")?.value;
  const returnTo = cookieStore.get("naver_return_to")?.value || "/my";

  // state 검증
  if (!code || !state || !savedState || state !== savedState) {
    return NextResponse.redirect(`${origin}/login?error=naver_state_mismatch`);
  }

  // code -> token 교환
  const tokenRes = await fetch("https://nid.naver.com/oauth2/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.NAVER_CLIENT_ID!,
      client_secret: process.env.NAVER_CLIENT_SECRET!,
      code,
      state,
      redirect_uri: `${origin}/auth/naver/callback`,
    }).toString(),
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

  // profile 조회
  const profileRes = await fetch("https://openapi.naver.com/v1/nid/me", {
    headers: { authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!profileRes.ok) {
    return NextResponse.redirect(`${origin}/login?error=naver_profile_failed`);
  }

  const profileJson = await profileRes.json();
  const resp = profileJson?.response;
  const naverId = resp?.id as string | undefined;
  if (!naverId) {
    return NextResponse.redirect(`${origin}/login?error=naver_no_id`);
  }

  const email = synthEmail(naverId);
  const password = hmacPassword(naverId);

  // Supabase (Route Handler Client) - 쿠키 세션 세팅 가능
  const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { cookies: cookies() }
);

  // 먼저 로그인 시도
  let signIn = await supabase.auth.signInWithPassword({ email, password });

  // 없으면 생성 후 재시도
  if (signIn.error) {    
    const { createClient } = await import("@supabase/supabase-js");

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // 반드시 서버 env에만
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

    // 다시 로그인
    signIn = await supabase.auth.signInWithPassword({ email, password });

    if (signIn.error) {
      return NextResponse.redirect(`${origin}/login?error=supabase_signin_failed`);
    }
  }

  // state/returnTo 쿠키 정리
  const res = NextResponse.redirect(`${origin}${returnTo}`);
  res.cookies.set("naver_oauth_state", "", { path: "/", maxAge: 0 });
  res.cookies.set("naver_return_to", "", { path: "/", maxAge: 0 });
  return res;
}
