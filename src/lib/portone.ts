export async function verifyPortonePayment(paymentId: string) {
  const res = await fetch(`https://api.portone.io/payments/${paymentId}`, {
    headers: {
      Authorization: `PortOne ${process.env.PORTONE_API_SECRET}`,
    },
  });

  if (!res.ok) {
    return {
      ok: false,
      reason: "PORTONE_API_ERROR",
    };
  }

  const data = await res.json();

  if (data.status !== "PAID") {
    return {
      ok: false,
      reason: "NOT_PAID",
      status: data.status,
    };
  }

  return {
    ok: true,
    status: "PAID",
    amount: data.amount.total,
    paymentId,
  };
}

// orderId(merchant_uid) 기준으로 결제 조회
export async function fetchPaymentIdByOrderId(orderId: string) {
  const res = await fetch(
    `https://api.portone.io/payments?merchant_uid=${orderId}`,
    {
      headers: {
        Authorization: `PortOne ${process.env.PORTONE_API_SECRET}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("PORTONE_PAYMENT_LOOKUP_FAILED");
  }

  const data = await res.json();

  // 가장 최근 결제 1건
  const payment = data.items?.[0];

  if (!payment) {
    throw new Error("NO_PAYMENT_FOUND");
  }

  return {
    paymentId: payment.id,
    status: payment.status,
    amount: payment.amount?.total,
  };
}
