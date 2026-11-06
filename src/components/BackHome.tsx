import Link from "next/link";

export default function BackHome({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl">🧺</p>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-base-content/60">{text}</p>
      <Link href="/" className="btn btn-primary btn-sm mt-6 sm:btn-md">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
