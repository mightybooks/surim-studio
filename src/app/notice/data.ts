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
    body: `수림 스튜디오는 기록이 남는 창작 플랫폼입니다.
로그인과 결제는 계정에 연결되는 중요한 과정입니다.

인앱 브라우저에서는 로그인이나 결제가 정상적으로 완료되지 않을 수 있습니다.

안정적인 이용을 위해 Safari 또는 Chrome에서 접속해 주세요.
인앱 환경에서는 둘러보기만 제공됩니다.

이 안내는 최초 1회만 표시됩니다.`,
  },
  {
    slug: "login-required",
    title: "수림 스튜디오는 로그인 기반 플랫폼입니다",
    summary:
      "창간호가 무료여도 로그인은 필수입니다. 기록/아카이브/구매/참여를 안정적으로 연결하기 위한 정책을 설명합니다.",
    category: "정책",
    publishedAt: "2026-02-23",
    body: `수림 스튜디오는 기록이 쌓이는 창작 플랫폼입니다.
읽기, 참여, 구매는 모두 하나의 계정에 연결됩니다.

로그인은 무료이며,
기록을 안전하게 보존하고 기능을 일관되게 제공하기 위한 기본 절차입니다.

홈, 공지, 블로그, 상품 소개 등 일부 영역은 로그인 없이 둘러볼 수 있습니다.
다만 실제 기능 사용은 로그인 이후에 가능합니다.`,
  },
  {
    slug: "email-verification",
    title: "메일 인증이 필요한 이유",
    summary:
      "계정 보호와 기능 사용 조건을 위해 메일 인증이 필요합니다. 인앱에서 인증 링크를 여는 경우의 팁도 함께 안내합니다.",
    category: "보안",
    publishedAt: "2026-02-23",
    body: `메일 인증은 계정을 안전하게 보호하기 위한 기본 절차입니다.

인증이 완료되어야 로그인, 구매, 참여 기능을 정상적으로 이용할 수 있습니다.
이는 계정 도용을 방지하고, 기록을 정확히 연결하기 위한 과정입니다.

인증 메일은 Safari 또는 Chrome에서 여는 것을 권장합니다.
인앱 브라우저에서는 인증이 정상적으로 완료되지 않을 수 있습니다.

인증이 되지 않는 경우, 일반 브라우저에서 다시 시도해 주세요.`,
  },
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getNoticeBySlug(slug: string) {
  return NOTICE_ITEMS.find((item) => item.slug === slug);
}
