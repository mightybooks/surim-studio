"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    daum: any;
  }
}

export default function AddressSearch({ onSelect }: {
  onSelect: (data: {
    zipcode: string;
    address1: string;
  }) => void;
}) {
  useEffect(() => {
    if (document.getElementById("daum-postcode-script")) return;

    const script = document.createElement("script");
    script.id = "daum-postcode-script";
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.body.appendChild(script);
  }, []);

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        onSelect({
          zipcode: data.zonecode,
          address1: data.address,
        });
      },
    }).open();
  };

  return (
    <button
      type="button"
      onClick={openPostcode}
      className="rounded-lg border px-3 py-2 text-sm"
    >
      주소 검색
    </button>
  );
}
