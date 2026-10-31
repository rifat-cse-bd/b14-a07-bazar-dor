import ProductGrid from "@/components/ProductGrid";

export default function PriceMovers({ title, arrow, arrowClass, products }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-xl leading-7 font-bold">
        <span className={`text-base ${arrowClass}`}>{arrow}</span>
        {title}
      </h2>
      <ProductGrid products={products} />
    </section>
  );
}
