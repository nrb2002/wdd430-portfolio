// projects/loading.tsx

export default function Loading() {
  return (
    <section>
      {/* Page title skeleton */}
      <div className="mb-4 h-9 w-64 animate-pulse rounded bg-gray-200" />

      {/* Page description skeleton */}
      <div className="mb-6 h-5 w-80 animate-pulse rounded bg-gray-200" />

      {/* Search and filter skeletons */}
      <div className="mb-8 space-y-4">
        {/* Search input */}
        <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />

        {/* Filter dropdown */}
        <div className="h-10 w-40 animate-pulse rounded-lg bg-gray-200" />
      </div>

      {/* Project cards */}
      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <article
            key={item}
            className="rounded-lg border p-4 shadow-sm"
          >
            {/* Project title */}
            <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />

            {/* Description */}
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Type */}
            <div className="mt-4 h-4 w-32 animate-pulse rounded bg-gray-200" />

            {/* Technologies */}
            <div className="mt-3 h-4 w-64 animate-pulse rounded bg-gray-200" />

            {/* Link */}
            <div className="mt-4 h-4 w-28 animate-pulse rounded bg-gray-200" />
          </article>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="mt-8 flex justify-center gap-4">
        <div className="h-10 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-20 animate-pulse rounded bg-gray-200" />
      </div>
    </section>
  );
}

