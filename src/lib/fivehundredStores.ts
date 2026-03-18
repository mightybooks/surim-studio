export type RegionKey = "seoul" | "gyeonggi" | "metro";

export type FiveHundredStore = {
  id: string;
  name: string;
  address: string;
  phone?: string;
};

export const STORES_BY_REGION: Record<RegionKey, FiveHundredStore[]> = {
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
  gyeonggi: [],
  metro: [],
};