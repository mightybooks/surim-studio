// src/components/order/OrderForm.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import OrderSummary from "./OrderSummary";
import RecipientFields from "./RecipientFields";
import AddressFields from "./AddressFields";
import PaymentButtons from "./PaymentButtons";

type OrderFormState = {
  recipientName: string;
  phone: string;
  zipcode: string;
  address: string;
  addressDetail: string;
};

const MAX_QTY_PER_ORDER = 100;

export default function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 상품 정보 (query 기반)
  const productId = searchParams.get("productId");
  const productName = searchParams.get("productName");
  const priceParam = searchParams.get("price");

  // ✅ 펀딩 여부 (query 기반)
  // 예: /order?...&source=funding_500
  const sourceParam = searchParams.get("source");
  const isFunding = sourceParam === "funding_500";

  // 🚨 상품 정보가 없으면 여기서 컴포넌트 종료
  if (!productId || !productName || !priceParam) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-red-600">
          상품 정보가 올바르지 않습니다. 다시 시도해 주세요.
        </p>
      </main>
    );
  }

  const price = Number(priceParam);

  const [form, setForm] = useState<OrderFormState>({
    recipientName: "",
    phone: "",
    zipcode: "",
    address: "",
    addressDetail: "",
  });

  // ✅ 수량 (기본 1)
  const [quantity, setQuantity] = useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateAddress = () => {
    if (!form.zipcode || !form.address) {
      alert("주소 검색을 완료해주세요.");
      return false;
    }
    if (!form.addressDetail) {
      alert("상세주소를 입력해주세요.");
      return false;
    }
    return true;
  };

  const qtyLabel = useMemo(() => {
    if (!isFunding) return "수량";
    return "펀딩 수량(권)";
  }, [isFunding]);

  /* ------------------------------
    주문 생성 API
  -------------------------------- */
  const createOrder = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        productName,
        price,
        recipientName: form.recipientName,
        phone: form.phone,
        zipcode: form.zipcode,
        address: form.address,
        addressDetail: form.addressDetail,

        // ✅ 추가: 수량
        quantity,

        // ✅ 추가: 펀딩일 때만 source 전달
        ...(isFunding ? { source: "funding_500" } : {}),
      }),
    });

    if (!res.ok) {
      throw new Error("주문 생성 실패");
    }

    const data = await res.json();
    return data.orderId as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.recipientName || !form.phone) {
      alert("수령인 이름과 연락처를 입력해 주세요.");
      return;
    }

    // ✅ 수량 검증 (1~100)
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_QTY_PER_ORDER) {
      alert(`수량은 1~${MAX_QTY_PER_ORDER} 사이여야 합니다.`);
      return;
    }

    if (!validateAddress()) return;

    try {
      const orderId = await createOrder();
      router.push(`/order/confirm?orderId=${orderId}`);
    } catch (err) {
      alert("주문 생성 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">주문서 작성</h1>

      {/* 상품 요약 */}
      <OrderSummary productName={productName} price={price} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ✅ 수량 선택 (권수 KPI에 필수) */}
        <section className="rounded-xl border p-4 bg-white space-y-2">
          <div className="text-sm text-zinc-600">{qtyLabel}</div>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={MAX_QTY_PER_ORDER}
              value={quantity}
              onChange={(e) => setQuantity(Math.floor(Number(e.target.value) || 1))}
              className="w-28 rounded-lg border px-3 py-2"
            />
            <div className="text-sm text-zinc-500">
              최대 {MAX_QTY_PER_ORDER}권
            </div>
          </div>

          {isFunding && (
            <div className="text-xs text-zinc-500 leading-relaxed">
              펀딩 진행률은 <b>실제 구매된 권수</b> 기준으로 집계됩니다.
            </div>
          )}
        </section>

        <RecipientFields
          recipientName={form.recipientName}
          phone={form.phone}
          onChange={handleChange}
        />

        <AddressFields
          zipcode={form.zipcode}
          address={form.address}
          addressDetail={form.addressDetail}
          onChange={handleChange}
        />

        <PaymentButtons />
      </form>
    </main>
  );
}
