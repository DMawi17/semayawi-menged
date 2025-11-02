"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  postUrl: string;
}

export function ViewCounter({ postUrl }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Increment view count
    const viewsKey = `views_${postUrl}`;
    const currentViews = parseInt(localStorage.getItem(viewsKey) || "0");
    const newViews = currentViews + 1;
    localStorage.setItem(viewsKey, newViews.toString());
    setViews(newViews);

    // TODO: In production, you'd want to send this to an analytics service
    // or your own API endpoint to track views across users
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
