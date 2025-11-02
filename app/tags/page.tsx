import Link from "next/link";
import { source } from "@/lib/source";
import { getAllTags, sortTagsByCount } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse blog posts by tags",
};

export default async function TagsPage() {
  const posts = await source.getPages();
  const publishedPosts = posts.filter((post) => post.data.published !== false);
  const tags = getAllTags(publishedPosts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">መለያዎች</h1>
        <p className="text-muted-foreground">
          ጽሑፎችን በመለያ አስስ
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        {sortedTags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="group relative inline-flex items-center gap-2 rounded-lg border bg-card p-4 transition-all hover:shadow-lg"
          >
            <span className="text-lg font-medium group-hover:text-primary transition-colors">
              {tag}
            </span>
            <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-primary/10 px-2 text-xs font-semibold text-primary">
              {tags[tag]}
            </span>
          </Link>
        ))}
      </div>

      {sortedTags.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          ምንም መለያዎች አልተገኙም።
        </p>
      )}
    </main>
  );
}
