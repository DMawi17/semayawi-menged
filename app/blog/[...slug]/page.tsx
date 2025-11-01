import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { slug as slugger } from "github-slugger";

interface BlogPostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const posts = await source.getPages();
  return posts.map((post) => {
    const slug = post.info.path.replace(/\.mdx?$/, "");
    return {
      slug: slug.split("/"),
    };
  });
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await source.getPage(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.data.title,
    description: post.data.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await source.getPage(slug);

  if (!post) {
    notFound();
  }

  const MDX = post.body;

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-slate dark:prose-invert max-w-none">
        {/* Cover Image */}
        {post.data.cover && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.data.cover}
              alt={post.data.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Post Header */}
        <header className="mb-8 not-prose">
          <h1 className="text-4xl font-bold mb-4">{post.data.title}</h1>

          {post.data.description && (
            <p className="text-xl text-muted-foreground mb-4">
              {post.data.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={String(post.data.date)}>
              {formatDate(String(post.data.date))}
            </time>
          </div>

          {/* Tags */}
          {post.data.tags && post.data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.data.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${slugger(tag)}`}
                  className="inline-flex items-center rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="mt-8">
          <MDX />
        </div>

        {/* Back to Blog Link */}
        <div className="mt-12 pt-8 border-t not-prose">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            ← ወደ ብሎግ ተመለስ
          </Link>
        </div>
      </article>
    </main>
  );
}
