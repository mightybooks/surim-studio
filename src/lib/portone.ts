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
