"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    // TODO: Replace these with your own Giscus configuration
    // Visit https://giscus.app to get your configuration
    scriptElem.setAttribute("data-repo", "your-username/your-repo");
    scriptElem.setAttribute("data-repo-id", "your-repo-id");
    scriptElem.setAttribute("data-category", "Announcements");
    scriptElem.setAttribute("data-category-id", "your-category-id");
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "bottom");
    scriptElem.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
    scriptElem.setAttribute("data-lang", "en");

    ref.current.appendChild(scriptElem);
  }, [resolvedTheme]);

  // Theme change handler
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    if (!iframe) return;

    iframe.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: resolvedTheme === "dark" ? "dark" : "light",
          },
        },
      },
      "https://giscus.app"
    );
  }, [resolvedTheme]);

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">አስተያየቶች</h2>
      <div className="rounded-lg border bg-card p-6">
        <div ref={ref} />
        <noscript>
          <p className="text-sm text-muted-foreground">
            Please enable JavaScript to view the comments powered by Giscus.
          </p>
        </noscript>
      </div>
    </div>
  );
}
