"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { isSafeInternalRedirect } from "@/lib/inAppBrowser";

export default function AuthVerifyPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  useEffect(() => {
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const returnToRaw = params?.get("returnTo") ?? params?.get("next") ?? null;
    const returnTo = isSafeInternalRedirect(returnToRaw) ? returnToRaw : "/my";

    async function resolveAccess() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace(`/login?returnTo=${encodeURIComponent(returnTo)}`);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace(`/login?returnTo=${encodeURIComponent(returnTo)}`);
        return;
      }

      if (!user.email_confirmed_at) {
        router.replace(`/verify-email?returnTo=${encodeURIComponent(returnTo)}`);
        return;
      }

      router.replace(returnTo);
    }

    void resolveAccess();
  }, [router, supabase]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <p className="text-sm text-gray-500">계정 상태를 확인하고 있습니다.</p>
    </div>
  );
}
