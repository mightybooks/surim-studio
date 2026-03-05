"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { isInAppBrowser } from "@/lib/inAppBrowser";

/**
 * ✅ seen 정책
 * - 앱(카톡/메타/네이버 등)별로 key 분리
 * - TTL 7일: 7일 지나면 다시 오버레이 1회 노출 가능
 * - "둘러보기"는 seen 처리하지 않음 (첫 방문 오판 방지)
 */
const SEEN_KEY_PREFIX = "surim_inapp_character_seen_v2";
const SEEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7일
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

function detectInAppHost(ua: string) {
  if (/KAKAOTALK/i.test(ua)) return "kakao";
  if (/Threads|Instagram|FBAN|FBAV|FB_IAB/i.test(ua)) return "meta";
  if (/NAVER/i.test(ua)) return "naver";
  if (/DaumApps/i.test(ua)) return "daum";
  if (/Line/i.test(ua)) return "line";
  return "other";
}

function makeSeenKey(ua: string) {
  const host = detectInAppHost(ua);
  return `${SEEN_KEY_PREFIX}_${host}`;
}

function readSeen(key: string): boolean {
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

function writeSeen(key: string) {
  try {
    localStorage.setItem(key, JSON.stringify({ v: 1, t: Date.now() }));
  } catch {
    // 저장 불가 환경(일부 인앱)에서는 실패할 수 있음. UX는 state로만 처리.
  }
}

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
    <div className="inapp-stack" role="status" aria-live="polite">
      {/* 1) 위 배너: 안내 메시지 */}
      <aside className="inapp-banner">
        <div className="inapp-banner-message">
          인앱 브라우저에서는<br />
          로그인 / 결제 / 인증이 정상 동작하지 않을 수 있습니다.
        </div>
      </aside>

      {/* 2) 아래 배너: 버튼 역할 */}
      <aside className="inapp-banner inapp-banner--cta">
        <Link href={guideHref} legacyBehavior>
          <a className="inapp-banner-cta">
            정상 브라우저로 여는 방법
          </a>
        </Link>
      </aside>

      <style jsx>{`
        .inapp-stack {
          position: fixed;
          left: 50%;
          top: 68px;
          transform: translateX(-50%);
          z-index: 60;
          width: min(96vw, 760px);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .inapp-banner {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.12);
          background: #fff;
        }

        .inapp-banner-message {
          padding: 12px 14px;
          font-size: 13px;
          line-height: 1.45;
          color: #262626;
          text-align: center; /* 가독성을 위해 중앙 정렬 추천 */
        }

        /* ✅ 아래 배너 배경색 강조 */
        .inapp-banner--cta {
          background-color: #111827 !important;
          border-color: #111827 !important;
        }

        /* ✅ 핵심: 명시도를 높여 글자색을 흰색으로 강제 고정 */
        .inapp-banner--cta .inapp-banner-cta {
          display: block;
          width: 100%;
          padding: 10px 0;
          text-align: center;
          font-size: 13px;
          font-weight: 800;
          color: #ffffff !important; /* 인앱 브라우저 기본 파란색 방어 */
          text-decoration: none !important;
          -webkit-appearance: none; /* iOS 등 기본 스타일 제거 */
        }

        /* 클릭 시 반응성 보강 */
        .inapp-banner-cta:active {
          opacity: 0.8;
          transform: translateY(1px);
        }

        @media (max-width: 640px) {
          .inapp-stack {
            top: 60px;
          }
          .inapp-banner-message {
            font-size: 12.5px;
            padding: 11px 12px;
          }
          .inapp-banner--cta .inapp-banner-cta {
            padding: 11px 0;
            font-size: 12.5px;
          }
        }
      `}</style>
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
    <div className="inapp-gate-overlay" role="dialog" aria-modal="true" aria-label="접속 안내">
      {stage >= 1 && (
        <div className="inapp-gate-bubble" aria-live="polite">
          {speechText.split("\n").map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}

      <img
        src="/characters/notice/suriminotice01.png"
        alt="Surimi"
        className={`inapp-gate-surimi ${showSurimi ? "show" : ""}`}
      />
      <img
        src="/characters/notice/tosilnotice01.png"
        alt="Tosil"
        className={`inapp-gate-tosil ${showTosil ? "show" : ""}`}
      />

      {stage >= 4 && (
        <div className="inapp-gate-actions">
          <button type="button" className="primary" onClick={goToGuide}>
            안내 보고 정상 브라우저로 열기
          </button>
          <button type="button" onClick={browseOnly}>
            그냥 둘러보기
          </button>
        </div>
      )}

      <style jsx>{`
        .inapp-gate-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(2px);
          z-index: 1000;
        }

        .inapp-gate-surimi,
        .inapp-gate-tosil {
          position: fixed;
          bottom: 0;
          width: 280px;
          max-width: 38vw;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 280ms ease, transform 280ms ease;
          pointer-events: none;
        }

        .inapp-gate-surimi {
          left: 24px;
        }

        .inapp-gate-tosil {
          right: 24px;
        }

        .inapp-gate-surimi.show,
        .inapp-gate-tosil.show {
          opacity: 1;
          transform: translateY(0);
        }

        .inapp-gate-bubble {
          position: absolute;
          top: 12vh;
          left: 50%;
          transform: translateX(-50%);
          max-width: 420px;
          background: #fff;
          border-radius: 20px;
          padding: 18px 22px;
          font-size: 16px;
          line-height: 1.5;
          color: #171717;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
          animation: bubble-in 260ms ease both;
        }

        .inapp-gate-bubble::after {
          content: "";
          position: absolute;
          left: 60px;
          bottom: -14px;
          border-width: 14px;
          border-style: solid;
          border-color: #fff transparent transparent transparent;
        }

        .inapp-gate-bubble p {
          margin: 0;
          white-space: pre-line;
        }

        .inapp-gate-actions {
          position: fixed;
          left: 50%;
          bottom: 18vh;
          transform: translateX(-50%);
          width: min(92vw, 420px);
          display: flex;
          flex-direction: column;
          gap: 8px;
          animation: bubble-in 260ms ease both;
        }

        .inapp-gate-actions button {
          width: 100%;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #fff;
          color: #171717;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.2;
          padding: 12px 14px;
        }

        .inapp-gate-actions button.primary {
          border-color: #111827;
          background: #111827;
          color: #fff;
        }

        @keyframes bubble-in {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @media (max-width: 768px) {
          .inapp-gate-surimi,
          .inapp-gate-tosil {
            width: 210px;
            max-width: 46vw;
          }

          .inapp-gate-surimi {
            left: 8px;
          }

          .inapp-gate-tosil {
            right: 8px;
          }

          .inapp-gate-bubble {
            width: min(92vw, 420px);
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}