import { NEWS } from "../data"; // ← 경로 수정
import { notFound, redirect } from "next/navigation";

export default function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = NEWS.find((n) => n.slug === params.slug);
  if (!item) notFound(); 

  if (item.href) {
    redirect(item.href);
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-emerald-900">
          {item.title}
        </h1>
        {item.published_at && (
          <p className="text-sm text-zinc-500 mt-1">{item.published_at}</p>
        )}
      </header>

      <article className="prose prose-zinc max-w-none leading-relaxed">
        <p>{item.body}</p>
      </article>

      {item.cta && (
        <div className="pt-6">
          {/* 내부 링크면 Link 사용 권장, 외부면 <a> 유지 */}
          <a
            href={item.cta.href}
            className="inline-block text-sm text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg px-4 py-2 transition"
          >
            {item.cta.label}
          </a>
        </div>
      )}
    </main>
  );
}
