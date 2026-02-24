"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const WELCOME_DELAY_MS = 900;

export default function WelcomeClient({ next }: { next: string }) {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace(next);
    }, WELCOME_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [next, router]);

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center px-6 py-12 text-center">
      <div className="animate-fade-in rounded-2xl border border-[color:var(--border)] bg-white/70 p-6 shadow-sm">
        <Image
          src="/join.webp"
          alt="수림 스튜디오 환영 이미지"
          width={720}
          height={420}
          priority
          className="h-auto w-full rounded-xl object-cover opacity-0 [animation:fadein_500ms_ease-out_forwards]"
        />
      </div>

      <h1 className="mt-6 text-xl font-semibold leading-relaxed sm:text-2xl">
        빛나는 문장의 숲, 수림 스튜디오로 오신 걸 환영합니다.
      </h1>
      <p className="mt-2 text-sm text-[color:var(--fg)]/70">
        대시보드를 준비하고 있습니다.
      </p>

      <div className="mt-8 w-full max-w-xs space-y-3">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-900" />
        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div className="h-full w-1/2 animate-[loading_700ms_ease-in-out_infinite] rounded-full bg-neutral-900" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loading {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(260%);
          }
        }
      `}</style>
    </main>
  );
}
