import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 px-6 py-8 sm:px-10 md:py-10">
      <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            আজকের বাজার · ৮টি ক্যাটাগরি
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম <span className="text-primary">এক নজরে</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-base-content/65 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলা — ঢাকা, চট্টগ্রাম, রাজশাহী, ময়মনসিংহ, খুলনা ও
            সিলেটের বাজারভিত্তিক দাম এবং দৈনিক ওঠানামা এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm mt-6 gap-2 sm:btn-md">
            সব দাম দেখুন
            <ArrowDown size={16} />
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/banner.png" alt="তাজা সবজির ঝুড়ি" className="max-h-56 w-auto object-contain md:max-h-64" />
        </div>
      </div>
    </section>
  );
}
