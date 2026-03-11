import type { Metadata } from "next";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";
import BookListItem from "@/components/writer/BookListItem";
import { writerBooks } from "@/data/writer-books";

export const metadata: Metadata = {
  title: "Books | Mun Surim",
  description: "문수림의 저서 목록과 기본 도서 정보를 확인할 수 있는 페이지.",
};

export default function WriterBooksPage() {
  return (
    <>
      <ReadingProgress />
      <main className="mx-auto max-w-3xl space-y-10 p-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Writer Archive</p>
          <h1 className="text-3xl font-semibold text-emerald-900">Books by Mun Surim</h1>
          <p className="text-zinc-600">
            문수림의 저서 목록과 각 도서의 기본 서지 정보를 모아 둔 아카이브 페이지.
          </p>
        </header>

        <section className="space-y-5">
          {writerBooks.map((book) => (
            <BookListItem key={book.isbn} book={book} />
          ))}
        </section>

        <section className="border-t border-zinc-200 pt-6 text-sm text-zinc-600">
          <Link href="/writer" className="underline underline-offset-4">
            Writer hub로 돌아가기
          </Link>
        </section>
      </main>
    </>
  );
}
