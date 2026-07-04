export default function AdminHomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-slate-600">
          수림 스튜디오 관리자 전용 공간입니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-slate-700">빠른 작업</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="/admin/blog/new"
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] px-4 py-3 text-sm shadow-sm hover:bg-[#F5EEDC]"
          >
            <div className="font-semibold">블로그 글 작성</div>
            <p className="mt-1 text-xs text-slate-600">
              작업일지, 인사이트, 노트 글을 작성합니다.
            </p>
          </a>

          <a
            href="/admin/news"
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] px-4 py-3 text-sm shadow-sm hover:bg-emerald-50"
          >
            <div className="font-semibold">뉴스관리</div>
            <p className="mt-1 text-xs text-slate-600">
              공식 공지와 프로젝트 소식을 작성하고 발행합니다.
            </p>
          </a>

          <a
            href="/admin/orders"
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] px-4 py-3 text-sm shadow-sm hover:bg-[#E6F0FF]"
          >
            <div className="font-semibold">주문 관리</div>
            <p className="mt-1 text-xs text-slate-600">
              결제와 배송 상태를 확인하고 주문을 처리합니다.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
