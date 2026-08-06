import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/my/LogoutButton";
import { supabaseServer } from "@/lib/supabase/server";

const myLinks = [
  {
    href: "/my/library",
    title: "내 보관함",
    description: "구매했거나 열람 가능한 콘텐츠를 확인합니다.",
  },
  {
    href: "/my/orders",
    title: "주문/결제 내역",
    description: "주문 상태, 결제 금액, 배송 정보를 확인합니다.",
  },
  {
    href: "/my/downloads",
    title: "다운로드",
    description: "구매 후 받을 수 있는 파일을 확인합니다.",
  },
  {
    href: "/my/profile",
    title: "회원 정보",
    description: "이메일, 연락처 인증, 계정 정보를 관리합니다.",
  },
];

export default async function MyPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?returnTo=%2Fmy");
  }

  const displayName =
    user.user_metadata?.name ??
    user.user_metadata?.full_name ??
    user.user_metadata?.nickname ??
    null;

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <header className="space-y-3">
        <p className="text-sm text-[color:var(--fg)]/60">로그인되었습니다.</p>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">MY</h1>
          <p className="text-sm text-[color:var(--fg)]/70">
            {displayName ? `${displayName}님` : user.email ?? "회원"}
          </p>
          {user.email ? <p className="text-sm text-[color:var(--fg)]/50">{user.email}</p> : null}
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        {myLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-[color:var(--border)] bg-white p-4 transition hover:border-[color:var(--fg)]/40 hover:bg-black/[0.02]"
          >
            <span className="block text-base font-semibold">{item.title}</span>
            <span className="mt-1 block text-sm text-[color:var(--fg)]/60">{item.description}</span>
          </Link>
        ))}
      </section>

      <section className="flex flex-wrap gap-2">
        <Link
          href="/my/fundings"
          className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-sm hover:bg-black/5"
        >
          참여 중인 펀딩
        </Link>
        <Link
          href="/my/events"
          className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-sm hover:bg-black/5"
        >
          참여 중인 이벤트
        </Link>
        <LogoutButton />
      </section>
    </main>
  );
}
