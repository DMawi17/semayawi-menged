import Link from "next/link";
import Image from "next/image";
import { source } from "@/lib/source";
import { sortPosts } from "@/lib/utils";
import { SearchBar } from "@/components/blog/search-bar";
import { FilterBar } from "@/components/blog/filter-bar";

const POSTS_PER_PAGE = 9;

interface BlogPageProps {
  searchParams: Promise<{ page?: string; q?: string; category?: string; sort?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.q?.toLowerCase() || "";
  const categoryFilter = params.category || "all";
  const sortOption = params.sort || "date-desc";

  const posts = await source.getPages();
  const publishedPosts = posts.filter((post) => post.data.published !== false);

  // Filter by category
  let filteredPosts = categoryFilter !== "all"
    ? publishedPosts.filter((post) => post.data.category === categoryFilter)
    : publishedPosts;

  // Filter by search query
  filteredPosts = searchQuery
    ? filteredPosts.filter(
        (post) =>
          post.data.title.toLowerCase().includes(searchQuery) ||
          post.data.description?.toLowerCase().includes(searchQuery) ||
          post.data.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery)
          )
      )
    : filteredPosts;

  // Sort posts
  const sortedPosts = sortOption.startsWith("date")
    ? sortPosts(filteredPosts)
    : filteredPosts.sort((a, b) => {
        if (sortOption === "title-asc") {
          return a.data.title.localeCompare(b.data.title);
        } else {
          return b.data.title.localeCompare(a.data.title);
        }
      });

  // Reverse if descending date sort is not default
  const finalPosts = sortOption === "date-asc" ? [...sortedPosts].reverse() : sortedPosts;

  // Calculate post counts for filters
  const postCount = {
    all: publishedPosts.length,
    byCategory: publishedPosts.reduce((acc, post) => {
      const cat = post.data.category || "uncategorized";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  const totalPages = Math.ceil(finalPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = finalPosts.slice(startIndex, endIndex);

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
            {finalPosts.length} ውጤት{finalPosts.length !== 1 ? "ዎች" : ""} ለ &ldquo;{params.q}&rdquo;
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
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.data.title}
                </h2>
                {post.data.description && (
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.data.description}
                  </p>
                )}
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}
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
