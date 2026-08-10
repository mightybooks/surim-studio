// src/app/order/page.tsx 

import { Suspense } from "react";
import { notFound } from "next/navigation";
import OrderForm from "@/components/order/OrderForm";
import AccessRequiredCard from "@/components/auth/AccessRequiredCard";
import { getAdminContext } from "@/lib/securityServer";
import { supabaseServerPublic } from "@/lib/supabase/server-public";
import {
  getOrderCatalogProduct,
  type Currency,
  type PaymentGateway,
} from "@/lib/orderCatalog";

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const firstParam = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const productId = firstParam(query.productId) ?? "";
  if (!productId) notFound();

  const catalogProduct = getOrderCatalogProduct(productId);
  if (!catalogProduct) notFound();

  const adminContext = catalogProduct.internalOnly ? await getAdminContext() : null;
  if (catalogProduct.internalOnly && !adminContext?.ok) notFound();

  if (!catalogProduct.purchasable) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-sm text-zinc-700">판매가 종료된 상품입니다.</p>
      </main>
    );
  }

  const currencyParam = String(firstParam(query.currency) ?? "KRW").toUpperCase();
  const pgParam = String(firstParam(query.pg) ?? "inicis").toLowerCase();
  const currency =
    currencyParam === "KRW" || currencyParam === "USD"
      ? (currencyParam as Currency)
      : null;
  const pg =
    pgParam === "inicis" || pgParam === "paypal"
      ? (pgParam as PaymentGateway)
      : null;
  const catalogPrice = currency ? catalogProduct.prices[currency] : undefined;
  const isPaymentCombinationAllowed =
    currency !== null &&
    pg !== null &&
    catalogPrice !== undefined &&
    catalogProduct.allowedPgs.includes(pg) &&
    ((currency === "USD") === (pg === "paypal"));

  if (!isPaymentCombinationAllowed) {
    const isIntlAttempt = currencyParam === "USD" || pgParam === "paypal";
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-sm text-zinc-700">
          {isIntlAttempt && !catalogProduct.allowedPgs.includes("paypal")
            ? "이 상품은 국내 배송 전용입니다."
            : "현재 주문할 수 없는 결제 방식입니다."}
        </p>
      </main>
    );
  }

  let user = adminContext?.ok ? adminContext.user : null;
  if (!catalogProduct.internalOnly) {
    const supabase = await supabaseServerPublic();
    const authResult = await supabase.auth.getUser();
    user = authResult.data.user;
  }

  const currentParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => currentParams.append(key, item));
      return;
    }
    if (typeof value === "string") currentParams.set(key, value);
  });
  const next = currentParams.toString() ? `/order?${currentParams.toString()}` : "/order";

  if (!user) {
    return <AccessRequiredCard mode="login" next={next} />;
  }

  if (!user.email_confirmed_at) {
    return <AccessRequiredCard mode="verify" next={next} />;
  }

  return (
    <Suspense fallback={null}>
      <OrderForm
        productId={catalogProduct.id}
        productName={catalogProduct.name}
        amountMinor={catalogPrice.unitAmountMinor}
        currency={currency}
        pg={pg}
        source={catalogProduct.source}
        isDigital={catalogProduct.isDigital}
        requiresShipping={catalogProduct.requiresShipping}
      />
    </Suspense>
  );
}
