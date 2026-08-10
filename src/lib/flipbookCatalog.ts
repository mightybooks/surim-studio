import "server-only";

import { getEditionProductById } from "@/lib/editionProducts";

export type FlipbookCatalogEntry = {
  productId: string;
  bucket: string;
  pagePrefix: string;
  pageCount: number;
};

const FLIPBOOK_CATALOG: Record<string, FlipbookCatalogEntry> = {
  "digital-500-fiction": {
    productId: "digital-500-fiction",
    bucket: "book-reader-private",
    pagePrefix: "500-character-fiction-flip/pages",
    pageCount: 209,
  },
};

export function getFlipbookByProductId(productId: string): FlipbookCatalogEntry | null {
  const normalized = String(productId ?? "").trim();
  const flipbook = FLIPBOOK_CATALOG[normalized];
  if (!flipbook) return null;

  const product = getEditionProductById(flipbook.productId);
  if (!product || product.type !== "DIGITAL") return null;

  return flipbook;
}

export function getFlipbookPagePaths(flipbook: FlipbookCatalogEntry) {
  return Array.from({ length: flipbook.pageCount }, (_, index) => {
    const page = String(index + 1).padStart(3, "0");
    return `${flipbook.pagePrefix}/${page}.webp`;
  });
}
