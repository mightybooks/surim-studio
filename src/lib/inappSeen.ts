export const SEEN_KEY_PREFIX = "surim_inapp_character_seen_v2";
export const SEEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7일

export function detectInAppHost(ua: string) {
  if (/KAKAOTALK/i.test(ua)) return "kakao";
  if (/Threads|Instagram|FBAN|FBAV|FB_IAB/i.test(ua)) return "meta";
  if (/NAVER/i.test(ua)) return "naver";
  if (/DaumApps/i.test(ua)) return "daum";
  if (/Line/i.test(ua)) return "line";
  return "other";
}

export function makeSeenKey(ua: string) {
  const host = detectInAppHost(ua);
  return `${SEEN_KEY_PREFIX}_${host}`;
}

export function readSeen(key: string): boolean {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return false;

    // ✅ 과거 v1("1") 포맷 호환 (혹시 남아있으면 TTL 없이 seen으로 취급)
    if (raw === "1") return true;

    const parsed = JSON.parse(raw) as { v: number; t: number };
    if (!parsed?.t) return false;

    return Date.now() - parsed.t < SEEN_TTL_MS;
  } catch {
    return false;
  }
}

export function writeSeen(key: string) {
  try {
    localStorage.setItem(key, JSON.stringify({ v: 1, t: Date.now() }));
  } catch {
    // 저장 불가 환경(일부 인앱)에서는 실패할 수 있음. UX는 state로만 처리.
  }
}