import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { connection } from "next/server";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug, getProducts } from "@/lib/api";
import { getChangeStyle, toBnNumber, toBnPercent, unitName } from "@/lib/format";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.nameBn} — বাজার দর` : "পেজটি পাওয়া যায়নি — বাজার দর" };
}

const marketAverage = (market) => Math.round((market.min + market.max) / 2);

const CHANGE_WORDS = { up: "বেড়েছে", down: "কমেছে", flat: "অপরিবর্তিত" };

function Breadcrumbs({ product }) {
  const items = [
    { href: "/", label: "হোম" },
    { href: `/category/${product.category}`, label: product.categoryNameBn },
  ];
  return (
    <nav aria-label="Breadcrumb" className="overflow-x-auto py-2 text-sm leading-5 whitespace-nowrap">
      <ol className="flex items-center gap-3 pl-1">
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-3">
            <Link href={item.href} className="hover:text-primary hover:underline">
              {item.label}
            </Link>
            <Image src="/icons/breadcrumb-chevron.svg" alt="" width={6} height={8} />
          </li>
        ))}
        <li aria-current="page">{product.nameBn}</li>
      </ol>
    </nav>
  );
}

function SummaryStat({ label, value, note, color }) {
  return (
    <div className="flex flex-col rounded-2xl border border-base-300 bg-base-100 px-[25px] py-[17px]">
      <span className="text-xs leading-[18px]">{label}</span>
      <span className={`leading-8 font-bold ${color}`}>
        <span className="text-2xl">{toBnNumber(value)}</span>{" "}
        <span className="text-sm font-medium">টাকা</span>
      </span>
      <span className="text-xs leading-[18px]">{note}</span>
    </div>
  );
}

async function ProductDetails({ params }) {
  // The session check reads the clock, so it must only run at request time
  await connection();
  const session = await auth.api.getSession({ headers: await headers() });
  const { slug } = await params;
  if (!session) {
    redirect(`/signin?callbackUrl=/product/${slug}&reason=protected`);
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const unit = unitName(product.unit);
  const markets = [...product.markets].sort((a, b) => marketAverage(a) - marketAverage(b));
  const minPrice = Math.min(...markets.map((m) => m.min));
  const maxPrice = Math.max(...markets.map((m) => m.max));
  const avgPrice = Math.round(
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
  );
  const difference = Math.abs(product.today - product.yesterday);
  const { arrow, color } = getChangeStyle(product.change);

  return (
    <>
      <Breadcrumbs product={product} />

      <section className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-[21px] sm:flex-row sm:items-center">
        <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl leading-10">
          {product.image}
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <h1 className="text-2xl leading-9 font-bold sm:text-3xl">{product.nameBn}</h1>
          <p className="text-sm leading-5">
            প্রতি {unit} · {product.categoryNameBn}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link
              href={`/category/${product.category}`}
              className="badge badge-sm border-base-300 bg-base-200 hover:border-primary"
            >
              {product.categoryIcon} {product.categoryNameBn}
            </Link>
            <span className="badge badge-sm border-base-300 bg-base-200">প্রতি {unit}</span>
          </div>
          <p className="mt-2 text-sm leading-5">
            গতকালের তুলনায় আজ দাম{" "}
            <span className="font-semibold">{CHANGE_WORDS[product.change.dir]}</span>
            {difference > 0 && ` · ${toBnNumber(difference)} টাকা`}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-center rounded-2xl bg-base-200 px-5 pt-4 pb-[17px] text-center sm:min-w-[118px]">
          <span className="text-sm leading-5">আজকের দাম</span>
          <span className="text-3xl leading-9 font-bold">{toBnNumber(product.today)}</span>
          <span className="text-sm leading-5">টাকা / {unit}</span>
          <span className={`mt-[3px] flex items-center gap-1 text-sm leading-5 font-semibold ${color}`}>
            <span>{arrow}</span>
            <span>{toBnPercent(product.change.pct)}%</span>
          </span>
        </div>
      </section>

      <div className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg leading-7 font-semibold">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <SummaryStat label="সর্বনিম্ন দাম" value={minPrice} note="সবচেয়ে কম দামের বাজার" color="text-success" />
            <SummaryStat label="সর্বাধিক দাম" value={maxPrice} note="সবচেয়ে বেশি দামের বাজার" color="text-error" />
            <SummaryStat label="গড় দাম" value={avgPrice} note={`প্রতি ${unit}-এর হিসাবে`} color="text-primary" />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg leading-7 font-semibold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="w-full min-w-[560px] text-sm leading-[21px]">
              <thead>
                <tr className="border-b border-base-content text-left font-bold">
                  <th className="px-4 pt-3 pb-[13px]">বাজার</th>
                  <th className="px-4 pt-3 pb-[13px]">বিভাগ</th>
                  <th className="px-4 pt-3 pb-[13px] text-right">সর্বনিম্ন</th>
                  <th className="px-4 pt-3 pb-[13px] text-right">সর্বাধিক</th>
                  <th className="px-4 pt-3 pb-[13px] text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market) => (
                  <tr key={market.market} className="border-b border-base-300 last:border-b-0 hover:bg-base-200">
                    <td className="px-4 pt-3 pb-[13px] font-medium">{market.market}</td>
                    <td className="px-4 pt-3 pb-[13px]">{market.division}</td>
                    <td className="px-4 pt-3 pb-[13px] text-right">{toBnNumber(market.min)} টাকা</td>
                    <td className="px-4 pt-3 pb-[13px] text-right">{toBnNumber(market.max)} টাকা</td>
                    <td className="px-4 pt-3 pb-[13px] text-right font-semibold">
                      {toBnNumber(marketAverage(market))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/" className="btn btn-sm sm:btn-md border-base-300 bg-base-100 font-semibold">
          ← হোম পেজে ফিরে যান
        </Link>
        <Link
          href={`/category/${product.category}`}
          className="btn btn-sm sm:btn-md btn-primary border-primary-strong font-semibold shadow-primary"
        >
          সব {product.categoryNameBn} দেখুন
        </Link>
      </div>
    </>
  );
}

function DetailsSkeleton() {
  return (
    <>
      <div className="skeleton h-9 w-64" />
      <div className="skeleton h-[174px] rounded-2xl" />
      <div className="skeleton h-[420px] rounded-2xl" />
    </>
  );
}

export default function ProductPage({ params }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <Suspense fallback={<DetailsSkeleton />}>
        <ProductDetails params={params} />
      </Suspense>
    </div>
  );
}
