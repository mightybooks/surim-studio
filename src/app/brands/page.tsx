// app/brands/page.tsx
import Image from "next/image";

export default function BrandsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-10">
      <h1 className="mb-4 text-3xl font-semibold text-emerald-900">Brands</h1>
      <p className="text-zinc-600">
        수림 스튜디오는 출판 사업을 기반으로 확장된 브랜드를 소유하고 있습니다.
      </p>

      {/* 장미와 여우 */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-800">장미와 여우</h2>
        <p className="leading-loose text-zinc-600">
          문예 장르 브랜드로 김사람 시인과 베수 시인의 시선집, 그리고 아티스트 민진의 작업노트를 소설화한 《상림월想林月》이 대표작으로 있습니다.<br/>
          이 외에도 유용한 문구 굿즈를 자체제작하여, 직접 유통하고 있습니다.
        </p>

        {/* ✅ flex 대신 grid. 모바일 3열, 좁으면 자동 줄바꿈 */}
        <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-4">
          <Image
            src="/covers/sanglimwol.webp"
            alt="상림월"
            width={130}
            height={180}
            sizes="(max-width: 640px) 30vw, 130px"
            className="w-full h-auto rounded-xl shadow object-cover"
          />
          <Image
            src="/covers/continote.webp"
            alt="콘티 노트"
            width={130}
            height={180}
            sizes="(max-width: 640px) 30vw, 130px"
            className="w-full h-auto rounded-xl shadow object-cover"
          />
          <Image
            src="/covers/mugcup.webp"
            alt="머그컵"
            width={130}
            height={180}
            sizes="(max-width: 640px) 30vw, 130px"
            className="w-full h-auto rounded-xl shadow object-cover"
          />
        </div>
      </section>

      {/* 사이의 순간들 */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-800">사이의 순간들</h2>
        <p className="leading-loose text-zinc-600">
          감성 에세이 특화 브랜드로 대표작으로는 『토실토실 토끼를 안았습니다』, 『나의 작은 스승들』이 있습니다.
        </p>
        {/* ✅ 2개니까 2열 그리드 */}
        <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
          <Image
            src="/covers/tosiltosil.webp"
            alt="토실토실 토끼를 안았습니다"
            width={130}
            height={180}
            sizes="(max-width: 640px) 45vw, 130px"
            className="w-full h-auto rounded-xl shadow object-cover"
          />
          <Image
            src="/covers/teachers.webp"
            alt="나의 작은 스승들"
            width={130}
            height={180}
            sizes="(max-width: 640px) 45vw, 130px"
            className="w-full h-auto rounded-xl shadow object-cover"
          />
        </div>
      </section>

      {/* 마이티피플 */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-800">마이티피플</h2>
        <p className="leading-loose text-zinc-600">
          세상을 변화시키는 사람들과의 1:1 인터뷰로 작성되는 자기개발서 브랜드입니다. 문수림이 직접 작은 거인들과 만나 인터뷰를 합니다. 대표작으로는 『세일즈맨 불황탈출 마스터키』가 있습니다.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          <Image
            src="/covers/kash.webp"
            alt="세일즈맨 불황탈출 마스터키"
            width={130}
            height={180}
            sizes="(max-width: 640px) 45vw, 130px"
            className="w-full h-auto rounded-xl shadow object-cover"
          />
        </div>
      </section>

      {/* 마이티북스 */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-800">마이티북스</h2>
        <p className="leading-loose text-zinc-600">
          종합교양서적 브랜드로 위 세 브랜드를 총괄관리하는 출판사업의 모태입니다.
        </p>
      </section>
    </main>
  );
}
