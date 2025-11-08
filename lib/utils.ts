import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { slug } from "github-slugger";
import { formatEthiopianDate } from "./ethiopian-date";

// Merge class names with tailwind-merge for conflict resolution
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a date into a human-readable format (Ethiopian calendar)
export function formatDate(input: string | number): string {
  return formatEthiopianDate(input);
}

// Sort posts by date in descending order
export function sortPosts<T extends { data: { date: string | Date } }>(
  posts: Array<T>
) {
  return posts.sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });
}

// Get all tags and count their occurrences
export function getAllTags<T extends { data: { published?: boolean; tags?: string[] } }>(
  posts: Array<T>
) {
  const tags: Record<string, number> = {};
  posts.forEach((post) => {
    if (post.data.published !== false) {
      post.data.tags?.forEach((tag) => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      });
    }
  });
  return tags;
}

// Sort tags by their count in descending order
export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

// Get posts that match a specific tag slug
export function getPostsByTagSlug<T extends { data: { tags?: string[] } }>(
  posts: Array<T>,
  tagSlug: string
) {
  return posts.filter((post) => {
    if (!post.data.tags) return false;
    const slugifiedTags = post.data.tags.map((tag) => slug(tag));
    return slugifiedTags.includes(tagSlug);
  });
}
