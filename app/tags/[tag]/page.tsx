import Link from "next/link";
import Image from "next/image";
import { source } from "@/lib/source";
import { sortPosts, getAllTags } from "@/lib/utils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await source.getPages();
  const publishedPosts = posts.filter((post) => post.data.published !== false);
  const tags = getAllTags(publishedPosts);

  return Object.keys(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Posts tagged "${decodedTag}"`,
    description: `Browse all posts tagged with ${decodedTag}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const allPosts = await source.getPages();
  const publishedPosts = allPosts.filter(
    (post) => post.data.published !== false
  );

  // Filter posts by the decoded tag
  const filteredPosts = publishedPosts.filter((post) =>
    post.data.tags?.includes(decodedTag)
  );
  const sortedPosts = sortPosts(filteredPosts);

  if (sortedPosts.length === 0) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12">
        <Link
          href="/tags"
          className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block"
        >
          ← ሁሉም መለያዎች
        </Link>
        <h1 className="text-4xl font-bold mb-2">#{decodedTag}</h1>
        <p className="text-muted-foreground">
          {sortedPosts.length} ጽሑፍ{sortedPosts.length !== 1 ? "ች" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPosts.map((post) => (
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
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.data.description}
                  </p>
                )}
                {post.data.tags && post.data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.data.tags.slice(0, 3).map((tagName) => (
                      <span
                        key={tagName}
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          tagName === decodedTag
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {tagName}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
