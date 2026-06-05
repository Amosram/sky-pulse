export default function LoadingState() {
  return (
    <div className="space-y-4 w-full text-left">
      {/* Main Weather Card Skeleton */}
      <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-md">
        {/* Header Info Shimmer */}
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-2">
            {/* City Title */}
            <div className="animate-pulse bg-white/10 h-8 w-48 rounded-lg" />
            {/* Date and Condition Subtitle */}
            <div className="flex items-center gap-2">
              <div className="animate-pulse bg-white/10 h-4 w-4 rounded" />
              <div className="animate-pulse bg-white/10 h-4 w-36 rounded-md" />
            </div>
          </div>
          {/* Weather Icon Shimmer */}
          <div className="animate-pulse bg-white/10 h-12 w-12 rounded-xl shrink-0" />
        </div>

        {/* Main Temperature Hero Shimmer */}
        <div className="mb-6">
          <div className="animate-pulse bg-white/10 h-16 w-32 rounded-2xl" />
        </div>

        {/* Grid Stats Block Shimmer (Matches the exact 4 metric blocks) */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.03]"
            >
              {/* Icon slot */}
              <div className="animate-pulse bg-white/5 h-9 w-9 rounded-lg shrink-0" />
              {/* Text lines */}
              <div className="space-y-1.5 flex-1">
                <div className="animate-pulse bg-white/5 h-3 w-12 rounded" />
                <div className="animate-pulse bg-white/10 h-4 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Card Skeleton */}
      <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="animate-pulse bg-white/10 h-5 w-28 mb-4 rounded-lg" />
        <div className="grid grid-cols-5 gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white/5 border border-white/5 h-24 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}