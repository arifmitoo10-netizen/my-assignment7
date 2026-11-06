"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল দেখতে আগে সাইন ইন করুন", { id: "login-required" });
      router.replace("/signin?redirect=/profile");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-md space-y-4" aria-busy="true">
        <div className="skeleton h-28 w-28 rounded-full" />
        <div className="skeleton h-6 w-48" />
        <div className="skeleton h-4 w-64" />
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm sm:p-8">
      <h1 className="mb-6 text-left text-xl font-bold">আমার প্রোফাইল</h1>

      {user.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.image} alt={user.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
      ) : (
        <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-content">
          {user.name?.charAt(0).toUpperCase() || "U"}
        </span>
      )}

      <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
      <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-base-content/60">
        <Mail size={14} /> {user.email}
      </p>

      <Link href="/profile/update" className="btn btn-primary mt-6 w-full gap-2">
        <Pencil size={16} /> তথ্য আপডেট করুন
      </Link>
    </div>
  );
}
