import type { Metadata } from "next";
import Link from "next/link";                 // ✅ 추가
import "./globals.css";

export const metadata: Metadata = {
  title: "수림 스튜디오 | 감정의 미립자를 기록하다",
  description: "브랜드 · 프로젝트 · 뉴스",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ✅ 메뉴 정의: 여기에 원하는 항목 마음껏 추가하세요.
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/news", label: "News" },
    { href: "/brands", label: "Brands" },     // ✅ 추가
    { href: "/surimzine", label: "SurimZine" },  // ✅ 추가
    { href: "/standby1", label: "Contest" },  // ✅ 추가
  ];

  // 선택: 현재 경로 하이라이트용 유틸
  const isActive = (path: string) =>
    typeof window !== "undefined" && window.location.pathname.startsWith(path);

  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-zinc-800">
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold text-emerald-900">SULIM STUDIO</Link>
            <ul className="flex gap-5 text-sm">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? "text-emerald-800 font-medium" : "text-zinc-700 hover:text-zinc-900"}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <footer className="text-center text-xs text-zinc-500 py-6 border-t">
          <div className="mx-auto max-w-6xl px-4">
            <div>ⓒ 수림 스튜디오 · 마이티북스</div>
            <div className="mt-2">문의: surimstudio@gmail.com</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
