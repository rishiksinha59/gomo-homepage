"use client";

/**
 * Next.js App Router Error Boundary
 * Catches runtime errors (e.g., Strapi unreachable, network failures)
 * and renders a graceful fallback UI instead of a white crash screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md space-y-6">
        <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-brand-dark">
          Something went wrong
        </h2>
        <p className="text-brand-dark/60 font-sans text-sm sm:text-base leading-relaxed">
          We&apos;re having trouble loading this page. This might be a temporary
          issue with our content server.
        </p>
        <button
          onClick={reset}
          className="bg-brand-dark hover:bg-brand-dark-hover text-white px-8 py-3 rounded-full font-medium transition-colors shadow-sm cursor-pointer"
        >
          Try again
        </button>
        <p className="text-xs text-brand-dark/40 font-sans">
          Error: {error.message || "Unknown error"}
        </p>
      </div>
    </div>
  );
}
