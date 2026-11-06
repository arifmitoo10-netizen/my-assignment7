"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/format";
import SocialButtons from "@/components/SocialButtons";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = safeRedirect(params.get("redirect"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Toast when a protected page redirected here
  useEffect(() => {
    if (params.get("reason") === "login-required") {
      toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, [params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দুটোই দিন";
      setError(msg);
      return toast.error(msg);
    }

    setLoading(true);
    setError("");
    const { error: err } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (err) {
      const msg = err.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
      setError(msg);
      return toast.error(msg);
    }
    toast.success("সাইন ইন সফল হয়েছে");
    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold">সাইন ইন করুন</h1>
      <p className="mt-1 text-sm text-base-content/60">আপনার অ্যাকাউন্টে প্রবেশ করুন।</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <label className="form-control">
          <span className="label-text mb-1 text-sm">ইমেইল</span>
          <input name="email" type="email" placeholder="you@example.com" className="input input-bordered w-full" autoComplete="email" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 text-sm">পাসওয়ার্ড</span>
          <input name="password" type="password" placeholder="••••••••" className="input input-bordered w-full" autoComplete="current-password" />
        </label>

        {error && <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>
      </form>

      <div className="divider my-5 text-xs text-base-content/50">অথবা</div>
      <SocialButtons callbackURL={redirect} />

      <p className="mt-6 text-center text-sm text-base-content/70">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="skeleton mx-auto h-96 w-full max-w-md" />}>
      <SignInForm />
    </Suspense>
  );
}
