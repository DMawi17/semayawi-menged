import Link from "next/link";
import Image from "next/image";
import { source } from "@/lib/source";
import { sortPosts } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { getFeaturedCategories, getCategoryPostCount } from "@/lib/categories";
import { HeroPost } from "@/components/home/hero-post";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { CategoryBadge } from "@/components/blog/category-badge";
import { Calendar } from "lucide-react";

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

  // Get categories and their post counts
  const categories = getFeaturedCategories();
  const postCounts: Record<string, number> = {};
  for (const category of categories) {
    postCounts[category.id] = await getCategoryPostCount(category.id);
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section with Featured Post */}
      {featuredPost && (
        <section className="mb-16">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wide">
            የተመረጠ ጽሁፍ
          </h2>
          <HeroPost
            post={{
              title: featuredPost.title,
              description: featuredPost.description,
              date: featuredPost.date,
              cover: featuredPost.cover,
              url: featuredPost.url,
              category: featuredPost.category,
            }}
          />
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
            className="text-primary hover:underline font-medium flex items-center gap-1"
          >
            ሁሉንም ተመልከት
            <svg
              className="w-4 h-4"
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
            const formattedDate = new Date(post.date).toLocaleDateString(
              "am-ET",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            );

            return (
              <article
                key={post.url}
                className="group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700"
              >
                <Link href={post.url}>
                  {post.cover && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <CategoryBadge categoryId={post.category} showIcon={false} />
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={new Date(post.date).toISOString()}>
                          {formattedDate}
                        </time>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
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
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/90 shadow-lg shadow-primary/25"
        >
          ተጨማሪ ያንብቡ
        </Link>
      </section>
    </main>
  );
}
