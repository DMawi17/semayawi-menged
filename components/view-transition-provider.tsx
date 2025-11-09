"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * View Transitions API Provider
 * Provides smooth page transitions using the native View Transitions API
 */
export function ViewTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Only trigger transition if pathname actually changed
    if (previousPathname.current !== pathname) {
      // Check if browser supports View Transitions API
      if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.startViewTransition(() => {
          // The transition happens automatically
          previousPathname.current = pathname;
        });
      } else {
        previousPathname.current = pathname;
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
