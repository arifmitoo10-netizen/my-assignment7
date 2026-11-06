"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useProducts } from "@/context/ProductsContext";
import { formatNumber, formatPrice, unitLabel } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";

const skeleton = (
  <div className="space-y-4" aria-busy="true">
    <div className="skeleton h-28 w-full" />
    <div className="grid grid-cols-3 gap-3">
      <div className="skeleton h-20" />
      <div className="skeleton h-20" />
      <div className="skeleton h-20" />
    </div>
    <div className="skeleton h-72 w-full" />
  </div>
);

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { products, loading, error } = useProducts();
  const [division, setDivision] = useState("সব");

  // Protected route (second line of defence after middleware)
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন", { id: "login-required" });
      router.replace(`/signin?redirect=${encodeURIComponent(`/product/${slug}`)}`);
    }
  }, [isPending, session, router, slug]);

  const product = products.find((p) => p.slug === slug);

  const stats = useMemo(() => {
    if (!product) return null;
    const mins = product.markets.map((m) => m.min);
    const maxs = product.markets.map((m) => m.max);
    const avgs = product.markets.map((m) => (m.min + m.max) / 2);
    return {
      min: Math.min(...mins),
      max: Math.max(...maxs),
      avg: Math.round(avgs.reduce((s, v) => s + v, 0) / avgs.length),
    };
  }, [product]);

  const divisions = useMemo(
    () => ["সব", ...Array.from(new Set(product?.markets.map((m) => m.division) ?? []))],
    [product]
  );

  if (isPending || loading || !session) return skeleton;
  if (error) return <p className="py-16 text-center text-sm text-error">ডাটা লোড করা যায়নি। রিফ্রেশ করে আবার চেষ্টা করুন।</p>;
  if (!product || !stats) notFound();

  const rows = product.markets.filter((m) => division === "সব" || m.division === division);
  const dirText =
    product.change.dir === "up" ? "বেড়েছে" : product.change.dir === "down" ? "কমেছে" : "অপরিবর্তিত আছে";

  const compare = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="space-y-6">
      <Link href={`/category/${product.category}`} className="inline-flex items-center gap-1 text-sm text-base-content/60 hover:text-primary">
        <ArrowLeft size={14} /> {product.categoryNameBn} ক্যাটাগরিতে ফিরুন
      </Link>

      {/* Summary */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
              {product.image}
            </span>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
              <p className="mt-1 text-sm text-base-content/65">
                আজ {formatNumber(product.markets.length)}টি বাজারের গড় দাম {formatPrice(stats.avg)} ({unitLabel(product.unit)})।
                গতকালের তুলনায় দাম {dirText}।
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/category/${product.category}`} className="badge badge-primary badge-outline">
                  {product.categoryIcon} {product.categoryNameBn}
                </Link>
                <span className="badge badge-ghost">{unitLabel(product.unit)}</span>
              </div>
            </div>
          </div>

          <div className="sm:text-right">
            <p className="text-xs text-base-content/50">আজকের দাম</p>
            <p className="text-3xl font-bold">{formatPrice(product.today)}</p>
            <div className="mt-1">
              <ChangeBadge change={product.change} />
            </div>
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section>
        <h2 className="mb-3 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "সর্বনিম্ন দাম", value: stats.min, color: "text-success" },
            { label: "সর্বোচ্চ দাম", value: stats.max, color: "text-error" },
            { label: "গড় দাম", value: stats.avg, color: "text-primary" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-base-300 bg-base-100 p-4">
              <p className="text-xs text-base-content/55">{s.label}</p>
              <p className={`mt-1 text-lg font-bold sm:text-2xl ${s.color}`}>{formatPrice(s.value)}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          {compare.map((c) => (
            <div key={c.label} className="rounded-xl border border-base-300 bg-base-100 px-4 py-3">
              <p className="text-xs text-base-content/55">{c.label}</p>
              <p className="font-semibold">{formatPrice(c.value)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Market-wise prices */}
      <section>
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="flex flex-wrap gap-1.5">
            {divisions.map((d) => (
              <button
                key={d}
                onClick={() => setDivision(d)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  division === d ? "bg-primary text-primary-content" : "bg-base-100 text-base-content/70 hover:bg-base-300"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100">
          <table className="table table-sm">
            <thead>
              <tr className="text-xs text-base-content/60">
                <th>বিভাগ</th>
                <th>বাজার</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বোচ্চ</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={`${m.division}-${m.market}`} className="hover">
                  <td className="text-base-content/60">{m.division}</td>
                  <td className="font-medium">{m.market}</td>
                  <td className="text-right text-success">{formatPrice(m.min)}</td>
                  <td className="text-right text-error">{formatPrice(m.max)}</td>
                  <td className="text-right font-semibold">{formatPrice(Math.round((m.min + m.max) / 2))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
