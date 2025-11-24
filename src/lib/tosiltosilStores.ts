// src/data/tosiltosilStores.ts

export type RegionKey = "seoul" | "gyeonggi" | "metro";

export type TosiltosilStore = {
  id: number;
  name: string;
  address: string;
  phone?: string;
  region: RegionKey;
};

export const TOSILTOSIL_SEOUL_STORES: TosiltosilStore[] = [
  {
    id: 1,
    name: "정글핌피",
    address:
      "서울특별시 영등포구 문래동2가 경인로77길 19, 남성맨션아파트 상가 (서, 남성맨션아파트 상가) 203호 정글핌피 책방 [문래동2가 , 남성맨션아파트]",
    phone: "0507-1386-9960",
    region: "seoul",
  },
  {
    id: 2,
    name: "피스북스",
    address: "서울시 종로구 옥인3길 5-1, 피스북스",
    phone: "0507-1414-2022",
    region: "seoul",
  },
  {
    id: 3,
    name: "북살롱 텍스트북",
    address: "서울 종로구 사직로9길 22 2층",
    phone: "02-722-0934",
    region: "seoul",
  },
  {
    id: 4,
    name: "창신책방",
    address: "서울특별시 종로구 창신동 종로51길 23-17 (창신동) [창신동 581-26]",
    phone: "0507-1437-4115",
    region: "seoul",
  },
  {
    id: 5,
    name: "책방곱셈",
    address:
      "서울특별시 마포구 연남동 성미산로29길 33 (연남동) 1층 책방 곱셈 [연남동 245-44]",
    phone: "0507-1320-8063",
    region: "seoul",
  },
  {
    id: 6,
    name: "책 바 바인딩",
    address:
      "서울특별시 관악구 봉천동 남부순환로231길 11, 태주빌라 (봉천동, 태주빌라) 1층 101호 책바 바인딩 [봉천동 1670-5]",
    phone: "개인번호라 미기입",
    region: "seoul",
  },
  {
    id: 7,
    name: "여기서울 149쪽",
    address:
      "서울특별시 중구 중림동 서소문로6길 33 (중림동) 여기서울 149쪽 [중림동 441-1]",
    phone: "0507-1392-0165",
    region: "seoul",
  },
  {
    id: 8,
    name: "책방뚝",
    address:
      "서울특별시 양천구 신정동 은행정로17길 8, 에비앙하우스 (신정동, 에비앙하우스) 1층 102호 책방 뚝 [신정동 911-13]",
    phone: "0507-1317-3420",
    region: "seoul",
  },
  {
    id: 9,
    name: "은둔책방",
    address:
      "서울특별시 은평구 역촌동 은평로3길 20-3 (역촌동) 1층 [역촌동 83-42]",
    phone: "0507-1352-4695",
    region: "seoul",
  },
  {
    id: 10,
    name: "책가도",
    address:
      "서울특별시 도봉구 창동 해등로 109, 창동1단지주공아파트 종합상가 (창동, 창동1단지주공아파트 종합상가) 2층 211호 [창동 307-2]",
    phone: "0507-1474-1386",
    region: "seoul",
  },
  {
    id: 11,
    name: "시행과 착오",
    address:
      "서울특별시 강북구 번동 도봉로96길 75 (번동) 1층 책방 시행과 착오 [번동 471-153]",
    phone: "개인번호라 미기입",
    region: "seoul",
  },
  {
    id: 12,
    name: "지식을 담다",
    address: "서울특별시 성북구 안암동5가 고려대로24가길 17, 소낭구빌딩 (서, 소낭구빌딩) 1층 지식을 담다 [안암동5가 103-107]",
    phone: "02-927-8044",
    region: "seoul",
  },
  {
    id: 13,
    name: "도토리책방",
    address:
      "서울 광진구 아차산로41길 7 1층 101호",
    phone: "0507-1351-3573",
    region: "seoul",
  },
  {
    id: 14,
    name: "책굼향기",
    address:
      "서울특별시 금천구 시흥동 시흥대로 92 (시흥동) 책굼향기 [시흥동 954]",
    phone: "070-4123-0901",
    region: "seoul",
  },
  {
    id: 15,
    name: "음주가의 책방",
    address:
      "서울특별시 관악구 봉천동 관악로12길 3-14 (봉천동) 지하 1층 음주가의 책방 [봉천동 1598-17]",
    phone: "개인번호라 미기입",
    region: "seoul",
  },
  {
    id: 16,
    name: "책보냥",
    address: "서울특별시 성북구 성북동 성북로10가길 21 (성북동) 책보냥 [성북동 170-58]",
    phone: "개인번호라 미기입",
    region: "seoul",
  },
  {
    id: 17,
    name: "책방 만유인력",
    address: "서울특별시 마포구 아현동 손기정로 52 (아현동) 1층 책방 만유인력 [아현동 706-2]",
    phone: "070-4045-5935",
    region: "seoul",
  },
  {
    id: 18,
    name: "밤의 서점",
    address:
      "서울 서대문구 성산로 567-8 1층",
    phone: "개인번호라 미기입",
    region: "seoul",
  },
  {
    id: 19,
    name: "무엇보다책방",
    address:
      "서울 송파구 백제고분로45길 30 미석빌딩 305호",
    phone: "0507-1398-1880",
    region: "seoul",
  },
];

// 앞으로 경기·광역시 추가 시 이쪽에 배열 확장
export const STORES_BY_REGION: Record<RegionKey, TosiltosilStore[]> = {
  seoul: TOSILTOSIL_SEOUL_STORES,
  gyeonggi: [],
  metro: [],
};
