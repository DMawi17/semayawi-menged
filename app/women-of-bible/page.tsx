import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getCategoryBySlug, getPostsByCategory } from "@/lib/categories";
import { CategoryBadge } from "@/components/blog/category-badge";
import { Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const category = getCategoryBySlug("women-of-bible");

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: category.nameAmharic,
    description: category.descriptionAmharic,
    openGraph: {
      title: category.nameAmharic,
      description: category.descriptionAmharic,
      type: "website",
    },
  };
}

export default async function WomenOfBiblePage() {
  const category = getCategoryBySlug("women-of-bible");

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id);

  return (
    <main className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Category Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center mb-4">
          <div
            className="text-6xl p-6 rounded-2xl"
            style={{ backgroundColor: `${category.color}20` }}
          >
            {category.icon}
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">{category.nameAmharic}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {category.descriptionAmharic}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <span>{posts.length} ጽሁፎች</span>
        </div>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            በዚህ ምድብ ውስጥ ገና ምንም ጽሁፍ የለም።
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString(
              "am-ET",
              {
                year: "numeric",
                month: "long",
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
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <CategoryBadge
                        categoryId={post.category}
                        showIcon={false}
                      />
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={new Date(post.date).toISOString()}>
                          {formattedDate}
                        </time>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
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
      )}
    </main>
  );
}
