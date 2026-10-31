import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";

const gridClass = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

export default function ProductGrid({ products }) {
  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className={gridClass} aria-busy="true" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
