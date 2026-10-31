import { Suspense } from "react";
import { getProducts } from "@/lib/api";
import { toBnNumber } from "@/lib/format";
import Hero from "@/components/home/Hero";
import PriceMovers from "@/components/home/PriceMovers";
import ProductGrid, { ProductGridSkeleton } from "@/components/ProductGrid";

function SectionSkeleton({ count }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="skeleton h-7 w-40" />
      <ProductGridSkeleton count={count} />
    </div>
  );
}

async function HomeSections() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <PriceMovers title="আজ দাম বেড়েছে" arrow="▲" arrowClass="text-error" products={risers} />
      <PriceMovers title="আজ দাম কমেছে" arrow="▼" arrowClass="text-success" products={fallers} />

      <section id="সব-পণ্য" className="flex scroll-mt-32 flex-col gap-3">
        <h2 className="text-xl leading-7 font-bold">সব পণ্য</h2>
        <p className="text-sm leading-5">মোট {toBnNumber(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <ProductGrid products={products} />
      </section>
    </>
  );
}

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6">
      <Hero />
      <Suspense
        fallback={
          <>
            <SectionSkeleton count={6} />
            <SectionSkeleton count={6} />
            <SectionSkeleton count={9} />
          </>
        }
      >
        <HomeSections />
      </Suspense>
    </div>
  );
}
