import { source } from "@/lib/source";
import { siteConfig } from "@/config/site";

export async function GET() {
  const allPosts = await source.getPages();
  const publishedPosts = allPosts.filter((post) => post.data.published !== false);

  // Collect all images from posts
  const images = publishedPosts
    .filter((post) => post.data.cover)
    .map((post) => {
      const postUrl = `${siteConfig.url}${post.url}`;
      const imageUrl = `${siteConfig.url}${post.data.cover}`;

      return {
        loc: postUrl,
        image: {
          loc: imageUrl,
          title: post.data.title,
          caption: post.data.description || post.data.title,
        },
      };
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${images
    .map(
      (item) => `
  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <image:image>
      <image:loc>${escapeXml(item.image.loc)}</image:loc>
      <image:title>${escapeXml(item.image.title)}</image:title>
      <image:caption>${escapeXml(item.image.caption)}</image:caption>
    </image:image>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
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
