"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { MessageSquare, ExternalLink } from "lucide-react";

// Giscus configuration - Replace with your own values
const GISCUS_CONFIG = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO || "",
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "",
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "General",
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "",
  mapping: "pathname" as const,
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom" as const,
  lang: "en",
};

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if Giscus is configured
    const configured = !!(GISCUS_CONFIG.repo && GISCUS_CONFIG.repoId && GISCUS_CONFIG.categoryId);
    setIsConfigured(configured);

    if (!configured || !ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", GISCUS_CONFIG.repo);
    scriptElem.setAttribute("data-repo-id", GISCUS_CONFIG.repoId);
    scriptElem.setAttribute("data-category", GISCUS_CONFIG.category);
    scriptElem.setAttribute("data-category-id", GISCUS_CONFIG.categoryId);
    scriptElem.setAttribute("data-mapping", GISCUS_CONFIG.mapping);
    scriptElem.setAttribute("data-strict", GISCUS_CONFIG.strict);
    scriptElem.setAttribute("data-reactions-enabled", GISCUS_CONFIG.reactionsEnabled);
    scriptElem.setAttribute("data-emit-metadata", GISCUS_CONFIG.emitMetadata);
    scriptElem.setAttribute("data-input-position", GISCUS_CONFIG.inputPosition);
    scriptElem.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
    scriptElem.setAttribute("data-lang", GISCUS_CONFIG.lang);

    ref.current.appendChild(scriptElem);
  }, [resolvedTheme]);

  // Theme change handler
  useEffect(() => {
    if (!isConfigured) return;

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
  }, [resolvedTheme, isConfigured]);

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="h-6 w-6" />
        አስተያየቶች
      </h2>
      <div className="rounded-lg border bg-card p-6">
        {!isConfigured ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">የአስተያየት ክፍል አልተዋቀረም</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To enable comments, you need to configure Giscus with your GitHub repository.
            </p>
            <div className="space-y-2 text-sm text-left max-w-2xl mx-auto bg-muted/50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Setup Instructions:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Create a public GitHub repository (or use an existing one)</li>
                <li>Enable Discussions in your repository settings</li>
                <li>
                  Visit{" "}
                  <a
                    href="https://giscus.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    giscus.app
                    <ExternalLink className="h-3 w-3" />
                  </a>{" "}
                  to get your configuration
                </li>
                <li>Add the following to your <code className="bg-muted px-1 rounded">.env.local</code> file:</li>
              </ol>
              <pre className="bg-background p-3 rounded mt-2 text-xs overflow-x-auto">
{`NEXT_PUBLIC_GISCUS_REPO=username/repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id`}
              </pre>
            </div>
          </div>
        ) : (
          <>
            <div ref={ref} />
            <noscript>
              <p className="text-sm text-muted-foreground">
                Please enable JavaScript to view the comments powered by Giscus.
              </p>
            </noscript>
          </>
        )}
      </div>
    </div>
  );
}
