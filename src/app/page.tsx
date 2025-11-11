import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold text-emerald-900 mb-2">
        수림 스튜디오
      </h1>
      <p className="text-zinc-600 mb-8">
        감정의 미립자를 기록하는 작은 출판 실험실
      </p>
    <p className="text-sm text-zinc-500 italic">
  since 2025
</p>

     <section className="text-center">
      {/* ... 타이틀/설명 ... */}
     <NavBar />
    </section>
    </main>
  );
}
