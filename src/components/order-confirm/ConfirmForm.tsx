// src/components/order-confirm/ConfirmForm.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ConfirmSummary from "./ConfirmSummary";
import ConfirmAddress from "./ConfirmAddress";
import ConfirmPaymentButtons from "./ConfirmPaymentButtons";

declare global {
  interface Window {
    PortOne: any;
  }
}

type Order = {
  id: string;
  product_name: string;

  // ✅ 결제 기준(최소단위)
  amount_minor: number; // KRW=원, USD=센트
  currency: "KRW" | "USD";
  pg: string; // "inicis" | "paypal" 등
  channel_key: string | null; 

  recipient_name: string;
  phone: string;
  zipcode: string;
  address: string;
  address_detail: string;

  status: string;
  buyer_email: string;
};

export default function ConfirmForm() {
  const router = useRouter();
  const params = useSearchParams();

  const orderId = params.get("orderId");
  const errorType = params.get("error");
  const redirectedPaymentId = params.get("paymentId"); // PortOne redirect 쿼리로 들어옴
  const redirectedCode = params.get("code");           // 실패 시 코드
  const redirectedMessage = params.get("message");     // 실패 시 메시지
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const [showDelayNotice, setShowDelayNotice] = useState(false);

  // ✅ 모바일 리디렉션으로 돌아온 경우: 자동으로 상태 폴링 시작
  useEffect(() => {
    if (!orderId) return;
    if (redirectedPaymentId && redirectedPaymentId === orderId) {
      // 실패 코드가 같이 오면 로딩 켜지지 않게 처리
      if (redirectedCode) {
        console.warn("REDIRECT_PAYMENT_FAILED", { redirectedCode, redirectedMessage });
        setLoading(false);
        return;
      }
      setLoading(true);
    }
  }, [orderId, redirectedPaymentId, redirectedCode, redirectedMessage]);
  
  // ❌ orderId 없으면 잘못된 접근
  if (!orderId) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p>잘못된 접근입니다.</p>
      </main>
    );
  }

  // ✅ order 기반으로 PayPal 여부 판단 (query 의존 제거)
  const isPaypal = useMemo(() => {
    if (!order) return false;

    return (
      order.currency === "USD" &&
      String(order.pg).toLowerCase() === "paypal"
    );
  }, [order]);

  /* -----------------------------
     주문 정보 조회 (orderId 기준)
  ----------------------------- */
  useEffect(() => {
    let alive = true;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          credentials: "include",
        });
        if (!res.ok) {
          alert("주문 정보를 불러올 수 없습니다.");
          return;
        }
        const data = await res.json();
        if (alive) setOrder(data);
      } catch (err) {
        console.error("주문 조회 실패:", err);
      }
    };

    fetchOrder();

    return () => {
      alive = false;
    };
  }, [orderId]);

  useEffect(() => {
    if (errorType === "payment_failed" && orderId) {
      fetch("/api/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          status: "failed",
        }),
      });
    }
  }, [errorType, orderId]);

  useEffect(() => {
    if (!orderId || !loading) return;

    const timer = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/status?orderId=${orderId}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (!json?.ok) return;

        const status = json.status as string;

        if (status === "paid" || status === "shipped") {
          clearInterval(timer);
          router.replace(`/order/complete?orderId=${orderId}`);
          return;
        }

        if (status === "expired") {
          clearInterval(timer);
          setExpired(true);
          setLoading(false);
          return;
        }

        if (status === "failed") {
          clearInterval(timer);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("POLLING ERROR", e);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [orderId, loading, router]);

  useEffect(() => {
    if (!loading) {
      setShowDelayNotice(false);
      return;
    }

    const t = setTimeout(() => {
      setShowDelayNotice(true);
    }, 15000);

    return () => clearTimeout(t);
  }, [loading]);

  /* -----------------------------
     결제 요청
  ----------------------------- */
  const requestPayment = async (method: "CARD" | "KAKAOPAY" | "PAYPAL") => {
    if (!order || loading) return;

      console.log("PAY_REQUEST_BASE", {
      orderId: order.id,
      method,
      currency: order.currency,
      pg: order.pg,      
      amount_minor: order.amount_minor,
      paypalChannelKeyOk: !!process.env.NEXT_PUBLIC_PAYPAL_CHANNEL_KEY,
    });

    // ✅ PayPal 채널키는 env에서만 사용 (A안)
    const paypalChannelKey = process.env.NEXT_PUBLIC_PAYPAL_CHANNEL_KEY;
    if (method === "PAYPAL" && !paypalChannelKey) {
      alert("PayPal 채널키(env)가 없습니다. NEXT_PUBLIC_PAYPAL_CHANNEL_KEY를 확인해 주세요.");
      return;
    }

    setLoading(true);

    const paymentId = order.id;

    try {
      // ✅ PayPal (V2 / SPB) - amount_minor(센트) 사용
      if (method === "PAYPAL") {
            console.log("PAYPAL_PAY_REQUEST", {
            orderId: order.id,
            uiType: "PAYPAL_SPB",
            currency: "USD",
            totalAmount: order.amount_minor,
            channelKey: paypalChannelKey,
          });

        window.PortOne.requestPayment({
          storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
          channelKey: paypalChannelKey!,
          paymentId,
          orderName: order.product_name,

          uiType: "PAYPAL_SPB",
          totalAmount: order.amount_minor,
          currency: "USD",
          payMethod: "PAYPAL",

          customer: {
            fullName: order.recipient_name,
            phoneNumber: order.phone,
            email: order.buyer_email,
          },
        });

        return;
      }

      // ✅ 기존 국내 결제 로직 - amount_minor(원) 사용
      const channelKey =
        method === "KAKAOPAY"
          ? process.env.NEXT_PUBLIC_PORTONE_KAKAOPAY_CHANNEL_KEY!
          : process.env.NEXT_PUBLIC_PORTONE_INICIS_CHANNEL_KEY!;

      const payMethodForPortOne = method === "KAKAOPAY" ? "EASY_PAY" : "CARD";

      console.log("KR_PAY_REQUEST", {
      orderId: order.id,
      method,
      payMethodForPortOne,
      currency: "KRW",
      totalAmount: order.amount_minor,
      channelKeyOk: !!channelKey,
    });

      window.PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey,
        paymentId,
        orderName: order.product_name,
        totalAmount: order.amount_minor,
        currency: "KRW",
        payMethod: payMethodForPortOne,
        // ✅ 모바일 환경 필수: 결제 후 돌아올 URL
        //    (대부분 모바일이 리디렉션 방식이므로 redirectUrl이 필요) :contentReference[oaicite:2]{index=2}
        redirectUrl: `${window.location.origin}/order/confirm?orderId=${orderId}`,
        // ✅ 환경에 따라 프로미스 반환 대신 리디렉션을 강제할 수 있음
        //    (SDK 버전에 따라 지원) :contentReference[oaicite:3]{index=3}
        forceRedirect: true,
        customer: {
          fullName: order.recipient_name,
          phoneNumber: order.phone,
          email: order.buyer_email,
        },
      });
    } catch (e) {
      console.error("PortOne requestPayment failed", e);
      setLoading(false);
    }
  };

  /* -----------------------------
     렌더링
  ----------------------------- */
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">주문 확인</h1>

      {errorType === "payment_failed" && (
        <section className="rounded-xl border border-red-300 bg-red-50 p-4">
          <h2 className="font-medium text-red-700 mb-1">결제가 완료되지 않았습니다</h2>
          <p className="text-sm text-red-600">
            결제 과정에서 오류가 발생했습니다. 다시 시도해 주세요.
          </p>
        </section>
      )}

      {!order ? (
        <p>주문 정보를 불러오는 중입니다...</p>
      ) : (
        <>
        
          {/* 표시용은 기존대로 amount 사용(원하시면 currency에 따라 표시 변경 가능) */}
          <ConfirmSummary
            productName={order.product_name}
            amount_minor={order.amount_minor}
            currency={order.currency}
          />

          <ConfirmAddress
            recipientName={order.recipient_name}
            phone={order.phone}
            zipcode={order.zipcode}
            address={order.address}
            addressDetail={order.address_detail}
          />

          {/* ✅ PayPal은 이 컨테이너에 버튼 렌더 */}
          {isPaypal && (
            <section className="rounded-xl border p-4 bg-white space-y-2">
              <div className="text-sm font-medium text-zinc-800">PayPal 결제</div>
              <div className="text-xs text-zinc-500">
                아래 영역에 PayPal 버튼이 표시됩니다. (표시가 안 되면 “PayPal로 결제”를 눌러주세요.)
              </div>
              <div className="portone-ui-container" />
            </section>
          )}

          {expired && (
            <section className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-center">
              <h2 className="font-medium text-yellow-800 mb-1">주문 시간이 초과되었습니다</h2>
              <p className="text-sm text-yellow-700">
                결제 시간이 초과되어 주문이 만료되었습니다.<br />
                다시 시도해 주세요.
              </p>
            </section>
          )}

          <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center">
            <p className="text-sm text-zinc-600 leading-relaxed">
              카드사 인증 중에는 입력 반응이 늦거나<br />
              화면이 정지된 것처럼 보일 수 있습니다.<br />
              <strong>결제가 정상 처리될 때까지 창을 닫지 마세요.</strong>
            </p>
          </section>

          {loading && (
            <section className="rounded-xl border p-4 bg-zinc-50 text-center">
              <p className="text-sm text-zinc-600">
                결제가 정상적으로 처리되었습니다. 결과를 확인 중입니다.<br />
                새로고침·뒤로 가기·재결제를 하지 마세요.
              </p>
            </section>
          )}

          {loading && showDelayNotice && (
            <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
              <p className="text-sm text-blue-700">
                결제는 이미 진행되었습니다.<br />
                최종 확인까지 최대 1분 정도 소요될 수 있습니다.<br />
                잠시만 기다려 주세요.
              </p>
            </section>
          )}

          <ConfirmPaymentButtons
            loading={loading || expired}
            onPay={requestPayment}
            showPaypal={isPaypal}            
          />
        </>
      )}
    </main>
  );
}
