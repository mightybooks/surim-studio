// src/components/shop/ProductDetailPage.tsx

import Link from "next/link";
import { formatMoney } from "@/lib/formatMoney";
import PurchaseSummary from "./PurchaseSummary";
import ProductDescription from "./ProductDescription";
import ProductInfoTable from "./ProductInfoTable";
import ProductNotice from "./ProductNotice";
import ProductPolicyBlock from "./ProductPolicyBlock";

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export default function ProductDetailPage({
  product,
  ctaLabel,
  extraQuery,
  children,
}: {
  product: any;
  ctaLabel?: string;
  extraQuery?: Record<string, string>;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 space-y-12">

      {/* 상단: 이미지 + 요약 */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="reveal-up rounded-2xl border overflow-hidden bg-white" style={revealStyle(300)}>
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full object-cover"
          />
        </div>

        <div className="reveal-up space-y-3" style={revealStyle(180)}>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Price</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">
              {formatMoney({
                amount_minor: Number(product.price ?? 0),
                currency: "KRW",
              })}
            </p>
            {product.priceUsd !== undefined && product.priceUsd !== null && (
              <p className="mt-1 text-sm text-zinc-500">≈ ${product.priceUsd} USD</p>
            )}
          </div>

          <div className="rounded-xl border border-zinc-200 bg-neutral-50 p-3 text-sm text-neutral-700">
            <p className="font-medium">수림 스튜디오는 로그인 기반 플랫폼입니다.</p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-600">
              둘러보기는 가능하지만 로그인, 메일 인증, 결제는 일반 브라우저(Safari/Chrome)에서 진행할 때
              가장 안정적입니다.
            </p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs">
              <Link href="/notice/login-required" className="underline underline-offset-2">
                로그인 기반 정책
              </Link>
              <Link href="/notice/email-verification" className="underline underline-offset-2">
                메일 인증 안내
              </Link>
              <Link href="/notice/inapp-safety" className="underline underline-offset-2">
                인앱 이용 안내
              </Link>
            </div>
          </div>

          <PurchaseSummary product={product} ctaLabel={ctaLabel} extraQuery={extraQuery} />
        </div>
      </div>

      {/* 상단 소개 문구 (선택적) */}
      <div className="reveal-up" style={revealStyle(420)}>{children}</div>

      {/* 상품 설명 (이미지) */}
      <div className="reveal-up" style={revealStyle(520)}><ProductDescription product={product} /></div>

      {/* 구성 / 규격 */}
      <ProductInfoTable product={product} />

      {/* 주의사항 */}
      <ProductNotice type={product.type} />

      {/* 하단 정책 */}
      <ProductPolicyBlock />
    </section>
  );
}
