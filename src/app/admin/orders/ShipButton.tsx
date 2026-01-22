"use client";

import { useState } from "react";

export default function ShipButton({ orderId }: { orderId: string }) {
  const [open, setOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!trackingNumber) return;

    setLoading(true);

    const res = await fetch("/api/admin-orders/ship", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        trackingNumber,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("배송 처리 실패");
      return;
    }

    alert("배송 처리 완료");
    location.reload();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 underline"
      >
        배송처리
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        className="border px-2 py-1 text-sm"
        placeholder="송장번호"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      <button
        onClick={submit}
        disabled={loading}
        className="text-blue-600 underline"
      >
        확인
      </button>
    </div>
  );
}
