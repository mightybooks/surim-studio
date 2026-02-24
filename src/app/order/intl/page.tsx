import { Suspense } from "react";
import OrderFormIntl from "@/components/order/OrderFormIntl";
import AccessRequiredCard from "@/components/auth/AccessRequiredCard";
import { supabaseServerPublic } from "@/lib/supabase/server-public";
import { isGoodsProductId } from "@/lib/editionProducts";

export default async function OrderIntlPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const firstParam = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const productId = firstParam(searchParams?.productId) ?? "";
  const currency = String(firstParam(searchParams?.currency) ?? "USD").toUpperCase();
  const pg = String(firstParam(searchParams?.pg) ?? "paypal").toLowerCase();
  const isGoodsIntlBlocked =
    isGoodsProductId(productId) && (currency === "USD" || pg === "paypal");

  const supabase = supabaseServerPublic();
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
