"use client";

import { useEffect, useMemo, useState } from "react";
import InAppBrowserNotice from "@/components/InAppBrowserNotice";
import { isInAppBrowser } from "@/lib/inAppBrowser";

const SEEN_KEY = "surim_inapp_seen_v1";

const STAGE_TIMERS_MS = {
  surimi: 300,
  speech1: 1400,
  tosil: 2600,
  speech2: 3300,
  speech3: 4800,
  buttons: 6000,
} as const;

type Stage = 0 | 1 | 2 | 3 | 4;

export default function InAppGate() {
  const [ua, setUa] = useState("");
  const [ready, setReady] = useState(false);
  const [firstVisit, setFirstVisit] = useState(false);
  const [showSurimi, setShowSurimi] = useState(false);
  const [showTosil, setShowTosil] = useState(false);
  const [stage, setStage] = useState<Stage>(0);

  const inApp = useMemo(() => {
    if (!ua) return false;
    return isInAppBrowser(ua);
  }, [ua]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userAgent = navigator.userAgent || "";
    const hasSeen = localStorage.getItem(SEEN_KEY) !== null;

    setUa(userAgent);
    setFirstVisit(!hasSeen);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !inApp || !firstVisit) return;

    localStorage.setItem(SEEN_KEY, "1");

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
  }, [firstVisit, inApp, ready]);

  if (!ready || !inApp) return null;
  if (!firstVisit) return <InAppBrowserNotice />;

  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}${window.location.search}${window.location.hash}`
      : "/";

  const speechText =
    stage >= 3
      ? "브라우저로 열어도\n댓글이나 결제는\n로그인 + 이메일 인증이 필요합니다."
      : stage >= 2
        ? "이렇게 열리면\n로그인이나 결제가 가끔 꼬여요.\n브라우저에서 열어주세요."
        : "잠깐!\n지금 스레드/인스타/카톡에서 링크 눌러 바로 들어오셨나요?\n그건 좀 곤란해요!";

  function closeOverlay() {
    setFirstVisit(false);
  }

  function reopenInBrowser() {
    localStorage.setItem(SEEN_KEY, "1");
    const popup = window.open(currentUrl, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = currentUrl;
      return;
    }
    window.setTimeout(() => {
      window.location.href = currentUrl;
    }, 400);
  }

  function moveToLogin() {
    localStorage.setItem(SEEN_KEY, "1");
    window.location.href = `/login?next=${encodeURIComponent(
      `${window.location.pathname}${window.location.search}${window.location.hash}`,
    )}`;
  }

  return (
    <div className="inapp-gate-overlay" role="dialog" aria-modal="true" aria-label="브라우저 안내">
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
          <button type="button" className="primary" onClick={reopenInBrowser}>
            브라우저에서 다시 열기
          </button>
          <button type="button" onClick={moveToLogin}>
            로그인하고 전체 이용하기
          </button>
          <button type="button" onClick={closeOverlay}>
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
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
          color: #171717;
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
