// src/components/archive/ArchiveTopCards.tsx
import Image from "next/image";
import type { ArchiveItem } from "@/types/archive";
import RESULT_MAP from "@/lib/archive/resultMap";

export default function ArchiveTopCards({
  items,
}: {
  items: ArchiveItem[];
}) {
  return (    
    <section className="flex justify-center gap-6 flex-wrap md:flex-nowrap">
      {items.map((item) => {
        const meta = RESULT_MAP[item.result_type];

        if (!meta) return null; // 방어 코드

        return (
          <article
            key={item.id}
            className="w-64 bg-white rounded-2xl p-4 shadow-lg"
          >
            <Image
              src={meta.image}
              alt={meta.title}
              width={256}
              height={256}
              priority
              className="rounded-xl mb-4"
            />

            <h3 className="text-sm font-semibold mb-1">
              {meta.title}
            </h3>

            {item.message && (
              <p className="text-sm text-zinc-600 leading-relaxed">
                {item.message}
              </p>
            )}
          </article>
        );
      })}
    </section>
  );
}
