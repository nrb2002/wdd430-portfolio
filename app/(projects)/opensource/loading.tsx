// app/(projects)/open-source/loading.tsx

export default function Loading() {
  return (
    <section>
      {/* Page heading skeleton */}
      <div className="mb-4 h-9 w-64 animate-pulse rounded bg-gray-200" />

      {/* Project list */}
      <div className="space-y-6">
        {/* Project skeleton */}
        <article className="rounded-lg border p-4 shadow-sm">
          {/* Project title */}
          <div className="h-7 w-1/2 animate-pulse rounded bg-gray-200" />

          {/* Description */}
          <div className="mt-3 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Technologies */}
          <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-gray-200" />

          {/* Link */}
          <div className="mt-4 h-5 w-28 animate-pulse rounded bg-gray-200" />
        </article>

        {/* Second project skeleton */}
        <article className="rounded-lg border p-4 shadow-sm">
          <div className="h-7 w-1/2 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-gray-200" />

          <div className="mt-4 h-5 w-28 animate-pulse rounded bg-gray-200" />
        </article>
      </div>
    </section>
  );
}