// src/app/library/_data.ts
export type StoreKey = "kyobo" | "shop"; // 교보문고 | 내 독립몰(스마트스토어 등)

export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  imprint: string;
  isbn: string;
  cover: string; // /public 기준 경로
  description: string;
  toc?: string[];
  // 각 책의 실제 구매/랜딩 링크 목록 (두 개만 유지)
  stores: {
    key: StoreKey; // "kyobo" | "shop"
    label: string; // 버튼 라벨
    url: string;   // 실제 상품 URL
  }[];
  related?: { href: string; title: string; desc: string }[];
};

export const BOOKS: Book[] = [
  {
    slug: "tosilbook",
    title: "토실토실 토끼를 안았습니다",
    subtitle: "유기토끼가 나를 구조하다",
    author: "시안",
    imprint: "사이의 순간들",
    isbn: "979-11-994493-0-5",
    cover: "/books/tosiltosil-cover.webp",
    description:
      "유기토끼를 구조하고 보호하는 과정에서 교감을 나누게 된 사람들의 이야기",
    toc: [
      "프롤로그_미미가 남긴 물음, 왜 하필 토끼일까?",
      "Chapter 1. 여기까지 오느라 참 고생했어",
      "Chapter 2. 우린 이미 애가 아홉이에요",
      "Chapter 3. 해피엔딩을 위한 준비물",
      "Chapter 4. 이 별에서는 이별하지만 토끼별에서 우리 다시 만나길",
      "Chapter 5. 전시장 토끼들은 어디로 가게 될까?",
      "Chapter 6. 가축이 아닌 가족입니다",
      "에필로그_토끼 유토피아",
      "편집자의 말_간악한 자백",
    ],
    stores: [
      {
        key: "kyobo",
        label: "교보문고",
        url: "https://product.kyobobook.co.kr/detail/S000218189677", // 실제 상품 URL로 교체 가능
      },
      {
        key: "shop",
        label: "공식 스토어",
        url: "https://smartstore.naver.com/shop15th/products/12581419034",
      },
    ],
    related: [
      {
        href: "/projects/tosiltosil",
        title: "프로젝트 소개",
        desc: "프로젝트 상세소개페이지로 이동",
      },
      {
        href: "/projects/tosiltosil-care",
        title: "돌봄에너지 앱",
        desc: "돌봄에너지 자가측정 앱페이지로 이동",
      },
    ],
  },
];
