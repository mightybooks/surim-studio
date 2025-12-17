"use client";

type ArcanaCard = {
  id: string;
  ogImageSrc: string;
};

type ArcanaDeckProps = {
  cards: ArcanaCard[];
  activeIndex: number;
  onChangeActive: (index: number) => void;
};

const CARD_BACK_SRC = "/archive/500challenge/back.png";

// ===== 확정 파라미터 =====
const CARD_WIDTH = 180;
const OFFSET_X = 26;
const OFFSET_Y = 8;
const ACTIVE_SCALE = 1.45;

export function ArcanaDeck({
  cards,
  activeIndex,
  onChangeActive,
}: ArcanaDeckProps) {
  return (
    <section className="w-full">

      {/* ================= 1층 : 카드 스프레드 ================= */}
      <div className="relative z-10 mx-auto h-[180px] max-w-6xl overflow-visible">
        {cards.map((card, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;

          return (
            <img
              key={`${card.id}-${index}`}
              src={isActive ? card.ogImageSrc : CARD_BACK_SRC}
              alt=""
              draggable={false}
              className="absolute top-1/2 -translate-y-1/2 transition-transform duration-300 select-none"
              style={{
                width: `${CARD_WIDTH}px`,
                left: `calc(50% + ${offset * -OFFSET_X}px)`,
                transform: `
                  translate(-50%, ${isActive ? -OFFSET_Y : 0}px)
                  scale(${isActive ? ACTIVE_SCALE : 1})
                `,
                zIndex: isActive ? 40 : 20 - Math.abs(offset),
              }}
            />
          );
        })}
      </div>
    </section>
  );
}


