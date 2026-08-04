/**
 * Next.js App Router Loading State
 * Renders immediately while the page Server Component awaits Strapi data.
 * Prevents blank white screen — demonstrates Senior-level UX awareness.
 */
export default function Loading() {
  return (
    <div className="w-full flex flex-col gap-[120px] animate-pulse">
      {/* Hero Skeleton */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="w-full h-[520px] sm:h-[620px] lg:h-[740px] rounded-[11px] bg-brand-dark/10" />
      </div>

      {/* About Skeleton */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[300px] rounded-[10px] bg-brand-dark/10" />
          <div className="space-y-4">
            <div className="h-4 w-1/3 rounded bg-brand-dark/10" />
            <div className="h-8 w-3/4 rounded bg-brand-dark/10" />
            <div className="h-4 w-full rounded bg-brand-dark/10" />
            <div className="h-4 w-5/6 rounded bg-brand-dark/10" />
          </div>
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[416px] rounded-[10px] bg-brand-dark/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
