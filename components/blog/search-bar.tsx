"use client";

import { Search, X } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    startTransition(() => {
      if (query.trim()) {
        router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
      } else {
        router.push("/blog");
      }
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
    startTransition(() => {
      router.push("/blog");
    });
  };

  return (
    <div className="relative max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="ጽሑፍ ይፈልጉ..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full h-10 pl-10 pr-10 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full hover:bg-accent flex items-center justify-center transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      {isPending && (
        <div className="absolute top-full left-0 right-0 mt-2">
          <p className="text-xs text-muted-foreground">በመፈለግ ላይ...</p>
        </div>
      )}
    </div>
  );
}
