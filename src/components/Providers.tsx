"use client";

import { Toaster } from "react-hot-toast";
import { ProductsProvider } from "@/context/ProductsContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProductsProvider>
      {children}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </ProductsProvider>
  );
}
