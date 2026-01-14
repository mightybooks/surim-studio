"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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

export default function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 상품 정보 (query 기반)
  const productId = searchParams.get("productId") ?? "unknown";
  const productName = searchParams.get("productName") ?? "상품명 없음";
  const price = Number(searchParams.get("price") ?? 0);

  const [form, setForm] = useState<OrderFormState>({
    recipientName: "",
    phone: "",
    zipcode: "",
    address: "",
    addressDetail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ 주문 생성은 여기서
  const createOrder = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        productName,
        price,
        recipient: form,
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

    if (
      !form.recipientName ||
      !form.phone ||
      !form.zipcode ||
      !form.address
    ) {
      alert("필수 정보를 모두 입력해 주세요.");
      return;
    }

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
