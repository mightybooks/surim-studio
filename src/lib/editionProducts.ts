import { formatMoney } from "@/lib/formatMoney";

export type EditionSection = "surimseoga" | "goods";
export type ProductType = "BOOK" | "GOODS" | "DIGITAL";

export type EditionProduct = {
  id?: string;
  slug: string;
  section: EditionSection;
  name: string;
  type: ProductType;
  category?: string;
  summary: string;
  price: number;
  priceUsd?: number;
  delivery?: string;
  thumbnail: string;
  detailImage: string;
  composition?: string;
  spec?: string;
  isbn?: string;
};

type ProductTarget = {
  ids?: string[];
  slugs?: string[];
  name?: string;
  categories?: string[];
};

const PRODUCT_CATALOG: EditionProduct[] = [
  {
    id: "book-500-fiction",
    slug: "500-fiction",
    section: "surimseoga",
    name: "500자소설",
    type: "BOOK",
    category: "surimseoga",
    summary: "500자소설 단행본",
    price: 11000,
    priceUsd: 22,
    delivery: "택배 / 1~3영업일",
    thumbnail: "/productlist/500ficion_list.webp",
    detailImage: "/productdetail/500ficion_detail.webp",
    composition: "단행본 1권",
    spec: "128x188mm / 284p",
    isbn: "979-11-994493-0-5",
  },
  {
    id: "goods-8cut-7set",
    slug: "8cut-conti-note-7set",
    section: "goods",
    name: "8컷 콘티노트 7권 1세트",
    type: "GOODS",
    category: "goods",
    summary: "창작용 콘티노트 7권 세트",
    price: 21000,
    priceUsd: 0,
    delivery: "택배 / 1~3영업일",
    thumbnail: "/productlist/8cut_list.webp",
    detailImage: "/productdetail/8cut_detail.webp",
    composition: "노트 7권 1세트",
    spec: "B5 / 무선제본 36매 / 표지 120g",
  },
];

const SECTION_TARGETS: Record<EditionSection, ProductTarget[]> = {
  surimseoga: [
    {
      ids: ["book-500-fiction"],
      slugs: ["500-fiction"],
      name: "500자소설",
      categories: ["surimseoga", "book", "books"],
    },
  ],
  goods: [
    {
      ids: ["goods-8cut-7set"],
      slugs: ["8cut-conti-note-7set"],
      name: "8컷 콘티노트 7권 1세트",
      categories: ["goods"],
    },
  ],
};

function isMatchedByTarget(product: EditionProduct, target: ProductTarget) {
  const productId = (product.id ?? "").trim();
  const productSlug = (product.slug ?? "").trim();
  const hasIdentifier = Boolean(productId || productSlug);
  const hasTargetIdentifier = Boolean(
    (target.ids?.length ?? 0) > 0 || (target.slugs?.length ?? 0) > 0,
  );

  if (hasIdentifier && hasTargetIdentifier) {
    return (
      (target.ids?.includes(productId) ?? false) ||
      (target.slugs?.includes(productSlug) ?? false)
    );
  }

  if (target.name) {
    return product.name === target.name;
  }

  if (target.categories?.length) {
    return target.categories.includes(product.category ?? "");
  }

  return false;
}

export function getEditionProducts(
  section: EditionSection,
  products: EditionProduct[] = PRODUCT_CATALOG,
) {
  const targets = SECTION_TARGETS[section];

  return products.filter((product) =>
    targets.some((target) => isMatchedByTarget(product, target)),
  );
}

export function getEditionProductBySlug(
  section: EditionSection,
  slug: string,
  products: EditionProduct[] = PRODUCT_CATALOG,
) {
  return getEditionProducts(section, products).find((product) => product.slug === slug) ?? null;
}

export function getProductDetailHref(product: EditionProduct) {
  return `/edition/${product.section}/${product.slug}`;
}

export function getOrderQuerySource(product: EditionProduct) {
  return `edition_${product.section}`;
}

export function getDisplayPrice(product: EditionProduct) {
  return formatMoney({ amount_minor: product.price, currency: "KRW" });
}

export function getEditionProductById(
  id: string,
  products: EditionProduct[] = PRODUCT_CATALOG,
) {
  const normalized = String(id ?? "").trim();
  if (!normalized) return null;
  return products.find((product) => String(product.id ?? "").trim() === normalized) ?? null;
}

export function isGoodsProduct(product: Pick<EditionProduct, "type" | "category" | "section">) {
  const type = String(product.type ?? "").toUpperCase();
  const category = String(product.category ?? "").toLowerCase();
  const section = String(product.section ?? "").toLowerCase();
  return type === "GOODS" || category === "goods" || section === "goods";
}

export function isGoodsProductId(id: string, products: EditionProduct[] = PRODUCT_CATALOG) {
  const product = getEditionProductById(id, products);
  return product ? isGoodsProduct(product) : false;
}
