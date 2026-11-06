"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import { parseNum } from "@/lib/format";
import ProductCard from "@/components/ProductCard";
import ProductSkeletons from "@/components/ProductSkeletons";
import BackHomeCta from "@/components/BackHomeCta";

type Sort = "default" | "asc" | "desc";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, categories, loading, error } = useProducts();
  const [sort, setSort] = useState<Sort>("default");

  const category = categories.find((c) => c.slug === slug);

  const list = useMemo(() => {
    const items = products.filter((p) => p.category === slug);
    // numeric sort (works even if a price arrives as a Bengali-digit string)
    if (sort === "asc") return [...items].sort((a, b) => parseNum(a.today) - parseNum(b.today));
    if (sort === "desc") return [...items].sort((a, b) => parseNum(b.today) - parseNum(a.today));
    return items;
  }, [products, slug, sort]);

  // Unknown category slug -> 404 page
  if (!category) notFound();

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-base-100 text-3xl shadow-sm">
            {category.icon}
          </span>
          {category.nameBn}
        </h1>

        <label className="flex items-center gap-2 text-sm text-base-content/70">
          সাজান:
          <span className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="select select-bordered select-sm appearance-none bg-base-100 pr-8 text-sm text-base-content"
            >
              <option value="default">ডিফল্ট</option>
              <option value="asc">দাম: কম থেকে বেশি</option>
              <option value="desc">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </span>
        </label>
      </div>

      <div className="mt-6">
        {loading ? (
          <ProductSkeletons count={6} />
        ) : error ? (
          <p className="py-16 text-center text-sm text-error">ডাটা লোড করা যায়নি। রিফ্রেশ করে আবার চেষ্টা করুন।</p>
        ) : list.length === 0 ? (
          <BackHomeCta title="এই ক্যাটাগরিতে কোনো পণ্য নেই" text="অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।" />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
