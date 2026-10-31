import Link from "next/link";
import PriceBadge from "@/components/PriceBadge";
import { toBnNumber, unitName } from "@/lib/format";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-[17px] transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl leading-8">
          {product.image}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-base leading-6 font-semibold">{product.nameBn}</span>
          <span className="text-xs leading-4">প্রতি {unitName(product.unit)}</span>
        </span>
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="flex flex-col">
          <span className="text-xs leading-4">আজকের দাম</span>
          <span className="leading-7">
            <span className="text-xl font-bold">{toBnNumber(product.today)}</span>{" "}
            <span className="text-sm font-medium">টাকা</span>
          </span>
        </span>
        <PriceBadge change={product.change} className="rounded-xl bg-base-200 px-2 py-1" />
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-[17px]">
      <div className="flex items-start gap-3">
        <div className="skeleton size-12 rounded-xl" />
        <div className="flex flex-col gap-2 pt-1">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-20" />
        </div>
        <div className="skeleton h-6 w-16 rounded-xl" />
      </div>
    </div>
  );
}
