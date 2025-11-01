import Link from "next/link";
import Image from "next/image";
import { source } from "@/lib/source";
import { sortPosts } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export default async function Home() {
  const posts = await source.getPages();
  const publishedPosts = posts.filter((post) => post.data.published !== false);
  const sortedPosts = sortPosts(publishedPosts);
  const recentPosts = sortedPosts.slice(0, 6);

  return (
    <main className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <section className="text-center mb-16 py-12">
        <h1 className="text-5xl font-bold mb-4 font-ethiopic">{siteConfig.name}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {siteConfig.description}
        </p>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">የቅርብ ጊዜ ጽሑፎች</h2>
          <Link
            href="/blog"
            className="text-primary hover:underline font-medium"
          >
            ሁሉንም ተመልከት →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
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
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.data.title}
                  </h3>
                  {post.data.description && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.data.description}
                    </p>
                  )}
                  {post.data.tags && post.data.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.data.tags.slice(0, 2).map((tag) => (
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
      </section>

      {/* About Section */}
      <section className="mt-16 text-center bg-muted rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">ስለ ብሎግ</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          የመጽሐፍ ቅዱስ ሴቶች ታሪክ በአማርኛ። እነዚህ ታሪኮች የእምነት፣ ድፍረት እና የእግዚአብሔርን ቃል የማክበር ምሳሌዎች ናቸው።
        </p>
        <Link
          href="/about"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          ተጨማሪ ያንብቡ
        </Link>
      </section>
    </main>
  );
}
