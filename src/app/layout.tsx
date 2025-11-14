import type { Metadata } from "next";
import Link from "next/link";                 // ✅ 추가
import "./globals.css";
import ClientNav from "@/components/ClientNav";
import MobileDock from "@/components/MobileDock";
import ScrollTopDesktop from "@/components/ScrollTopDesktop";
import KakaoLoader from "@/components/KakaoLoader";

export const metadata = {
  metadataBase: new URL("https://surimstudio.com"),
  title: "수림 스튜디오 | 실험적 서사로 감정의 미립자를 기록하다",
  description:
    "수림 스튜디오는 감정의 미립자를 기록하고 실험하는 1인 출판 스튜디오입니다. 브랜드, 프로젝트, 뉴스와 함께 창작의 과정을 공유합니다.",
  openGraph: {
    title: "수림 스튜디오 | 실험적 서사로 감정의 미립자를 기록하다",
    description:
      "감정의 미립자를 기록하고 실험하는 1인 출판 스튜디오의 공식 웹사이트입니다.",
    images: ["/og-image.png"],
  },
    icons: {
    icon: "/favicon-v2.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "수림 스튜디오 | 실험적 서사로 감정의 미립자를 기록하다",
    description:
      "감정의 미립자를 기록하고 실험하는 1인 출판 스튜디오의 공식 웹사이트.",
    images: ["/og-image.png"],
  },
} as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
       <html lang="ko">
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]">
          <nav className="mx-auto flex max-w-screen-md items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold text-emerald-900">SULIM STUDIO</Link>
            <ClientNav />
          </nav>
        </header>

        {/* 하단 도킹바와 겹치지 않도록 모바일에서 여유 하단 패딩 부여 */}
        <main className="mx-auto max-w-6xl px-4 py-10 pb-[calc(4rem+env(safe-area-inset-bottom))] sm:pb-10">
           <KakaoLoader />
          {children}          
        </main>

        <footer className="text-center text-xs text-zinc-500 py-6 border-t border-[var(--border)] bg-[var(--bg)]">
          <div className="mx-auto max-w-6xl px-4">
            <div>ⓒ 수림 스튜디오 · 마이티북스</div>
            <div className="mt-2">문의: surimstudio@gmail.com</div>
          </div>
        </footer>

        {/* ▼ 여기 두 줄만 실제로 추가됩니다 */}
        <MobileDock />   {/* 모바일 하단 고정 미니 네비 */}  
        <ScrollTopDesktop />   {/* 데스크탑에서만 등장 */}       
        {/* ▲ 추가 끝 */}
      </body>
    </html>
  );
}