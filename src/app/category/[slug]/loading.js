import { ProductGridSkeleton } from "@/components/ProductGrid";

export function CategorySkeleton() {
  return (
    <>
      <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <div className="skeleton size-10 rounded-xl" />
        <div className="flex flex-col gap-2">
          <div className="skeleton h-6 w-24" />
          <div className="skeleton h-4 w-48" />
        </div>
      </div>
      <div className="skeleton h-[66px] rounded-2xl" />
      <p className="text-sm leading-5">লোড হচ্ছে…</p>
      <ProductGridSkeleton count={6} />
    </>
  );
}

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <CategorySkeleton />
    </div>
  );
}
