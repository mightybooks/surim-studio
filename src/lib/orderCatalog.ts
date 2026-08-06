import "server-only";

import { getEditionProductById, isGoodsProduct } from "@/lib/editionProducts";
import { majorToMinor } from "@/lib/formatMoney";

export type Currency = "KRW" | "USD";
export type PaymentGateway = "inicis" | "paypal";

export type CatalogPrice = {
  currency: Currency;
  unitAmountMinor: number;
};

export type OrderCatalogProduct = {
  id: string;
  name: string;
  active: boolean;
  source: "shop" | "funding_500";
  prices: Partial<Record<Currency, CatalogPrice>>;
  allowedPgs: PaymentGateway[];
  shippable: boolean;
};

const FUNDING_PRODUCTS: OrderCatalogProduct[] = [
  {
    id: "funding_500_2026_01",
    name: "문수림의『500자 소설』(펀딩)",
    active: false,
    source: "funding_500",
    prices: {
      KRW: { currency: "KRW", unitAmountMinor: 11000 },
      USD: { currency: "USD", unitAmountMinor: 2200 },
    },
    allowedPgs: ["inicis", "paypal"],
    shippable: true,
  },
];

export function getOrderCatalogProduct(id: string): OrderCatalogProduct | null {
  const normalized = String(id ?? "").trim();
  const edition = getEditionProductById(normalized);
  if (edition) {
    const goods = isGoodsProduct(edition);
    return {
      id: normalized,
      name: edition.name,
      active: true,
      source: "shop",
      prices: {
        KRW: { currency: "KRW", unitAmountMinor: edition.price },
        ...(edition.priceUsd && edition.priceUsd > 0
          ? {
              USD: {
                currency: "USD" as const,
                unitAmountMinor: majorToMinor(edition.priceUsd, "USD")!,
              },
            }
          : {}),
      },
      allowedPgs: goods ? ["inicis"] : ["inicis", "paypal"],
      shippable: true,
    };
  }
  return FUNDING_PRODUCTS.find((product) => product.id === normalized) ?? null;
}

export function calculateOrderAmount(unitMinor: number, quantity: number) {
  if (!Number.isSafeInteger(unitMinor) || unitMinor <= 0) return null;
  const total = unitMinor * quantity;
  return Number.isSafeInteger(total) && total > 0 ? total : null;
}
