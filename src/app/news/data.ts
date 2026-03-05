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
    slug: "contest-2026-results",
    title: "자체 펀딩 및 문예경연대회 종료 ",
    body:
      "문수림의 신간『500자소설』이 성공적으로 자체 펀딩을 종료하고 " +       
      "현재 온라인 서점과 독립서점을 통해 유통되고 있습니다. " +
      "제3회 문예경연대회가 소설 부분 대상 1편, 가작 1편을 선정하고 발표하는 것으로 " +
      "행사를 종료하였습니다. ",
    category: "News",
    published_at: "2026-03-05",
    },
    {
    slug: "ready-500-novel",
    title: "문수림의『500자소설』곧 자체 펀딩에 들어갑니다 ",
    body:
      "1월중 출간이 목표였던『500자소설』이 드디어 출력 준비를 마쳤습니다 " +
      "현재는 최종 파일 검수 단계이며 " +
      "최종 인쇄 전 가본 2권이 2월초에 제작되어 펀딩 참여자들에게 우선 공개될 예정입니다 ",
    category: "News",
    published_at: "2026-01-14",
    },
    {
    slug: "shop-ready-mall",
    title: "결제 시스템 도입을 준비중입니다 ",
    body:
      "홈페이지의 정상적인 운영을 위해 결제 시스템을 도입중입니다 " +
      "포트원을 통해 진행중에 있으며 승인 심사를 받고 있습니다 " +
      "심사 승인과 함께 결제 시스템 구축이 바로 진행될 수 있도록 만전을 기하고 있습니다.  ",
    category: "News",
    published_at: "2026-01-14",
    },
    {
    slug: "web-complete2025-surim",
    title: "제3회 문수림배 문예경연대회 개최 및 로그인 시스템 구축 완료 ",
    body:
      "제3회 문수림배 문예경연대회가 개최되었습니다. " +
      "원고 투고는 수림 스튜디오 홈페이지를 통해 26년 1월 1일부터 2월 22일까지 온라인으로 접수를 받습니다. " +
      "아울러 앞으로 있을 각종 이벤트를 위해 소셜로그인 연동 시스템도 구축완료 되었음을 알립니다. ",
    category: "News",
    published_at: "2026-01-05",
    },
    {
    slug: "webapp-complete-500tosil",
    title: "웹앱 2종 개발 완료 및 아카이브 시스템 구축 완료 ",
    body:
      "500자 챌린지 앱과 돌봄에너지 자가측정 앱이 완성되었습니다. " +
      "두 앱 모두 각각의 결과물을 수림 스튜디오 홈페이지로 공유할 수 있고, " +
      "수림 스튜디오로 들어온 결과물들은 차례대로 누적되어 랜덤하게 사용자들에게 노출됩니다. ",
    category: "News",
    published_at: "2025-12-17",
    },
    {
    slug: "maps-character-update",
    title: "브랜드 뉴스. 마스코트 캐릭터 수리미와 토실이 탄생과 활동 내용이 업데이트 되었습니다. ",
    body:
      "수림 스튜디오의 마스코트 캐릭터 수리미와 토실이를 소개합니다. " +
      "캐릭터들의 탄생 과정과 활동 내용이 업데이트 되었습니다. " +
      "그 외 추가로 입고서점 지도의 일부 확대, 블로그 글의 목로보기 등이 업데이트 되었습니다. ",
    category: "News",
    published_at: "2025-12-01",
    },
    {
    slug: "daegu-bukgu-doseokwan",
    title: "25년 12월 4일, 11일. 이틀에 걸쳐 대구 북구태전도서관에서 특강이 열립니다. ",
    body:
      "문수림의 장르불문 관통하는 글쓰기 특강이 대구 북구태전도서관에서 열립니다. " +
      "25년 12월 4일과 11일. 목요일 저녁 7시~9시. 매 회차 2시간씩 2회에 걸친 특강입니다. " +
      "현재 대구 북구태전도서관 홈페이지를 통해서 신청이 가능합니다. ",
    category: "News",
    published_at: "2025-11-26",
    }, 
    {
    slug: "tosil-book-maps",
    title: "『토실토실 토끼를 안았습니다』전국 동네책방 입점 지도 업데이트를 시작했습니다. ",
    body:
      "전국 동네책방 입점 지도를 만들기 시작했습니다 " +
      "현재는 서울 지역 19개 책방의 리스트가 업데이트 되었으며, " +
      "매주 전국으로 더 확대되는 지도를 제공할 예정입니다. ",
    category: "News",
    published_at: "2025-11-24",
    cta: { href: "/projects/tosiltosil/bookmaps", label: "입점 지도 보러가기" },
    href: "/projects/tosiltosil/bookmaps", // ← 클릭 시 바로 프로젝트 페이지로 이동
    },
    {
    slug: "update-blogging-25-11-18",
    title: "블로그 섹션이 새롭게 정리되었습니다.",
    body:
      "작성되는 글의 성격 별로 섹션이 나뉘어졌습니다. " +
      "작업일지(Log), 출판과 글쓰기(Insight), 단상(Note). " +
      "이제 블로그 상단에서 원하는 섹션을 선택해 작업 기록만, 출판·글쓰기 이야기만, 혹은 잡생각만 골라 읽으실 수 있습니다. " +
      "앞으로 출판·글쓰기 섹션에는 1인출판과 독립출판을 준비하시는 분들을 위한 글도 꾸준히 쌓아갈 예정입니다.",
    category: "News",
    published_at: "2025-11-18",
    },  
    {
    slug: "first-blogging-25-11-14",
    title: "수림 스튜디오의 첫 블로그 글이 업데이트 되었습니다.",
    body:
      "첫 블로그 글이 안정적으로 생성되었습니다. " +
      "글을 관리할 관리자 페이지가 신설되고 외부 공유 링크가 만들어졌습니다. " +
      "댓글 기능은 아직 사용하실 수 없습니다.",
    category: "News",
    published_at: "2025-11-14",
    },
  {
    slug: "menu-upgrade99r",
    title: "홈페이지 메뉴 구성 변경과 보안 강화",
    body:
      "수림 스튜디오 홈페이지 내부 메뉴 구성을 변경하였습니다. " +
      "드롭바 형태로 구현하여 이용자들의 불편을 줄였습니다. " +
      "일부 기능은 관리자만이 보안키로 접근가능하도록 보안을 강화하였습니다. ",
    category: "News",
    published_at: "2025-11-14",
  },
  {
    slug: "daegu-west-library-writing-lecture-2025-fall",
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
    slug: "500fiction_archive",
    title: "500자소설 아카이브 베타 오픈",
    body:
      "앱에서 생성된 결과물의 선별 수록 페이지를 공개합니다. " +
      "실험 작품 제출 가이드도 함께 제공합니다. " +
      "현재 관련 앱 개발중입니다.",
    category: "Update",
    published_at: "2025-11-05",
    cta: { href: "/projects/500fiction_archive", label: "아카이브 허브" },
  },
  {
    slug: "500_fiction",
    title: "500자소설 단행본 출시 임박",
    body:
      "SNS 스레드에서 연재하던 '500자소설쓰기'가 곧 마감됩니다. " +
      "최초 기획 101편 중 현재 89편의 원고가 모여 편집 작업에 착수한 상태입니다.",
    category: "News",
    published_at: "2025-11-10",
    cta: { href: "/projects/500_fiction", label: "프로젝트 보러가기" },
  },
].sort((a, b) => (b.published_at || "").localeCompare(a.published_at || ""));
