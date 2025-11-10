"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Trash2, X } from "lucide-react";
import {
  getBookmarks,
  removeBookmark,
  clearAllBookmarks,
  formatRelativeTime,
  type Bookmark as BookmarkType,
} from "@/lib/localStorage-utils";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBookmarks(getBookmarks());
    setLoading(false);
  }, []);

  const handleRemove = (url: string) => {
    removeBookmark(url);
    setBookmarks(getBookmarks());
  };

  const handleClearAll = () => {
    if (window.confirm("እርግጠኛ ነዎት ሁሉንም ምልክቶች መሰረዝ ይፈልጋሉ? (Are you sure you want to clear all bookmarks?)")) {
      clearAllBookmarks();
      setBookmarks([]);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">በመጫን ላይ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Bookmark className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">የተቀመጡ ጽሑፎች</h1>
            <p className="text-muted-foreground">
              {bookmarks.length} {bookmarks.length === 1 ? "ጽሁፍ" : "ጽሑፎች"}
            </p>
          </div>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-destructive text-destructive bg-background hover:bg-destructive hover:text-destructive-foreground transition-colors text-sm font-medium cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            ሁሉንም ሰርዝ
          </button>
        )}
      </div>

      {/* Empty State */}
      {bookmarks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed rounded-lg">
          <Bookmark className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold mb-2">ምንም የተቀመጡ ጽሑፎች የሉም</h2>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            ለኋላ ምጣኔ ለማስቀመጥ በማንኛውም የብሎግ ጽሑፍ ላይ የመዝገብ አዝራሩን ይጫኑ።
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            ጽሑፎችን ያስሱ
          </Link>
        </div>
      )}

      {/* Bookmarks List */}
      {bookmarks.length > 0 && (
        <div className="grid gap-6">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.url}
              className="group relative rounded-lg border bg-card p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <Link
                  href={bookmark.url}
                  className="flex-1 min-w-0"
                >
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {bookmark.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{formatRelativeTime(bookmark.timestamp)}</span>
                  </div>
                </Link>

                <button
                  onClick={() => handleRemove(bookmark.url)}
                  className="flex-shrink-0 h-11 w-11 rounded-lg border border-destructive text-destructive bg-background hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Remove bookmark"
                  title="ምልክት አስወግድ"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to Blog Link */}
      <div className="mt-12 pt-8 border-t">
        <Link
          href="/blog"
          className="text-primary font-medium flex items-center gap-1 group/link hover:opacity-80 transition-opacity"
        >
          <svg
            className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          ወደ ብሎግ ይመለሱ
        </Link>
      </div>
    </div>
  );
}
