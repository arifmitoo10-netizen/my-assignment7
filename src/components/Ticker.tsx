"use client";

import { useProducts } from "@/context/ProductsContext";
import { formatNumber, formatPct, unitShort } from "@/lib/format";

export default function Ticker() {
  const { products, loading } = useProducts();

  if (loading) return <div className="skeleton h-9 w-full rounded-none" />;
  if (products.length === 0) return null;

  const items = products.map((p) => {
    const color = p.change.dir === "up" ? "text-success" : p.change.dir === "down" ? "text-error" : "text-base-content/50";
    const symbol = p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—";
    return (
      <span key={p.id} className="flex shrink-0 items-center gap-1.5 px-5 text-sm">
        <span>{p.image}</span>
        <span className="font-medium">{p.nameBn}</span>
        <span className="text-base-content/70">
          {formatNumber(p.today)} টাকা/{unitShort(p.unit)}
        </span>
        <span className={`text-xs font-semibold ${color}`}>
          {symbol} {p.change.dir === "flat" ? "০.০%" : formatPct(p.change.pct)}
        </span>
      </span>
    );
  });

  return (
    <div className="overflow-hidden border-b border-base-300 bg-base-100 py-2" aria-label="দামের টিকার">
      <div className="marquee-track flex w-max animate-marquee">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}
