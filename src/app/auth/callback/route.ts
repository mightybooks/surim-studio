import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { isSafeInternalRedirect } from "@/lib/inAppBrowser";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextRaw = url.searchParams.get("next");
  const safeNext = isSafeInternalRedirect(nextRaw) ? nextRaw : "/my";

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
    },
  );

  if (!code) {
    return NextResponse.redirect(
      new URL(`/login?error=oauth_missing_code&next=${encodeURIComponent(safeNext)}`, SITE_URL),
    );
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=oauth_failed&next=${encodeURIComponent(safeNext)}`, SITE_URL),
    );
  }

  const user = data.user ?? data.session?.user ?? null;

  if (!user) {
    return NextResponse.redirect(
      new URL(`/login?error=oauth_no_user&next=${encodeURIComponent(safeNext)}`, SITE_URL),
    );
  }

  if (!user.email_confirmed_at) {
    return NextResponse.redirect(
      new URL(`/verify-email?next=${encodeURIComponent(safeNext)}`, SITE_URL),
    );
  }

  return NextResponse.redirect(new URL(safeNext, SITE_URL));
}
