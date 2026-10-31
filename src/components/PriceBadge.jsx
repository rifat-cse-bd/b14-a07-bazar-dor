import { formatChange, getChangeStyle } from "@/lib/format";

export default function PriceBadge({ change, className = "" }) {
  const { color } = getChangeStyle(change);

  return (
    <span
      className={`inline-flex items-center text-xs leading-4 font-semibold whitespace-nowrap ${color} ${className}`}
    >
      {formatChange(change)}
    </span>
  );
}
