import type { Product } from "@/lib/types";
import { formatPct } from "@/lib/format";

export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const styles = {
    up: "bg-success/10 text-success",
    down: "bg-error/10 text-error",
    flat: "bg-base-content/10 text-base-content/60",
  }[change.dir];
  const symbol = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";

  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${styles}`}>
      <span className="text-[10px]">{symbol}</span>
      {change.dir === "flat" ? "০.০%" : formatPct(change.pct)}
    </span>
  );
}
