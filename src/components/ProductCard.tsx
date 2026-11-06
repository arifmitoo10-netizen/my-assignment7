import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, unitLabel } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-base-200 text-2xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-tight">{product.nameBn}</h3>
          <p className="text-xs text-base-content/55">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] text-base-content/50">আজকের দাম</p>
          <p className="text-lg font-bold">{formatPrice(product.today)}</p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
