import Link from "next/link";

export default function BackHomeCta({
  title = "কিছু পাওয়া যায়নি",
  text = "আপনি যে পাতাটি খুঁজছেন সেটি নেই।",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-dashed border-base-300 bg-base-100 px-6 py-14 text-center">
      <p className="text-5xl">🛒</p>
      <h2 className="mt-3 text-xl font-bold">{title}</h2>
      <p className="mt-1 text-sm text-base-content/60">{text}</p>
      <Link href="/" className="btn btn-primary btn-sm mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
