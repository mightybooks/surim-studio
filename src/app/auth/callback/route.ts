import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  // code 없으면 그냥 MY로
  if (!code) {
    return NextResponse.redirect(new URL("/my", SITE_URL));
  }

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

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("OAuth exchange error:", error.message);
    return NextResponse.redirect(new URL("/login", SITE_URL));
  }

  // ✅ 성공 → 로그인 완료
  return NextResponse.redirect(new URL("/my", SITE_URL));
}
