// src/app/projects/tosiltosil/bookmaps/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { STORES_BY_REGION, type RegionKey, type TosiltosilStore } from "@/lib/tosiltosilStores";

declare global {
  interface Window {
    kakao: any;
  }
}

const REGIONS: { key: RegionKey; label: string; subtitle?: string; ready: boolean }[] = [
  { key: "seoul", label: "서울", subtitle: "현재 서울권 증정본 입고 서점", ready: true },
  { key: "gyeonggi", label: "경기", subtitle: "추가 정리 예정", ready: false },
  { key: "metro", label: "전국 광역시", subtitle: "추가 정리 예정", ready: false },
];

export default function TosiltosilBookmapsPage() {
  const [region, setRegion] = useState<RegionKey>("seoul");
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const stores: TosiltosilStore[] = STORES_BY_REGION[region];

  useEffect(() => {
  if (!mapRef.current) return;

  const scriptId = "kakao-map-sdk";

  function initMap() {
    try {
      const kakao = window.kakao;
      const mapCenter = new kakao.maps.LatLng(37.5665, 126.9780); // 서울 시청 근처
      const map = new kakao.maps.Map(mapRef.current, {
        center: mapCenter,
        level: 8,
      });

      // 서울만 사용 중이니, 지금은 seoul만 그립니다.
      const seoulStores = STORES_BY_REGION["seoul"];
      if (!seoulStores || seoulStores.length === 0) {
        setIsMapReady(true);
        return;
      }

      const geocoder = new kakao.maps.services.Geocoder();
      const bounds = new kakao.maps.LatLngBounds();

      seoulStores.forEach((store) => {
        geocoder.addressSearch(
          store.address,
          (result: any[], status: string) => {
            if (status !== kakao.maps.services.Status.OK) {
              console.warn("Geocode 실패:", store.name, store.address);
              return;
            }

            const { x, y } = result[0];
            const position = new kakao.maps.LatLng(y, x);

            const marker = new kakao.maps.Marker({
              map,
              position,
            });

            const info = new kakao.maps.InfoWindow({
              content:
                `<div style="padding:6px 8px;font-size:12px;white-space:nowrap;">` +
                `${store.name}</div>`,
            });

            kakao.maps.event.addListener(marker, "click", () => {
              info.open(map, marker);
            });

            bounds.extend(position);
            map.setBounds(bounds);
          }
        );
      });

      setIsMapReady(true);
    } catch (e) {
      console.error("카카오맵 초기화 중 오류:", e);
      setIsMapReady(true);
    }
  }

  const existingScript = document.getElementById(scriptId);

  if (existingScript && window.kakao && window.kakao.maps) {
    // 이미 SDK가 로드된 경우
    window.kakao.maps.load(() => {
      initMap();
    });
    return;
  }

  // 최초 1회 로드
  const script = document.createElement("script");
  script.id = scriptId;
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    process.env.NEXT_PUBLIC_KAKAO_JS_KEY
  }&autoload=false&libraries=services`;
  script.async = true;
  script.onload = () => {
    window.kakao.maps.load(() => {
      initMap();
    });
  };
  script.onerror = () => {
    console.error("카카오맵 SDK 로드 실패");
    setIsMapReady(true);
  };

  document.head.appendChild(script);

  // cleanup은 지금 단계에서는 생략해도 무방
  }, []); // ★ region 의존성 제거 (지금은 서울만 쓰므로 1회만 실행)

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 space-y-10">
      {/* 헤더 */}
      <header className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-semibold">동네 서점 입고 지도.</h1>
        <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
          현재 전국 교보문고에도 입점되어 있지만, 수림 스튜디오는 동네책방과의 관계를 우선합니다.
          <br />
          아래에 표기된 책방들에는 『토실토실 토끼를 안았습니다』 증정본이 비치되어 있습니다. 가까운
          책방을 확인해 보세요.
        </p>
        <p className="text-xs md:text-sm text-zinc-500">
          * 지금은 서울권 책방부터 정리되어 있으며, 순차적으로 경기 지역과 전국 광역시의 동네책방까지
          지도를 확장할 예정입니다.
        </p>
      </header>

      {/* 지역 탭 */}
      <section className="space-y-2">
        <div className="inline-flex flex-wrap gap-2 rounded-full bg-zinc-100 px-3 py-2 text-xs md:text-sm">
          {REGIONS.map((r) => {
            const isActive = region === r.key;
            const base =
              "px-3 py-1.5 rounded-full border text-xs md:text-sm transition-colors";
            const activeClass = "bg-emerald-600 text-white border-emerald-600";
            const inactiveClass = r.ready
              ? "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
              : "bg-zinc-200 text-zinc-500 border-zinc-200 cursor-not-allowed";

            return (
              <button
                key={r.key}
                type="button"
                onClick={() => r.ready && setRegion(r.key)}
                className={`${base} ${isActive ? activeClass : inactiveClass}`}
              >
                {r.label}
                {!r.ready && <span className="ml-1 text-[10px]">(준비 중)</span>}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-zinc-500">
          {REGIONS.find((r) => r.key === region)?.subtitle}
        </p>
      </section>

      {/* 지도 + 리스트 */}
      <section className="grid gap-6 md:grid-cols-[2fr,1.2fr] items-start">
        <div
          ref={mapRef}
          className="h-[420px] md:h-[480px] w-full rounded-2xl border border-zinc-200 bg-zinc-50 overflow-hidden"
        >
          {!isMapReady && (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
              지도를 불러오는 중입니다…
            </div>
          )}
          {isMapReady && stores.length === 0 && (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
              선택하신 지역의 입고 정보는 준비 중입니다.
            </div>
          )}
        </div>

        <div className="max-h-[480px] w-full overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-4 text-sm">
          {stores.length === 0 ? (
            <p className="text-zinc-500">
              아직 이 지역의 동네책방 입고 정보가 정리되는 중입니다. 곧 업데이트될 예정입니다.
            </p>
          ) : (
            <ul className="space-y-3">
              {stores.map((store) => (
                <li
                  key={store.id}
                  className="border-b border-zinc-100 pb-3 last:border-b-0 last:pb-0"
                >
                  <div className="font-medium text-zinc-900">{store.name}</div>
                  <div className="mt-0.5 text-zinc-700">{store.address}</div>
                  {store.phone && store.phone !== "개인번호라 미기입" && (
                    <div className="mt-1 text-xs text-zinc-500">{store.phone}</div>
                  )}
                  {store.phone === "개인번호라 미기입" && (
                    <div className="mt-1 text-[11px] text-zinc-400">
                      서점 개인 연락처는 비공개로 운영 중입니다.
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="pt-6 border-t border-zinc-200 flex flex-col md:flex-row gap-4 justify-center text-center">
        <Link
          href="/projects/tosiltosil-care"
          className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
        >
          캠페인 참여하기
        </Link>
        <Link
          href="/library/tosilbook"
          className="px-6 py-3 rounded-xl border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50"
        >
          책 정보 보기
        </Link>
      </section>
    </main>
  );
}
