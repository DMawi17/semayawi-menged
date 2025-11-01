import { source } from "@/lib/source";
import { siteConfig } from "@/config/site";
import { getCategoryById } from "@/lib/categories";

export async function GET() {
  const posts = await source.getPages();
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 50); // Last 50 posts

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>am-ET</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
    ${publishedPosts
      .map((post) => {
        const category = getCategoryById(post.category);
        const pubDate = new Date(post.date).toUTCString();
        const postUrl = `${siteConfig.url}${post.url}`;

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description || ""}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>${category?.nameAmharic || post.category}</category>
      <author>${siteConfig.author}</author>
      ${
        post.cover
          ? `<enclosure url="${siteConfig.url}${post.cover}" type="image/jpeg" />`
          : ""
      }
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
