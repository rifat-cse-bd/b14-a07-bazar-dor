import { getChangeStyle, toBnPercent } from "@/lib/format";

export default function PriceBadge({ change, className = "" }) {
  const { arrow, color } = getChangeStyle(change);

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs leading-4 font-semibold whitespace-nowrap ${color} ${className}`}
    >
      <span>{arrow}</span>
      <span>{toBnPercent(change?.pct ?? 0)}%</span>
    </span>
  );
}
