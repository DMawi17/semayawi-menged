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
      className="inline-flex items-center gap-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-2 min-h-[44px] text-sm font-medium transition-colors cursor-pointer"
      aria-label={isBookmarked ? "የተቀመጠውን ያስወግዱ" : "አስቀምጥ"}
      title={isBookmarked ? "የተቀመጠውን ያስወግዱ" : "ወደኋላ ለማንበብ አስቀምጥ"}
    >
      <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
      <span>
        {isBookmarked ? "ተቀምጧል" : "አስቀምጥ"}
      </span>
    </button>
  );
}
