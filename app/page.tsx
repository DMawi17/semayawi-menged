import Link from "next/link";
import Image from "next/image";
import { source } from "@/lib/source";
import { sortPosts } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { getFeaturedCategories } from "@/lib/categories";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { CategoryBadge } from "@/components/blog/category-badge";
import { formatEthiopianDate } from "@/lib/ethiopian-date";
import { calculateReadingTime, formatReadingTimeAmharic } from "@/lib/reading-time";

export default async function Home() {
  const posts = await source.getPages();
  const publishedPosts = posts.filter((post) => post.published !== false);
  const sortedPosts = sortPosts(publishedPosts);

  // Get featured post (first one marked as featured, or most recent)
  const featuredPost =
    publishedPosts.find((post) => post.featured) || sortedPosts[0];

  // Get recent posts (excluding featured)
  const recentPosts = sortedPosts
    .filter((post) => post.url !== featuredPost?.url)
    .slice(0, 6);

  // Get categories and their post counts (optimized: calculate from already-fetched posts)
  const categories = getFeaturedCategories();
  const postCounts: Record<string, number> = {};
  for (const category of categories) {
    postCounts[category.id] = publishedPosts.filter((post) => {
      const postCategory = post.category === category.id ||
                           post.category === category.slug ||
                           post.category === category.nameAmharic;
      return postCategory;
    }).length;
  }

  // Calculate reading time for featured post
  const featuredPostReadingTime = featuredPost
    ? calculateReadingTime(featuredPost.rawContent || "")
    : null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section with Featured Post */}
      {featuredPost && featuredPost.cover && (
        <section className="mb-16">
          <h2 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wide">
            የተመረጠ ጽሁፍ
          </h2>
          <div className="[&>a>div]:h-[350px] [&>a>div]:sm:h-[450px] [&>a>div]:md:h-[600px]">
            <ArticleHero
              title={featuredPost.title}
              category={featuredPost.category}
              author={featuredPost.author || siteConfig.author}
              publishedAt={String(featuredPost.date)}
              readingTime={formatReadingTimeAmharic(featuredPostReadingTime?.minutes || 0)}
              coverImage={featuredPost.cover}
              description={featuredPost.description}
              href={featuredPost.url}
              disableCategoryLink={true}
            />
          </div>
        </section>
      )}

      {/* Categories Showcase */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">ምድቦች</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            የመጽሐፍ ቅዱስ ታሪኮች፣ የቤተክርስቲያን ታሪክ እና መንፈሳዊ ትምህርቶች
          </p>
        </div>
        <CategoryShowcase categories={categories} postCounts={postCounts} />
      </section>

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">የቅርብ ጊዜ ጽሑፎች</h2>
          <Link
            href="/blog"
            className="hidden md:flex text-primary font-medium items-center gap-1 group/link hover:opacity-80 transition-opacity"
          >
            ሁሉንም ተመልከት
            <svg
              className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => {
            const formattedDate = formatEthiopianDate(post.date);
            const readingTime = calculateReadingTime(post.rawContent || "");

            return (
              <article
                key={post.url}
                className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg [background-image:linear-gradient(to_bottom_right,rgba(237,223,214,0.3),rgba(237,223,214,0.6))] dark:[background-image:none]"
              >
                <Link href={post.url}>
                  {post.cover && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <CategoryBadge categoryId={post.category} showIcon={false} asLink={false} />
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time dateTime={new Date(post.date).toISOString()}>
                          {formattedDate}
                        </time>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{readingTime.minutes} ደቂቃ</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.description}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="mt-16 text-center bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 rounded-2xl p-12 border border-primary/20">
        <h2 className="text-3xl font-bold mb-4">ስለ {siteConfig.name}</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
          {siteConfig.descriptionAmharic}
        </p>
        <Link
          href="/about"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 shadow-lg shadow-primary/25"
        >
          ተጨማሪ ያንብቡ
        </Link>
      </section>
    </div>
  );
}
