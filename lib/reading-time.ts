import readingTime from "reading-time";

export interface ReadingTimeResult {
  text: string;
  minutes: number;
  words: number;
}

/**
 * Calculate reading time for a given text content
 * @param content - The text content to analyze
 * @returns Reading time information (text, minutes, word count)
 */
export function calculateReadingTime(content: string): ReadingTimeResult {
  const stats = readingTime(content);

  return {
    text: stats.text,
    minutes: Math.ceil(stats.minutes),
    words: stats.words,
  };
}

/**
 * Format reading time in a human-readable way
 * @param minutes - Number of minutes
 * @returns Formatted string (e.g., "5 min read")
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return "1 min read";
  return `${minutes} min read`;
}

/**
 * Format reading time in Amharic
 * @param minutes - Number of minutes
 * @returns Formatted string in Amharic (e.g., "5 ደቂቃ")
 */
export function formatReadingTimeAmharic(minutes: number): string {
  if (minutes < 1) return "1 ደቂቃ";
  return `${minutes} ደቂቃ`;
}
