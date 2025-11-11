// src/app/library/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type React from "react";
import { BOOKS } from "../_data";

/** 라우팅 동작을 dev에서 즉시 반영 */
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

/** slug 정규화 유틸: 한 번만 확실하게 */
function norm(input: unknown): string {
  if (typeof input !== "string") return "";
  try {
    return decodeURIComponent(input)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
  } catch {
    // 이상한 인코딩이 들어와도 조용히 빈값
    return "";
  }
}

/** 공통 검색 함수 */
function findBookBySlug(slugRaw: unknown) {
  const slug = norm(slugRaw);
  if (!slug) return null;
  return BOOKS.find(b => norm((b as any).slug) === slug) ?? null;
}

/** 책별 메타데이터 (타이틀/OG) */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const book = findBookBySlug(params?.slug);
  if (!book) {
    return {
      title: "도서를 찾을 수 없습니다",
      description: "요청하신 도서를 찾을 수 없습니다.",
    };
  }

  const titleBase = `${book.title}${book.subtitle ? " · " + book.subtitle : ""}`;
  const description =
    book.description?.slice(0, 140) ??
    `${book.title} — ${book.author}${book.imprint ? " · " + book.imprint : ""}`;

  return {
    title: titleBase,
    description,
    openGraph: {
      title: titleBase,
      description,
      type: "article",
      images: book.cover ? [{ url: book.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: titleBase,
      description,
      images: book.cover ? [book.cover] : undefined,
    },
  };
}

export default function LibraryBookPage({
  params,
}: {
  params: { slug: string };
}): React.ReactElement {
  // 디버그 로그는 남겨두되 서버 콘솔만 찍힘
  console.log("LIB DEBUG params =", params);

  const book = findBookBySlug(params?.slug);
  if (!book) notFound();

  const title = book.title ?? "제목 미정";
  const subtitle = book.subtitle ?? "";
  const author = book.author ?? "저자 미상";
  const imprint = (book as any).imprint ?? "";
  const isbn = (book as any).isbn ?? "";

  const stores: Array<{ key: string; label: string }> = Array.isArray((book as any).stores)
    ? (book as any).stores
    : [];

  const related: Array<{ href: string; title: string; desc?: string }> = Array.isArray(
    (book as any).related
  )
    ? (book as any).related
    : [];

  const toc: string[] = Array.isArray((book as any).toc) ? (book as any).toc : [];

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* 상단 정보 영역 */}
      <section className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl shadow bg-zinc-100">
          {book.cover ? (
            <Image
              src={book.cover}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 280px"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-zinc-400">
              표지 준비중
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-emerald-900">{title}</h1>
          {subtitle ? <p className="text-lg text-zinc-700">{subtitle}</p> : null}
          <p className="text-sm text-zinc-500">
            저자 {author}
            {imprint ? <> · {imprint}</> : null}
            {isbn ? <> · {isbn}</> : null}
          </p>

          {stores.length > 0 ? (
            <div className="flex flex-wrap gap-3 pt-2">
              {stores.map(s => (
              <Link
              key={s.key}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
              {s.label}에서 구매
              </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* 본문 정보 영역 */}
      <section className="prose prose-zinc max-w-none">
        <h2>책 소개</h2>
        {book.description ? (
          <p>{book.description}</p>
        ) : (
          <p>소개 문구 준비중입니다.</p>
        )}

        {toc.length > 0 ? (
          <>
            <h3>목차(발췌)</h3>
            <ul>
              {toc.map(i => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </>
        ) : null}
      </section>

      {/* 관련 콘텐츠 */}
      {related.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-900">관련 콘텐츠</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map(r => (
              <Link
                key={r.href}
                href={r.href}
                className="block rounded-xl border border-zinc-200 p-4 hover:border-emerald-300 hover:bg-emerald-100 hover:shadow-md transition"
                >
                <p className="text-emerald-800 font-medium">{r.title}</p>
                <p className="text-sm text-zinc-600 mt-1">{r.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
