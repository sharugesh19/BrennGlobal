export const SkeletonBlock = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-ink/10 ${className}`} />
);

export const ProductCardSkeleton = () => (
  <div className="rounded-xl2 border border-ink/8 bg-white p-6">
    <SkeletonBlock className="mb-6 h-64 w-full rounded-xl" />
    <SkeletonBlock className="mb-3 h-5 w-2/3" />
    <SkeletonBlock className="h-4 w-full" />
  </div>
);

export const HeroSkeleton = () => (
  <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
    <div>
      <SkeletonBlock className="mb-4 h-4 w-40" />
      <SkeletonBlock className="mb-3 h-14 w-full" />
      <SkeletonBlock className="mb-8 h-5 w-4/5" />
      <div className="flex gap-4">
        <SkeletonBlock className="h-12 w-40 rounded-full" />
        <SkeletonBlock className="h-12 w-40 rounded-full" />
      </div>
    </div>
    <SkeletonBlock className="h-96 w-full rounded-xl2" />
  </div>
);
