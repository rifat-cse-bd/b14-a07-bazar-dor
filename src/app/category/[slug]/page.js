import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/api";
import { toBnNumber } from "@/lib/format";
import SortableProducts from "@/components/SortableProducts";
import EmptyState from "@/components/EmptyState";
import { CategorySkeleton } from "./loading";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  return { title: category ? `${category.nameBn} — বাজার দর` : "পেজটি পাওয়া যায়নি — বাজার দর" };
}

async function CategoryContent({ params }) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) notFound();

  return (
    <>
      <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <span className="text-4xl leading-10">{category.icon}</span>
        <div className="flex flex-col">
          <h1 className="text-2xl leading-8 font-bold">{category.nameBn}</h1>
          <p className="text-sm leading-5">
            {toBnNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {products.length ? (
        <SortableProducts products={products} />
      ) : (
        <EmptyState
          title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
          message="এই মুহূর্তে এই ক্যাটাগরির কোনো পণ্যের দাম পাওয়া যায়নি।"
        />
      )}
    </>
  );
}

export default function CategoryPage({ params }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryContent params={params} />
      </Suspense>
    </div>
  );
}
