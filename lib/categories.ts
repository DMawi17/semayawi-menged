import { categories, type Category } from "@/config/categories";
import { source } from "./source";

/**
 * Get all categories
 */
export function getAllCategories(): Category[] {
  return categories;
}

/**
 * Get a category by its ID
 */
export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

/**
 * Get a category by its slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

/**
 * Get a category by its Amharic name
 */
export function getCategoryByAmharicName(nameAmharic: string): Category | undefined {
  return categories.find((cat) => cat.nameAmharic === nameAmharic);
}

/**
 * Get a category by ID, slug, or Amharic name (flexible lookup)
 */
export function getCategory(identifier: string): Category | undefined {
  return (
    getCategoryById(identifier) ||
    getCategoryBySlug(identifier) ||
    getCategoryByAmharicName(identifier)
  );
}

/**
 * Get featured categories (shown on homepage)
 */
export function getFeaturedCategories(): Category[] {
  return categories.filter((cat) => cat.featured);
}

/**
 * Get active categories (not coming soon)
 */
export function getActiveCategories(): Category[] {
  return categories.filter((cat) => !cat.comingSoon);
}

/**
 * Get post count for a specific category
 */
export async function getCategoryPostCount(categoryId: string): Promise<number> {
  const posts = await source.getPages();
  return posts.filter((post) => post.category === categoryId && post.published).length;
}

/**
 * Get posts for a specific category
 */
export async function getPostsByCategory(categoryId: string) {
  const posts = await source.getPages();
  return posts
    .filter((post) => post.category === categoryId && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get featured posts (marked as featured in frontmatter)
 */
export async function getFeaturedPosts() {
  const posts = await source.getPages();
  return posts
    .filter((post) => post.featured && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get the most recent post from a category
 */
export async function getLatestPostByCategory(categoryId: string) {
  const posts = await getPostsByCategory(categoryId);
  return posts[0] || null;
}
