import { getProducts } from "@/lib/api";
import { formatChange, getChangeStyle, toBnNumber, unitName } from "@/lib/format";

function TickerItems({ products, hidden = false }) {
  return (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {products.map((product) => {
        const { color } = getChangeStyle(product.change);
        return (
          <li
            key={product.id}
            className="flex items-center gap-1.5 border-r border-base-200 py-2 pr-[17px] pl-4 text-sm leading-5 whitespace-nowrap"
          >
            <span>{product.image}</span>
            <span className="font-medium">{product.nameBn}</span>
            <span>
              {toBnNumber(product.today)} টাকা/{unitName(product.unit)}
            </span>
            <span className={`font-semibold ${color}`}>
              {formatChange(product.change)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default async function Ticker() {
  const products = await getProducts();
  if (!products.length) return null;

  return (
    <div className="overflow-hidden border-b border-base-300 bg-base-100">
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused] motion-reduce:animate-none">
        <TickerItems products={products} />
        <TickerItems products={products} hidden />
      </div>
    </div>
  );
}
