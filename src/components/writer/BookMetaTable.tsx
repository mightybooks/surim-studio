import type { WriterBook } from "@/data/writer-books";

const rows = [
  { key: "author", label: "저자" },
  { key: "publisher", label: "출판사" },
  { key: "publishedAt", label: "발행일" },
  { key: "isbn", label: "ISBN" },
  { key: "trimSize", label: "판형" },
  { key: "pageCount", label: "쪽수" },
  { key: "price", label: "정가" },
  { key: "category", label: "분야" },
] as const;

function formatPublishedAt(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ko-KR").format(price)}원`;
}

function getValue(book: WriterBook, key: (typeof rows)[number]["key"]) {
  switch (key) {
    case "publishedAt":
      return formatPublishedAt(book.publishedAt);
    case "pageCount":
      return `${book.pageCount}쪽`;
    case "price":
      return formatPrice(book.price);
    case "category":
      return book.category.join(", ");
    default:
      return String(book[key]);
  }
}

export default function BookMetaTable({ book }: { book: WriterBook }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white">
      <dl className="divide-y divide-zinc-100">
        {rows.map((row) => (
          <div
            key={row.key}
            className="grid gap-2 px-5 py-4 sm:grid-cols-[120px_1fr] sm:gap-4"
          >
            <dt className="text-sm font-medium text-zinc-500">{row.label}</dt>
            <dd className="text-zinc-800">{getValue(book, row.key)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
