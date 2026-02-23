import Link from "next/link";
import { NOTICE_ITEMS } from "./data";

export const metadata = {
  title: "Notice | Sulim Studio",
  description: "수림 스튜디오 정책, 이용 안내, 공지 로그를 확인할 수 있습니다.",
};

export default function NoticeIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Notice</p>
        <h1 className="text-3xl font-semibold text-emerald-950">SURIM STUDIO NOTICE</h1>
        <p className="text-zinc-600">
          운영 정책과 이용 가이드를 포함해 서비스 변화에 대한 상세 로그를 남깁니다.
        </p>
      </header>

      <ul className="space-y-5">
        {NOTICE_ITEMS.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/notice/${item.slug}`}
              className="block rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-medium text-emerald-800">
                  {item.category}
                </span>
                <span className="text-zinc-500">{item.publishedAt}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-emerald-950">{item.title}</h2>
              <p className="mt-2 leading-relaxed text-zinc-700">{item.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
