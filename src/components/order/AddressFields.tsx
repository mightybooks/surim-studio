"use client";

import { useEffect } from "react";

type AddressFieldsProps = {
  zipcode: string;
  address: string;
  addressDetail: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

declare global {
  interface Window {
    daum: any;
  }
}

export default function AddressFields({
  zipcode,
  address,
  addressDetail,
  onChange,
}: AddressFieldsProps) {
  /**
   * 다음 주소 API 스크립트 로드
   * - 한 번만 로드되도록 방어
   */
  useEffect(() => {
    if (document.getElementById("daum-postcode-script")) return;

    const script = document.createElement("script");
    script.id = "daum-postcode-script";
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /**
   * 주소 검색 버튼 클릭
   */
  const handleAddressSearch = () => {
    if (!window.daum) {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data: any) {
        // 우편번호, 기본주소 자동 입력
        onChange({
          target: {
            name: "zipcode",
            value: data.zonecode,
          },
        } as React.ChangeEvent<HTMLInputElement>);

        onChange({
          target: {
            name: "address",
            value: data.address,
          },
        } as React.ChangeEvent<HTMLInputElement>);

        // 상세주소 입력으로 포커스 이동
        const detailInput = document.querySelector(
          'input[name="addressDetail"]'
        ) as HTMLInputElement | null;

        detailInput?.focus();
      },
    }).open();
  };

  return (
    <section className="space-y-3">
      <h2 className="font-medium">배송지 정보</h2>

      {/* 주소 검색 버튼 */}
      <button
        type="button"
        onClick={handleAddressSearch}
        className="w-full rounded-md border border-dashed px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        주소 검색
      </button>

      {/* 우편번호 (자동 입력) */}
      <input
        type="text"
        name="zipcode"
        placeholder="우편번호"
        value={zipcode}
        readOnly
        className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm"
      />

      {/* 기본주소 (자동 입력) */}
      <input
        type="text"
        name="address"
        placeholder="기본주소"
        value={address}
        readOnly
        className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm"
      />

      {/* 상세주소 (사용자 입력) */}
      <input
        type="text"
        name="addressDetail"
        placeholder="상세주소를 입력해주세요"
        value={addressDetail}
        onChange={onChange}
        className="w-full rounded-md border px-3 py-2 text-sm"
      />
    </section>
  );
}
