import EditionProductCard from "@/components/edition/EditionProductCard";
import { getEditionProducts } from "@/lib/editionProducts";

export default function EditionGoodsPage() {
  const products = getEditionProducts("goods");

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-emerald-900">굿즈</h1>
        <p className="text-zinc-600">수림 스튜디오 굿즈를 소개합니다.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <EditionProductCard key={product.id ?? product.slug ?? product.name} product={product} />
        ))}
      </section>
    </main>
  );
}

