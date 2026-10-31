const numberFormat = new Intl.NumberFormat("bn-BD");
const percentFormat = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const UNITS = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

// 1850 -> "১,৮৫০"
export function toBnNumber(value) {
  return numberFormat.format(value);
}

// -2.9 -> "২.৯"
export function toBnPercent(value) {
  return percentFormat.format(Math.abs(value));
}

export function unitName(unit) {
  return UNITS[unit] ?? unit;
}

// Rising prices are red and falling prices green, as in the Figma design
export const CHANGE_STYLES = {
  up: { arrow: "▲", color: "text-error" },
  down: { arrow: "▼", color: "text-success" },
  flat: { arrow: "—", color: "text-base-content/60" },
};

export function getChangeStyle(change) {
  return CHANGE_STYLES[change?.dir] ?? CHANGE_STYLES.flat;
}

// "▲ ২.১%", "▼ ২.৯%" or "—০.০%" as written in the requirements
export function formatChange(change) {
  const { arrow } = getChangeStyle(change);
  const gap = arrow === CHANGE_STYLES.flat.arrow ? "" : " ";
  return `${arrow}${gap}${toBnPercent(change?.pct ?? 0)}%`;
}
