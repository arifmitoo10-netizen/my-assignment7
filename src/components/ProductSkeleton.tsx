export default function ProductSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-base-300 bg-base-100 p-4">
          <div className="flex items-center gap-3">
            <div className="skeleton h-12 w-12 rounded-lg" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-28" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between border-t border-base-200 pt-3">
            <div className="space-y-2">
              <div className="skeleton h-3 w-14" />
              <div className="skeleton h-5 w-20" />
            </div>
            <div className="skeleton h-5 w-14" />
          </div>
        </div>
      ))}
    </div>
  );
}
