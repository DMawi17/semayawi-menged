import { source } from "@/lib/source";
import { sortPostsByOption, type SortOption } from "@/lib/posts/sorting";
import { filterPosts } from "@/hooks/useFilteredPosts";
import type { BlogPost } from "@/types/blog";

/**
 * Service class for handling blog post data fetching and operations
 */
export class PostService {
  /**
   * Fetch all posts from the content source
   */
  static async getAllPosts(): Promise<BlogPost[]> {
    return await source.getPages();
  }

  /**
   * Fetch only published posts
   */
  static async getPublishedPosts(): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter((post) => post.data.published !== false);
  }

  /**
   * Fetch posts with filtering, sorting, and pagination
   */
  static async getFilteredPosts({
    searchQuery = "",
    categoryFilter = "all",
    sortOption = "date-desc" as SortOption,
    page = 1,
    itemsPerPage = 9,
  }: {
    searchQuery?: string;
    categoryFilter?: string;
    sortOption?: SortOption;
    page?: number;
    itemsPerPage?: number;
  }) {
    const posts = await this.getAllPosts();

    // Filter posts
    const { filteredPosts, postCount } = filterPosts(
      posts,
      searchQuery.toLowerCase(),
      categoryFilter
    );

    // Sort posts
    const sortedPosts = sortPostsByOption(filteredPosts, sortOption);

    // Calculate pagination
    const totalPages = Math.ceil(sortedPosts.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      totalPosts: sortedPosts.length,
      totalPages,
      currentPage: page,
      postCount,
    };
  }

  /**
   * Fetch a single post by slug
   */
  static async getPostBySlug(slug: string[]): Promise<BlogPost | undefined> {
    const posts = await this.getAllPosts();
    const slugPath = slug.join("/");
    return posts.find((post) => post.url === `/blog/${slugPath}`);
  }

  /**
   * Fetch featured posts
   */
  static async getFeaturedPosts(limit?: number): Promise<BlogPost[]> {
    const posts = await this.getPublishedPosts();
    const featured = posts.filter((post) => post.data.featured === true);
    return limit ? featured.slice(0, limit) : featured;
  }

  /**
   * Fetch posts by category
   */
  static async getPostsByCategory(categoryId: string): Promise<BlogPost[]> {
    const posts = await this.getPublishedPosts();
    const { filteredPosts } = filterPosts(posts, "", categoryId);
    return filteredPosts;
  }

  /**
   * Fetch recent posts
   */
  static async getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
    const posts = await this.getPublishedPosts();
    const sorted = sortPostsByOption(posts, "date-desc");
    return sorted.slice(0, limit);
  }
}
