// src/app/projects/500_fiction/bookmaps/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  REGIONS,
  FIVE_HUNDRED_STORES,
  type RegionKey,
  type FiveHundredStore,
} from "@/lib/fivehundredStores";

declare global {
  interface Window {
    kakao: any;
  }
}

type MarkerEntry = {
  storeId: FiveHundredStore["id"];
  marker: any;
  position: any;
  info: any;
};

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export default function FiveHundredBookmapsPage() {
  const [region, setRegion] = useState<RegionKey>("seoul");
  const [isMapReady, setIsMapReady] = useState(false);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any | null>(null);
  const markersRef = useRef<MarkerEntry[]>([]);

  const stores: FiveHundredStore[] = FIVE_HUNDRED_STORES[region] ?? [];

  // Kakao SDK 로더
  const loadKakaoSdk = (onReady: () => void) => {
    const scriptId = "kakao-map-sdk";
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    // 이미 SDK가 로드된 상태
    if (existingScript && window.kakao && window.kakao.maps && window.kakao.maps.load) {
      window.kakao.maps.load(onReady);
      return;
    }

    // 스크립트는 있는데 아직 load 전이라면
    if (existingScript && !existingScript.dataset.loaded) {
      existingScript.addEventListener("load", () => {
        existingScript.dataset.loaded = "true";
        if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
          window.kakao.maps.load(onReady);
        }
      });
      return;
    }

    // 최초 로드
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      process.env.NEXT_PUBLIC_KAKAO_JS_KEY
    }&autoload=false&libraries=services&v=${Date.now()}`;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
        window.kakao.maps.load(onReady);
      } else {
        console.error("카카오맵 load 함수를 찾을 수 없습니다.");
        setIsMapReady(true);
      }
    };
    script.onerror = () => {
      console.error("카카오맵 SDK 로드 실패");
      setIsMapReady(true);
    };

    document.head.appendChild(script);
  };

  // 지도/마커 초기화 또는 갱신
  const initOrUpdateMap = (regionKey: RegionKey) => {
    if (!mapRef.current) return;
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.LatLng) {
      console.error("카카오맵 SDK가 아직 준비되지 않았습니다.");
      return;
    }

    const kakao = window.kakao;

    // 지도 인스턴스 없으면 생성
    if (!mapInstanceRef.current) {
      const center = new kakao.maps.LatLng(37.5665, 126.9780); // 서울 시청 근처
      const map = new kakao.maps.Map(mapRef.current, {
        center,
        level: 8,
      });

      // 인터랙션 활성화
      map.setDraggable(true);
      map.setZoomable(true);

      // 컨트롤 추가
      const mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // 기존 마커 제거
    if (markersRef.current.length > 0) {
      markersRef.current.forEach((entry) => {
        if (entry.marker) entry.marker.setMap(null);
        if (entry.info) entry.info.close();
      });
      markersRef.current = [];
    }

    const regionStores = FIVE_HUNDRED_STORES[regionKey] ?? [];
    if (regionStores.length === 0) {
      setIsMapReady(true);
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();
    const bounds = new kakao.maps.LatLngBounds();

    regionStores.forEach((store) => {
      // 주소가 너무 길어 오류나는 걸 방지: 대괄호 앞까지만 사용
      const query = (store.address || "").split("[")[0].trim();
      if (!query) return;

      geocoder.addressSearch(query, (result: any[], status: string) => {
        if (status !== kakao.maps.services.Status.OK) {
          console.warn("Geocode 실패:", store.name, query);
          return;
        }

        const { x, y } = result[0];
        const position = new kakao.maps.LatLng(y, x);

        const marker = new kakao.maps.Marker({
          map,
          position,
          clickable: true,
        });

        const info = new kakao.maps.InfoWindow({
          content: `
            <div style="padding:8px 10px;font-size:12px;line-height:1.4;white-space:nowrap;">
              <strong>${store.name}</strong><br />
              <span>${query}</span>
            </div>
          `,
        });

        // 마커 클릭 시: 중앙 이동 + 인포윈도우
        kakao.maps.event.addListener(marker, "click", () => {
          markersRef.current.forEach((entry) => entry.info?.close());
          map.setCenter(position);
          map.setLevel(5);
          info.open(map, marker);
        });

        markersRef.current.push({
          storeId: store.id,
          marker,
          position,
          info,
        });

        bounds.extend(position);
        map.setBounds(bounds);
      });
    });

    setIsMapReady(true);
  };

  // region 변경 시 지도/마커 갱신
  useEffect(() => {
    if (!mapRef.current) return;

    loadKakaoSdk(() => {
      initOrUpdateMap(region);
    });
  }, [region]);

  // 리스트 클릭 → 해당 마커 포커스
    const handleStoreClick = (storeId: FiveHundredStore["id"]) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const target = markersRef.current.find((entry) => entry.storeId === storeId);
    if (!target) return;

    markersRef.current.forEach((entry) => entry.info?.close());
    map.setCenter(target.position);
    map.setLevel(5);
    target.info.open(map, target.marker);
    };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 space-y-10">
      {/* 헤더 */}
      <header className="space-y-4">
        <h1 className="reveal-up text-2xl md:text-3xl font-semibold" style={revealStyle(180)}>『500자 소설』 입고 서점 지도</h1>
        <p className="reveal-up text-sm md:text-base text-zinc-700 leading-relaxed" style={revealStyle(300)}>
          현재 전국 교보문고에도 입점되어 있지만, 수림 스튜디오는 동네책방과의 관계를 우선합니다.
          <br />
          문수림의 『500자 소설』을 만나볼 수 있는 동네책방을 정리한 지도입니다.
        </p>
        <p className="reveal-up text-xs md:text-sm text-zinc-500" style={revealStyle(380)}>
          * 현재 서울 지역 입고 서점부터 먼저 안내드리며, 확인되는 대로 다른 지역도 순차적으로 확장할 예정입니다.
          * 실제 재고 및 운영 시간은 각 서점 사정에 따라 달라질 수 있습니다.
        </p>
      </header>

      {/* 지역 탭 */}
      <section className="reveal-up space-y-2" style={revealStyle(420)}>
        <div className="inline-flex flex-wrap gap-2 rounded-full bg-zinc-100 px-3 py-2 text-xs md:text-sm">
          {REGIONS.map((r) => {
            const isActive = region === r.key;
            const hasStores = (FIVE_HUNDRED_STORES[r.key] ?? []).length > 0;
            const base =
              "px-3 py-1.5 rounded-full border text-xs md:text-sm transition-colors";
            const activeClass = "bg-emerald-600 text-white border-emerald-600";
            const inactiveClass = hasStores
              ? "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
              : "bg-zinc-100 text-zinc-500 border-zinc-200 hover:bg-zinc-200/70";

            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setRegion(r.key)}
                className={`${base} ${isActive ? activeClass : inactiveClass}`}
              >
                {r.label}
                {!hasStores && <span className="ml-1 text-[10px]">(준비 중)</span>}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-zinc-500">
          {REGIONS.find((r) => r.key === region)?.subtitle}
        </p>
      </section>

      {/* 지도 + 리스트 */}
      <section className="reveal-up grid gap-6 md:grid-cols-[2fr,1.2fr] items-start" style={revealStyle(520)}>
        {/* 지도 영역 */}
        <div
          ref={mapRef}
          className="h-[420px] md:h-[480px] w-full rounded-2xl border border-zinc-200 bg-zinc-50 overflow-hidden relative"
        >
          {!isMapReady && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-500">
              지도를 불러오는 중입니다…
            </div>
          )}
          {isMapReady && stores.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-500 bg-white/70 backdrop-blur">
              선택하신 지역의 입고 정보는 준비 중입니다.
            </div>
          )}
        </div>

        {/* 리스트 영역 */}
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
                  className="border-b border-zinc-100 pb-3 last:border-b-0 last:pb-0 cursor-pointer hover:bg-emerald-50/40 rounded-md px-2 -mx-2 transition-colors"
                  onClick={() => handleStoreClick(store.id)}
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

      {/* CTA */}
      <section className="reveal-up rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6" style={revealStyle(1000)}>
        <p className="mb-4 text-zinc-700">
          500자 소설의 프로젝트 구조를 함께 살펴보세요. 책, 앱, 샘플, 입고 서점 정보까지 하나의 흐름으로
          이어집니다.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects/500_fiction/sample"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
          >
            작품 미리보기
          </Link>

          <Link
            href="/edition/surimseoga/500-fiction"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-600"
          >
            책 보러가기
          </Link>

          <Link
            href="/projects/500fiction_app"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-white transition hover:bg-emerald-500"
          >
            앱 알아보기
          </Link>

          <Link
            href="/projects/500fiction_shortpaper"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-4 py-2 text-white transition hover:bg-emerald-500"
          >
            소논문 보러가기
          </Link>
        </div>
      </section>

    </main>
  );
}
