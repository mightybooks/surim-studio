// File: src/app/findus/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오시는 길 – 수림 스튜디오",
  description: "수림 스튜디오 방문 안내 및 지도 정보",
};

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}


export default function FindUsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-10">
      <header className="space-y-2 text-center">
        <h1 className="reveal-up text-3xl font-semibold text-slate-900" style={revealStyle(180)}>
          수림 스튜디오 오시는 길
        </h1>
        <p className="reveal-up text-sm text-slate-600" style={revealStyle(300)}>
          작업실은 예약 방문만 가능합니다. 출간 문의·협업·인터뷰·미팅은
          사전 문의 부탁드립니다.
        </p>
      </header>

      {/* 🔹 지도 섹션 */}
      <section className="reveal-up overflow-hidden rounded-3xl border border-slate-200 bg-white" style={revealStyle(420)}>
        <div className="aspect-[16/9] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3233.137262438974!2d128.73122268650823!3d35.87015295858338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35660bd018037bfb%3A0x98282fe3d2c755c7!2z66eI7J207Yuw67aB7Iqk!5e0!3m2!1sko!2skr!4v1765197852651!5m2!1sko!2skr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
      </section>

      {/* 🔹 텍스트 안내 */}
      <section className="reveal-up space-y-4 text-sm text-slate-700" style={revealStyle(520)}>
        <div>
          <h2 className="text-base font-semibold text-slate-900">주소</h2>
          <p>대구광역시 동구 동호로7길 66, 1층 102호 마이티북스 수림스튜디오</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">대중교통</h2>
          <p>- 대구 지하철 1호선 안심역 3번 출구 도보 6분</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">방문 안내</h2>
          <p>주차 공간이 협소하니 가급적 대중교통 이용을 부탁드립니다.</p>
        </div>
      </section>
    </main>
  );
}
