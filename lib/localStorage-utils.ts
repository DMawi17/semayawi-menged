// Utility functions for managing localStorage data

export interface Bookmark {
  url: string;
  title: string;
  timestamp: number;
}

export interface HistoryItem {
  url: string;
  title: string;
  timestamp: number;
  readCount: number;
}

// Bookmarks management
export function getBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];

  try {
    const bookmarks = localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error("Error reading bookmarks:", error);
    return [];
  }
}

export function addBookmark(url: string, title: string): void {
  const bookmarks = getBookmarks();
  const exists = bookmarks.some((b) => b.url === url);

  if (!exists) {
    bookmarks.unshift({
      url,
      title,
      timestamp: Date.now(),
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}

export function removeBookmark(url: string): void {
  const bookmarks = getBookmarks();
  const filtered = bookmarks.filter((b) => b.url !== url);
  localStorage.setItem("bookmarks", JSON.stringify(filtered));
}

export function isBookmarked(url: string): boolean {
  const bookmarks = getBookmarks();
  return bookmarks.some((b) => b.url === url);
}

export function clearAllBookmarks(): void {
  localStorage.removeItem("bookmarks");
}

// Reading history management
export function getReadingHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const history = localStorage.getItem("reading_history");
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error reading history:", error);
    return [];
  }
}

export function addToHistory(url: string, title: string): void {
  const history = getReadingHistory();
  const existingIndex = history.findIndex((h) => h.url === url);

  if (existingIndex >= 0) {
    // Update existing entry
    history[existingIndex].timestamp = Date.now();
    history[existingIndex].readCount += 1;
    // Move to top
    const item = history.splice(existingIndex, 1)[0];
    history.unshift(item);
  } else {
    // Add new entry
    history.unshift({
      url,
      title,
      timestamp: Date.now(),
      readCount: 1,
    });
  }

  // Keep only last 50 items
  const trimmed = history.slice(0, 50);
  localStorage.setItem("reading_history", JSON.stringify(trimmed));
}

export function removeFromHistory(url: string): void {
  const history = getReadingHistory();
  const filtered = history.filter((h) => h.url !== url);
  localStorage.setItem("reading_history", JSON.stringify(filtered));
}

export function clearAllHistory(): void {
  localStorage.removeItem("reading_history");
}

// View count management
export function getViewCount(postUrl: string): number {
  if (typeof window === "undefined") return 0;

  try {
    const viewsKey = `views_${postUrl}`;
    const storedValue = localStorage.getItem(viewsKey);
    const currentViews = parseInt(storedValue || "0", 10);

    // Prevent NaN from corrupted localStorage data
    return isNaN(currentViews) ? 0 : currentViews;
  } catch (error) {
    console.error("Error reading view count:", error);
    return 0;
  }
}

export function incrementViewCount(postUrl: string): number {
  const currentViews = getViewCount(postUrl);
  const newViews = currentViews + 1;

  try {
    const viewsKey = `views_${postUrl}`;
    localStorage.setItem(viewsKey, newViews.toString());
    return newViews;
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return currentViews;
  }
}

export function resetViewCount(postUrl: string): void {
  try {
    const viewsKey = `views_${postUrl}`;
    localStorage.removeItem(viewsKey);
  } catch (error) {
    console.error("Error resetting view count:", error);
  }
}

// Format timestamp to Amharic relative time
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `ከ${years} ${years === 1 ? "አመት" : "አመታት"} በፊት`;
  } else if (months > 0) {
    return `ከ${months} ${months === 1 ? "ወር" : "ወራት"} በፊት`;
  } else if (days > 0) {
    return `ከ${days} ${days === 1 ? "ቀን" : "ቀናት"} በፊት`;
  } else if (hours > 0) {
    return `ከ${hours} ${hours === 1 ? "ሰዓት" : "ሰዓቶች"} በፊት`;
  } else if (minutes > 0) {
    return `ከ${minutes} ${minutes === 1 ? "ደቂቃ" : "ደቂቃዎች"} በፊት`;
  } else {
    return "አሁን";
  }
}
