import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { isSafeInternalRedirect } from "@/lib/inAppBrowser";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

function loginUrl(error: string, returnTo: string) {
  return new URL(`/login?error=${error}&returnTo=${encodeURIComponent(returnTo)}`, SITE_URL);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnToRaw = url.searchParams.get("returnTo") ?? url.searchParams.get("next");
  const returnTo = isSafeInternalRedirect(returnToRaw) ? returnToRaw : "/my";

  const cookieStore = await cookies();

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
    return NextResponse.redirect(loginUrl("oauth_missing_code", returnTo));
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(loginUrl("oauth_failed", returnTo));
  }

  const user = data.user ?? data.session?.user ?? null;

  if (!user) {
    return NextResponse.redirect(loginUrl("oauth_no_user", returnTo));
  }

  if (!user.email_confirmed_at) {
    return NextResponse.redirect(
      new URL(`/verify-email?returnTo=${encodeURIComponent(returnTo)}`, SITE_URL),
    );
  }

  return NextResponse.redirect(new URL(returnTo, SITE_URL));
}
