"use client";

import { useMemo } from "react";
import { useProducts } from "@/context/ProductsContext";
import ProductCard from "./ProductCard";
import ProductSkeletons from "./ProductSkeletons";

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 pt-8">
      <h2 className="text-xl font-bold">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-base-content/55">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function HomeSections() {
  const { products, loading, error } = useProducts();

  const risers = useMemo(
    () =>
      products
        .filter((p) => p.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6),
    [products]
  );
  const fallers = useMemo(
    () =>
      products
        .filter((p) => p.change.dir === "down")
        .sort((a, b) => a.change.pct - b.change.pct) // most negative first
        .slice(0, 6),
    [products]
  );

  const grid = (list: typeof products) => (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );

  if (error) {
    return (
      <p className="py-16 text-center text-sm text-error">
        ডাটা লোড করা যায়নি। পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।
      </p>
    );
  }

  return (
    <>
      <Section title={<span><span className="text-success">▲</span> আজ দাম বেড়েছে</span>}>
        {loading ? <ProductSkeletons /> : grid(risers)}
      </Section>

      <Section title={<span><span className="text-error">▼</span> আজ দাম কমেছে</span>}>
        {loading ? <ProductSkeletons /> : grid(fallers)}
      </Section>

      <Section id="সব-পণ্য" title="সব পণ্য" subtitle="যেকোনো পণ্যে ক্লিক করে বাজারভিত্তিক দাম দেখুন।">
        {loading ? <ProductSkeletons count={9} /> : grid(products)}
      </Section>
    </>
  );
}
