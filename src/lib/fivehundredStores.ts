// src/lib/fivehundredStores.ts

export type RegionKey =
  | "seoul"
  | "incheon"
  | "busan"
  | "daegu"
  | "gwangju"
  | "daejeon"
  | "ulsan"
  | "sejong"
  | "gangwon"
  | "chungcheong"
  | "jeolla"
  | "gyeongsang"
  | "jeju";

export type FiveHundredStore = {
  id: string;
  name: string;
  address: string;
  phone?: string;  
};

export const REGIONS: { key: RegionKey; label: string; subtitle?: string }[] = [
  { key: "seoul", label: "서울특별시", subtitle: "현재 서울권 입고 서점" },
  { key: "incheon", label: "인천광역시", subtitle: "추가 정리 예정" },
  { key: "busan", label: "부산광역시", subtitle: "추가 정리 예정" },
  { key: "daegu", label: "대구광역시", subtitle: "추가 정리 예정" },
  { key: "gwangju", label: "광주광역시", subtitle: "추가 정리 예정" },
  { key: "daejeon", label: "대전광역시", subtitle: "추가 정리 예정" },
  { key: "ulsan", label: "울산광역시", subtitle: "추가 정리 예정" },
  { key: "sejong", label: "세종특별시", subtitle: "추가 정리 예정" },
  { key: "gangwon", label: "강원도", subtitle: "추가 정리 예정" },
  { key: "chungcheong", label: "충청도", subtitle: "현재 충청권 입고 서점" },
  { key: "jeolla", label: "전라도", subtitle: "현재 전라권 입고 서점" },
  { key: "gyeongsang", label: "경상도", subtitle: "추가 정리 예정" },
  { key: "jeju", label: "제주도", subtitle: "추가 정리 예정" },
];

export const FIVE_HUNDRED_STORES: Record<RegionKey, FiveHundredStore[]> = {
  seoul: [
    {
      id: "saebyeok-gamsung-1jip",
      name: "새벽감성1집",
      address: "서울특별시 양천구 월정로50길 16-8 1층",
      phone: "0507-1365-1209",      
    },
    {
      id: "earth-emergency-landing",
      name: "지구불시착",
      address: "서울특별시 노원구 공릉로32길 13 (공릉동) 1층",
      phone: "010-5122-3532",      
    },
    {
      id: "all-or-nothing",
      name: "올오어낫싱",
      address: "서울특별시 금천구 시흥대로 315 금천롯데캐슬골드파크4차 마르쉐도르960동 2층 204호",
      phone: "010-9808-7595",      
    },
  ],
  incheon: [],
  busan: [],
  daegu: [],
  gwangju: [],
  daejeon: [],
  ulsan: [],
  sejong: [],
  gangwon: [],
  chungcheong: [
      {
      id: "daily-book-store",
      name: "일상서재",
      address: "충청남도 천안시 동남구 버들로 22 (문화동) 2층",
      phone: "010-8812-0152",      
    },
  ],
  jeolla: [
    {
      id: "quite-excitement-color",
      name: "조용한흥분색",
      address: "전북특별자치도 군산시 옥구읍 옥구남로 11 1층 조용한흥분색",
      phone: "0507-1471-8770",
    },
  ],
  gyeongsang: [],
  jeju: [],
};