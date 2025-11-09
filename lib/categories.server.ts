import "server-only";
import { source } from "./source";
import { getCategory } from "./categories";

/**
 * Server-only category utilities
 * These functions use file system access and can only be used in server components
 */

/**
 * Get post count for a specific category
 */
export async function getCategoryPostCount(categoryId: string): Promise<number> {
  const posts = await source.getPages();
  const category = getCategory(categoryId);

  if (!category) {
    return 0;
  }

  return posts.filter((post) => {
    const postCategory = getCategory(post.category);
    return postCategory?.id === category.id && post.published;
  }).length;
}

/**
 * Get posts for a specific category
 */
export async function getPostsByCategory(categoryId: string) {
  const posts = await source.getPages();
  const category = getCategory(categoryId);

  if (!category) {
    return [];
  }

  return posts
    .filter((post) => {
      const postCategory = getCategory(post.category);
      return postCategory?.id === category.id && post.published;
    })
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
