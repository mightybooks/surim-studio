// src/app/funding/books/[slug]/page.tsx
import FundingDetailPage from "@/components/funding/FundingDetailPage";
import { notFound } from "next/navigation";

type FundingConfig = {
  product: any;
  targetBooks: number;
  source: string;
  fundingActive: boolean;
  completionNotice?: string;
  completionNoticeHref?: string;
};

const FUNDINGS: Record<string, FundingConfig> = {
  "500-2026": {
    product: {
      id: "funding_500_2026_01",
      type: "FUNDING_BOOK",
      name: "문수림의『500자 소설』(펀딩)",
      price: 11000,
      priceUsd: 22,
      delivery: "택배 / 1~3영업일",
      thumbnail: "/productlist/500funding_list.jpg",
      detailImage: "/productdetail/500funding_detail2.jpg",
      composition: "도서 1권, 사은품 책갈피 1개, 저자 친필사인",
      spec: "128×188mm / 208p",
      isbn: "979-11-994493-2-9(03810)",
    },
    targetBooks: 150,
    source: "funding_500",
    fundingActive: false,
    completionNotice: "이 펀딩은 2026년 2월 22일 종료되었습니다.",
    completionNoticeHref: "/projects/500funding-archive",
  },

  // 다음 펀딩 생기면 여기 한 덩어리 추가
  // "new-2026": { ... fundingActive: true ... }
};

export default function Page({ params }: { params: { slug: string } }) {
  const cfg = FUNDINGS[params.slug];
  if (!cfg) return notFound();

  return (
    <FundingDetailPage
      product={cfg.product}
      targetBooks={cfg.targetBooks}
      source={cfg.source}
      fundingActive={cfg.fundingActive}
      completionNotice={cfg.completionNotice}
      completionNoticeHref={cfg.completionNoticeHref}
    />
  );
}