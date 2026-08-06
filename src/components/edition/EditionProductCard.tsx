import Link from "next/link";
import Image from "next/image";
import {
  type EditionProduct,
  getDisplayPrice,
  getProductDetailHref,
} from "@/lib/editionProducts";
import { formatMajorMoney } from "@/lib/formatMoney";

export default function EditionProductCard({
  product,
}: {
  product: EditionProduct;
}) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-4 shadow-sm">
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs uppercase tracking-wide text-zinc-500">{product.type}</p>
        <h2 className="text-lg font-semibold text-emerald-900">{product.name}</h2>
        <p className="text-sm text-zinc-600">{product.summary}</p>
        <div className="space-y-1">
          <p className="text-base font-semibold text-zinc-900">{getDisplayPrice(product)}</p>
          {product.priceUsd !== undefined && product.priceUsd !== null && (
            <p className="text-sm text-zinc-500">
              {formatMajorMoney({ amount_major: product.priceUsd, currency: "USD" })} USD
            </p>
          )}
        </div>
      </div>

      <Link
        href={getProductDetailHref(product)}
        className="mt-4 inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC]"
      >
        상세보기
      </Link>
    </article>
  );
}
