"use client";

import { useEffect, useState } from "react";

const POSTCODE_SCRIPT_ID = "daum-postcode-script";
const POSTCODE_SCRIPT_SRC =
  "https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

type ScriptStatus = "loading" | "ready" | "error";

type PostcodeResult = {
  zonecode: string;
  address: string;
};

type PostcodeInstance = {
  open: () => void;
};

type PostcodeConstructor = new (options: {
  oncomplete: (data: PostcodeResult) => void;
}) => PostcodeInstance;

type PostcodeWindow = {
  kakao?: {
    Postcode?: PostcodeConstructor;
  };
  daum?: {
    Postcode?: PostcodeConstructor;
  };
};

type AddressFieldsProps = {
  zipcode: string;
  address: string;
  addressDetail: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function getPostcodeWindow() {
  return window as unknown as PostcodeWindow;
}

function getPostcodeConstructor() {
  const postcodeWindow = getPostcodeWindow();
  return postcodeWindow.kakao?.Postcode ?? postcodeWindow.daum?.Postcode;
}

export default function AddressFields({
  zipcode,
  address,
  addressDetail,
  onChange,
}: AddressFieldsProps) {
  const [scriptStatus, setScriptStatus] = useState<ScriptStatus>("loading");
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    queueMicrotask(() => {
      if (!active) return;

      if (getPostcodeConstructor()) {
        setScriptStatus("ready");
        return;
      }

      document.getElementById(POSTCODE_SCRIPT_ID)?.remove();

      const script = document.createElement("script");
      script.id = POSTCODE_SCRIPT_ID;
      script.src = POSTCODE_SCRIPT_SRC;
      script.async = true;
      script.onload = () => {
        if (!active) return;
        if (getPostcodeConstructor()) {
          setScriptStatus("ready");
          return;
        }
        console.error("Kakao postcode script loaded without the Postcode API.");
        setScriptStatus("error");
      };
      script.onerror = () => {
        if (!active) return;
        console.error("Failed to load the Kakao postcode script.");
        setScriptStatus("error");
      };
      document.head.appendChild(script);
    });

    return () => {
      active = false;
      const script = document.getElementById(POSTCODE_SCRIPT_ID);
      if (script instanceof HTMLScriptElement) {
        script.onload = null;
        script.onerror = null;
      }
    };
  }, [loadAttempt]);

  /**
   * 주소 검색 버튼 클릭
   */
  const handleAddressSearch = () => {
    if (scriptStatus === "error") {
      setScriptStatus("loading");
      setLoadAttempt((attempt) => attempt + 1);
      return;
    }

    const Postcode = getPostcodeConstructor();
    if (scriptStatus !== "ready" || !Postcode) {
      console.error("Kakao postcode API is not ready.");
      setScriptStatus("error");
      return;
    }

    try {
      new Postcode({
        oncomplete: (data) => {
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
            'input[name="addressDetail"]',
          ) as HTMLInputElement | null;

          detailInput?.focus();
        },
      }).open();
    } catch {
      console.error("Failed to open the Kakao postcode popup.");
      setScriptStatus("error");
    }
  };

  const buttonLabel =
    scriptStatus === "loading"
      ? "주소 검색 불러오는 중"
      : scriptStatus === "ready"
        ? "주소 검색"
        : "주소 검색 다시 불러오기";

  return (
    <section className="space-y-3">
      <h2 className="font-medium">배송지 정보</h2>

      {/* 주소 검색 버튼 */}
      <button
        type="button"
        onClick={handleAddressSearch}
        disabled={scriptStatus === "loading"}
        aria-busy={scriptStatus === "loading"}
        className="w-full rounded-md border border-dashed px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-wait disabled:opacity-60"
      >
        {buttonLabel}
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
