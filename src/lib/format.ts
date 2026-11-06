const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert any English digits in a string/number to Bengali digits. */
export const toBn = (v: number | string) => String(v).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

/** Parse a number that may contain Bengali digits / commas ("১,৮৫০" -> 1850). */
export const parseNum = (v: number | string): number => {
  if (typeof v === "number") return v;
  const ascii = v.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d))).replace(/,/g, "");
  const n = Number(ascii);
  return Number.isNaN(n) ? 0 : n;
};

/** 1850 -> "১,৮৫০" */
export const formatNumber = (n: number, fractionDigits = 0) => {
  const fixed = Math.abs(n).toFixed(fractionDigits);
  const [int, frac] = fixed.split(".");
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return toBn(frac ? `${withCommas}.${frac}` : withCommas);
};

/** 148 -> "১৪৮ টাকা" */
export const formatPrice = (n: number) => `${formatNumber(n)} টাকা`;

export const formatPct = (pct: number) => `${formatNumber(Math.abs(pct), 1)}%`;

const UNIT_LABEL: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};
const UNIT_SHORT: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitLabel = (u: string) => UNIT_LABEL[u] ?? `প্রতি ${u}`;
export const unitShort = (u: string) => UNIT_SHORT[u] ?? u;

/** Only allow same-site redirects ("/product/x"), never external URLs. */
export const safeRedirect = (to: string | null | undefined) =>
  to && to.startsWith("/") && !to.startsWith("//") ? to : "/";
