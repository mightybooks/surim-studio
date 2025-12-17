import { createClient } from "@supabase/supabase-js";
import ArchiveClient from "./ArchiveClient";
import type { FictionEntry } from "@/components/500challenge/types";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ---------- 타입 ---------- */

type ArcanaCard = {
  id: string;
  ogImageSrc: string;
};

type ViewerEntry = {
  id: string;
  title: string;
  content: string;
  ogImageSrc: string;
};

/* ---------- 유틸 ---------- */

// Fisher–Yates shuffle (서버 1회 실행)
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// 22장 덱 강제 구성 (데이터 부족 대비)
function buildDeck<T>(items: T[], size: number): T[] {
  if (items.length === 0) return [];
  const deck: T[] = [];
  let i = 0;
  while (deck.length < size) {
    deck.push(items[i % items.length]);
    i++;
  }
  return deck;
}

/* ---------- 페이지 ---------- */

export default async function FictionArchivePage() {
  const { data, error } = await supabase
    .from("fiction_500_archive")
    .select("id, title, content, og_image_key, email");

  if (error || !data || data.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-20 text-center text-slate-400">
        아직 아카이브된 작품이 없습니다.
      </main>
    );
  }

  // 1️⃣ 서버에서 1회 셔플
  const shuffled = shuffleArray(data);

  // 2️⃣ 항상 22장 덱 보장
  const deckEntries = buildDeck(shuffled, 22);

  // 3️⃣ 카드용 데이터 (이미지 전용)
  const cards: ArcanaCard[] = deckEntries.map((entry) => ({
    id: entry.id,
    ogImageSrc: `/archive/500challenge/og/${entry.og_image_key}.png`,
  }));

  // 4️⃣ 본문용 데이터
  const entries: FictionEntry[] = deckEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    content: entry.content,
    ogImageSrc: `/archive/500challenge/og/${entry.og_image_key}.png`,
    email: entry.email, 
  }));

  // 5️⃣ 최초 진입 카드 (서버에서 1회 결정)
  const initialIndex = Math.floor(Math.random() * 22);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-14 text-center">
        <h1 className="text-2xl font-semibold">500자 소설 아카이브</h1>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            여러분이 쓴 작품들이 이곳에 랜덤하게 나타납니다.<br />
            천천히, 자유롭게 감상해 주세요.<br />
            <span className="block mt-2 text-xs text-slate-400">
              이후 홈페이지 개발이 완료되면, 마음에 드는 작품에 좋아요나 댓글을 남길 수 있게 됩니다.
              조금만 기다려 주세요.
            </span>
          </p>
      </header>

      {/* 
        Client 영역으로 책임 완전 위임
        - 상태 관리
        - 셔플/좌우
        - 카드 ↔ 본문 동기화
      */}
      <ArchiveClient
        cards={cards}
        entries={entries}
        initialIndex={initialIndex}
      />
    </main>
  );
}
