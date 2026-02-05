// src/components/funding/FundingDetailPage.tsx

import React from "react";

import PurchaseSummary from "@/components/shop/PurchaseSummary";
import ProductDescription from "@/components/shop/ProductDescription";
import ProductInfoTable from "@/components/shop/ProductInfoTable";
import ProductNotice from "@/components/shop/ProductNotice";
import ProductPolicyBlock from "@/components/shop/ProductPolicyBlock";

import FundingProgressSection from "./FundingProgressSection";

export default function FundingDetailPage({
  product,
  children,
  targetBooks = 150,
  source = "funding_500",
}: {
  product: any;
  children?: React.ReactNode;
  targetBooks?: number;
  source?: string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 space-y-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-2xl border overflow-hidden bg-white">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full object-cover"
          />
        </div>

        <PurchaseSummary
          product={product}
          ctaLabel="펀딩 참여하기"
          extraQuery={{ source }}   // ✅ 여기만 핵심 수정
        />
      </div>

      <FundingProgressSection
        source={source}
        targetBooks={targetBooks}
        maxQtyPerOrder={100}
      />

      {children}

      <ProductDescription product={product} />
      <ProductInfoTable product={product} />
      <ProductNotice type={product.type} />
      <ProductPolicyBlock />
    </section>
  );
}
