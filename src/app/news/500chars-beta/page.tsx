"use client";

import Image from "next/image";

export default function fivearcaPage() {
  return (
    <main className="max-w-4xl mx-auto p-8 space-y-14">
      {/* 헤더 */}
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-semibold text-emerald-900">500자소설 아카이브</h1>
        <p className="text-lg font-medium text-emerald-800 tracking-wide">
          도전자들의 흔적을 기록합니다
        </p>
        <p className="text-zinc-600 italic">
          당선작은 매월 월간 수림지를 통해 모두에게 공개됩니다
        </p>
      </header>

      {/* 스튜디오 소개 */}
      <section className="space-y-6">
        <p className="text-zinc-700 leading-loose">
          현재는 앱개발중으로 공사중입니다.
        </p>
        <p className="text-zinc-700 leading-loose">
        25년 12월 오픈을 목표로 진행중이니 조금만 기다려주세요~!
        </p>
       </section>
    </main>
  );
}
