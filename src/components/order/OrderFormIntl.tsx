"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { majorToMinor } from "@/lib/formatMoney";
import OrderSummary from "./OrderSummary";
import RecipientFields from "./RecipientFields";
import AddressFieldsIntl from "./AddressFieldsIntl";
import PaymentButtons from "./PaymentButtons";

type OrderFormIntlState = {
  recipientName: string;
  phone: string;

  // 해외 주소
  country: string;        // ISO2 권장(US, JP, etc) or 국가명
  city: string;
  state: string;          // 주/도/지역
  postalCode: string;     // 해외 우편번호
  address1: string;       // street address
  address2: string;       // apt/suite (optional)
};

const MAX_QTY_PER_ORDER = 100;

export default function OrderFormIntl() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 상품 정보 (query 기반)
  const productId = searchParams.get("productId");
  const productName = searchParams.get("productName");
  const priceParam = searchParams.get("price");

  // 해외결제 분기용 파라미터
  const currency = (searchParams.get("currency") ?? "USD").toUpperCase(); // intl 기본 USD
  const pg = (searchParams.get("pg") ?? "paypal").toLowerCase();          // intl 기본 paypal
  const payRegion = (searchParams.get("payRegion") ?? "OVERSEAS").toUpperCase();

  const amountMinorParam = searchParams.get("amount_minor");

  // 펀딩 여부 (query 기반)
  const sourceParam = searchParams.get("source");
  const isFunding = sourceParam === "funding_500";

  const price = Number(priceParam ?? 0);

  const [form, setForm] = useState<OrderFormIntlState>({
    recipientName: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    address1: "",
    address2: "",
  });

  // 수량 (기본 1)
  const [quantity, setQuantity] = useState<number>(1);

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

  const validateAddressIntl = () => {
    // 해외는 “주소검색(우편번호+기본주소)” 같은 국내 UX를 강제하면 망합니다.
    if (!form.country) {
      alert("국가를 입력/선택해 주세요.");
      return false;
    }
    if (!form.address1) {
      alert("주소(Street address)를 입력해 주세요.");
      return false;
    }
    if (!form.city) {
      alert("도시(City)를 입력해 주세요.");
      return false;
    }
    // 주/도는 국가에 따라 없을 수 있지만, 일단 기본 필수로 두는 게 배송사고를 줄입니다.
    if (!form.state) {
      alert("주/도(State/Province)를 입력해 주세요.");
      return false;
    }
    // 우편번호도 국가 따라 없을 수 있으나, 대부분 필수입니다.
    if (!form.postalCode) {
      alert("우편번호(Postal code)를 입력해 주세요.");
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
    주문 생성 API (공용 유지)
    - DB 스키마 변경 금지: zipcode/address/addressDetail 필드에 “해외 주소를 매핑”해서 넣습니다.
  -------------------------------- */
    const createOrder = async () => {
    // ✅ PayPal 모드면 채널키 필수 (프론트에서 먼저 차단)
    const channelKey =
        currency === "USD" && pg === "paypal"
        ? (process.env.NEXT_PUBLIC_PAYPAL_CHANNEL_KEY ?? "")
        : "";

    if (currency === "USD" && pg === "paypal" && !channelKey.trim()) {
        throw new Error("PayPal 채널키가 설정되지 않았습니다. (NEXT_PUBLIC_PAYPAL_CHANNEL_KEY)");
    }

    // ✅ 해외 주소를 기존 필드에 매핑(스키마 변경 없이)
    const zipcode = form.postalCode;
    const address = `${form.address1}, ${form.city}, ${form.state}, ${form.country}`;
    const addressDetail = form.address2 || "";

    const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        productId,
        productName,
        amount_minor,
        price,
        currency,
        pg,
        payRegion,
        channelKey, // ✅ 항상 string (USD면 필수, KRW면 빈 문자열)

        recipientName: form.recipientName,
        phone: form.phone,

        zipcode,
        address,
        addressDetail,

        quantity,
        ...(isFunding ? { source: "funding_500" } : {}),
        }),
    });

    if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        console.error("CREATE_ORDER_FAILED", { status: res.status, errJson });
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

    if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_QTY_PER_ORDER) {
      alert(`수량은 1~${MAX_QTY_PER_ORDER} 사이여야 합니다.`);
      return;
    }

    if (!validateAddressIntl()) return;

    try {
      const orderId = await createOrder();

      const params = new URLSearchParams();
      params.set("orderId", orderId);

      // ✅ 펀딩이면 confirm에서 카카오 숨김 플래그 전달
      if (isFunding) params.set("funding", "1");

      router.push(`/order/confirm?${params.toString()}`);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : "주문 생성 중 오류가 발생했습니다.");
        console.error(err);
      }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">International Order</h1>

      <OrderSummary
        productName={productName}
        amount_minor={amount_minor}
        currency={currency as "KRW" | "USD"}
      />

      <div className="text-xs text-zinc-500 mb-4">
        결제모드: {currency}{pg ? ` / ${pg}` : ""} (해외)
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 수량 */}
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
            <div className="text-sm text-zinc-500">최대 {MAX_QTY_PER_ORDER}권</div>
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

        <AddressFieldsIntl
          country={form.country}
          city={form.city}
          state={form.state}
          postalCode={form.postalCode}
          address1={form.address1}
          address2={form.address2}
          onChange={handleChange}
        />

        <PaymentButtons />
      </form>
    </main>
  );
}
