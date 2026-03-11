import Link from "next/link";
import type { WriterBook } from "@/data/writer-books";

function formatPublishedAt(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default function BookListItem({ book }: { book: WriterBook }) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm shadow-emerald-50">
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm text-zinc-500">{book.publisher}</p>
          <h2 className="text-2xl font-semibold text-emerald-900">
            <Link href={`/writer/books/${book.isbn}`} className="hover:underline">
              {book.title}
            </Link>
          </h2>
        </div>

        <dl className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-600">
          <div>
            <dt className="inline font-medium text-zinc-700">발행일</dt>
            <dd className="ml-2 inline">{formatPublishedAt(book.publishedAt)}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-zinc-700">분야</dt>
            <dd className="ml-2 inline">{book.category.join(", ")}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-zinc-700">ISBN</dt>
            <dd className="ml-2 inline">{book.isbn}</dd>
          </div>
        </dl>

        <p
          className="text-zinc-700 leading-7"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {book.description.replace(/\n+/g, " ")}
        </p>
      </div>

      <div className="mt-5">
        <Link
          href={`/writer/books/${book.isbn}`}
          className="text-sm font-medium text-emerald-800 underline underline-offset-4"
        >
          도서 정보 보기
        </Link>
      </div>
    </article>
  );
}
