import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import BanglaDate from "@/components/BanglaDate";
import CategoryLinks, { CategoryList } from "./CategoryLinks";
import AuthButtons from "./AuthButtons";

export default async function Navbar() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-[1164px] items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary">
            <Image src="/logo-icon.png" alt="বাজার দর" width={18} height={18} priority />
          </span>
          <span className="flex flex-col">
            <span className="text-xl font-bold leading-7 tracking-[-0.5px]">বাজার দর</span>
            <BanglaDate />
          </span>
        </Link>

        <AuthButtons />
      </div>

      <div className="border-t border-base-200">
        <nav className="mx-auto max-w-6xl px-4">
          <Suspense fallback={<CategoryList categories={categories} />}>
            <CategoryLinks categories={categories} />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
