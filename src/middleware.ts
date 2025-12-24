// src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase/middleware";

const PROTECTED_PREFIXES = ["/my", "/admin"];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) 보호 대상이 아니면 통과
  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  // 2) Supabase 세션 동기화 + 유저 확인
  const { supabase, res } = createSupabaseMiddlewareClient(req);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3) 로그인 안 했으면 /login으로
  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // 🔥 4) /admin 은 관리자만 허용
  if (pathname.startsWith("/admin")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    // ⭐ 핵심: profile 없거나 admin 아니면 무조건 차단
    if (!profile || profile.role !== "admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // 5) 통과
  return res;
}

export const config = {
  matcher: ["/my/:path*", "/admin/:path*"],
};
