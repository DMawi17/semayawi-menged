/**
 * Custom hook for pagination logic
 */

export interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
  currentPage: number;
}

export interface UsePaginationResult<T> {
  paginatedItems: T[];
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Hook for handling pagination logic
 */
export function usePagination<T>({
  items,
  itemsPerPage,
  currentPage,
}: UsePaginationProps<T>): UsePaginationResult<T> {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    paginatedItems,
    totalPages,
    startIndex,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

/**
 * Generate smart page numbers for pagination (show only relevant pages with ellipsis)
 * Example outputs:
 * - Page 1: [1, 2, 3, '...', 10]
 * - Page 5: [1, '...', 3, 4, 5, 6, 7, '...', 10]
 * - Page 10: [1, '...', 8, 9, 10]
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  delta: number = 2
): (number | string)[] {
  const range: (number | string)[] = [];

  // Always show first page
  range.push(1);

  // Calculate range around current page
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    // Add ellipsis before range if needed
    if (i === Math.max(2, currentPage - delta) && i > 2) {
      range.push("...");
    }

    range.push(i);

    // Add ellipsis after range if needed
    if (
      i === Math.min(totalPages - 1, currentPage + delta) &&
      i < totalPages - 1
    ) {
      range.push("...");
    }
  }

  // Always show last page (if more than 1 page)
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
}
