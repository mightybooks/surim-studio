import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadingProgress from "@/components/ReadingProgress";
import BookJsonLd from "@/components/writer/BookJsonLd";
import BookMetaTable from "@/components/writer/BookMetaTable";
import PurchaseLinks from "@/components/writer/PurchaseLinks";
import { getWriterBookByIsbn, writerBooks } from "@/data/writer-books";

const SITE_URL = "https://surimstudio.com";

function getBookUrl(isbn: string) {
  return `${SITE_URL}/writer/books/${isbn}`;
}

export function generateStaticParams() {
  return writerBooks.map((book) => ({
    isbn: book.isbn,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ isbn: string }>;
}): Promise<Metadata> {
  const { isbn } = await params;
  const book = getWriterBookByIsbn(isbn);

  if (!book) {
    return {
      title: "Book Not Found | Mun Surim",
    };
  }

  return {
    title: `${book.title} | Mun Surim`,
    description: `${book.title}의 기본 도서 정보와 구매처 링크.`,
    alternates: {
      canonical: getBookUrl(book.isbn),
    },
  };
}

function ParagraphBlock({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-emerald-800">{title}</h2>
      <div className="space-y-4 text-zinc-700 leading-8">
        {content.split("\n\n").map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default async function WriterBookDetailPage({
  params,
}: {
  params: Promise<{ isbn: string }>;
}) {
  const { isbn } = await params;
  const book = getWriterBookByIsbn(isbn);

  if (!book) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <BookJsonLd book={book} />
      <main className="mx-auto max-w-3xl space-y-10 p-8">
        <header className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Book Record</p>
            <h1 className="text-3xl font-semibold text-emerald-900">{book.title}</h1>
            <p className="text-zinc-600">
              {book.author} · {book.publisher}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-zinc-500">
            <span>ISBN {book.isbn}</span>
            <span>분야 {book.category.join(", ")}</span>
          </div>
        </header>

        <BookMetaTable book={book} />
        <ParagraphBlock title="책소개" content={book.description} />
        <ParagraphBlock title="요약 / 본문 일부" content={book.excerpt} />
        <PurchaseLinks book={book} />

        <section className="border-t border-zinc-200 pt-6 text-sm text-zinc-600">
          <div className="flex flex-wrap gap-4">
            <Link href="/writer/books" className="underline underline-offset-4">
              저서 목록으로 돌아가기
            </Link>
            {book.officialLink ? (
              <a
                href={book.officialLink}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                공식 판매 페이지 보기
              </a>
            ) : null}
          </div>
        </section>
      </main>
    </>
  );
}
