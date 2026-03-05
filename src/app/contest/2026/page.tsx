// src/app/contest/2026/page.tsx
import { supabaseServer } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문수림배 제3회 문예경연대회 공모 요강 | Sulim Studio",
  description:
    "단편 소설 부문 공모. 원고지 200매 기준 50~80매. 2026년 1월 1일~2월 22일 접수. 수상작은 월간 수림지 창간호 수록.",
  robots: { index: true, follow: true },
};

export default async function Contest2026Page() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ✅ 무조건 접수 마감 상태로 고정 (시간 제어 제거)
  const isClosed = true;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <section className="space-y-10">
        {/* 박스 1 */}
        <h1>문수림배 제3회 문예경연대회 공모 요강</h1>
        <div className="rounded-2xl p-6 bg-slate-50  border-slate-200">
          <h2 className="text-xl font-semibold mb-4">대회 개요</h2>
          <p>
            문수림배 문예경연대회는 상업적 계약을 전제로 하지 않는
            비영리·아마추어 문예경연대회입니다. 이미 한 차례 이상의 탈락을
            경험했거나, 발표의 기회를 얻지 못했던 창작자들이 완성된 원고로
            다시 한 번 응답할 수 있는 자리를 마련하고자 합니다.
          </p>

          <h3 className="mt-6 font-semibold">심사 기준</h3>
          <p>
            본 경연대회는 대중적인 재미를 우선하되,
            작가 개인의 가치관이나 관점이 명확하게 드러나며,
            그것이 독자에게 감성적으로 전달되는 작품을 선정하는 것을
            원칙으로 합니다.
          </p>
        </div>

        {/* 박스 2 */}
        <div className="rounded-2xl p-6 bg-indigo-50/70 border-indigo-200">
          <h2 className="text-xl font-semibold mb-4">모집 및 응모</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>모집 분야: 단편 소설</li>
            <li>응모 분량: 원고지 40~80매</li>
            <li>응모 기간: 2026.01.01 ~ 02.22</li>
            <li>응모 방법: 이메일 인증 후 접수</li>
          </ul>
          <p> 분량 미달 또는 초과 시 심사 대상에서 제외됩니다.</p>
        </div>

        {/* 박스 3 */}
        <div className="rounded-2xl p-6 bg-indigo-50/80 border-indigo-300">
          <h2 className="text-xl font-semibold mb-4">제출 규칙</h2>
          <p>원고는 메일 본문에 작성하지 않고 파일로 제출해야 합니다.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>허용 형식: hwp / hwpx / pdf / doc</li>
            <li>txt 파일은 인정하지 않습니다.</li>
            <li>AI 사용은 오탈자 점검 수준만 허용합니다.</li>
          </ul>
          <p className="mt-4">
            제출은 <strong>투고하기 버튼을 통해 폼을 작성</strong>하여 진행합니다.<br />
            <strong>이메일 인증을 완료한 경우에 한하여 접수를 인정</strong>하며, 인증되지 않은 주소에서 발송된 원고는
            접수되지 않습니다.
          </p>
        </div>

        {/* 박스 4 */}
        <div className="rounded-2xl p-6 bg-indigo-100/70 border-indigo-200">
          <h2 className="text-xl font-semibold mb-4">심사 및 기타</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>대상(1편): 1204회 로또 4등 당첨금 전액 50,000원 및 기념 상장</li>
            <li>기타 수상작: 기념 상장</li>
            <li>수상작 전편: 『월간 수림지』 창간호 수록</li>
          </ul>
          <p>
            본 대회는 상업적 계약 관계를 전제로 하지 않으며, 상금 규모는 소정입니다.
          </p>

          <h3 className="mt-8 mb-2 text-base font-semibold text-neutral-900">원고 취급 및 저작권</h3>
          <p>
            응모작의 저작권은 응모자에게 귀속됩니다. 주최 측은 수상작에 한하여 『월간 수림지』 창간호에 수록할 수 있는 권리를 가집니다.
          </p>
          <p>
            수상 이후, 응모자는 해당 원고를 자유롭게 다른 매체·출판물·공모전에 활용할 수 있습니다.
            단, 타 공모전의 신작 인정 여부는 각 주최 측의 규정에 따르며, 이에 대해 주최 측은 책임지지 않습니다.
          </p>

          <h3 className="mt-8 mb-2 text-base font-semibold text-neutral-900">응모 가능 및 제한 기준</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>개인 블로그, 브런치, SNS 등 웹에 공개했던 원고를 수정·보완하여 응모하는 경우</li>
            <li>AI 도구를 오탈자 점검, 맞춤법 교정 등 보조적 용도로 제한적으로 사용한 경우</li>
          </ul>

          <p>다음의 경우는 응모 불가</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>이미 지면(종이책·전자책·잡지 등)에 발표된 원고</li>
            <li>AI가 서사 구성, 문단 생성, 대량 문장 생산 등 창작의 핵심 과정에 실질적으로 관여한 것으로 판단되는 원고</li>
            <li>AI 사용 여부 및 범위에 대한 판단은 주최 측의 판단에 따르며, 해당 원고는 별도의 고지 없이 심사 대상에서 제외될 수 있습니다.</li>
          </ul>

          <h3 className="mt-8 mb-2 text-base font-semibold text-neutral-900">심사 및 발표</h3>
          <p>
            심사는 내부 심사 기준에 따라 진행되며, 결과는 2026년 3월 이후 발표 예정입니다. 수상작은 『월간 수림지』 창간호에 수록됩니다.
          </p>
          <p>
            본 요강에 명시되지 않은 사항은 주최 측의 판단에 따라 결정됩니다.
            <br />
            문의: <strong>surimstudio@gmail.com</strong>
          </p>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        {/* ✅ 무조건 마감 UI만 노출 */}
        {isClosed ? (
          <>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 space-y-2">
              <p className="font-medium text-zinc-900">투고가 마감되었습니다.</p>
              <p className="text-sm text-zinc-600">
                2026 문예경연대회 접수는 종료되었습니다.<br />
                결과는 <strong>2026년 3월 3일</strong> 발표 예정입니다.
              </p>
            </div>

            <button
              disabled
              className="
                inline-flex items-center justify-center
                rounded-xl px-6 py-3
                font-medium text-white
                bg-zinc-400
                cursor-not-allowed
              "
            >
              투고 마감
            </button>
          </>
        ) : user ? (
          <>
            <Link
              href="/contest/2026/submit"
              className="
                inline-flex items-center justify-center
                rounded-xl px-6 py-3
                font-medium text-white
                bg-emerald-700
                transition-all duration-200
                hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-md
              "
            >
              투고하기
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="
                inline-flex items-center justify-center
                rounded-xl px-6 py-3
                font-medium text-white
                bg-neutral-700
                transition-colors
                hover:bg-neutral-600
              "
            >
              로그인하고 투고하기
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
