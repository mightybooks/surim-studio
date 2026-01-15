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
  const productId = searchParams.get("productId");
  const productName = searchParams.get("productName");
  const priceParam = searchParams.get("price");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ------------------------------
    주소 유효성 검사
  -------------------------------- */
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
      }),
    });

    if (!res.ok) {
      throw new Error("주문 생성 실패");
    }

    const data = await res.json();
    return data.orderId as string;
  };

  /* ------------------------------
    submit handler
  -------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.recipientName || !form.phone) {
      alert("수령인 이름과 연락처를 입력해 주세요.");
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
