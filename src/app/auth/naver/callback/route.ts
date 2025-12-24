import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getOrigin(req: NextRequest) {
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}

function hmacPassword(naverId: string) {
  const secret = process.env.AUTH_BRIDGE_SECRET!;
  return crypto.createHmac("sha256", secret).update(naverId).digest("hex");
}

function synthEmail(naverId: string) {
  return `naver_${naverId}@oauth.surimstudio.local`;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const origin = getOrigin(req);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const savedState = req.cookies.get("naver_oauth_state")?.value;
  const returnTo = req.cookies.get("naver_return_to")?.value || "/my";

  if (!code || !state || !savedState || state !== savedState) {
    return NextResponse.redirect(`${origin}/login?error=naver_state_mismatch`);
  }

  /** 1. token 교환 */
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
    }),
    cache: "no-store",
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${origin}/login?error=naver_token_failed`);
  }

  const { access_token } = await tokenRes.json();
  if (!access_token) {
    return NextResponse.redirect(`${origin}/login?error=naver_no_access_token`);
  }

  /** 2. 프로필 조회 */
  const profileRes = await fetch("https://openapi.naver.com/v1/nid/me", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  });

  if (!profileRes.ok) {
    return NextResponse.redirect(`${origin}/login?error=naver_profile_failed`);
  }

  const profileJson = await profileRes.json();
  const naverId = profileJson?.response?.id;
  if (!naverId) {
    return NextResponse.redirect(`${origin}/login?error=naver_no_id`);
  }

  const email = synthEmail(naverId);
  const password = hmacPassword(naverId);

  /** 3. Supabase 로그인 */
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
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
      },
    });

    ({ data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    }));

    if (error || !data.session) {
      return NextResponse.redirect(`${origin}/login?error=supabase_signin_failed`);
    }
  }

  /** 4. 세션 쿠키 직접 세팅 */
  const res = NextResponse.redirect(`${origin}${returnTo}`);

  res.cookies.set("sb-access-token", data.session!.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: data.session!.expires_in,
  });

  res.cookies.set("sb-refresh-token", data.session!.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  res.cookies.set("naver_oauth_state", "", { path: "/", maxAge: 0 });
  res.cookies.set("naver_return_to", "", { path: "/", maxAge: 0 });

  return res;
}
