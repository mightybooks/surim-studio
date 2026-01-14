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

  // 상품 정보 (지금은 고정/임시, 이후 DB 연동)
  const productId = searchParams.get("productId") ?? "unknown";
  const productName = "수림지 정기구독";
  const price = 4900;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 최소 검증 (심사 기준 충족용)
    if (
      !form.recipientName ||
      !form.phone ||
      !form.zipcode ||
      !form.address
    ) {
      alert("필수 정보를 모두 입력해 주세요.");
      return;
    }

    // 주문 확인 페이지로 이동
    const query = new URLSearchParams({
      productId,
      productName,
      price: price.toString(),
      recipientName: form.recipientName,
      phone: form.phone,
      zipcode: form.zipcode,
      address: form.address,
      addressDetail: form.addressDetail,
    }).toString();

    router.push(`/order/confirm?${query}`);
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">주문서 작성</h1>

    {/* 상품 요약 */}
    <OrderSummary productName={productName} price={price} />

      {/* 주문서 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* 주문자 */}
        <RecipientFields
        recipientName={form.recipientName}
        phone={form.phone}
        onChange={handleChange}
        />

        {/* 배송지 */}
        <AddressFields
        zipcode={form.zipcode}
        address={form.address}
        addressDetail={form.addressDetail}
        onChange={handleChange}
        />

        {/* 결제버튼 */}
        <PaymentButtons />

      </form>
    </main>
  );
}
