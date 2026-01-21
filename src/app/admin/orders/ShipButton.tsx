"use client";

export default function ShipButton({
  orderId,
}: {
  orderId: string;
}) {
  const handleClick = async () => {
    const trackingNumber = prompt("송장번호를 입력하세요");
    if (!trackingNumber) return;

    const res = await fetch("/api/orders/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        status: "shipped",
        trackingNumber,
      }),
    });

    if (!res.ok) {
      alert("배송 처리 실패");
      return;
    }

    alert("배송 처리 완료");
    location.reload();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 underline"
    >
      배송처리
    </button>
  );
}
