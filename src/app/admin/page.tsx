// src/app/admin/page.tsx
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
        <h2 className="text-sm font-medium text-slate-700">
          빠른 작업
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="/admin/blog/new"
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] px-4 py-3 text-sm shadow-sm hover:bg-[#F5EEDC]"
          >
            <div className="font-semibold">새 블로그 글 작성</div>
            <p className="mt-1 text-xs text-slate-600">
              작업일지, 비하인드, 공지 글을 작성합니다.
            </p>
          </a>

          {/* 나중에 공모전/설정 등 추가 */}
          {/* <a href="/admin/contest" ...>공모전 관리</a> */}
        </div>
      </section>
    </div>
  );
}
