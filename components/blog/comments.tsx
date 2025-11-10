"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { MessageSquare, ExternalLink } from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { logDebug, logWarn } from "@/lib/logger";

// Cusdis configuration
const CUSDIS_CONFIG = {
  appId: process.env.NEXT_PUBLIC_CUSDIS_APP_ID || "",
  host: process.env.NEXT_PUBLIC_CUSDIS_HOST || "https://cusdis.com",
};

interface CusdisAttributes {
  "data-app-id": string;
  "data-page-id": string;
  "data-page-url": string;
  "data-page-title": string;
  "data-theme": string;
  "data-host"?: string;
}

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isConfigured, setIsConfigured] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    // Get page info on client side
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
      setPageTitle(document.title);
    }

    // Check if Cusdis is configured
    const configured = !!CUSDIS_CONFIG.appId;

    logDebug("Cusdis configuration loaded", {
      context: "Comments",
      data: {
        appId: CUSDIS_CONFIG.appId ? "configured" : "missing",
        host: CUSDIS_CONFIG.host,
        configured,
        refCurrent: !!ref.current,
      },
    });

    setIsConfigured(configured);
  }, []);

  useEffect(() => {
    if (!isConfigured || !ref.current || !pageUrl) return;

    // Clear any existing children to prevent duplicates
    ref.current.innerHTML = "";

    // Create Cusdis container div
    const cusdisDiv = document.createElement("div");
    cusdisDiv.id = "cusdis_thread";

    const attrs: CusdisAttributes = {
      "data-app-id": CUSDIS_CONFIG.appId,
      "data-page-id": pageUrl,
      "data-page-url": pageUrl,
      "data-page-title": pageTitle,
      "data-theme": resolvedTheme === "dark" ? "dark" : "light",
    };

    // Add host attribute if using self-hosted instance
    if (CUSDIS_CONFIG.host !== "https://cusdis.com") {
      attrs["data-host"] = CUSDIS_CONFIG.host;
    }

    // Set all attributes
    Object.entries(attrs).forEach(([key, value]) => {
      cusdisDiv.setAttribute(key, value);
    });

    ref.current.appendChild(cusdisDiv);

    // Load Cusdis script
    const scriptElem = document.createElement("script");
    scriptElem.src = `${CUSDIS_CONFIG.host}/js/cusdis.es.js`;
    scriptElem.async = true;
    scriptElem.defer = true;

    scriptElem.onload = () => {
      logDebug("Cusdis script loaded successfully", { context: "Comments" });
    };

    scriptElem.onerror = () => {
      logWarn("Failed to load Cusdis script", { context: "Comments" });
    };

    ref.current.appendChild(scriptElem);
  }, [isConfigured, resolvedTheme, pageUrl, pageTitle]);

  // Theme change handler
  useEffect(() => {
    if (!isConfigured || !pageUrl) return;

    // Reload Cusdis when theme changes
    const cusdisThread = document.getElementById("cusdis_thread");
    if (cusdisThread) {
      cusdisThread.setAttribute(
        "data-theme",
        resolvedTheme === "dark" ? "dark" : "light"
      );

      // Trigger Cusdis reload
      if (typeof window !== "undefined" && (window as any).CUSDIS) {
        (window as any).CUSDIS.renderTo(cusdisThread);
      }
    }
  }, [resolvedTheme, isConfigured, pageUrl]);

  return (
    <ErrorBoundary>
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          አስተያየቶች
        </h2>
        <div className="rounded-lg border bg-card p-6">
          {!isConfigured ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                የአስተያየት ክፍል አልተዋቀረም
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                To enable comments, you need to configure Cusdis with your App
                ID.
              </p>
              <div className="space-y-2 text-sm text-left max-w-2xl mx-auto bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Setup Instructions:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>
                    Sign up at{" "}
                    <a
                      href="https://cusdis.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      cusdis.com
                      <ExternalLink className="h-3 w-3" />
                    </a>{" "}
                    or self-host
                  </li>
                  <li>Create a website and get your App ID</li>
                  <li>
                    Add the following to your{" "}
                    <code className="bg-muted px-1 rounded">.env.local</code>{" "}
                    file:
                  </li>
                </ol>
                <pre className="bg-background p-3 rounded mt-2 text-xs overflow-x-auto">
                  {`NEXT_PUBLIC_CUSDIS_APP_ID=your-app-id-here
# Optional: for self-hosted Cusdis
NEXT_PUBLIC_CUSDIS_HOST=https://your-cusdis-instance.com`}
                </pre>
              </div>
            </div>
          ) : (
            <>
              <div
                ref={ref}
                className="cusdis-container"
                style={{ minHeight: "200px", position: "relative", zIndex: 1 }}
              />
              <noscript>
                <p className="text-sm text-muted-foreground">
                  Please enable JavaScript to view the comments powered by
                  Cusdis.
                </p>
              </noscript>
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
