export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex gap-8">
        {/* Main Content Skeleton */}
        <div className="flex-1 min-w-0 max-w-4xl mx-auto xl:mx-0">
          {/* Breadcrumbs Skeleton */}
          <div className="mb-6 flex items-center gap-2">
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
            <div className="h-4 w-4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          </div>

          {/* Hero Skeleton */}
          <div className="relative overflow-hidden rounded-lg mb-12 h-[250px] sm:h-[300px] md:h-[450px] bg-muted animate-pulse" />

          {/* Tags and Actions Skeleton */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex gap-2">
              <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
              <div className="h-8 w-24 bg-muted rounded-md animate-pulse" />
              <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-10 bg-muted rounded-md animate-pulse" />
              <div className="h-10 w-10 bg-muted rounded-md animate-pulse" />
            </div>
          </div>

          {/* Content Skeleton */}
          <article className="prose prose-slate dark:prose-invert max-w-none prose-lg">
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* TOC Sidebar Skeleton */}
        <aside className="hidden xl:block w-64 shrink-0">
          <div className="sticky top-24 space-y-2">
            <div className="h-6 w-32 bg-muted rounded animate-pulse mb-4" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
