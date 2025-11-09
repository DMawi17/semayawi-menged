import { categories, type Category } from "@/config/categories";

/**
 * Client-safe category utilities
 * These functions can be used in both client and server components
 */

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
