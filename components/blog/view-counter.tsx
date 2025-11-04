"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { track } from "@vercel/analytics";

interface ViewCounterProps {
  postUrl: string;
}

export function ViewCounter({ postUrl }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Track page view with Vercel Analytics
    track("blog_post_view", {
      post_url: postUrl,
    });

    // Keep local view count for display (localStorage for privacy-friendly local tracking)
    const viewsKey = `views_${postUrl}`;
    const currentViews = parseInt(localStorage.getItem(viewsKey) || "0");
    const newViews = currentViews + 1;
    localStorage.setItem(viewsKey, newViews.toString());
    setViews(newViews);
  }, [postUrl]);

  if (views === null) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Eye className="h-4 w-4" />
      <span>
        {views} {views === 1 ? "እይታ" : "እይታዎች"}
      </span>
    </div>
  );
}
