"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { isInAppBrowser } from "@/lib/inAppBrowser";

const CHARACTER_SEEN_KEY = "surim_inapp_character_seen_v1";
const GUIDE_PATH = "/notice/inapp-guide";

const STAGE_TIMERS_MS = {
  surimi: 300,
  speech1: 1800,
  tosil: 3600,
  speech2: 5200,
  speech3: 7600,
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    setInApp(isInAppBrowser(window.navigator.userAgent || ""));
    setSeen(localStorage.getItem(CHARACTER_SEEN_KEY) === "1");
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

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [inApp, mounted, seen]);

  const currentRelativeUrl = useMemo(() => {
    const query = searchParams?.toString() || "";
    return `${pathname || "/"}${query ? `?${query}` : ""}${hash}`;
  }, [hash, pathname, searchParams]);

  const currentAbsoluteUrl = useMemo(() => {
    if (typeof window === "undefined") return currentRelativeUrl;
    return `${window.location.origin}${currentRelativeUrl}`;
  }, [currentRelativeUrl]);

  const guideHref = `${GUIDE_PATH}?redirect=${encodeURIComponent(currentRelativeUrl)}`;

  function markSeen() {
    localStorage.setItem(CHARACTER_SEEN_KEY, "1");
    setSeen(true);
  }

  function openInBrowser() {
    markSeen();
    const popup = window.open(currentAbsoluteUrl, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = currentAbsoluteUrl;
      return;
    }
    window.setTimeout(() => {
      window.location.href = currentAbsoluteUrl;
    }, 350);
  }

  function goToLogin() {
    markSeen();
    window.location.href = `/login?next=${encodeURIComponent(currentRelativeUrl)}`;
  }

  function browseOnly() {
    markSeen();
  }

  if (!mounted || !inApp) return null;
  if (pathname === GUIDE_PATH) return null;

  if (seen) {
    return (
      <aside className="inapp-banner" role="status" aria-live="polite">
        <p>카톡/인스타/스레드에서 바로 열면 로그인·결제가 꼬일 수 있습니다.</p>
        <div className="inapp-banner-actions">
          <Link href={guideHref}>자세히</Link>
          <button type="button" onClick={openInBrowser}>
            정상 브라우저로 열기
          </button>
        </div>

        <style jsx>{`
          .inapp-banner {
            position: fixed;
            left: 50%;
            top: 68px;
            z-index: 60;
            width: min(96vw, 760px);
            transform: translateX(-50%);
            border: 1px solid #e5e7eb;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
            padding: 8px 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            font-size: 12px;
            line-height: 1.3;
          }

          .inapp-banner p {
            margin: 0;
            color: #262626;
          }

          .inapp-banner-actions {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
          }

          .inapp-banner a {
            text-decoration: underline;
            text-underline-offset: 2px;
            color: #111827;
            font-weight: 600;
          }

          .inapp-banner button {
            border: 1px solid #d1d5db;
            border-radius: 8px;
            background: #fff;
            color: #111827;
            padding: 4px 8px;
            font-size: 11px;
            font-weight: 600;
            line-height: 1.2;
          }

          @media (max-width: 640px) {
            .inapp-banner {
              top: 60px;
              padding: 8px;
              gap: 8px;
            }

            .inapp-banner-actions button {
              padding: 4px 6px;
            }
          }
        `}</style>
      </aside>
    );
  }

  const speechText =
    stage >= 3
      ? "브라우저로 열어도\n댓글이나 결제는\n로그인 + 이메일 인증이 필요합니다."
      : stage >= 2
        ? "이렇게 열리면\n로그인이나 결제가 가끔 꼬여요.\n브라우저에서 열어주세요."
        : "잠깐!\n지금 스레드/인스타/카톡에서 링크 눌러 바로 들어오셨나요?\n그건 좀 곤란해요!";

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
          <button type="button" className="primary" onClick={openInBrowser}>
            정상 브라우저로 열기
          </button>
          <button type="button" onClick={goToLogin}>
            로그인하고 전체 이용하기
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
          font-weight: 600;
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
