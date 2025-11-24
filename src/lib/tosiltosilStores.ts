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
    name: "잠수북스",
    address:
      "서울특별시 마포구 상암동 월드컵북로 434, DMC첨단산업센터 (상암동, DMC첨단산업센터) B동 218호 잠수북스 [상암동 1647]",
    phone: "0507-1338-7907",
    region: "seoul",
  },
  {
    id: 8,
    name: "북스피어",
    address:
      "서울특별시 용산구 효창동 두텁바위로64길 6, 지층 (효창동) 북스피어 [효창동 256-16]",
    phone: "02-312-1671",
    region: "seoul",
  },
  {
    id: 9,
    name: "북바이북",
    address:
      "서울특별시 종로구 계동 북촌로5가길 14-8, (계동) 1층 북바이북 [계동 101-6]",
    phone: "02-796-8448",
    region: "seoul",
  },
  {
    id: 10,
    name: "책방엔드",
    address:
      "서울특별시 동대문구 제기동 약령중앙로 30, 제기역해링턴플레이스 (제기동, 제기역해링턴플레이스) 401동 1층 108호 책방엔드 [제기동 1157-2]",
    phone: "0507-1333-5793",
    region: "seoul",
  },
  {
    id: 11,
    name: "책방세번째옆",
    address:
      "서울특별시 종로구 누하동 필운대로1길 12, 신광빌딩 (누하동, 신광빌딩) 2층 204호 책방세번째옆 [누하동 139-1]",
    phone: "0507-1383-1102",
    region: "seoul",
  },
  {
    id: 12,
    name: "책굼향기",
    address: "서울특별시 금천구 시흥동 시흥대로 92 (시흥동) 책굼향기 [시흥동 954]",
    phone: "070-4123-0901",
    region: "seoul",
  },
  {
    id: 13,
    name: "음주가의책방",
    address:
      "서울특별시 관악구 봉천동 관악로12길 3-14 (봉천동) 지하 1층 음주가의 책방 [봉천동 1598-17]",
    phone: "개인번호라 미기입",
    region: "seoul",
  },
  {
    id: 14,
    name: "책보냥",
    address:
      "서울특별시 성북구 성북동 성북로10가길 21 (성북동) 책보냥 [성북동 170-58]",
    phone: "개인번호라 미기입",
    region: "seoul",
  },
  {
    id: 15,
    name: "책방만유인력",
    address:
      "서울특별시 마포구 아현동 손기정로 52 (아현동) 1층 책방 만유인력 [아현동 706-2]",
    phone: "070-4045-5935",
    region: "seoul",
  },
  {
    id: 16,
    name: "밤의서점",
    address: "서울 서대문구 성산로 567-8 1층",
    phone: "개인번호라 미기입",
    region: "seoul",
  },
  {
    id: 17,
    name: "무엇보다책방",
    address: "서울 송파구 백제고분로45길 30 미석빌딩 305호",
    phone: "0507-1398-1880",
    region: "seoul",
  },
  {
    id: 18,
    name: "달리책방",
    address:
      "서울특별시 동작구 상도동 양녕로22길 10, 1층 (상도동) 달리책방 [상도동 274-495]",
    phone: "0507-1415-2681",
    region: "seoul",
  },
  {
    id: 19,
    name: "책발자국",
    address:
      "서울특별시 광진구 자양동 능동로 10, 테크노마트 (자양동, 테크노마트) 사무동 7층 S23호 책발자국 [자양동 227-7]",
    phone: "0507-1374-9633",
    region: "seoul",
  },
];

// 앞으로 경기·광역시 추가 시 이쪽에 배열 확장
export const STORES_BY_REGION: Record<RegionKey, TosiltosilStore[]> = {
  seoul: TOSILTOSIL_SEOUL_STORES,
  gyeonggi: [],
  metro: [],
};
