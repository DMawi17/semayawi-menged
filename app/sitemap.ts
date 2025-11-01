import { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { siteConfig } from "@/config/site";
import { getActiveCategories } from "@/lib/categories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages
  const routes = ["", "/blog", "/about", "/tags"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Category pages
  const categories = getActiveCategories();
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Blog posts
  const posts = await source.getPages();
  const postRoutes = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${baseUrl}${post.url}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...routes, ...categoryRoutes, ...postRoutes];
}
