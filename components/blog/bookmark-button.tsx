"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  postUrl: string;
  postTitle: string;
}

export function BookmarkButton({ postUrl, postTitle }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if post is already bookmarked
    const checkBookmark = () => {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      setIsBookmarked(bookmarks.some((b: { url: string }) => b.url === postUrl));
    };
    checkBookmark();
  }, [postUrl]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    if (isBookmarked) {
      // Remove bookmark
      const updated = bookmarks.filter((b: { url: string }) => b.url !== postUrl);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      // Add bookmark
      const updated = [...bookmarks, { url: postUrl, title: postTitle, savedAt: new Date().toISOString() }];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      setIsBookmarked(true);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
        isBookmarked
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background hover:bg-accent border-border"
      }`}
      aria-label={isBookmarked ? "የተቀመጠውን ያስወግዱ" : "አስቀምጥ"}
      title={isBookmarked ? "የተቀመጠውን ያስወግዱ" : "ወደኋላ ለማንበብ አስቀምጥ"}
    >
      <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
      <span className="text-sm font-medium">
        {isBookmarked ? "ተቀምጧል" : "አስቀምጥ"}
      </span>
    </button>
  );
}
