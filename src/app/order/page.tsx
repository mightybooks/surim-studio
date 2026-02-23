// src/app/order/page.tsx 

import { Suspense } from "react";
import OrderForm from "@/components/order/OrderForm";
import AccessRequiredCard from "@/components/auth/AccessRequiredCard";
import { supabaseServerPublic } from "@/lib/supabase/server-public";

export default async function OrderPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
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
  const next = currentParams.toString() ? `/order?${currentParams.toString()}` : "/order";

  if (!user) {
    return <AccessRequiredCard mode="login" next={next} />;
  }

  if (!user.email_confirmed_at) {
    return <AccessRequiredCard mode="verify" next={next} />;
  }

  return (
    <Suspense fallback={null}>
      <OrderForm />
    </Suspense>
  );
}
