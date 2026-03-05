"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { isInAppBrowser } from "@/lib/inAppBrowser";
import styles from "./InAppEntryOverlay.module.css";
import { makeSeenKey, readSeen, writeSeen } from "@/lib/inappSeen";

const GUIDE_PATH = "/notice/inapp-guide";

const STAGE_TIMERS_MS = {
  surimi: 300,
  speech1: 1400,
  tosil: 3400,
  speech2: 4200,
  speech3: 8400,
  buttons: 9800,
} as const;

type Stage = 0 | 1 | 2 | 3 | 4;

export default function InAppEntryOverlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [inApp, setInApp] = useState(false);
  const [seen, setSeen] = useState(false);
  const [hash, setHash] = useState("");
  const [stage, setStage] = useState<Stage>(0);
  const [showSurimi, setShowSurimi] = useState(false);
  const [showTosil, setShowTosil] = useState(false);

  // UA 기반 key는 mount 이후에 확정
  const [seenKey, setSeenKey] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = window.navigator.userAgent || "";
    const key = makeSeenKey(ua);

    setSeenKey(key);
    setInApp(isInAppBrowser(ua));
    setSeen(readSeen(key));
    setHash(window.location.hash || "");
    setMounted(true);

    const onHashChange = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (!mounted || !inApp || seen) return;

    setStage(0);
    setShowSurimi(false);
    setShowTosil(false);

    const timers = [
      window.setTimeout(() => setShowSurimi(true), STAGE_TIMERS_MS.surimi),
      window.setTimeout(() => setStage(1), STAGE_TIMERS_MS.speech1),
      window.setTimeout(() => setShowTosil(true), STAGE_TIMERS_MS.tosil),
      window.setTimeout(() => setStage(2), STAGE_TIMERS_MS.speech2),
      window.setTimeout(() => setStage(3), STAGE_TIMERS_MS.speech3),
      window.setTimeout(() => setStage(4), STAGE_TIMERS_MS.buttons),
    ];

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [inApp, mounted, seen]);

  const currentRelativeUrl = useMemo(() => {
    const query = searchParams?.toString() || "";
    return `${pathname || "/"}${query ? `?${query}` : ""}${hash}`;
  }, [hash, pathname, searchParams]);

  const guideHref = `${GUIDE_PATH}?redirect=${encodeURIComponent(currentRelativeUrl)}`;

  function markSeen() {
    if (!seenKey) {
      setSeen(true);
      return;
    }
    writeSeen(seenKey);
    setSeen(true);
  }

  function goToGuide() {
    // ✅ 안내를 보러 가는 명확한 행동에서만 seen 처리
    markSeen();
    window.location.href = guideHref;
  }

  function browseOnly() {
    // ✅ "둘러보기"는 seen 처리하지 않음 (첫 방문 오판 방지)
    setSeen(true); // 단, 이번 방문 동안만 오버레이를 닫기 위해 state만 true
  }

  if (!mounted || !inApp) return null;
  if (pathname === GUIDE_PATH) return null;

  // ✅ 이미 seen이면: 상단 배너만
  if (seen) {
    return (
      <div className={styles.inappStack} role="status" aria-live="polite">
        {/* 1) 위 배너: 안내 메시지 */}
        <aside className={styles.inappBanner}>
          <div className={styles.inappBannerMessage}>
            인앱 브라우저에서는<br />
            로그인 / 결제 / 인증이 정상 동작하지 않을 수 있습니다.
          </div>
        </aside>

        {/* 2) 아래 배너: 버튼 역할 */}
        <aside className={`${styles.inappBanner} ${styles.inappBannerCtaBox}`}>
          <Link href={guideHref} legacyBehavior>
            <a className={styles.inappBannerCta}>
              정상 브라우저로 여는 방법
            </a>
          </Link>
        </aside>     
      </div>
    );
  }

  const speechText =
    stage >= 3
      ? "정상 브라우저로 이어서\n로그인/인증/결제를 진행할 수 있어요."
      : stage >= 2
        ? "인앱 브라우저에서는 기능이 제한될 수 있어요.\n안내를 보고 정상 브라우저로 이동해 주세요."
        : "잠깐!\n지금 인앱 브라우저로 접속했어요.\n안정적인 이용을 위해 안내를 확인해 주세요.";

  return (
    <div className={styles.inappGateOverlay} role="dialog" aria-modal="true" aria-label="접속 안내">
      {stage >= 1 && (
        <div className={styles.inappGateBubble} aria-live="polite">
          {speechText.split("\n").map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}

      <img
        src="/characters/notice/suriminotice01.png"
        alt="Surimi"
        className={`${styles.inappGateSurimi} ${showSurimi ? styles.show : ""}`}
      />
      <img
        src="/characters/notice/tosilnotice01.png"
        alt="Tosil"
        className={`${styles.inappGateTosil} ${showTosil ? styles.show : ""}`}
      />

      {stage >= 4 && (
        <div className={styles.inappGateActions}>
          <button type="button" className={styles.primary} onClick={goToGuide}>
            안내 보고 정상 브라우저로 열기
          </button>
          <button type="button" onClick={browseOnly}>
            그냥 둘러보기
          </button>
        </div>
      )}      
    </div>
  );
}