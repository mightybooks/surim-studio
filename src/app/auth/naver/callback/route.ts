// src/app/auth/naver/callback/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

function must(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

type NaverMeResponse = {
  resultcode: string;
  message: string;
  response?: {
    id?: string;
    email?: string;
    name?: string;
    nickname?: string;
    profile_image?: string;
  };
};

export async function GET(req: NextRequest) {
  const siteUrl = must("NEXT_PUBLIC_SITE_URL");

  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const stateCookie = req.cookies.get("naver_oauth_state")?.value ?? null;
  const nextPath = req.cookies.get("naver_oauth_next")?.value ?? "/my";

  if (!code || !state || !stateCookie || state !== stateCookie) {
    // 실패 시 로그인으로 돌림
    const url = new URL(`${siteUrl}/login`);
    url.searchParams.set("err", "naver_state");
    return NextResponse.redirect(url.toString());
  }

  // 1) 토큰 교환
  const tokenUrl = new URL("https://nid.naver.com/oauth2.0/token");
  tokenUrl.searchParams.set("grant_type", "authorization_code");
  tokenUrl.searchParams.set("client_id", must("NAVER_CLIENT_ID"));
  tokenUrl.searchParams.set("client_secret", must("NAVER_CLIENT_SECRET"));
  tokenUrl.searchParams.set("code", code);
  tokenUrl.searchParams.set("state", state);

  const tokenRes = await fetch(tokenUrl.toString(), { method: "GET" });
  const tokenJson = await tokenRes.json().catch(() => null);

  const accessToken: string | null = tokenJson?.access_token ?? null;
  if (!accessToken) {
    const url = new URL(`${siteUrl}/login`);
    url.searchParams.set("err", "naver_token");
    return NextResponse.redirect(url.toString());
  }

  // 2) 프로필 조회
  const meRes = await fetch("https://openapi.naver.com/v1/nid/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const meJson = (await meRes.json().catch(() => null)) as NaverMeResponse | null;

  const email = meJson?.response?.email ?? null;
  if (!email) {
    // 네이버 쪽에서 이메일 제공 동의가 안 된 케이스
    const url = new URL(`${siteUrl}/login`);
    url.searchParams.set("err", "naver_no_email");
    return NextResponse.redirect(url.toString());
  }

  // 3) Supabase Admin 클라이언트
  const supabase = createClient(
    must("NEXT_PUBLIC_SUPABASE_URL"),
    must("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } }
  );

  // 4) 유저가 없으면 생성 (이미 있으면 에러가 나도 무시)
  const createRes = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: {
      provider: "naver",
    },
  });

  // 이미 존재하는 경우 등은 여기서 error가 날 수 있음 → 무시하고 진행
  // (단, 서비스롤 키/권한 문제는 치명적이므로 별도 처리)
  if (createRes.error && createRes.error.status === 401) {
    const url = new URL(`${siteUrl}/login`);
    url.searchParams.set("err", "supabase_admin");
    return NextResponse.redirect(url.toString());
  }

  // 5) 매직링크 생성 → 이 링크로 이동하면 Supabase가 세션 발급 후 redirectTo로 복귀
  const redirectTo = `${siteUrl}${nextPath}`;

  const linkRes = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: { redirectTo },
  });

  const actionLink = linkRes.data?.properties?.action_link ?? null;
  if (!actionLink) {
    const url = new URL(`${siteUrl}/login`);
    url.searchParams.set("err", "magiclink");
    return NextResponse.redirect(url.toString());
  }

  // state 쿠키 정리
  const res = NextResponse.redirect(actionLink);
  res.cookies.set("naver_oauth_state", "", { path: "/", maxAge: 0 });
  res.cookies.set("naver_oauth_next", "", { path: "/", maxAge: 0 });
  return res;
}
