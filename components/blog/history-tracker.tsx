"use client";

import { useEffect } from "react";
import { addToHistory } from "@/lib/localStorage-utils";

interface HistoryTrackerProps {
  postUrl: string;
  postTitle: string;
}

export function HistoryTracker({ postUrl, postTitle }: HistoryTrackerProps) {
  useEffect(() => {
    // Add to reading history
    addToHistory(postUrl, postTitle);
  }, [postUrl, postTitle]);

  // This component doesn't render anything
  return null;
}
