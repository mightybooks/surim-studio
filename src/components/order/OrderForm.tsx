// src/components/order/OrderForm.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { majorToMinor } from "@/lib/formatMoney";
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

type ReceiptType = "NONE" | "CASH" | "BUSINESS";
type PaymentMethod = "bank_transfer" | "card" | "paypal";

const MAX_QTY_PER_ORDER = 100;

export default function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 상품 정보 (query 기반)
  const productId = searchParams.get("productId");
  const productName = searchParams.get("productName");
  const priceParam = searchParams.get("price");

  // ✅ 해외결제 분기용 파라미터 (PurchaseSummary에서 넘겨줌)
  const currency = (searchParams.get("currency") ?? "KRW").toUpperCase(); // KRW | USD
  const pg = (searchParams.get("pg") ?? "").toLowerCase(); // "paypal" | ""
  const payRegion = (searchParams.get("payRegion") ?? "").toUpperCase(); // "OVERSEAS" 등 (선택)
  const paymentParam = (searchParams.get("payment") ?? "").toLowerCase();

  const payment: PaymentMethod =
    paymentParam === "bank_transfer" || paymentParam === "paypal"
      ? paymentParam
      : "card";

  const isOverseas = currency === "USD" && pg === "paypal";
  const isBankTransfer = payment === "bank_transfer";
  const amountMinorParam = searchParams.get("amount_minor");

  // ✅ 펀딩 여부 (query 기반)
  const sourceParam = searchParams.get("source");
  const isFunding = sourceParam === "funding_500";

  const price = Number(priceParam ?? 0);

  const [form, setForm] = useState<OrderFormState>({
    recipientName: "",
    phone: "",
    zipcode: "",
    address: "",
    addressDetail: "",
  });

  // ✅ 수량 (기본 1)
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryMemo, setDeliveryMemo] = useState("");
  const [receiptType, setReceiptType] = useState<ReceiptType>("NONE");
  const [receiptValue, setReceiptValue] = useState("");

    const amount_minor = useMemo(() => {
    // 1) 새 링크: amount_minor 우선
    if (amountMinorParam) {
      const v = Number(amountMinorParam);
      return Number.isFinite(v) ? v : 0;
    }

    // 2) 구버전 링크의 major-unit price를 통화별 minor unit으로 변환
    return majorToMinor(price, currency) ?? 0;
  }, [amountMinorParam, currency, price]);

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

  if (!productId || !productName || (!priceParam && !amountMinorParam)) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-red-600">
          상품 정보가 올바르지 않습니다. 다시 시도해 주세요.
        </p>
      </main>
    );
  }

  /* ------------------------------
    주문 생성 API
  -------------------------------- */
  const createOrder = async () => {
   const channelKey =
    currency === "USD" && pg === "paypal"
      ? (process.env.NEXT_PUBLIC_PAYPAL_CHANNEL_KEY ?? null)
      : null;

      const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        productName,
        amount_minor,
        price,
        currency,     // ✅ 추가
        pg,           // ✅ 추가        
        payRegion,    // ✅ 선택(로그/분석용)
        channelKey,   // ✅ 추가 (핵심)
        recipientName: form.recipientName,
        phone: form.phone,
        zipcode: form.zipcode,
        address: form.address,
        addressDetail: form.addressDetail,
        delivery_memo: deliveryMemo.trim() || null,
        receipt_type: isBankTransfer ? receiptType : "NONE",
        receipt_value:
          isBankTransfer && receiptType !== "NONE"
            ? receiptValue.trim() || null
            : null,

        // ✅ 추가: 수량
        quantity,

        ...(sourceParam ? { source: sourceParam } : {}),
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      console.error("CREATE_ORDER_FAILED", {
        status: res.status,
        errJson,
      });
      throw new Error(errJson?.message ?? "주문 생성 실패");
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

    if (isBankTransfer && receiptType !== "NONE" && !receiptValue.trim()) {
      alert("증빙 발행 번호를 입력해 주세요.");
      return;
    }

    try {
      const orderId = await createOrder();

      const params = new URLSearchParams();
      params.set("orderId", orderId);
      params.set("payment", payment);
      params.set("currency", currency);
      params.set("pg", pg);
      if (sourceParam) params.set("source", sourceParam);

      // (선택) 디버그/안전벨트: 해외결제 힌트도 같이 넘기고 싶으면
      // params.set("currency", currency); // "USD" | "KRW"
      // params.set("pg", pg);             // "paypal" | "inicis"

      router.push(`/order/confirm?${params.toString()}`);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "주문 생성 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">주문서 작성</h1>

      {/* 상품 요약 */}
      <OrderSummary
        productName={productName}
        amount_minor={amount_minor}
        currency={currency as "KRW" | "USD"}
      />


      {/* 결제 모드 표시(디버그용) */}
      <div className="text-xs text-zinc-500 mb-4">
        결제모드: {payment} / {currency}{pg ? ` / ${pg}` : ""}{isOverseas ? " (해외)" : " (국내)"}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ✅ 수량 선택 */}
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

        <section className="rounded-xl border p-4 bg-white space-y-2">
          <label htmlFor="delivery_memo" className="block text-sm text-zinc-700">
            배송 시 요청사항(특이사항)
          </label>
          <textarea
            id="delivery_memo"
            value={deliveryMemo}
            onChange={(e) => setDeliveryMemo(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm"
            rows={3}
            placeholder="예) 공동현관 비밀번호, 부재 시 문 앞에 놓아주세요, 편의점 보관 등"
          />
        </section>

        {isBankTransfer && (
          <section className="rounded-xl border p-4 bg-white space-y-3">
            <div className="text-sm text-zinc-700">
              현금영수증 또는 사업자지출증빙이 필요하다면 하나만 선택해 주세요.
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="receipt_type"
                  value="NONE"
                  checked={receiptType === "NONE"}
                  onChange={() => {
                    setReceiptType("NONE");
                    setReceiptValue("");
                  }}
                />
                필요없음
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="receipt_type"
                  value="CASH"
                  checked={receiptType === "CASH"}
                  onChange={() => setReceiptType("CASH")}
                />
                현금영수증
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="receipt_type"
                  value="BUSINESS"
                  checked={receiptType === "BUSINESS"}
                  onChange={() => setReceiptType("BUSINESS")}
                />
                사업자지출증빙
              </label>
            </div>

            {receiptType !== "NONE" && (
              <div className="space-y-1">
                <label className="block text-sm text-zinc-700" htmlFor="receipt_value">
                  발행에 필요한 번호를 적어주세요.
                </label>
                <input
                  id="receipt_value"
                  value={receiptValue}
                  onChange={(e) => setReceiptValue(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder={receiptType === "CASH" ? "전화번호" : "사업자번호"}
                />
              </div>
            )}
          </section>
        )}

        {/* 기존 버튼 그대로: submit만 해주면 됨 */}
        <PaymentButtons />
      </form>
    </main>
  );
}
