import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  /**
   * 1. code 자체가 없는 경우
   *    → 이미 OAuth 흐름이 깨진 상태
   *    → 세션/쿠키 정리 후 로그인으로 복귀
   */
  if (!code) {
    await supabase.auth.signOut(); // 🔥 중요: 잔존 state 정리
    return NextResponse.redirect(
      new URL("/login?error=oauth_missing_code", SITE_URL)
    );
  }

  /**
   * 2. code → session 교환
   */
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  /**
   * 3. 교환 실패
   *    → flow_state_not_found 등 포함
   *    → 반드시 cleanup 후 재로그인
   */
  if (error) {
    console.error("OAuth exchange error:", error.message);

    await supabase.auth.signOut(); // 🔥 핵심 패치

    return NextResponse.redirect(
      new URL("/login?error=oauth_failed", SITE_URL)
    );
  }

  /**
   * 4. 성공
   */
  return NextResponse.redirect(new URL("/my", SITE_URL));
}
