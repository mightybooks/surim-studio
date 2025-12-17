// components/FictionViewer.tsx

import type { FictionEntry } from "./types";

type FictionViewerProps = {
  entry: FictionEntry | null;
};

function maskEmail(email: string) {
  const [id, domain] = email.split("@");
  if (!id || !domain) return "";
  const visible = id.slice(0, 2);
  return `${visible}****@${domain}`;
}

export function FictionViewer({ entry }: FictionViewerProps) {
  if (!entry) {
    return (
      <section className="mt-10 text-sm text-slate-400">
        아직 선택된 카드가 없습니다.
      </section>
    );
  }

  return (
    <section className="mt-10 flex justify-center">
      <article
        className="
          w-full max-w-[720px]
          rounded-2xl
          bg-white
          shadow-[0_12px_40px_rgba(0,0,0,0.08)]
          overflow-hidden
        "
      >
        {/* OG IMAGE */}
        <div className="w-full aspect-[1200/630] bg-slate-100">
          <img
            src={entry.ogImageSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        {/* TEXT */}
        <div className="px-6 py-6 flex flex-col gap-4">
          {/* TITLE */}
          <h1
            className="
              text-xl font-semibold
              leading-snug
            "
          >
            {entry.title}
          </h1>

          {/* AUTHOR (MASKED EMAIL) */}
          <p className="text-xs text-slate-400">
            작성자: {maskEmail(entry.email)}
          </p>

          {/* CONTENT */}
          <div
            className="
              text-sm leading-relaxed text-slate-800
              max-h-[18lh]
              overflow-y-auto
              whitespace-pre-wrap
              pr-1
            "
          >
            {entry.content}
          </div>

          {/* FUTURE INTERACTION AREA */}
          <div className="pt-4 border-t border-slate-200 text-xs text-slate-400">
            {/* 좋아요 / 댓글 자리 */}
          </div>
        </div>
      </article>
    </section>
  );
}
