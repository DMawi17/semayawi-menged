/**
 * Post sorting utilities
 */

export type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc";

interface PostWithData {
  data: {
    date: string | Date;
    title: string;
  };
}

/**
 * Sort posts by date in descending order (newest first)
 */
export function sortPostsByDate<T extends PostWithData>(posts: Array<T>): Array<T> {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });
}

/**
 * Sort posts by title in ascending order (A-Z)
 */
export function sortPostsByTitleAsc<T extends PostWithData>(posts: Array<T>): Array<T> {
  return [...posts].sort((a, b) => a.data.title.localeCompare(b.data.title));
}

/**
 * Sort posts by title in descending order (Z-A)
 */
export function sortPostsByTitleDesc<T extends PostWithData>(posts: Array<T>): Array<T> {
  return [...posts].sort((a, b) => b.data.title.localeCompare(a.data.title));
}

/**
 * Sort posts based on the given sort option
 */
export function sortPostsByOption<T extends PostWithData>(
  posts: Array<T>,
  sortOption: SortOption
): Array<T> {
  switch (sortOption) {
    case "date-desc":
      return sortPostsByDate(posts);
    case "date-asc":
      return sortPostsByDate(posts).reverse();
    case "title-asc":
      return sortPostsByTitleAsc(posts);
    case "title-desc":
      return sortPostsByTitleDesc(posts);
    default:
      return sortPostsByDate(posts);
  }
}
