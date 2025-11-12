import type { Metadata } from "next";
import Link from "next/link";                 // ✅ 추가
import "./globals.css";
import ClientNav from "@/components/ClientNav";

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
      <body className="min-h-screen bg-white text-zinc-800">
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold text-emerald-900">SULIM STUDIO</Link>
            <ClientNav />
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