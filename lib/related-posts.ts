import type { BlogPost } from "@/types/blog";
import { getCategory } from "./categories";

/**
 * Get related posts based on shared tags and category
 * @param currentPost - The current post
 * @param allPosts - All available posts
 * @param limit - Maximum number of related posts to return
 * @returns Array of related posts sorted by relevance
 */
export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit: number = 3
): BlogPost[] {
  // Filter out current post and unpublished posts
  const otherPosts = allPosts.filter(
    (post) =>
      post.url !== currentPost.url && post.data.published !== false
  );

  // Get current post's category for comparison
  const currentCategory = getCategory(currentPost.data.category);

  // Score each post based on similarity
  const scoredPosts = otherPosts.map((post) => {
    let score = 0;

    // Same category gets highest score
    const postCategory = getCategory(post.data.category);
    if (currentCategory && postCategory && postCategory.id === currentCategory.id) {
      score += 10;
    }

    // Shared tags
    const currentTags = currentPost.data.tags || [];
    const postTags = post.data.tags || [];
    const sharedTags = currentTags.filter((tag: string) => postTags.includes(tag));
    score += sharedTags.length * 2;

    return { post, score };
  });

  // Sort by score (descending) and take top N
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0) // Only include posts with some relevance
    .slice(0, limit)
    .map((item) => item.post);
}

/**
 * Get previous and next posts based on date
 * @param currentPost - The current post
 * @param allPosts - All available posts
 * @returns Object with previous and next posts
 */
export function getAdjacentPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[]
): { previous: BlogPost | null; next: BlogPost | null } {
  // Filter and sort posts by date
  const publishedPosts = allPosts
    .filter((post) => post.data.published !== false)
    .sort((a, b) => {
      const dateA = new Date(a.data.date || 0).getTime();
      const dateB = new Date(b.data.date || 0).getTime();
      return dateB - dateA; // Most recent first
    });

  const currentIndex = publishedPosts.findIndex(
    (post) => post.url === currentPost.url
  );

  return {
    previous: currentIndex > 0 ? publishedPosts[currentIndex - 1] : null,
    next:
      currentIndex < publishedPosts.length - 1
        ? publishedPosts[currentIndex + 1]
        : null,
  };
}
