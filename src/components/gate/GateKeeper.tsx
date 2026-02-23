"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  buildPathWithQuery,
  INAPP_GATE_PASSED_KEY,
  INAPP_GUIDE_PATH,
  INAPP_LAST_INTENDED_URL_KEY,
  isInAppBrowser,
} from "@/lib/inAppBrowser";

export default function GateKeeper() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!pathname) return;
    if (pathname === INAPP_GUIDE_PATH) return;
    if (!isInAppBrowser()) return;

    const gatePassed = sessionStorage.getItem(INAPP_GATE_PASSED_KEY) === "true";
    if (gatePassed) return;

    const queryString = window.location.search.replace(/^\?/, "");
    const intendedUrl = buildPathWithQuery(pathname, queryString);
    sessionStorage.setItem(INAPP_LAST_INTENDED_URL_KEY, intendedUrl);
    router.replace(`${INAPP_GUIDE_PATH}?redirect=${encodeURIComponent(intendedUrl)}`);
  }, [pathname, router]);

  return null;
}
