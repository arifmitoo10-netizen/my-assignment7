"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    const fail = (msg: string) => {
      setError(msg);
      toast.error(msg);
    };

    if (!name || !email || !password) return fail("সবগুলো ঘর পূরণ করুন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

    setLoading(true);
    setError("");
    const { error: err } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (err) return fail(err.message || "রেজিস্ট্রেশন করা যায়নি, আবার চেষ্টা করুন");

    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold">নতুন অ্যাকাউন্ট খুলুন</h1>
      <p className="mt-1 text-sm text-base-content/60">কয়েক সেকেন্ডেই রেজিস্ট্রেশন সম্পন্ন করুন।</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <label className="form-control">
          <span className="label-text mb-1 text-sm">নাম</span>
          <input name="name" type="text" placeholder="আপনার নাম" className="input input-bordered w-full" autoComplete="name" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 text-sm">ইমেইল</span>
          <input name="email" type="email" placeholder="you@example.com" className="input input-bordered w-full" autoComplete="email" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 text-sm">পাসওয়ার্ড</span>
          <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input input-bordered w-full" autoComplete="new-password" />
        </label>

        {error && <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "রেজিস্টার করুন"}
        </button>
      </form>

      <div className="divider my-5 text-xs text-base-content/50">অথবা</div>
      <SocialButtons callbackURL="/" />

      <p className="mt-6 text-center text-sm text-base-content/70">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
