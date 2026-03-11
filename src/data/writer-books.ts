export type WriterBookPurchaseLinks = {
  kyobo: string | null;
  aladin: string | null;
  yes24: string | null;
};

export type WriterBook = {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publishedAt: string;
  trimSize: string;
  pageCount: number;
  price: number;
  category: string[];
  description: string;
  excerpt: string;
  officialLink: string | null;
  purchaseLinks: WriterBookPurchaseLinks;
  coverImage: string | null;
  editionSlug: string | null;
};

export const writerBooks: WriterBook[] = [
  {
    isbn: "979-11-994493-2-9",
    title: "500자 소설",
    author: "문수림",
    publisher: "수림스튜디오 (마이티북스)",
    publishedAt: "2026-03-02",
    trimSize: "128x188 (mm)",
    pageCount: 208,
    price: 12000,
    category: ["소설"],
    description:
      "『500자 소설』은 ‘500자’라는 분량 제한을 하나의 조건으로 삼아 쓰인 단편소설 실험의 결과물이다.\n\n이 책에 수록된 101편은 동일한 규칙 아래에서 반복적으로 쓰였으며, 그 반복 자체가 하나의 형식을 이룬다.\n\n개별 작품은 독립적인 소설이지만, 동시에 이 책은 500자라는 분량을 서사의 단위로 삼는 새로운 소설 형식을 제안한다.\n『500자 소설』은 완결된 단행본인 동시에, 하나의 장르로서 계속 확장되는 쓰기의 일부다.\n\n이 책과 동일한 조건으로 소설을 쓰고 공유할 수 있는 웹 환경이 운영되고 있으며, 웹에서는 분량 제한과 집필 기준을 유지한 채 새로운 작품들이 지속적으로 추가된다.\n\n이 책은 그중 하나의 지점이며, 쓰기는 여기서 멈추지 않는다. 현재 진행 중인 프로젝트와 관련 정보는 아래 사이트에서 확인할 수 있다.\n\nhttps://surimstudio.com",
    excerpt:
      "39. 문장의 세계\n\n소설 속 세상에 갇히는 건 정말 절망적이다. 내가 장담한다. 그건 정말 사람을 미치게 만든다. 여러분은 아마 1시간도 못 버틸 거다.\n왜냐고? 명확한 게 아무 것도 없으니까.\n\n믿기지 않겠지만, 여긴 사람들의 얼굴이 없다. 아니, 정확히는 제대로 된 윤곽이 없고, 옷차림도 매우 획일적이다.\n\n그렇다. 작가의 묘사가 미치지 않는 부분은 죄다 이런 식인 거다. 주인공과 중심 사건 외에는 뭐든 간결하고 엉성하다. 대략적인 이미지로 문장이 채워지니 뭐든 명확한 게 없다. 배가 고파 음식을 먹어도 그렇다. 뭐든 생김새가 엉성하고, 맛이 없다. 정말, 문자 그대로다. 아무런 맛도 나질 않는다.\n불완전한 문장 덕에 불명확한 것들로 채워진 세상.\n이런 세상이다 보니 냅다 도망부터 치고 싶지만, 설상가상으로 최근에는 이야기 진행조차 멈추어 버렸다. 정말 최악이다. 이후로 같은 일상만 반복되고 있는 중이다.\n\n나를 제외하곤 세상이 멈춘 채로 조금도 달라지지 않고 있다.",
    officialLink: "https://surimstudio.com/edition/surimseoga/500-fiction",
    purchaseLinks: {
      kyobo: "https://product.kyobobook.co.kr/detail/S000219311987",
      aladin: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K952136821",
      yes24: "https://www.yes24.com/Product/Goods/180211618",
    },
    coverImage: null,
    editionSlug: "500-fiction",
  },
  {
    isbn: "979-11-989893-2-1",
    title: "20에서 30까지",
    author: "문수림",
    publisher: "장미와 여우 (마이티북스)",
    publishedAt: "2025-02-10",
    trimSize: "128x188 (mm)",
    pageCount: 232,
    price: 12000,
    category: ["소설", "수필", "시"],
    description:
      "문수림 작가가 아직 이경민이었던 시절, 그때 남겼던 작품들을 정리한 작품집.\n\n문수림 작가의 20~30대 시절 썼었던 단편소설과 에세이, 시로 이루어진 작품 전집.\n\n단편소설들은 데뷔작이었던 이경민의『괴담』에 수록되어 있던 작품들이다.",
    excerpt:
      "39. 문장의 세계\n\n...나 스스로가 소설이 되어야 한다. 물론, 빈곤한 나의 상상력과 물기가 없는 나의 문장이 세상의 어디까지 전이될 수 있을지는 전혀 예측할 수가 없다. 어쩌면, 이대로, 이십 년쯤은 더 휙 하고 지나가버릴지도 모를 일이다.\n\n그러니 나는 다시 써야 한다. 살아야 한다. 서른다섯의 시간을 살고 있는 지금의 내가 다시 생각을 해보면, 정말, 안될 말이다. 자살은커녕 방바닥에 똥칠 제대로 할 때까지 오래도록 살 생각이다. 영혼도 악마 따위에게 줘서 될 일이 아니다. 어떻게든 다시 인간으로 환생을 해야 한다. 그게 다 소설 때문이다, 예술 같이 고매한 것은 이제 모르겠고, 아름다움이 뭐였는지도 기억이 가물가물 하지만, 소설 때문에, 살아도 누구보다 오래도록 살아야 한다. 내 안에 깊은 울림이 자리 잡아 문장이 간결하고 명료해질 때까지. 끊임없이 펜을 놀리며 살아야만 한다.\n\n- 에세이「내가 다시 펜을 잡은 건 조르주 멜리에스 덕분이다」중에서",
    officialLink: null,
    purchaseLinks: {
      kyobo: "https://product.kyobobook.co.kr/detail/S000215756898",
      aladin: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K432036356",
      yes24: "https://www.yes24.com/Product/Goods/142640694",
    },
    coverImage: null,
    editionSlug: null,
  },
  {
    isbn: "979-11-984193-7-8",
    title: "장르불문 관통하는 글쓰기",
    author: "문수림",
    publisher: "마이티북스",
    publishedAt: "2024-10-10",
    trimSize: "128x188 (mm)",
    pageCount: 212,
    price: 14000,
    category: ["자기계발", "작법서"],
    description:
      "AI가 등장해도 글쓰기를 이어가고픈 사람들의 욕망은 강렬하다. 누구나 책 한 권쯤 출간하기를 희망하는 시대. 각종 글쓰기 수업이 넘쳐나고, 매일 글을 쓰는 시간을 가지지만, 왜 문장은 나아지지 않을까? 어째서 나만의 책으로 엮어내기에는 부족한 걸까?\n\n작가 문수림은 위 질문에 간단히 답한다. 모두 글쓰기에 관한 기본적인 이해가 부족한 상태에서 무작정 기계적으로 쓰고 있어서라고.\n\n“작법보다는 자세다. 기술적인 수업을 들으면 빠르게 성장하는 것 같아도 그건 착각에 불과하다. 결과적으로 출간이 가능한 책을 자신이 직접 다 써내기 위해서는 간결하고 신선한 문장을 스스로 빚어낼 수 있는 힘이 절대적으로 필요하다. 그건 첨삭지도자가 대신해 줄 수 없는 영역임에 틀림없다. 먼저 글쓰기에 관한 기본적인 이해를 한 다음, 스스로 부족한 부분을 채워가며 쓰는 시간을 가져야 한다.”\n\n<장르불문 관통하는 글쓰기>는 전업 작가로 살아남기 위해 장르를 불문하고 무작정 쓰면서 성장했던 문수림 작가의 노하우가 고스란히 담겨있다.",
    excerpt:
      "39. 문장의 세계\n\n글쓰기의 짜임새에 대해 이야기해 본다. 이는 다독-다상-다작으로 이어지는 일련의 흐름을 말한다. 이 3가지는 서로 끊임없이 관여하는 탓에 일반적으로는 크게 구분 짓지도 않고, 무엇을 먼저 쌓아야 한다고 생각하지도 않는다. 그래서 가르치는 이들도 이와 관련해 가볍게 다루거나 매우 단순하게 언급하는 경우가 많다. 대부분 내가 앞에서 “Input이 있으면 Output이 있다.”고 말한 정도에서 그친다. ‘삼다’라는 문자 그대로 많이 해야 좋으니 무작정 많이 하라고, 수강생에게 책임을 떠넘기는 셈이다.\n- 본문 중에서",
    officialLink: null,
    purchaseLinks: {
      kyobo: "https://product.kyobobook.co.kr/detail/S000214453299",
      aladin: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K302933152",
      yes24: "https://www.yes24.com/Product/Goods/134232437",
    },
    coverImage: null,
    editionSlug: null,
  },
  {
    isbn: "979-11-989893-5-2",
    title: "세일즈맨 불황탈출 마스터키",
    author: "문수림, 서운화",
    publisher: "마이티북스",
    publishedAt: "2025-05-16",
    trimSize: "145x205 (mm)",
    pageCount: 292,
    price: 17000,
    category: ["자기계발", "영업기술"],
    description:
      "\"나는 K.A.S.H를 활용한 시스템 영업으로 성장했다\"\n\n글로벌 기업 메트라이프금융 최연소 여성 단장 서운화로부터 전해 듣는 영업의 정석!\n\n출판사 대표 문수림이 서운화 단장과 직접 만나 인터뷰 형식으로 쓴 새로운 형태의 자기계발서\n강연보다 밀도 높고, 수업보다 생생한 1:1 대담 형식.\n\nK.A.S.H를 바탕으로 성장한 놀라운 사례들이 독자들에게 전하는 강력한 동기부여!",
    excerpt:
      "Part2 중 의 일부.\n\n운화: 같은 메트라이프 그룹이지만, 한쪽에 사표를 던지고, 다른 곳으로 이직할 때에는 패널티가 따라요. 바로 이직할 수 있는 게 아니라, 3개월가량 공백이 생깁니다. 적어도 3개월은 무직 상태로 있어야 하는 거죠. 그런 제약이 없으면, 저처럼 결심만 서면 너도나도 바로 옮겨버리는 일이 생길 수 있으니까요.\n\n수림: 하지만 보험업은 일반 회사원과는 다르잖아요. 실업급여 신청도 할 수 없으니 3개월 공백이 상당한 부담일 텐데요.\n\n운화: 맞아요, 아주 크죠. 그런데도 제가 그런 결정을 내렸을 때, 저와 함께 하던 팀원 대부분이 같은 결정을 내렸고, 같이 이직을 했어요. 믿기시나요?",
    officialLink: null,
    purchaseLinks: {
      kyobo: "https://product.kyobobook.co.kr/detail/S000216797083",
      aladin: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K132039246",
      yes24: "https://www.yes24.com/Product/Goods/147561822",
    },
    coverImage: null,
    editionSlug: null,
  },
];

export function getWriterBookByIsbn(isbn: string) {
  return writerBooks.find((book) => book.isbn === isbn) ?? null;
}
