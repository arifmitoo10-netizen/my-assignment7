"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useProducts } from "@/context/ProductsContext";
import Ticker from "./Ticker";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { categories } = useProducts();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Date is set after mount so server and client HTML match.
  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date())
    );
  }, []);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => {
          toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
        },
      },
    });
  };

  const user = session?.user;
  const linkClass = (active: boolean) =>
    `whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium transition-colors ${
      active ? "bg-primary text-primary-content" : "text-base-content/70 hover:bg-base-200"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          {/* Row 1: logo + auth */}
          <div className="flex h-14 items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2.5" aria-label="বাজার দর হোম">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="বাজার দর লোগো" className="h-9 w-9 rounded-lg object-contain" />
              <span className="leading-tight">
                <span className="block text-base font-bold">বাজার দর</span>
                <span className="block min-h-[14px] text-[11px] text-base-content/55">{date}</span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {isPending ? (
                <div className="skeleton h-8 w-24 rounded-lg" />
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-lg border border-base-300 px-2 py-1 text-sm hover:bg-base-200"
                    aria-expanded={menuOpen}
                  >
                    {user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.image} alt="" className="h-6 w-6 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                    <span className="hidden max-w-[110px] truncate sm:inline">{user.name}</span>
                    <ChevronDown size={14} />
                  </button>
                  {menuOpen && (
                    <>
                      <button
                        aria-label="মেনু বন্ধ করুন"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setMenuOpen(false)}
                      />
                      <ul className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-base-300 bg-base-100 p-1.5 text-sm shadow-lg">
                        <li>
                          <Link
                            href="/profile"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-base-200"
                          >
                            <User size={14} /> প্রোফাইল
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleSignOut}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-error hover:bg-base-200"
                          >
                            <LogOut size={14} /> সাইন আউট
                          </button>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/signin" className="btn btn-ghost btn-sm">
                    সাইন ইন
                  </Link>
                  <Link href="/signup" className="btn btn-primary btn-sm">
                    সাইন আপ
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Row 2: category links */}
          <nav className="-mx-1 flex gap-1 overflow-x-auto pb-2" aria-label="ক্যাটাগরি">
            <Link href="/" className={linkClass(pathname === "/")}>
              সব পণ্য
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={linkClass(pathname === `/category/${c.slug}`)}
              >
                {c.icon} {c.nameBn}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <Ticker />
    </>
  );
}
