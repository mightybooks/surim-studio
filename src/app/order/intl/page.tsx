import { Suspense } from "react";
import OrderFormIntl from "@/components/order/OrderFormIntl";
import AccessRequiredCard from "@/components/auth/AccessRequiredCard";
import { supabaseServerPublic } from "@/lib/supabase/server-public";
import { isGoodsProductId } from "@/lib/editionProducts";

export default async function OrderIntlPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const firstParam = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const productId = firstParam(query.productId) ?? "";
  const currency = String(firstParam(query.currency) ?? "USD").toUpperCase();
  const pg = String(firstParam(query.pg) ?? "paypal").toLowerCase();
  const isGoodsIntlBlocked =
    isGoodsProductId(productId) && (currency === "USD" || pg === "paypal");

  const supabase = await supabaseServerPublic();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const currentParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => currentParams.append(key, item));
      return;
    }
    if (typeof value === "string") currentParams.set(key, value);
  });
  const next = currentParams.toString() ? `/order/intl?${currentParams.toString()}` : "/order/intl";

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
      <OrderFormIntl />
    </Suspense>
  );
}
