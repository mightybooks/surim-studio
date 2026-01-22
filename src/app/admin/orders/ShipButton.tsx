"use client";

import { useState } from "react";

type ShippingCarrier = "CJ" | "POST" | "EMS";

const CARRIER_LABEL: Record<ShippingCarrier, string> = {
  CJ: "CJ대한통운",
  POST: "우체국",
  EMS: "EMS(해외)",
};

export default function ShipButton({ orderId }: { orderId: string }) {
  const [open, setOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState<ShippingCarrier>("CJ");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!trackingNumber.trim()) {
      alert("송장번호를 입력하세요.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin-orders/ship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          trackingNumber: trackingNumber.trim(),
          carrier,
        }),
      });

      if (!res.ok) {
        throw new Error("배송 처리 실패");
      }

      alert("배송 처리 완료");
      location.reload();
    } catch (err) {
      alert("배송 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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
    <div className="flex items-center gap-2">
      <select
        className="border px-2 py-1 text-sm"
        value={carrier}
        onChange={(e) =>
          setCarrier(e.target.value as ShippingCarrier)
        }
      >
        {Object.entries(CARRIER_LABEL).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      <input
        className="border px-2 py-1 text-sm w-40"
        placeholder="송장번호"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="text-blue-600 underline disabled:opacity-50"
      >
        확인
      </button>
    </div>
  );
}
