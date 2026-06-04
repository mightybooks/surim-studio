// File: src/app/projects/500_fiction/sample/page.tsx

import Image from "next/image";
import Link from "next/link";

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export const metadata = {
  title: "500자 소설 샘플 – 수림 스튜디오",
  description:
    "500자 내외의 고정 분량 안에서 하나의 서사를 완결하는 500자 소설의 실제 예시. Practical examples of 500-character fiction that complete a single narrative within approximately 500 characters.",
  openGraph: {
    title: "500자 소설 샘플 – 수림 스튜디오",
    description:
      "500자 내외의 고정 분량 안에서 하나의 서사를 완결하는 500자 소설의 실제 예시. Practical examples of 500-character fiction that complete a single narrative within approximately 500 characters.",
    images: ["/og/500fiction_sample.webp"],
  },
};

export default function Fiction500SamplePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">

      {/* 히어로 */}
      <section className="reveal-up relative w-full h-[300px] md:h-[360px] rounded-3xl overflow-hidden shadow" style={revealStyle(80)}>
        <Image
          src="/covers/fiction500_sample_hero.webp"
          alt="500자 소설 샘플"
          fill
          className="object-cover brightness-[0.8]"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
          <h1 className="reveal-up text-3xl md:text-5xl font-semibold mb-3" style={revealStyle(180)}>
            500자 소설 샘플
          </h1>
          <p className="reveal-up text-sm md:text-base text-zinc-200" style={revealStyle(300)}>
            Five examples completed within the fixed scale of approximately 500 characters
          </p>
        </div>
      </section>

      {/* 서문 */}
      <article className="reveal-up prose prose-zinc max-w-none news-body" style={revealStyle(420)}>
        <p>
          아래 작품들은 500자 내외의 고정 분량 안에서 하나의 서사를 완결하는 500자 소설의 실제 예시입니다.<br/>
          The works below are practical examples of 500-character fiction, each completing a single narrative within the fixed scale of approximately 500 characters.<br/>
          각 작품은 제한된 분량 안에서 인물, 사건, 전환, 결말을 압축적으로 배치해 하나의 서사 단위를 완성합니다.
        </p>

        <p>
          대표 샘플로 공개된 「알리햐」 전문과 인용 허용 안내는{" "}
          <Link href="/research/500-character-fiction/examples" className="text-violet-700 underline underline-offset-4">
            500자 소설 대표 샘플 페이지
          </Link>
          에서 확인할 수 있습니다.<br />
          The official representative sample and citation notice for “Alihya” are available on the{" "}
          <Link href="/research/500-character-fiction/examples" className="text-violet-700 underline underline-offset-4">
            500-Character Fiction Representative Sample page
          </Link>
          .
        </p>
      </article>

      {/* 작품들 */}
      <section className="space-y-20">

        {/* 1번 */}
        <article className="reveal-up prose prose-zinc max-w-none news-body" style={revealStyle(520)}>
          <h2 className="text-xl font-semibold">1. 마지막 대화</h2>
          <br/><br/>
          <p>
            “네가 헤밍웨이도 아니고, 그런 게 소설이 되겠냐?”
            <br/><br/>
            고지대에 홀로 놓인 낡은 산장은 해를 잃었다. 
            흐릿한 조명이 두 사람의 얼굴에 흐르는 굵은 땀방울을 비춘다. 
            카페인에 겨우 몸을 기댄 두 사람은 발밑으로 천천히 차오르는 검은 물을 보고도 애써 모른 척 했다.
            <br/><br/>
            “끊임없이 상상하게 만드는 거니까. 오히려 더 좋지 않을까?”
            “아니, 요즘 독자들은 확실한 결말을 원해.”
            “몰라, 어쨌든 500자면 충분해. 그 안에 전부 담을 수 있어. 하기야, 이젠 닿을 독자도 없지만.”
            <br/><br/>
            말이 끝나기 무섭게 조명이 꺼졌다. 
            모든 신경이 어둠 속에 잠겼다. 어느새 허리까지 차오른 물. 
            죽음이 가슴을 향해 찰랑거렸지만, 더는 올라설 곳도 없었다.
            <br/><br/>
            “젠장, 이제 정말 끝이군.”
            “누가 떠올라?”
            “말해 뭐하겠어! 당연히…”
            “어때? 이런 거야. 지금 우린 전화 한 통은커녕 메시지 한 줄조차 남길 수 없어.”
            <br/><br/>
            그렇게, 인류의 마지막 대화가 물에 잠기고 말았다.
          </p>
        </article>

        {/* 5번 */}
        <article className="reveal-up prose prose-zinc max-w-none news-body" style={revealStyle(610)}>
          <h2 className="text-xl font-semibold">5. 삼켜진 말</h2>
          <br/><br/>
          <p>
           노부부의 손이 허공에 맞닿아있다. 두 사람의 지난 시간이 결코 녹록치 않았음을 주름에 파묻힌 자잘한 상처들과 거칠어진 두 손이 대신 말해준다.
            <br/><br/>
           남편은 아내의 입에 귀를 가져다 댄다. 끊어질 것 같은 숨소리 사이로 조합되지 않은 단어들이 올라서려 하지만, 쉽지 않다. 마지막 말들이 입구멍 안으로 자꾸만 되들어간다.
            <br/><br/>
           ㅊ, 처, 어, 처엇.<br/>
           아이들의 이름마저 잊어버린 노모는 배 아파 낳았던 순서대로 애들을 떠올리지만, 죽음은 냉정하다. 조금도 기다려주지 않았다. 지난 세월에 눈물샘마저 다 마른 탓에 노인은 눈물조차 흘리지 못했다. 격해진 감정에 턱만 벌어지고, 마른 눈만 붉어졌을 뿐.
            <br/><br/>
           그는 이후로 죽음을 맞이하는 순간까지 아내의 마지막을 떠올렸다. 둘은 반세기가량을 한 이불 속에 살아 죽음에, 죽음으로 답할 만큼 애틋했지만, 삼켜진 말에 대해서는 온갖 추측만이 가능할 뿐, 알 수는 없었다.
            <br/><br/>
           여편네, 설마 애들 이름을 잊었을라고. 그렇게 의심조차 않았다.
          </p>
        </article>

        {/* 45번 */}
        <article className="reveal-up prose prose-zinc max-w-none news-body" style={revealStyle(700)}>
          <h2 className="text-xl font-semibold">45. 국경</h2>
          <br/><br/>
          <p>
            애써 달려왔지만, 기다리고 있는 건 높다랗게 쌓아 올려진 방벽이었다. 
            다리에 힘이 풀려 주저앉은 마누엘에게 나귀 위에 올라탄 남자가 천천히 다가왔다. 
            배가 어찌나 나왔는지, 나귀가 걸음을 뗄 때마다 당장이라도 엎어질 것 같았다.
            <br/><br/>
            “국경을 넘으려고? 왜? 관리라도 죽였어?”
            <br/><br/>
            마누엘의 모든 신경이 순식간에 허리춤 뒤에 숨겨둔 단도로 향했다.
            <br/><br/>
            “요점만 말하지. 가진 걸 다 털어 내게 주면 넘는 방법을 알려주마.”
            <br/><br/>
            국경을 넘을 수 있단 말에 마누엘이 고개를 들어 남자를 올려다봤다.
            <br/><br/>
            “일 없소.”
            “혼자서는 무리일 텐데?”
            “그렇다고 남에게 미래를 넘길 수야 없는 법이죠. 어머니가 그랬어요. 내가 급할 때, 가장 듣고 싶은 말을 하는 이를 항상 조심해야 한다고.”
            <br/><br/>
            순간 남자의 인상이 험악하게 구겨지나 싶더니 구겨진 뱃살 밑에서 날이 시퍼런 손도끼가 나타났다. 때를 맞추어 마누엘의 단도도 마중을 나왔다. 둘의 칼날이 찰나를 찢었다.
          </p>
        </article>

        {/* 101번 */}
        <article className="reveal-up prose prose-zinc max-w-none news-body" style={revealStyle(790)}>
          <h2 className="text-xl font-semibold">101. 알리햐</h2>
          <br/><br/>
          <p>
            결국 알리햐는 홀로 남아 몇 번의 생을 다시 더 살아야 했다.
            <br/><br/>
            잔혹한 형벌이었다. 몇 번이고 남편을 다시 만나 불같이 사랑해야 했고, 제 살점 같은 아이들을 낳을 때마다 세상의 벼랑 끝 앞에서 고작 까치발로 버텨내야 하는 고통을 되풀이해야 했다. 그래도 그런 만남만 있다면 매번 썩 괜찮은 인생으로 남을 수 있었겠지만, 안타깝게도 그녀는 늘 그들을 먼저 땅에 묻어야 했다. 남편과 아이들의 관을 덮고 누르는 비석이 그녀의 심장에 말뚝처럼 박혔지만, 신은 그녀에게 죽음을 허락하지 않았다.
            <br/><br/>
            신은 잔혹했다. 그녀에게 쉼 없이 시련을 내렸고, 그때마다 고작 숨만 쉴 수 있는 작은 틈 하나씩만을 내주는 게 전부였다. 그나마 다행인 건 그녀에게 절대적 망각이 주어졌다는 정도다. 그녀는 매번 인생을 새롭게 살았다.
            <br/><br/>
            “어때? 이번 소설 괜찮지 않아? 알리햐는 내가 정말 애정하는 캐릭터야.”
          </p>

          <p className="mt-4 text-sm text-zinc-600">
            「알리햐」의 공식 공개 전문 및 인용 허용 안내는{" "}
            <Link href="/research/500-character-fiction/examples" className="text-violet-700 underline underline-offset-4">
              대표 샘플 페이지
            </Link>
            에서 확인할 수 있습니다.
          </p>
        </article>

        {/* 96번 */}
        <article className="reveal-up prose prose-zinc max-w-none news-body" style={revealStyle(880)}>
          <h2 className="text-xl font-semibold">96. 작가와 작가</h2>
          <br/><br/>
          <p>
            얼지 않는 하늘.<br/>
            12월이지만, 이스탄불의 하늘은 습기만 고요히 떠있어 계절감이 흐릿하다.
            <br/><br/>
            토를가는 비쩍 마른 몸이 되어 우울만 조금씩 불려가고 있다. 몇 년째 미완의 장편소설을 쓰고 있는 탓이다.
            딱히 독자가 없음에도 그는 늘 꼬박꼬박 써내려간다.
            <br/><br/>
            반면, 이즈미르에 살고 있는 친구 율루는 아랫배가 튀어나왔다. 이미 몇 년 전에 소설집 하나를 출간한 이후로 어렵게 집필에 몰입하기보단 다양한 활동으로 이름을 알리고 있는 중이다.
            <br/><br/>
            둘은 자주 통화했고, 그때마다 자신의 이야기만 했다.
            <br/><br/>
            "너도 일단 완결부터 내야지. 그래야 다른 이야기들 중 하나가 터져서 생활이 될 거 아냐?"
            "돈을 셈하는 순간, 상상력이나 인식이 모두 그쪽으로 매몰 될 수가 있어. 그러면 다양한 글을 쓰기 어렵지 않을까?"
            <br/><br/>
            서로를 자극할 만한 말들이었지만, 누구 하나 조금도 타격을 받진 않았다. 둘은 서로를 작가라고 생각한 적이 없었기 때문이다.
            <br/><br/>
            유감스럽게도 둘을 아는 이들은 모두 작가라 불렀음에도 말이다.
          </p>
        </article>

      </section>

      {/* CTA */}
          <section className="reveal-up rounded-2xl border border-violet-100 p-6 bg-violet-50/60" style={revealStyle(980)}>
            <h3 className="text-lg font-semibold text-violet-900 mb-2">도전하고 공유하기</h3>
            <p className="text-zinc-700 mb-4">
              500자 쓰기에 도전해 보고, 결과를 공유해 보세요.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="https://500challenge.vercel.app/"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition"
              >
                500자 쓰기 도전
              </Link>
              
              <Link
                href="/projects/500fiction_archive"                
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition"
              >
                참여자들 작품 보기
              </Link>
              
              <Link
                href="/edition/surimseoga/500-fiction"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-400 text-white hover:bg-violet-500 transition"
              >
                책 보러가기
              </Link>

              <Link
                href="/projects/500_fiction/bookmaps"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-300 text-white hover:bg-violet-500 transition"
              >
                입고서점 확인
              </Link>

              <Link
                href="/research/500-character-fiction/examples"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-300 text-white hover:bg-violet-500 transition"
              >
                공식 대표 샘플 보기
              </Link>
            </div>
          </section>

      <footer className="reveal-up text-center text-xs text-zinc-400 mt-12" style={revealStyle(1080)}>
        © 2025 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}
