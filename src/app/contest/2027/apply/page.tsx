import type { Metadata } from "next";
import AccessRequiredCard from "@/components/auth/AccessRequiredCard";
import Contest2027ApplyForm from "@/components/contest/2027/Contest2027ApplyForm";
import { supabaseServerPublic } from "@/lib/supabase/server-public";

export const metadata: Metadata = {
  title: "제4회 문수림배 문예경연대회 접수 - 수림 스튜디오",
  description:
    "제4회 문수림배 문예경연대회 온라인 접수폼. 로그인 후 단편소설, 시, 수필 원고 파일을 제출할 수 있습니다.",
  openGraph: {
    title: "제4회 문수림배 문예경연대회 접수 - 수림 스튜디오",
    description:
      "수림 스튜디오와 마이티북스가 함께 여는 제4회 문수림배 문예경연대회 온라인 접수.",
    images: ["/og-image.png"],
  },
  robots: { index: false, follow: true },
};

export default async function Contest2027ApplyPage() {
  const supabase = supabaseServerPublic();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const next = "/contest/2027/apply";

  if (!user) {
    return <AccessRequiredCard mode="login" next={next} />;
  }

  if (!user.email || !user.email_confirmed_at) {
    return <AccessRequiredCard mode="verify" next={next} />;
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="space-y-4">
        <p className="text-sm font-medium text-emerald-700">
          제4회 문수림배 문예경연대회
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-emerald-950">
          공모전 접수
        </h1>
        <p className="max-w-3xl leading-8 text-zinc-700">
          제4회 문수림배 문예경연대회 접수폼입니다. 접수는 로그인한 사용자만
          가능하며, 실명 대신 필명 또는 SNS 닉네임으로 응모할 수 있습니다.
          로그인 과정에서 인증된 이메일은 접수 확인을 위해 사용합니다.
        </p>
      </header>

      <section className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6">
        <h2 className="text-xl font-semibold text-emerald-950">
          파일 제출 안내
        </h2>
        <p className="mt-3 leading-8 text-zinc-700">
          원고 파일은 hwp, hwpx, doc, docx, pdf, txt 형식만 접수합니다. 파일
          용량은 1개당 최대 5MB이며, zip 등의 압축파일은 접수하지 않습니다.
        </p>
      </section>

      <div className="mt-8">
        <Contest2027ApplyForm userEmail={user.email} />
      </div>
    </main>
  );
}
