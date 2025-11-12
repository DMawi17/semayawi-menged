"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode } from "react";

interface ViewTransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}

/**
 * Link component with View Transitions API support
 * Wraps Next.js Link to trigger smooth page transitions
 */
export function ViewTransitionLink({
  href,
  children,
  onClick,
  ...props
}: ViewTransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Only handle left clicks without modifier keys
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.defaultPrevented
    ) {
      return;
    }

    // Prevent default navigation
    e.preventDefault();

    const targetUrl = href.toString();

    // Check if browser supports View Transitions API and user doesn't prefer reduced motion
    if (
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // Mark this as a page transition (not theme transition)
      document.documentElement.setAttribute('data-transition-type', 'page');

      const transition = (document as any).startViewTransition(() => {
        router.push(targetUrl);
      });

      // Clean up the attribute after transition finishes
      transition.finished.finally(() => {
        document.documentElement.removeAttribute('data-transition-type');
      });
    } else {
      // Fallback to regular navigation
      router.push(targetUrl);
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
