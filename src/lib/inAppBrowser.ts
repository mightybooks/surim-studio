export const INAPP_GATE_PASSED_KEY = "gate_passed";
export const INAPP_LAST_INTENDED_URL_KEY = "last_intended_url";
export const INAPP_GUIDE_PATH = "/notice/inapp-guide";

export type DevicePlatform = "ios" | "android" | "other";

const STRONG_INAPP_PATTERNS = [/KAKAOTALK/i, /Instagram/i, /FBAN/i, /FBAV/i, /FB_IAB/i];
const WEAK_INAPP_PATTERNS = [/NAVER/i, /DaumApps/i, /Line/i];

function readNavigatorUA() {
  if (typeof navigator === "undefined") return "";
  return navigator.userAgent || "";
}

export function detectDevicePlatform(inputUA?: string): DevicePlatform {
  const ua = inputUA ?? readNavigatorUA();
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

export function isInAppBrowser(inputUA?: string) {
  const ua = inputUA ?? readNavigatorUA();
  if (!ua) return false;

  const isAndroid = /Android/i.test(ua);
  const isAndroidWebView = isAndroid && /\bwv\b/i.test(ua);
  const isAndroidRealChrome =
    isAndroid && /Chrome\/\d+/i.test(ua) && /Safari\/\d+/i.test(ua) && !isAndroidWebView;

  const hitStrong = STRONG_INAPP_PATTERNS.some((pattern) => pattern.test(ua));
  const hitWeak = WEAK_INAPP_PATTERNS.some((pattern) => pattern.test(ua));

  if (hitStrong) return true;
  if (isAndroidRealChrome && hitWeak) return false;
  if (hitWeak) return true;
  if (isAndroidWebView) return true;

  return false;
}

export function buildPathWithQuery(pathname: string, queryString?: string) {
  if (!queryString) return pathname;
  return `${pathname}?${queryString}`;
}

export function isSafeInternalRedirect(
  value: string | null | undefined,
): value is string {
  if (!value) return false;
  return value.startsWith("/") && !value.startsWith("//");
}
