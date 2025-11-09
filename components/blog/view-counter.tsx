"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { track } from "@vercel/analytics";
import { incrementViewCount } from "@/lib/localStorage-utils";

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
    const newViews = incrementViewCount(postUrl);
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
