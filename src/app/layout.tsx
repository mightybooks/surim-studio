import type { Metadata } from "next";
import Link from "next/link";  
import { Suspense } from "react";
import "./globals.css";
import "@/styles/surimji.css";
import "@/styles/metaverse-delivery.css";
import ClientNav from "@/components/ClientNav";
import MobileDock from "@/components/MobileDock";
import ScrollTopDesktop from "@/components/ScrollTopDesktop";
import KakaoLoader from "@/components/KakaoLoader";
import DisableContextMenu from "@/components/DisableContextMenu";
import ProtectContent from "@/components/ProtectContent";
import InAppEntryOverlayRoot from "@/components/inapp/InAppEntryOverlayRoot";

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
          {/* PortOne 결제 SDK */}
          <script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
      </head>

      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <Suspense fallback={null}>
          <InAppEntryOverlayRoot />
        </Suspense>
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

      <footer className="border-t border-[var(--border)] bg-[var(--bg)] text-zinc-600">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {/* Brand */}
            <div className="space-y-4">
              <div>
                <div className="text-sm tracking-[0.22em] text-zinc-800">
                  SURIM STUDIO
                </div>
                <div className="mt-3 space-y-1 text-sm leading-relaxed text-zinc-600">
                  <div>Publishing Lab / Editorial Archive</div>
                  <div>Independent Literary Studio</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-zinc-500">
                <span>Est. 2025</span>
                <span className="h-px w-8 bg-[var(--border)]" />
                <span>Daegu, KR</span>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                Contact
              </div>

              <div className="space-y-2 text-sm leading-relaxed">
                <div>
                  <span className="text-zinc-500">일반 문의</span>
                  <div className="mt-1">
                    <a href="mailto:surimstudio@gmail.com" className="hover:text-zinc-900 transition-colors">
                      surimstudio@gmail.com
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-zinc-500">전화</span>
                  <div className="mt-1">010-5148-9433</div>
                </div>

                <div>
                  <span className="text-zinc-500">개인정보처리 담당자</span>
                  <div className="mt-1">대표자 이경민</div>
                  <div>
                    <a href="mailto:novelstudylab@naver.com" className="hover:text-zinc-900 transition-colors">
                      novelstudylab@naver.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal / Business */}
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                Legal / Business
              </div>

              <div className="space-y-2 text-sm leading-relaxed">
                <div>
                  <span className="text-zinc-500">사업자정보확인</span>
                  <div className="mt-1">
                    <a
                      href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=5582801574"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-900 transition-colors"
                    >
                      558-28-01574
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-zinc-500">통신판매업신고</span>
                  <div className="mt-1">2023-대구동구-0140</div>
                </div>

                <div className="pt-1 flex flex-col gap-1">
                  <a href="/legal/guide" className="hover:text-zinc-900 transition-colors">
                    이용안내
                  </a>
                  <a href="/legal/terms" className="hover:text-zinc-900 transition-colors">
                    이용약관
                  </a>
                  <a href="/legal/privacy" className="hover:text-zinc-900 transition-colors">
                    개인정보처리방침
                  </a>
                </div>

                <div className="pt-1">
                  <span className="text-zinc-500">주소</span>
                  <div className="mt-1">
                    대구광역시 동구 동호로7길 66, 1층 102호
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-[var(--border)] pt-4 text-xs text-zinc-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>© 수림 스튜디오 · 마이티북스</div>
            <div className="tracking-[0.14em] uppercase">
              Writing, structure, and narrative experiments.
            </div>
          </div>
        </div>
      </footer>

        <MobileDock />
        <ScrollTopDesktop />
        <DisableContextMenu />
      </body>
    </html>
  );
}
