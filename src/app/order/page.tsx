// src/app/order/page.tsx 

import { Suspense } from "react";
import OrderForm from "@/components/order/OrderForm";
import AccessRequiredCard from "@/components/auth/AccessRequiredCard";
import { supabaseServerPublic } from "@/lib/supabase/server-public";
import { isGoodsProductId } from "@/lib/editionProducts";

export default async function OrderPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const firstParam = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const productId = firstParam(searchParams?.productId) ?? "";
  const currency = String(firstParam(searchParams?.currency) ?? "KRW").toUpperCase();
  const pg = String(firstParam(searchParams?.pg) ?? "").toLowerCase();
  const isGoodsIntlBlocked =
    isGoodsProductId(productId) && (currency === "USD" || pg === "paypal");

  const supabase = await supabaseServerPublic();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const currentParams = new URLSearchParams();
  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
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

  if (isGoodsIntlBlocked) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-sm text-zinc-700">이 상품은 국내 배송 전용입니다.</p>
      </main>
    );
  }

  return (
    <Suspense fallback={null}>
      <OrderForm />
    </Suspense>
  );
}
