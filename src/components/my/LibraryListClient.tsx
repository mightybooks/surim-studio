"use client";

import { useCallback, useState } from "react";
import FlipbookModal from "@/components/flipbook/FlipbookModal";

export type LibraryItem = {
  id: string;
  product_id: string;
  product_name: string;
  status: string;
  created_at: string;
  source: string | null;
};

const FLIPBOOK_PRODUCT_ID = "digital-500-fiction";

export default function LibraryListClient({ items }: { items: LibraryItem[] }) {
  const [openProductId, setOpenProductId] = useState<string | null>(null);
  const closeFlipbook = useCallback(() => setOpenProductId(null), []);
  const selectedItem = items.find((item) => item.product_id === openProductId) ?? null;

  return (
    <>
      <ul className="space-y-3">
        {items.map((item) => {
          const canReadFlipbook =
            item.product_id === FLIPBOOK_PRODUCT_ID && item.status === "paid";

          return (
            <li
              key={item.id}
              className="rounded-lg border border-[color:var(--border)] bg-white p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-medium">{item.product_name}</p>
                  <p className="text-sm text-neutral-600">
                    구매일: {new Date(item.created_at).toLocaleDateString("ko-KR")}
                  </p>
                  <p className="text-sm text-neutral-600">상태: 열람 가능</p>
                  {item.source ? <p className="text-xs text-neutral-400">{item.source}</p> : null}
                </div>

                {canReadFlipbook && (
                  <button
                    type="button"
                    onClick={() => setOpenProductId(item.product_id)}
                    className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                  >
                    열람하기
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <FlipbookModal
        open={Boolean(selectedItem)}
        productId={selectedItem?.product_id ?? FLIPBOOK_PRODUCT_ID}
        title={selectedItem?.product_name ?? "500자 소설 디지털판"}
        onClose={closeFlipbook}
      />
    </>
  );
}
