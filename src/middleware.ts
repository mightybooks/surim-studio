// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin 이하 전체 보호
  if (pathname.startsWith("/admin")) {
    // 로그인 페이지는 예외
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }

    const adminCookie = req.cookies.get("admin_auth");

    // 쿠키가 없거나 값이 다르면 /admin/login 으로
    if (!adminCookie || adminCookie.value !== "ok") {
      const loginUrl = new URL("/admin/login", req.url);
      // 로그인 후 돌아갈 경로 기록
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
