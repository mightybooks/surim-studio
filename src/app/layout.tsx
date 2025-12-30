import type { Metadata } from "next";
import Link from "next/link";  
import "./globals.css";
import ClientNav from "@/components/ClientNav";
import MobileDock from "@/components/MobileDock";
import ScrollTopDesktop from "@/components/ScrollTopDesktop";
import KakaoLoader from "@/components/KakaoLoader";
import { supabaseServerPublic } from "@/lib/supabase/server-public";
import DisableContextMenu from "@/components/DisableContextMenu";
import ProtectContent from "@/components/ProtectContent";

const supabase = supabaseServerPublic();
const {
  data: { user },
} = await supabase.auth.getUser();

console.log("server user:", user?.id);


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
      <head>
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="d518b050-1977-468c-b343-84b487e20492"
          />
        )}
      </head>

      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)]"
            data-admin={user?.email === "surimstudio@gmail.com" ? "true" : "false"}>
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]">
          <nav className="mx-auto flex max-w-screen-md items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold text-emerald-900">
              SULIM STUDIO
            </Link>
            <ClientNav />
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10 pb-[calc(4rem+env(safe-area-inset-bottom))] sm:pb-10">
          <KakaoLoader />
          {children}
        </main>

        <ProtectContent />

        <footer className="text-center text-xs text-zinc-500 py-6 border-t border-[var(--border)] bg-[var(--bg)]">
          <div className="mx-auto max-w-6xl px-4 space-y-1">
            <div>ⓒ 수림 스튜디오 · 마이티북스</div>
            <div>사업자등록번호: 558-28-01574</div>
            <div>통신판매업신고: 2023-대구동구-0140</div>
            <div className="pt-1">문의: surimstudio@gmail.com</div>
          </div>
        </footer>

        <MobileDock />
        <ScrollTopDesktop />
        <DisableContextMenu />
      </body>
    </html>
  );
}
