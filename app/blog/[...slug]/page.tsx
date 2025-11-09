import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { getCategory } from "@/lib/categories";
import { siteConfig } from "@/config/site";
import { calculateReadingTime, formatReadingTimeAmharic } from "@/lib/reading-time";
import { getRelatedPosts, getAdjacentPosts } from "@/lib/related-posts";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { RelatedPosts } from "@/components/blog/related-posts";
import { PostNavigation } from "@/components/blog/post-navigation";
import { ShareButtons } from "@/components/blog/share-buttons";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { AuthorBio } from "@/components/blog/author-bio";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { BookmarkButton } from "@/components/blog/bookmark-button";
import { HistoryTracker } from "@/components/blog/history-tracker";
import { AudioPlayer } from "@/components/blog/audio-player";
import { Callout } from "@/components/mdx/callout";
import { Quote } from "@/components/mdx/quote";
import { Highlight } from "@/components/mdx/highlight";
import { useMDXComponents } from "@/mdx-components";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { DropCap } from "@/components/blog/DropCap";
import { ScrollToTop } from "@/components/mdx/scroll-to-top";
import { ErrorBoundary } from "@/components/error-boundary";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/json-ld";

// Lazy load heavy components that are below the fold
const Newsletter = dynamic(() => import("@/components/blog/newsletter").then(mod => ({ default: mod.Newsletter })), {
  loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />,
});

const Comments = dynamic(() => import("@/components/blog/comments").then(mod => ({ default: mod.Comments })), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
});

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

  const category = getCategory(post.category);
  const postUrl = `${siteConfig.url}${post.url}`;
  const imageUrl = post.cover ? `${siteConfig.url}${post.cover}` : undefined;

  return {
    title: post.title,
    description: post.description,
    authors: post.author ? [{ name: post.author }] : [{ name: siteConfig.author }],
    alternates: {
      canonical: postUrl,
      languages: {
        'am-ET': postUrl,
        'en-US': postUrl,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(), // TODO: Track actual modification time
      authors: [post.author || siteConfig.author],
      tags: post.tags,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: post.title,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
      url: postUrl,
      locale: "am-ET",
      alternateLocale: ["en-US"],
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
  const category = getCategory(post.category);
  const readingTime = calculateReadingTime(post.rawContent || "");

  // Get all posts for related posts and navigation
  const allPosts = await source.getPages();
  const relatedPosts = getRelatedPosts(post, allPosts, 3);
  const { previous, next } = getAdjacentPosts(post, allPosts);

  // Get all MDX components (including headings) and merge with custom components
  const mdxComponents = useMDXComponents({ Callout, Quote, Highlight, DropCap });

  // Prepare data for JSON-LD structured data
  const postUrl = `${siteConfig.url}${post.url}`;
  const imageUrl = post.data.cover
    ? `${siteConfig.url}${post.data.cover}`
    : `${siteConfig.url}/logo.png`;
  const breadcrumbItems = [
    { name: "መነሻ", url: siteConfig.url },
    { name: "ብሎግ", url: `${siteConfig.url}/blog` },
  ];

  if (category) {
    breadcrumbItems.push({
      name: category.nameAmharic,
      url: `${siteConfig.url}/blog?category=${category.id}`,
    });
  }

  breadcrumbItems.push({ name: post.data.title, url: postUrl });

  return (
    <>
      {/* JSON-LD Structured Data */}
      <ArticleJsonLd
        title={post.data.title}
        description={post.data.description || ""}
        datePublished={new Date(post.data.date).toISOString()}
        dateModified={new Date(post.data.date).toISOString()}
        authorName={post.data.author || siteConfig.author}
        authorUrl={siteConfig.links.personalSite}
        images={[imageUrl]}
        url={postUrl}
        keywords={post.data.tags || []}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Track reading history */}
      <HistoryTracker postUrl={post.url} postTitle={post.data.title} />

      <ReadingProgress />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex gap-8">
          {/* Main Content - Optimized for readability */}
          <div className="flex-1 min-w-0 max-w-4xl mx-auto xl:mx-0">
            {/* Breadcrumbs */}
            <Breadcrumbs
              category={post.data.category}
              postTitle={post.data.title}
            />

            <article className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-li:leading-relaxed">
          {/* Article Hero */}
          <div className="not-prose">
            <ArticleHero
              title={post.data.title}
              category={post.category}
              author={post.data.author || siteConfig.author}
              publishedAt={String(post.data.date)}
              readingTime={formatReadingTimeAmharic(readingTime.minutes)}
              coverImage={post.data.cover}
              description={post.data.description}
            />
          </div>

          {/* Audio Player - Full width below hero */}
          {post.data.audio && (
            <div className="mb-8 not-prose">
              <AudioPlayer
                audioUrl={post.data.audio}
                title={post.data.title}
              />
            </div>
          )}

          {/* Tags and Actions Row */}
          <div className="flex items-center justify-between gap-4 mb-8 not-prose">
            {/* Tags - Last 5 only */}
            {post.data.tags && post.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 flex-1">
                {post.data.tags.slice(-5).map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Bookmark Button */}
            <div className="shrink-0">
              <BookmarkButton postUrl={post.url} postTitle={post.data.title} />
            </div>
          </div>

          {/* Post Content */}
          <div className="mt-8">
            <ErrorBoundary>
              <MDX components={mdxComponents} />
            </ErrorBoundary>
          </div>

          {/* Share Buttons */}
          <div className="mt-12 not-prose">
            <ShareButtons
              title={post.data.title}
              url={`${siteConfig.url}${post.url}`}
              description={post.data.description}
            />
          </div>

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
              className="text-primary font-medium flex items-center gap-1 group/link hover:opacity-80 transition-opacity"
            >
              <svg
                className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              ወደ ብሎግ ተመለስ
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

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
