export default function MunSurim() {
  return (
<main className="max-w-4xl mx-auto p-8 space-y-14">
      {/* 헤더 */}
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-semibold text-emerald-900">SurimZine</h1>
        <p className="text-lg font-medium text-emerald-800 tracking-wide">
          월간 수림지
        </p>
        <p className="text-zinc-600 italic">
          매월 새로운 이야기로 찾아옵니다
        </p>
      </header>

      {/* 스튜디오 소개 */}
      <section className="space-y-6">
        <p className="text-zinc-700 leading-loose">
          《월간 수림지》는 문수림이 직접 쓰고 편집해서 발간하는 월간지입니다.
        </p>
        <p className="text-zinc-700 leading-loose">
          매월 새로운 컨셉, 새로운 장르의 이야기가 펼쳐집니다.
          <br />
          기획 인터뷰에서부터 시, 소설, 에세이, 스릴러, 로맨스, 호러 등 정해진 경계 없이 오직 1인 창작자에 의해 제작됩니다.
        </p>
        <p className="text-zinc-700 leading-loose">
          26년 3월에 창간호가 발간될 예정입니다.
        </p>
      </section>
</main>
  );
}
