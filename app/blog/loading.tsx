export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Search Bar Skeleton */}
      <div className="mb-8">
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="mb-8 flex gap-4">
        <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
      </div>

      {/* Posts Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <article
            key={i}
            className="overflow-hidden rounded-lg border bg-card"
          >
            {/* Image Skeleton */}
            <div className="relative h-48 w-full bg-muted animate-pulse" />

            {/* Content Skeleton */}
            <div className="p-5 space-y-3">
              {/* Badge and Meta */}
              <div className="flex items-center gap-3">
                <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded animate-pulse" />
                <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
