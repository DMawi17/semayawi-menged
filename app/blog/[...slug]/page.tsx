import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { slug as slugger } from "github-slugger";
import { getCategoryById } from "@/lib/categories";
import { siteConfig } from "@/config/site";
import { calculateReadingTime } from "@/lib/reading-time";
import { getRelatedPosts, getAdjacentPosts } from "@/lib/related-posts";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { CategoryBadge } from "@/components/blog/category-badge";
import { ReadingTime } from "@/components/blog/reading-time";
import { RelatedPosts } from "@/components/blog/related-posts";
import { PostNavigation } from "@/components/blog/post-navigation";
import { ShareButtons } from "@/components/blog/share-buttons";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { AuthorBio } from "@/components/blog/author-bio";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { Comments } from "@/components/blog/comments";
import { Newsletter } from "@/components/blog/newsletter";
import { BookmarkButton } from "@/components/blog/bookmark-button";
import { ViewCounter } from "@/components/blog/view-counter";
import { Calendar, User } from "lucide-react";
import { Callout } from "@/components/mdx/callout";
import { Quote } from "@/components/mdx/quote";
import { Highlight } from "@/components/mdx/highlight";
import { useMDXComponents } from "@/mdx-components";

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

  const category = getCategoryById(post.category);
  const postUrl = `${siteConfig.url}${post.url}`;
  const imageUrl = post.cover ? `${siteConfig.url}${post.cover}` : undefined;

  return {
    title: post.title,
    description: post.description,
    authors: post.author ? [{ name: post.author }] : [{ name: siteConfig.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author || siteConfig.author],
      tags: post.tags,
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : undefined,
      url: postUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    keywords: [
      ...(post.tags || []),
      category?.name || "",
      category?.nameAmharic || "",
    ],
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await source.getPage(slug);

  if (!post) {
    notFound();
  }

  const MDX = post.body;
  const category = getCategoryById(post.category);
  const readingTime = calculateReadingTime(post.body.toString());

  // Get all posts for related posts and navigation
  const allPosts = await source.getPages();
  const relatedPosts = getRelatedPosts(post, allPosts, 3);
  const { previous, next } = getAdjacentPosts(post, allPosts);

  // Get all MDX components (including headings) and merge with custom components
  const mdxComponents = useMDXComponents({ Callout, Quote, Highlight });

  return (
    <>
      <ReadingProgress />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-4xl">
            {/* Breadcrumbs */}
            <Breadcrumbs
              category={post.data.category}
              postTitle={post.data.title}
            />

            <article className="prose prose-slate dark:prose-invert max-w-none">
          {/* Cover Image */}
          {post.data.cover && (
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.data.cover}
                alt={post.data.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-8 not-prose">
            {/* Category Badge */}
            {category && (
              <div className="mb-4">
                <CategoryBadge categoryId={post.category} showIcon />
              </div>
            )}

            <h1 className="text-4xl font-bold mb-4">{post.data.title}</h1>

            {post.data.description && (
              <p className="text-xl text-muted-foreground mb-6">
                {post.data.description}
              </p>
            )}

            {/* Post Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={String(post.data.date)}>
                  {formatDate(String(post.data.date))}
                </time>
              </div>

              {post.data.author && (
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>{post.data.author}</span>
                </div>
              )}

              <ReadingTime minutes={readingTime.minutes} />
              <ViewCounter postUrl={post.url} />
            </div>

            {/* Bookmark Button */}
            <div className="mb-6">
              <BookmarkButton postUrl={post.url} postTitle={post.data.title} />
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
            <MDX components={mdxComponents} />
          </div>

          {/* Share Buttons */}
          <div className="mt-12 pt-8 border-t not-prose">
            <ShareButtons
              title={post.data.title}
              url={`${siteConfig.url}${post.url}`}
              description={post.data.description}
            />
          </div>

          {/* Author Bio */}
          <AuthorBio author={post.data.author} />

          {/* Post Navigation */}
          <div className="not-prose">
            <PostNavigation previous={previous} next={next} />
          </div>

          {/* Related Posts */}
          <div className="not-prose">
            <RelatedPosts posts={relatedPosts} />
          </div>

          {/* Newsletter */}
          <div className="not-prose">
            <Newsletter />
          </div>

          {/* Comments */}
          <div className="not-prose">
            <Comments />
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
      </div>

      {/* Table of Contents Sidebar */}
      <aside className="hidden xl:block">
        <TableOfContents />
      </aside>
    </div>
  </div>
    </>
  );
}
