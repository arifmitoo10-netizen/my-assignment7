"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("আগে সাইন ইন করুন", { id: "login-required" });
      router.replace("/signin?redirect=/profile/update");
    }
  }, [isPending, session, router]);

  // Pre-fill the form once the session is available
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setImage(session.user.image ?? "");
    }
  }, [session?.user]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");

    setLoading(true);
    const { error } = await authClient.updateUser({
      name: name.trim(),
      ...(image.trim() ? { image: image.trim() } : {}),
    });
    setLoading(false);

    if (error) return toast.error(error.message || "তথ্য আপডেট করা যায়নি");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
  }

  if (isPending || !session) {
    return <div className="skeleton mx-auto h-64 w-full max-w-md" aria-busy="true" />;
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
      <h1 className="text-xl font-bold">তথ্য আপডেট করুন</h1>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="form-control">
          <span className="label-text mb-1 text-sm">নাম</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="আপনার নাম"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 text-sm">
            ছবির লিংক <span className="text-base-content/40">(ঐচ্ছিক)</span>
          </span>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="url"
            placeholder="https://..."
            className="input input-bordered w-full"
          />
        </label>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
        </button>
        <Link href="/profile" className="btn btn-ghost btn-sm w-full">
          বাতিল করুন
        </Link>
      </form>
    </div>
  );
}
