export type NoticeItem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  body: string;
};

export const NOTICE_ITEMS: NoticeItem[] = [
  {
    slug: "inapp-safety",
    title: "인앱 브라우저에서 안전하게 이용하기",
    summary:
      "카카오/인스타/네이버앱 등 인앱 환경에서 발생할 수 있는 로그인, 인증, 결제 이슈와 권장 사용 방법을 안내합니다.",
    category: "이용 안내",
    publishedAt: "2026-02-23",
    body: `수림 스튜디오는 카카오, 인스타그램, 네이버앱 같은 인앱 브라우저에서도 둘러보기가 가능합니다.

다만 인앱 브라우저에서는 다음 문제가 발생할 수 있습니다.
- 로그인 세션이 중간에 끊기는 문제
- 메일 인증 링크 복귀가 실패하는 문제
- 결제 리다이렉트가 차단되는 문제

로그인, 메일 인증, 결제처럼 계정 상태가 중요한 동작은 Safari/Chrome 같은 일반 브라우저에서 진행해 주세요.

인앱으로 접속한 경우 최초 1회 안내 게이트를 제공하며, 이후 같은 세션에서는 반복 노출하지 않습니다.`,
  },
  {
    slug: "login-required",
    title: "수림 스튜디오는 로그인 기반 플랫폼입니다",
    summary:
      "창간호가 무료여도 로그인은 필수입니다. 기록/아카이브/구매/참여를 안정적으로 연결하기 위한 정책을 설명합니다.",
    category: "정책",
    publishedAt: "2026-02-23",
    body: `수림 스튜디오는 로그인 기반 서비스입니다.

무료 콘텐츠라도 로그인은 무료로 필수이며, 그 이유는 다음과 같습니다.
- 읽기 기록과 활동 이력을 계정 단위로 보존하기 위해
- 구매, 참여, 인증 과정을 사용자 계정에 안전하게 연결하기 위해
- 이후 아카이브와 확장 기능을 일관된 기준으로 제공하기 위해

SEO와 유입을 위해 블로그 글, 공지, 홈, 상품 상세 같은 둘러보기 영역은 로그인 없이도 열람 가능합니다.

단, 실제 기능 사용(로그인 이후 동작)은 계정 상태를 기준으로 처리됩니다.`,
  },
  {
    slug: "email-verification",
    title: "메일 인증이 필요한 이유",
    summary:
      "계정 보호와 기능 사용 조건을 위해 메일 인증이 필요합니다. 인앱에서 인증 링크를 여는 경우의 팁도 함께 안내합니다.",
    category: "보안",
    publishedAt: "2026-02-23",
    body: `메일 인증은 계정 보호를 위한 기본 절차입니다.

인증이 완료되어야 다음 항목을 안정적으로 사용할 수 있습니다.
- 로그인 보안 확인
- 계정 기반 기능 접근
- 구매/참여 데이터의 사용자 매칭

인증 메일 링크를 인앱 브라우저에서 열면 복귀가 끊기는 경우가 있으므로, 가능하면 Safari/Chrome에서 링크를 열어 진행해 주세요.

인증이 반복 실패하면 로그인 상태를 초기화한 뒤 일반 브라우저에서 다시 시도해 주세요.`,
  },
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getNoticeBySlug(slug: string) {
  return NOTICE_ITEMS.find((item) => item.slug === slug);
}
