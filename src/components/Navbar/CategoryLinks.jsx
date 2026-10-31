"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function CategoryList({ categories, activeSlug }) {
  return (
    <ul className="flex items-center gap-1 overflow-x-auto py-2 text-xs leading-[17.1px] whitespace-nowrap [scrollbar-width:none]">
      {categories.map((category) => {
        const isActive = category.slug === activeSlug;
        return (
          <li key={category.slug}>
            <Link
              href={`/category/${category.slug}`}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-8 items-center gap-1.5 rounded-lg px-3 font-semibold transition-colors ${
                isActive
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function CategoryLinks({ categories }) {
  const pathname = usePathname();
  const activeSlug = pathname.startsWith("/category/")
    ? decodeURIComponent(pathname.split("/")[2])
    : null;

  return <CategoryList categories={categories} activeSlug={activeSlug} />;
}
