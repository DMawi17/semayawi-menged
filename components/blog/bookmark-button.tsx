"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { isBookmarked as checkIsBookmarked, addBookmark, removeBookmark } from "@/lib/localStorage-utils";

interface BookmarkButtonProps {
  postUrl: string;
  postTitle: string;
}

export function BookmarkButton({ postUrl, postTitle }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if post is already bookmarked using centralized utility
    setIsBookmarked(checkIsBookmarked(postUrl));
  }, [postUrl]);

  const toggleBookmark = () => {
    if (isBookmarked) {
      // Remove bookmark using centralized utility
      removeBookmark(postUrl);
      setIsBookmarked(false);
    } else {
      // Add bookmark using centralized utility
      addBookmark(postUrl, postTitle);
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
