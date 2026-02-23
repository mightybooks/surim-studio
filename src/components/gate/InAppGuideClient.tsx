"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  detectDevicePlatform,
  DevicePlatform,
  INAPP_GATE_PASSED_KEY,
  INAPP_LAST_INTENDED_URL_KEY,
  isSafeInternalRedirect,
} from "@/lib/inAppBrowser";

function decodeRedirect(rawValue?: string) {
  if (!rawValue) return null;
  try {
    return decodeURIComponent(rawValue);
  } catch {
    return rawValue;
  }
}

async function copyTextWithFallback(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
}

export default function InAppGuideClient({
  redirectParam,
}: {
  redirectParam?: string;
}) {
  const router = useRouter();
  const [platform, setPlatform] = useState<DevicePlatform>(detectDevicePlatform());
  const [toast, setToast] = useState<string | null>(null);

  const redirectTarget = useMemo(() => {
    const fromQuery = decodeRedirect(redirectParam);
    if (isSafeInternalRedirect(fromQuery)) return fromQuery;

    if (typeof window !== "undefined") {
      const fromSession = sessionStorage.getItem(INAPP_LAST_INTENDED_URL_KEY);
      if (isSafeInternalRedirect(fromSession)) return fromSession;
    }

    return "/";
  }, [redirectParam]);

  const externalUrl = useMemo(() => {
    if (typeof window === "undefined") return redirectTarget;
    return `${window.location.origin}${redirectTarget}`;
  }, [redirectTarget]);

  const stepsByPlatform: Record<DevicePlatform, string[]> = {
    ios: [
      "하단 공유 버튼을 누릅니다.",
      '"Safari에서 열기"를 선택합니다.',
      "복사한 링크를 주소창에 붙여넣어 이동합니다.",
    ],
    android: [
      "우측 상단 더보기 버튼을 누릅니다.",
      '"Chrome에서 열기"를 선택합니다.',
      "복사한 링크를 주소창에 붙여넣어 이동합니다.",
    ],
    other: [
      "현재 링크를 복사합니다.",
      "일반 브라우저(Safari/Chrome)를 실행합니다.",
      "주소창에 링크를 붙여넣어 이동합니다.",
    ],
  };

  function markGatePassed() {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(INAPP_GATE_PASSED_KEY, "true");
    sessionStorage.setItem(INAPP_LAST_INTENDED_URL_KEY, redirectTarget);
  }

  function handleBrowseHere() {
    markGatePassed();
    router.replace(redirectTarget);
  }

  async function handleOpenNormalBrowser() {
    markGatePassed();
    const copied = await copyTextWithFallback(externalUrl);

    if (copied) {
      setToast("링크를 복사했습니다. Safari/Chrome 주소창에 붙여넣어 주세요.");
    } else {
      setToast("자동 복사에 실패했습니다. 링크를 길게 눌러 직접 복사해 주세요.");
      window.prompt("아래 주소를 복사해 일반 브라우저에서 열어 주세요.", externalUrl);
    }

    window.setTimeout(() => setToast(null), 2600);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-b from-[#F7F8F3] to-[#FFFDF9] shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        <header className="border-b border-emerald-100 bg-[radial-gradient(circle_at_top,#E5EFE4_0%,#F7F8F3_60%)] px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-800">SURIM STUDIO</p>
          <p className="mt-2 text-sm text-zinc-600">로그인 기반 창작 플랫폼 · 기록이 남는 공간</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-emerald-950 sm:text-4xl">
            인앱 브라우저로 접속하셨습니다
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-700">
            이 환경에서는 로그인, 메일 인증, 결제가 불안정할 수 있습니다.
          </p>
        </header>

        <section className="space-y-8 px-6 py-8 sm:px-10">
          <section className="rounded-2xl border border-zinc-200 bg-white/80 p-5">
            <h2 className="text-lg font-semibold text-zinc-900">왜 로그인 기반인가</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">
              수림 스튜디오는 기록, 아카이브, 참여, 구매 흐름을 계정 기준으로 연결합니다.
              둘러보기는 자유롭게 열어두되, 실제 기능은 로그인 기반으로 안정성을 보장합니다.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white/80 p-5">
            <h2 className="text-lg font-semibold text-zinc-900">인앱에서 생길 수 있는 문제</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>세션 끊김</li>
              <li>인증 복귀 실패</li>
              <li>결제 리다이렉트 차단</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white/80 p-5">
            <h2 className="text-lg font-semibold text-zinc-900">해결 방법 (기기별 안내)</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPlatform("ios")}
                className={`rounded-full border px-4 py-1.5 text-sm ${
                  platform === "ios"
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-zinc-300 bg-white text-zinc-700"
                }`}
              >
                iOS
              </button>
              <button
                type="button"
                onClick={() => setPlatform("android")}
                className={`rounded-full border px-4 py-1.5 text-sm ${
                  platform === "android"
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-zinc-300 bg-white text-zinc-700"
                }`}
              >
                Android
              </button>
            </div>
            <ol className="mt-4 space-y-2 text-sm text-zinc-700">
              {stepsByPlatform[platform].map((step, index) => (
                <li key={step}>
                  {index + 1}. {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white/80 p-5">
            <p className="text-sm font-medium text-zinc-900">관련 공지</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <Link href="/notice/inapp-safety" className="text-zinc-700 underline underline-offset-4">
                인앱 브라우저에서 안전하게 이용하기
              </Link>
              <Link href="/notice/login-required" className="text-zinc-700 underline underline-offset-4">
                수림 스튜디오는 로그인 기반 플랫폼입니다
              </Link>
              <Link href="/notice/email-verification" className="text-zinc-700 underline underline-offset-4">
                메일 인증이 필요한 이유
              </Link>
            </div>
          </section>
        </section>
      </div>

      <div className="sticky bottom-4 mt-6 grid gap-3 rounded-2xl border border-zinc-300 bg-white/95 p-4 shadow-lg backdrop-blur sm:grid-cols-2">
        <button
          type="button"
          onClick={() => void handleOpenNormalBrowser()}
          className="rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
        >
          정상 브라우저로 열기
        </button>
        <button
          type="button"
          onClick={handleBrowseHere}
          className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          그냥 둘러볼게요
        </button>
      </div>

      {toast && (
        <div className="fixed inset-x-0 bottom-24 mx-auto w-fit max-w-[calc(100%-2rem)] rounded-full bg-zinc-900 px-4 py-2 text-xs text-white">
          {toast}
        </div>
      )}
    </main>
  );
}
