// src/components/order-confirm/ConfirmForm.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isValidPaymentId } from "@/lib/paymentId";
import ConfirmSummary from "./ConfirmSummary";
import ConfirmAddress from "./ConfirmAddress";
import ConfirmPaymentButtons from "./ConfirmPaymentButtons";

type Order = {
  id: string;
  product_id: string;
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
  delivery_memo: string | null;
  receipt_type: "NONE" | "CASH" | "BUSINESS" | null;
  receipt_value: string | null;

  status: string;
  buyer_email: string;
};

type PaymentMethod = "bank_transfer" | "card" | "paypal";
type PaypalUiState = "idle" | "loading" | "ready" | "error";

const DIGITAL_FLIPBOOK_PRODUCT_ID = "digital-500-fiction";
const DIGITAL_FLIPBOOK_READER_HREF =
  "/edition/surimseoga/500-fiction-digital?open=reader";
const PAYMENT_STATUS_POLL_INTERVAL_MS = 2000;
const PAYMENT_STATUS_MAX_ATTEMPTS = 30;

export default function ConfirmForm() {
  const router = useRouter();
  const params = useSearchParams();

  const orderId = params.get("orderId");
  const errorType = params.get("error");
  const paymentParam = (params.get("payment") ?? "").toLowerCase();
  const redirectedPaymentId = params.get("paymentId"); // PortOne redirect 쿼리로 들어옴
  const redirectedCode = params.get("code");           // 실패 시 코드
  const redirectedMessage = params.get("message");     // 실패 시 메시지
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const [showDelayNotice, setShowDelayNotice] = useState(false);
  const [paymentCheckDelayed, setPaymentCheckDelayed] = useState(false);
  const [paymentCheckAttempt, setPaymentCheckAttempt] = useState(0);
  const [copyDone, setCopyDone] = useState(false);
  const [paypalUiState, setPaypalUiState] = useState<PaypalUiState>("idle");
  const [paypalUiError, setPaypalUiError] = useState<string | null>(null);
  const [paypalRenderAttempt, setPaypalRenderAttempt] = useState(0);
  const paypalContainerRef = useRef<HTMLDivElement | null>(null);
  const paypalRenderKeyRef = useRef<string | null>(null);
  const mountedRef = useRef(false);

  const payment: PaymentMethod =
    paymentParam === "bank_transfer" || paymentParam === "paypal"
      ? paymentParam
      : "card";

  // ✅ 모바일 리디렉션으로 돌아온 경우: 자동으로 상태 폴링 시작
  useEffect(() => {
    if (!orderId) return;
    let active = true;
    queueMicrotask(() => {
      if (!active || !redirectedPaymentId || redirectedPaymentId !== orderId) return;
      if (redirectedCode) {
        console.warn("REDIRECT_PAYMENT_FAILED", { redirectedCode, redirectedMessage });
        setLoading(false);
      } else {
        setShowDelayNotice(false);
        setPaymentCheckDelayed(false);
        setLoading(true);
      }
    });
    return () => {
      active = false;
    };
  }, [orderId, redirectedPaymentId, redirectedCode, redirectedMessage]);

  const isPaypal =
    order?.currency === "USD" && String(order.pg).toLowerCase() === "paypal";
  const isBankTransfer = payment === "bank_transfer" && !isPaypal;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

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

    void fetchOrder();

    return () => {
      alive = false;
    };
  }, [orderId]);

  useEffect(() => {
    if (errorType === "payment_failed" && orderId) {
      void fetch("/api/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          status: "failed",
        }),
      }).catch((error: unknown) => {
        console.error("ORDER_FAILURE_UPDATE_ERROR", error);
      });
    }
  }, [errorType, orderId]);

  useEffect(() => {
    if (!orderId || !loading) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let attempts = 0;

    const checkStatus = async () => {
      attempts += 1;

      try {
        const res = await fetch(`/api/orders/status?orderId=${orderId}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (cancelled) return;

        if (json?.ok) {
          const status = String(json.status ?? "");
          const productId = String(json.productId ?? "");

          if (status === "paid") {
            router.replace(
              productId === DIGITAL_FLIPBOOK_PRODUCT_ID
                ? DIGITAL_FLIPBOOK_READER_HREF
                : `/order/complete?orderId=${orderId}`,
            );
            return;
          }

          if (status === "shipped") {
            router.replace(`/order/complete?orderId=${orderId}`);
            return;
          }

          if (status === "expired") {
            setExpired(true);
            setLoading(false);
            return;
          }

          if (status === "failed") {
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("POLLING ERROR", e);
      }

      if (cancelled) return;
      if (attempts >= PAYMENT_STATUS_MAX_ATTEMPTS) {
        setShowDelayNotice(false);
        setPaymentCheckDelayed(true);
        setLoading(false);
        return;
      }

      timer = setTimeout(() => {
        void checkStatus();
      }, PAYMENT_STATUS_POLL_INTERVAL_MS);
    };

    void checkStatus();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [orderId, loading, paymentCheckAttempt, router]);

  useEffect(() => {
    if (!loading) return;

    const t = setTimeout(() => {
      setShowDelayNotice(true);
    }, 15000);

    return () => clearTimeout(t);
  }, [loading]);

  useEffect(() => {
    if (!order || !isPaypal || isBankTransfer) return;

    const renderKey = `${order.id}:${paypalRenderAttempt}`;
    if (paypalRenderKeyRef.current === renderKey) return;
    paypalRenderKeyRef.current = renderKey;

    const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    const channelKey = process.env.NEXT_PUBLIC_PAYPAL_CHANNEL_KEY;
    const portOne = window.PortOne;
    const container = paypalContainerRef.current;
    const reportSetupError = (message: string) => {
      queueMicrotask(() => {
        if (!mountedRef.current) return;
        setPaypalUiState("error");
        setPaypalUiError(message);
      });
    };

    if (!storeId) {
      reportSetupError("PortOne 상점 ID가 설정되지 않았습니다.");
      return;
    }
    if (!channelKey) {
      reportSetupError(
        "PayPal 채널키가 설정되지 않았습니다. NEXT_PUBLIC_PAYPAL_CHANNEL_KEY를 확인해 주세요.",
      );
      return;
    }
    if (!portOne?.loadPaymentUI) {
      reportSetupError("PortOne 결제 SDK를 불러오지 못했습니다.");
      return;
    }
    if (!container) {
      reportSetupError("PayPal 결제 버튼을 표시할 영역을 준비하지 못했습니다.");
      return;
    }
    if (!isValidPaymentId(order.id)) {
      reportSetupError("결제 ID 형식이 올바르지 않습니다.");
      return;
    }

    container.replaceChildren();
    queueMicrotask(() => {
      if (!mountedRef.current) return;
      setPaypalUiState("loading");
      setPaypalUiError(null);
    });

    const loadPaypalUi = async () => {
      try {
        await portOne.loadPaymentUI(
          {
            uiType: "PAYPAL_SPB",
            storeId,
            channelKey,
            paymentId: order.id,
            orderName: order.product_name,
            totalAmount: order.amount_minor,
            currency: "USD",
            customer: {
              fullName: order.recipient_name,
              phoneNumber: order.phone,
              email: order.buyer_email,
            },
          },
          {
            onPaymentSuccess: (response) => {
              if (!mountedRef.current) return;
              if (response.paymentId !== order.id) {
                console.error("PAYPAL_PAYMENT_ID_MISMATCH");
                setPaypalUiState("error");
                setPaypalUiError("PayPal 결제 ID가 주문 정보와 일치하지 않습니다.");
                setLoading(false);
                return;
              }
              setPaypalUiError(null);
              setShowDelayNotice(false);
              setPaymentCheckDelayed(false);
              setLoading(true);
            },
            onPaymentFail: (error) => {
              console.error("PAYPAL_PAYMENT_FAILED", {
                code: error.code,
                pgCode: error.pgCode,
              });
              if (!mountedRef.current) return;
              setLoading(false);
              setPaypalUiState("error");
              setPaypalUiError(error.message || "PayPal 결제에 실패했습니다.");
            },
          },
        );
        if (mountedRef.current) setPaypalUiState("ready");
      } catch (error: unknown) {
        console.error("PAYPAL_UI_LOAD_FAILED", {
          message: error instanceof Error ? error.message : "Unknown error",
        });
        if (!mountedRef.current) return;
        setLoading(false);
        setPaypalUiState("error");
        setPaypalUiError(
          error instanceof Error
            ? error.message
            : "PayPal 결제 버튼을 불러오지 못했습니다.",
        );
      }
    };

    void loadPaypalUi();
  }, [isBankTransfer, isPaypal, order, paypalRenderAttempt]);

  if (!orderId) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p>잘못된 접근입니다.</p>
      </main>
    );
  }

  const bankAccount = "우리은행 1005-004-218834 이경민(마이티북스)";

  const handleCopyBankAccount = async () => {
    try {
      await navigator.clipboard.writeText(bankAccount);
      setCopyDone(true);
      return;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = bankAccount;
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.left = "0";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopyDone(true);
      } catch {
        prompt("아래 계좌번호를 복사해 주세요.", bankAccount);
      }
    }
  };

  const retryPaymentStatus = () => {
    setShowDelayNotice(false);
    setPaymentCheckDelayed(false);
    setPaymentCheckAttempt((attempt) => attempt + 1);
    setLoading(true);
  };

  /* -----------------------------
     결제 요청
  ----------------------------- */
  const requestPayment = async (method: "CARD" | "KAKAOPAY") => {
    if (!order || loading) return;

    const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    if (!storeId) {
      alert("PortOne 상점 ID가 설정되지 않았습니다.");
      return;
    }

    const channelKey =
      method === "KAKAOPAY"
        ? process.env.NEXT_PUBLIC_PORTONE_KAKAOPAY_CHANNEL_KEY
        : process.env.NEXT_PUBLIC_PORTONE_INICIS_CHANNEL_KEY;
    if (!channelKey) {
      alert(
        method === "KAKAOPAY"
          ? "카카오페이 채널키가 설정되지 않았습니다. NEXT_PUBLIC_PORTONE_KAKAOPAY_CHANNEL_KEY를 확인해 주세요."
          : "KG이니시스 채널키가 설정되지 않았습니다. NEXT_PUBLIC_PORTONE_INICIS_CHANNEL_KEY를 확인해 주세요.",
      );
      return;
    }

    const portOne = window.PortOne;
    if (!portOne?.requestPayment) {
      alert("PortOne 결제 SDK를 불러오지 못했습니다.");
      return;
    }

    const paymentId = order.id;
    if (!isValidPaymentId(paymentId)) {
      alert("결제 ID 형식이 올바르지 않습니다.");
      return;
    }
    setShowDelayNotice(false);
    setPaymentCheckDelayed(false);
    setLoading(true);

    try {
      // ✅ 기존 국내 결제 로직 - amount_minor(원) 사용
      const payMethodForPortOne = method === "KAKAOPAY" ? "EASY_PAY" : "CARD";

      await portOne.requestPayment({
        storeId,
        channelKey,
        paymentId,
        orderName: order.product_name,
        totalAmount: order.amount_minor,
        currency: "KRW",
        payMethod: payMethodForPortOne,
        ...(method === "CARD" && order.amount_minor < 1000
          ? {
              bypass: {
                inicis_v2: {
                  acceptmethod: ["below1000"],
                  P_RESERVED: ["below1000=Y"],
                },
              },
            }
          : {}),
        // ✅ 모바일 환경 필수: 결제 후 돌아올 URL
        //    (대부분 모바일이 리디렉션 방식이므로 redirectUrl이 필요) :contentReference[oaicite:2]{index=2}
        redirectUrl: `${window.location.origin}/order/confirm?orderId=${orderId}&payment=${payment}`,
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

          {order.product_id !== DIGITAL_FLIPBOOK_PRODUCT_ID && (
            <ConfirmAddress
              recipientName={order.recipient_name}
              phone={order.phone}
              zipcode={order.zipcode}
              address={order.address}
              addressDetail={order.address_detail}
            />
          )}

          {/* ✅ PayPal은 이 컨테이너에 버튼 렌더 */}
          {order.delivery_memo && (
            <section className="rounded-xl border p-4 bg-white">
              <h2 className="font-medium mb-2">배송 시 요청사항(특이사항)</h2>
              <p className="text-sm text-zinc-700 whitespace-pre-wrap">{order.delivery_memo}</p>
            </section>
          )}

          {isBankTransfer && (
            <section className="rounded-xl border border-amber-300 bg-amber-50 p-4 space-y-3">
              <h2 className="font-medium text-amber-900">계좌이체 안내</h2>
              <p className="text-sm text-amber-900">{bankAccount}</p>
              <button
                type="button"
                onClick={() => void handleCopyBankAccount()}
                className="rounded-lg border border-amber-400 bg-white px-3 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
              >
                복사하기
              </button>
              {copyDone && <p className="text-xs text-amber-800">계좌번호가 복사되었습니다.</p>}
              <p className="text-sm text-amber-900">
                입금 후 최대 24시간 이내 확인 후 즉각 발송해드립니다.
              </p>
            </section>
          )}

          {isBankTransfer && order.receipt_type && order.receipt_type !== "NONE" && (
            <section className="rounded-xl border p-4 bg-white space-y-1">
              <h2 className="font-medium">증빙 요청 정보</h2>
              <p className="text-sm text-zinc-700">
                구분: {order.receipt_type === "CASH" ? "현금영수증" : "사업자지출증빙"}
              </p>
              <p className="text-sm text-zinc-700">번호: {order.receipt_value ?? "-"}</p>
            </section>
          )}

          {isPaypal && !isBankTransfer && (
            <section className="rounded-xl border p-4 bg-white space-y-3">
              <div className="text-sm font-medium text-zinc-800">PayPal 결제</div>
              {(paypalUiState === "idle" || paypalUiState === "loading") && (
                <p className="text-sm text-zinc-600">
                  PayPal 결제 버튼을 불러오는 중입니다.
                </p>
              )}
              {paypalUiError && (
                <div className="space-y-2 rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-sm text-red-700">{paypalUiError}</p>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setPaypalRenderAttempt((attempt) => attempt + 1)}
                    className="rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 disabled:opacity-50"
                  >
                    PayPal 버튼 다시 불러오기
                  </button>
                </div>
              )}
              <div
                ref={paypalContainerRef}
                className={`portone-ui-container ${loading || paymentCheckDelayed ? "pointer-events-none opacity-60" : ""}`}
                data-portone-ui-type="paypal-spb"
              />
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

          {!isBankTransfer && (
            <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center">
              <p className="text-sm text-zinc-600 leading-relaxed">
                카드사 인증 중에는 입력 반응이 늦거나<br />
                화면이 정지된 것처럼 보일 수 있습니다.<br />
                <strong>결제가 정상 처리될 때까지 창을 닫지 마세요.</strong>
              </p>
            </section>
          )}

          {loading && (
            <section className="rounded-xl border p-4 bg-zinc-50 text-center">
              <p className="text-sm text-zinc-600">
                결제창을 불러오거나 승인 결과를 확인하고 있습니다.<br />
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

          {paymentCheckDelayed && (
            <section className="space-y-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
              <p className="text-sm text-blue-700">
                결제 확인이 지연되고 있습니다.<br />
                결제를 다시 시도하지 말고 상태를 다시 확인해 주세요.
              </p>
              <button
                type="button"
                onClick={retryPaymentStatus}
                className="rounded-lg border border-blue-300 bg-white px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-100"
              >
                결제 상태 다시 확인
              </button>
            </section>
          )}

          {!isBankTransfer && !isPaypal && (
            <ConfirmPaymentButtons
              loading={loading || expired || paymentCheckDelayed}
              onPay={requestPayment}
            />
          )}
        </>
      )}
    </main>
  );
}
