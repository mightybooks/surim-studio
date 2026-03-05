// src/components/funding/FundingDetailPage.tsx

import React from "react";

import PurchaseSummary from "@/components/shop/PurchaseSummary";
import ProductDescription from "@/components/shop/ProductDescription";
import ProductInfoTable from "@/components/shop/ProductInfoTable";
import ProductNotice from "@/components/shop/ProductNotice";
import ProductPolicyBlock from "@/components/shop/ProductPolicyBlock";

import FundingTrailerSection from "./FundingTrailerSection";
import FundingProgressSection from "./FundingProgressSection";
import InAppGate from "@/components/inapp/InAppGate";

export default function FundingDetailPage({
  product,
  children,
  targetBooks = 150,
  source = "funding_500",
  completionNotice,
  completionNoticeHref = "/projects#funding-archive",
  fundingActive = true, // ✅ 추가 (기본 진행중)
}: {
  product: any;
  children?: React.ReactNode;
  targetBooks?: number;
  source?: string;
  completionNotice?: string;
  completionNoticeHref?: string;
  fundingActive?: boolean;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 space-y-12">
      {completionNotice && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p>{completionNotice}</p>
          <a
            href={completionNoticeHref}
            className="mt-2 inline-flex font-medium underline underline-offset-2"
          >
            Projects에서 아카이브 보기
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-2xl border overflow-hidden bg-white">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full object-cover"
          />
        </div>

        <div className="space-y-3">
          <InAppGate />

        {/* ✅ 전자결제 우회(현금/계좌이체) 안내: 결제 CTA 바로 위가 최적 */}
        {fundingActive !== false && (
          <div className="rounded-xl border bg-neutral-50 p-3 text-sm text-neutral-700">
            <p className="font-medium">전자결제가 어려우신가요?</p>
            <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
              일부 인앱 브라우저 환경에서는 결제가 정상적으로 진행되지 않을 수 있습니다.
              이 경우 아래 신청서로 현금(계좌이체) 참여가 가능합니다.
            </p>
            <a
              href="https://forms.gle/dzSggGdWvh2Vn7pi6"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex text-xs font-medium underline underline-offset-2"
            >
              펀딩 참여 신청서(구글폼) 열기
            </a>
          </div>
        )}

        {fundingActive === false ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
            <p className="text-sm font-medium text-amber-900">
              본 펀딩은 종료되어 결제가 비활성화되었습니다.
            </p>
            <p className="mt-1 text-xs text-amber-800">
              기록은 아카이브에서 확인하시고, 구매는 수림서가/서점 유통 경로를 이용해 주세요.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={completionNoticeHref}
                className="rounded-xl bg-amber-600 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-700"
              >
                공식 기록 보기
              </a>
              <a
                href="/edition"
                className="rounded-xl border border-amber-300 bg-white px-5 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
              >
                수림서가 이동
              </a>
            </div>
          </div>
        ) : (
          <PurchaseSummary
            product={product}
            ctaLabel="펀딩 참여하기"
            extraQuery={{ source }}
          />
        )}
        </div>
      </div>

      <FundingProgressSection
        source={source}
        targetBooks={targetBooks}
        maxQtyPerOrder={100}
      />

      <FundingTrailerSection />

      {children}

      <ProductDescription product={product} />
      <ProductInfoTable product={product} />
      <ProductNotice type={product.type} />
      <ProductPolicyBlock />
    </section>
  );
}
