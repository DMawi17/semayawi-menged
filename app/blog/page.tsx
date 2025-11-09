import Link from "next/link";
import Image from "next/image";
import { PostService } from "@/services/post.service";
import type { SortOption } from "@/lib/posts/sorting";
import { generatePageNumbers } from "@/hooks/usePagination";
import { SearchBar } from "@/components/blog/search-bar";
import { FilterBar } from "@/components/blog/filter-bar";
import { calculateReadingTime } from "@/lib/reading-time";
import { Clock } from "lucide-react";

const POSTS_PER_PAGE = 9;

interface BlogPageProps {
  searchParams: Promise<{ page?: string; q?: string; category?: string; sort?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.q || "";
  const categoryFilter = params.category || "all";
  const sortOption = (params.sort || "date-desc") as SortOption;

  // Fetch filtered, sorted, and paginated posts using PostService
  const { posts: paginatedPosts, totalPages, totalPosts, postCount } = await PostService.getFilteredPosts({
    searchQuery,
    categoryFilter,
    sortOption,
    page: currentPage,
    itemsPerPage: POSTS_PER_PAGE,
  });

  return (
    <main className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">ብሎግ ጽሑፎች</h1>
        <p className="text-muted-foreground mb-6">
          የመጽሐፍ ቅዱስ ሴቶች ታሪክ እና ትምህርቶች
        </p>
        <SearchBar />
        {searchQuery && (
          <p className="mt-4 text-sm text-muted-foreground">
            {totalPosts} ውጤት{totalPosts !== 1 ? "ዎች" : ""} ለ &ldquo;{searchQuery}&rdquo;
          </p>
        )}
      </div>

      {/* Filters */}
      <FilterBar postCount={postCount} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {paginatedPosts.map((post) => (
          <article
            key={post.url}
            className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
          >
            <Link href={post.url}>
              {post.data.cover && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.data.cover}
                    alt={post.data.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {post.data.title}
                </h2>
                {post.data.description && (
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                    {post.data.description}
                  </p>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Clock className="h-3 w-3" />
                  <span>{calculateReadingTime(post.rawContent || "").minutes} ደቂቃ</span>
                </div>
                {post.data.tags && post.data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.data.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              ← የቀድሞ
            </Link>
          )}

          <div className="flex items-center gap-1">
            {generatePageNumbers(currentPage, totalPages).map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="inline-flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
                  >
                    ...
                  </span>
                );
              }

              return (
                <Link
                  key={page}
                  href={`/blog?page=${page}`}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                    page === currentPage
                      ? "bg-primary text-primary-foreground"
                      : "border bg-background hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {page}
                </Link>
              );
            })}
          </div>

          {currentPage < totalPages && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              ቀጣይ →
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
