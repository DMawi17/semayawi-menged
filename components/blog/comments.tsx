"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { MessageSquare, ExternalLink } from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";

// Cusdis configuration
const CUSDIS_CONFIG = {
  appId: process.env.NEXT_PUBLIC_CUSDIS_APP_ID || "",
  host: process.env.NEXT_PUBLIC_CUSDIS_HOST || "https://cusdis.com",
};

// Extend window type for Cusdis
declare global {
  interface Window {
    CUSDIS?: any;
  }
}

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isConfigured, setIsConfigured] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Cusdis is configured
    const configured = !!CUSDIS_CONFIG.appId;
    setIsConfigured(configured);

    if (configured) {
      console.log("Cusdis Config:", {
        appId: CUSDIS_CONFIG.appId,
        host: CUSDIS_CONFIG.host,
        currentUrl: typeof window !== "undefined" ? window.location.href : "N/A"
      });
    }
  }, []);

  useEffect(() => {
    if (!isConfigured || !ref.current) return;

    // Wait for theme to be ready
    if (!resolvedTheme) return;

    const loadCusdis = () => {
      if (!ref.current) return;

      // Clear existing content
      ref.current.innerHTML = "";

      // Create Cusdis div
      const cusdisDiv = document.createElement("div");
      cusdisDiv.id = "cusdis_thread";
      cusdisDiv.setAttribute("data-host", CUSDIS_CONFIG.host);
      cusdisDiv.setAttribute("data-app-id", CUSDIS_CONFIG.appId);
      cusdisDiv.setAttribute("data-page-id", window.location.pathname);
      cusdisDiv.setAttribute("data-page-url", window.location.href);
      cusdisDiv.setAttribute("data-page-title", document.title);
      cusdisDiv.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");

      ref.current.appendChild(cusdisDiv);

      // Load script if not already loaded
      if (!document.getElementById("cusdis-sdk")) {
        const script = document.createElement("script");
        script.id = "cusdis-sdk";
        script.src = `${CUSDIS_CONFIG.host}/js/cusdis.es.js`;
        script.async = true;

        script.onload = () => {
          console.log("Cusdis SDK loaded successfully");
          if (window.CUSDIS) {
            window.CUSDIS.renderTo(cusdisDiv);
          }
        };

        script.onerror = () => {
          console.error("Failed to load Cusdis SDK");
          setLoadError("Failed to load Cusdis script. Please check your connection.");
        };

        document.body.appendChild(script);
      } else if (window.CUSDIS) {
        // Script already loaded, initialize
        console.log("Cusdis SDK already loaded, rendering...");
        window.CUSDIS.renderTo(cusdisDiv);
      }
    };

    loadCusdis();
  }, [isConfigured, resolvedTheme]);

  // Handle theme changes
  useEffect(() => {
    if (!isConfigured || !resolvedTheme) return;

    const cusdisDiv = document.getElementById("cusdis_thread");
    if (cusdisDiv && window.CUSDIS) {
      cusdisDiv.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
      window.CUSDIS.setTheme(resolvedTheme === "dark" ? "dark" : "light");
    }
  }, [resolvedTheme, isConfigured]);

  return (
    <ErrorBoundary>
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          አስተያየቶች
        </h2>
        <div className="rounded-lg border bg-card p-6">
          {loadError && (
            <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">
              <p className="font-semibold">Error Loading Comments</p>
              <p className="text-sm">{loadError}</p>
            </div>
          )}
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
