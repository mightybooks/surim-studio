// 공지 데이터 단일 출처
export type NewsItem = {
  slug: string;
  title: string;
  body: string;
  category?: string;
  published_at?: string; // "2025-11-01" 같은 ISO 형태 권장
  cta?: { href: string; label: string };
  href?: string; // ← 있으면 /news 대신 이 경로로 이동
};

export const NEWS: NewsItem[] = [
  {
    title: "홈페이지 메뉴 구성 변경과 보안 강화",
    body:
      "수림 스튜디오 홈페이지 내부 메뉴 구성을 변경하였습니다" +
      "드롭바 형태로 구현하여 이용자들의 불편을 줄였습니다" +
      "일부 기능은 관리자만이 보안키로 접근가능하도록 보안을 강화하였습니다",
    category: "News",
    published_at: "2025-11-14",
  },
  {
    title: "2025년 대구서부도서관 가을학기 글쓰기 특강을 마쳤습니다",
    body:
      "25년 11월 13일. " +
      "대구서부도서관에서 진행된 글쓰기 특강 8회차 과정을 모두 마쳤습니다.",
    category: "News",
    published_at: "2025-11-13",
  },
  {
    slug: "tosil-challenge",
    title: "〈토실토실〉돌봄의 에너지 캠페인 시작",
    body:
      "25년 12월. <토실토실 돌봄에너지> 앱이 발표될 예정입니다. " +
      "앱과 도서를 통해 사용자들의 참여와 인식 개선을 도모합니다. " +
      "현재 관련 앱이 개발중입니다.",
    category: "News",
    published_at: "2025-11-01",
    cta: { href: "/projects/tosiltosil", label: "프로젝트 보러가기" },
    href: "/projects/tosiltosil", // ← 클릭 시 바로 프로젝트 페이지로 이동
  },
  {
    slug: "500chars-beta",
    title: "500자소설 아카이브 베타 오픈",
    body:
      "앱에서 생성된 결과물의 선별 수록 페이지를 공개합니다. " +
      "실험 작품 제출 가이드도 함께 제공합니다. " +
      "현재 관련 앱 개발중입니다.",
    category: "Update",
    published_at: "2025-11-05",
    cta: { href: "/projects/500chars", label: "아카이브 허브" },
  },
  {
    slug: "500novel",
    title: "500자소설 단행본 출시 임박",
    body:
      "SNS 스레드에서 연재하던 '500자소설쓰기'가 곧 마감됩니다. " +
      "최초 기획 101편 중 현재 89편의 원고가 모여 편집 작업에 착수한 상태입니다.",
    category: "News",
    published_at: "2025-11-10",
    cta: { href: "/news/500novel", label: "프로젝트 보러가기" },
  },
].sort((a, b) => (b.published_at || "").localeCompare(a.published_at || ""));
