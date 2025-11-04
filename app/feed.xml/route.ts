import { source } from "@/lib/source";
import { siteConfig } from "@/config/site";
import { sortPosts } from "@/lib/utils";
import { getCategory } from "@/lib/categories";

export async function GET() {
  const allPosts = await source.getPages();
  const publishedPosts = allPosts.filter((post) => post.data.published !== false);
  const sortedPosts = sortPosts(publishedPosts).slice(0, 20); // Latest 20 posts

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <description>${escapeXml(siteConfig.description)}</description>
    <link>${siteConfig.url}</link>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>am-ET</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js</generator>
    ${sortedPosts
      .map((post) => {
        const category = getCategory(post.data.category);
        const postUrl = `${siteConfig.url}${post.url}`;
        const imageUrl = post.data.cover
          ? `${siteConfig.url}${post.data.cover}`
          : "";

        return `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <description>${escapeXml(post.data.description || "")}</description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.data.date).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(post.data.author || siteConfig.author)}</dc:creator>
      ${category ? `<category>${escapeXml(category.nameAmharic)}</category>` : ""}
      ${
        post.data.tags
          ? post.data.tags.map((tag: string) => `<category>${escapeXml(tag)}</category>`).join("\n      ")
          : ""
      }
      ${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg"/>` : ""}
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
