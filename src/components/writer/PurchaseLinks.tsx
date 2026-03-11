import type { WriterBook } from "@/data/writer-books";

type PurchaseLinkItem = {
  label: string;
  href: string;
};

function getPurchaseLinkItems(book: WriterBook): PurchaseLinkItem[] {
  return [
    { label: "교보문고", href: book.purchaseLinks.kyobo ?? "" },
    { label: "알라딘", href: book.purchaseLinks.aladin ?? "" },
    { label: "예스24", href: book.purchaseLinks.yes24 ?? "" },
  ].filter((item) => Boolean(item.href));
}

export default function PurchaseLinks({ book }: { book: WriterBook }) {
  const links = getPurchaseLinkItems(book);

  return (
    <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-emerald-800">구매처 링크</h2>
        <p className="text-sm text-zinc-500">
          이 페이지는 서지 정보용 페이지이며, 구매는 외부 판매처에서 진행된다.
        </p>
      </div>

      <div className="space-y-3">
        {book.officialLink ? (
          <a
            href={book.officialLink}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900 hover:bg-emerald-100"
          >
            공식 판매 페이지 보기
          </a>
        ) : null}

        {links.length > 0 ? (
          <ul className="space-y-2 text-sm text-zinc-700">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">등록된 외부 구매처 링크가 없다.</p>
        )}
      </div>
    </div>
  );
}
