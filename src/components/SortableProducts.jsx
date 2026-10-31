"use client";

import { useState } from "react";
import Image from "next/image";
import ProductGrid from "@/components/ProductGrid";
import { toBnNumber } from "@/lib/format";

const SORTS = {
  default: { label: "ডিফল্ট" },
  asc: { label: "দাম: কম থেকে বেশি", compare: (a, b) => a.today - b.today },
  desc: { label: "দাম: বেশি থেকে কম", compare: (a, b) => b.today - a.today },
};

export default function SortableProducts({ products }) {
  const [sort, setSort] = useState("default");

  // Prices from the API are numbers, so this compares values, never Bengali digit strings
  const { compare } = SORTS[sort];
  const sorted = compare ? [...products].sort(compare) : products;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end gap-3 rounded-2xl border border-base-300 bg-base-100 p-[17px]">
        <label htmlFor="sort" className="text-sm leading-5">
          সাজান
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-8 cursor-pointer appearance-none rounded-lg border border-base-content bg-base-100 pr-[29px] pl-[13px] text-xs leading-[18px] focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          >
            {Object.entries(SORTS).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <Image
            src="/icons/chevron-down.svg"
            alt=""
            width={10}
            height={10}
            className="pointer-events-none absolute top-[11px] right-3"
          />
        </div>
      </div>

      <p className="text-sm leading-5">মোট {toBnNumber(products.length)}টি পণ্য দেখানো হচ্ছে</p>

      <ProductGrid products={sorted} />
    </div>
  );
}
