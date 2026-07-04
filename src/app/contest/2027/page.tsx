import type { Metadata } from "next";
import Link from "next/link";

const contestTitle = "제4회 문수림배 문예경연대회";
const contactEmail = "surimstudio@gmail.com";

const summaryItems = [
  { label: "접수기간", value: "2026.07.06 ~ 2026.10.31" },
  { label: "모집부문", value: "단편소설, 시, 수필" },
  { label: "응모대상", value: "일반인, 신인, 기성 작가 모두 가능" },
  { label: "발표", value: "2026년 11월 25일 이후" },
  { label: "시상금", value: "대상 20만 원, 우수작 각 10만 원" },
];

const categories = [
  {
    name: "단편소설",
    count: "1편",
    length: "200자 원고지 70매 내외",
  },
  {
    name: "시",
    count: "2편 이상",
    length: "자유",
  },
  {
    name: "수필",
    count: "2편 이상",
    length: "각 200자 원고지 20매 내외",
  },
];

const awards = [
  {
    title: "대상",
    count: "1명",
    prize: "20만 원",
    note: "전체 부문 통합 선정",
  },
  {
    title: "단편소설 부문 우수작",
    count: "1명",
    prize: "10만 원",
    note: "단편소설 부문 선정",
  },
  {
    title: "시 부문 우수작",
    count: "1명",
    prize: "10만 원",
    note: "시 부문 선정",
  },
  {
    title: "수필 부문 우수작",
    count: "1명",
    prize: "10만 원",
    note: "수필 부문 선정",
  },
];

export const metadata: Metadata = {
  title: "제4회 문수림배 문예경연대회 - 수림 스튜디오",
  description:
    "수림 스튜디오와 마이티북스가 주최하는 제4회 문수림배 문예경연대회. 단편소설, 시, 수필 부문 접수. 접수기간 2026년 7월 6일부터 10월 31일까지.",
  openGraph: {
    title: "제4회 문수림배 문예경연대회 - 수림 스튜디오",
    description:
      "수림 스튜디오와 마이티북스가 함께 여는 제4회 문수림배 문예경연대회 공고. 단편소설, 시, 수필 부문 접수 안내.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Contest2027Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <section className="space-y-12">
        <header className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-medium text-emerald-700">
              수림 스튜디오 / 마이티북스
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl">
              {contestTitle}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-zinc-700">
              수림 스튜디오와 마이티북스가 함께 여는 네 번째 문예경연대회입니다.
              단편소설, 시, 수필을 대상으로 하며, 창작자의 이름보다 작품 자체를
              먼저 읽는 공모전을 지향합니다.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6">
            <p className="text-sm font-medium text-emerald-800">접수기간</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-950">
              2026.07.06 ~ 2026.10.31
            </p>
            <p className="mt-4 leading-7 text-zinc-700">
              작품으로 먼저 만나는 문예경연대회. 로그인 과정에서 인증된 실제
              사용 이메일을 기준으로 접수자를 확인합니다.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contest/2027/apply"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-900 px-6 py-3 font-medium text-white transition hover:bg-emerald-800"
              >
                접수하기
              </Link>
              <Link
                href="/contest/2026/Results"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-6 py-3 font-medium text-emerald-900 transition hover:bg-emerald-50"
              >
                지난 대회 결과 보기
              </Link>
            </div>
            <div className="mt-5 space-y-2 text-sm leading-6 text-zinc-600">
              <p>
                접수는 로그인 후 가능합니다. 실명은 필요하지 않으며, 필명 또는
                SNS 닉네임으로 응모할 수 있습니다.
              </p>
              <p>
                원고 파일은 hwp, hwpx, doc, docx, pdf, txt 형식만 접수합니다.
                파일 용량은 1개당 최대 5MB이며, zip 등의 압축파일은 접수하지
                않습니다.
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-950">모집 부문</h2>
            <p className="mt-3 leading-8 text-zinc-700">
              단편소설, 시, 수필 세 부문에서 작품을 받습니다. 등단 여부나
              출간 여부와 관계없이 응모할 수 있습니다.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <article
                key={category.name}
                className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-6"
              >
                <h3 className="text-xl font-semibold text-indigo-950">
                  {category.name}
                </h3>
                <dl className="mt-5 space-y-3 text-sm leading-6 text-zinc-700">
                  <div>
                    <dt className="font-medium text-zinc-950">응모 편수</dt>
                    <dd>{category.count}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-zinc-950">분량</dt>
                    <dd>{category.length}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <p className="leading-8 text-zinc-700">
            시와 수필은 복수 작품을 통해 응모자의 작품 세계와 문장 감각을 함께
            살피기 위해 2편 이상 제출을 기준으로 합니다.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6">
          <h2 className="text-2xl font-semibold text-zinc-950">
            응모 자격 및 접수 방식
          </h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="space-y-3 leading-8 text-zinc-700">
              <p>
                일반인, 신인, 기성 작가 모두 응모할 수 있으며, 등단 여부와
                출간 여부에 따른 제한은 없습니다.
              </p>
              <p>
                접수 과정에서 실명은 필수가 아닙니다. 필명 또는 SNS 닉네임으로
                접수할 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-8 text-zinc-700">
              <p>
                접수는 사이트 내 접수폼을 통한 온라인 접수로 진행됩니다. 로그인한
                사용자만 투고할 수 있으며, 로그인 과정에서 인증된 실제 사용
                이메일을 기준으로 접수자를 확인합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-zinc-950">시상 내역</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {awards.map((award) => (
              <article
                key={award.title}
                className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-950">
                      {award.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600">{award.note}</p>
                  </div>
                  <p className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-medium text-emerald-900">
                    {award.count}
                  </p>
                </div>
                <p className="mt-5 text-2xl font-semibold text-emerald-950">
                  {award.prize}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-6">
          <h2 className="text-2xl font-semibold text-zinc-950">저작권 안내</h2>
          <p className="leading-8 text-zinc-700">
            응모작과 수상작의 저작권은 창작자에게 있습니다. 수림 스튜디오와
            마이티북스는 수상작의 저작권을 가져가지 않습니다. 수상 이후에도
            창작자는 자신의 작품을 자유롭게 수정하거나, 다른 매체에 싣거나,
            출간하거나, 판매하거나, 다시 활용할 수 있습니다. 다만 수상작은
            공모전 결과 발표와 소개를 위해 수림지에 게재될 수 있습니다. 이
            게재는 비독점적 사용이며, 창작자의 권리를 제한하지 않습니다.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-2xl font-semibold text-zinc-950">유의사항</h2>
          <ul className="list-disc space-y-3 pl-5 leading-8 text-zinc-700">
            <li>
              본인이 창작한 작품만 응모할 수 있습니다. 미발표작과 발표작의
              응모 가능 범위는 세부 접수 안내에서 추가로 공지할 예정입니다.
            </li>
            <li>
              표절, 무단 도용, 타인의 권리 침해가 확인된 작품은 심사 및 수상에서
              제외됩니다.
            </li>
            <li>
              수상 이후라도 권리 침해 사실이 확인되면 수상이 취소될 수 있습니다.
            </li>
            <li>
              시와 수필은 여러 편의 작품을 통해 응모자의 평균적인 작품 감각을
              함께 살피기 위한 기준입니다. 단일 작품의 강한 인상뿐 아니라,
              작품 간의 결, 문장 운용, 시선의 지속성도 심사 과정에서 참고될 수
              있습니다.
            </li>
          </ul>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6">
            <h2 className="text-2xl font-semibold text-zinc-950">문의</h2>
            <p className="mt-4 leading-8 text-zinc-700">
              공모전 관련 문의는 이메일로 보내주세요.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-4 inline-flex text-base font-medium text-emerald-800 transition hover:text-emerald-950"
            >
              {contactEmail}
            </a>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6">
            <h2 className="text-2xl font-semibold text-zinc-950">
              지난 대회
            </h2>
            <p className="mt-4 leading-8 text-zinc-700">
              제3회 문수림배 문예경연대회 결과와 수상작 수록 안내를 확인할 수
              있습니다.
            </p>
            <Link
              href="/contest/2026/Results"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              제3회 문수림배 문예경연대회 결과 보기
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
