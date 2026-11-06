"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCategories, getProducts } from "@/lib/api";
import { FALLBACK_CATEGORIES } from "@/lib/constants";
import type { Category, Product } from "@/lib/types";

interface ProductsContextValue {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: boolean;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

// Fetches the data once for the whole app (navbar ticker, home, category, details).
export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([getProducts(), getCategories().catch(() => null)])
      .then(([p, c]) => {
        if (!alive) return;
        setProducts(p);
        if (c && c.length) setCategories(c);
      })
      .catch(() => alive && setError(true))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <ProductsContext.Provider value={{ products, categories, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
};
