"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { MessageSquare, ExternalLink, Loader2 } from "lucide-react";
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
    CUSDIS_LOCALE?: any;
  }
}

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isConfigured, setIsConfigured] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const renderAttempted = useRef(false);

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

  // Load Cusdis script once with retry logic
  useEffect(() => {
    if (!isConfigured) return;
    if (document.getElementById("cusdis-sdk")) {
      setScriptLoaded(true);
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    const loadScript = (attempt = 1) => {
      const script = document.createElement("script");
      script.id = "cusdis-sdk";
      script.src = `${CUSDIS_CONFIG.host}/js/cusdis.es.js`;
      script.async = true;
      script.defer = true;

      // Add timestamp to bypass cache on retries
      if (attempt > 1) {
        script.src += `?t=${Date.now()}`;
      }

      script.onload = () => {
        console.log("✅ Cusdis SDK loaded successfully");
        console.log("Script URL:", `${CUSDIS_CONFIG.host}/js/cusdis.es.js`);
        setScriptLoaded(true);
        setIsLoading(false);
        setLoadError(null);
      };

      script.onerror = (error) => {
        console.error(`❌ Failed to load Cusdis SDK (attempt ${attempt}/3):`, error);
        console.error("Script URL:", `${CUSDIS_CONFIG.host}/js/cusdis.es.js`);

        // Remove failed script
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }

        // Retry up to 3 times with exponential backoff
        if (attempt < 3) {
          const delay = attempt * 1000; // 1s, 2s
          console.log(`Retrying in ${delay}ms...`);
          setTimeout(() => loadScript(attempt + 1), delay);
        } else {
          // All retries failed
          console.error("All retry attempts failed. Checking Railway deployment status...");
          setLoadError(
            `Unable to connect to Cusdis at ${CUSDIS_CONFIG.host}. ` +
            `The deployment may be down or returning 403 Forbidden errors.`
          );
          setIsLoading(false);
          setScriptLoaded(false);
        }
      };

      document.head.appendChild(script);
    };

    loadScript();

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById("cusdis-sdk");
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [isConfigured]);

  // Render Cusdis when script is loaded and theme is ready
  useEffect(() => {
    if (!isConfigured || !scriptLoaded || !resolvedTheme || !ref.current) return;
    if (renderAttempted.current) return;

    const initializeCusdis = () => {
      if (!ref.current) return;

      // Wait for CUSDIS object to be available
      const maxAttempts = 20;
      let attempts = 0;

      const checkAndRender = () => {
        attempts++;

        if (window.CUSDIS) {
          console.log("Cusdis SDK ready, initializing...");
          renderAttempted.current = true;

          // Clear existing content
          ref.current!.innerHTML = "";

          // Create Cusdis div
          const cusdisDiv = document.createElement("div");
          cusdisDiv.id = "cusdis_thread";
          cusdisDiv.setAttribute("data-host", CUSDIS_CONFIG.host);
          cusdisDiv.setAttribute("data-app-id", CUSDIS_CONFIG.appId);
          cusdisDiv.setAttribute("data-page-id", window.location.pathname);
          cusdisDiv.setAttribute("data-page-url", window.location.href);
          cusdisDiv.setAttribute("data-page-title", document.title);
          cusdisDiv.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");

          ref.current!.appendChild(cusdisDiv);

          // Render with a small delay to ensure DOM is ready
          setTimeout(() => {
            if (window.CUSDIS && cusdisDiv) {
              try {
                window.CUSDIS.renderTo(cusdisDiv);
                console.log("Cusdis rendered successfully");
              } catch (error) {
                console.error("Error rendering Cusdis:", error);
                setLoadError("Failed to initialize Cusdis. Please refresh the page.");
              }
            }
          }, 100);
        } else if (attempts < maxAttempts) {
          console.log(`Waiting for CUSDIS object... (attempt ${attempts}/${maxAttempts})`);
          setTimeout(checkAndRender, 100);
        } else {
          console.error("CUSDIS object not available after max attempts");
          setLoadError("Cusdis initialization timed out. Please refresh the page.");
        }
      };

      checkAndRender();
    };

    initializeCusdis();
  }, [isConfigured, scriptLoaded, resolvedTheme]);

  // Handle theme changes after initial render
  useEffect(() => {
    if (!isConfigured || !resolvedTheme || !renderAttempted.current) return;

    const updateTheme = () => {
      const cusdisDiv = document.getElementById("cusdis_thread");
      if (cusdisDiv && window.CUSDIS) {
        try {
          cusdisDiv.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
          if (typeof window.CUSDIS.setTheme === 'function') {
            window.CUSDIS.setTheme(resolvedTheme === "dark" ? "dark" : "light");
          }
        } catch (error) {
          console.error("Error updating Cusdis theme:", error);
        }
      }
    };

    updateTheme();
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
              <p className="font-semibold">⚠️ Error Loading Comments</p>
              <p className="text-sm mt-2">{loadError}</p>

              <div className="mt-3 p-3 bg-background rounded text-xs">
                <p className="font-semibold mb-2">🔧 How to fix this:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Check your Railway deployment is running at: <code className="bg-muted px-1 rounded text-xs">{CUSDIS_CONFIG.host}</code></li>
                  <li>Verify the deployment logs in Railway dashboard for errors</li>
                  <li>Ensure these environment variables are set in Railway:
                    <div className="mt-1 ml-4 p-2 bg-muted rounded">
                      <code>DB_PASSWORD</code><br/>
                      <code>JWT_SECRET</code><br/>
                      <code>ADMIN_USERNAME</code><br/>
                      <code>ADMIN_PASSWORD</code>
                    </div>
                  </li>
                  <li>Try redeploying your Cusdis service on Railway</li>
                  <li>Test the URL manually: <a
                    href={`${CUSDIS_CONFIG.host}/js/cusdis.es.js`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {CUSDIS_CONFIG.host}/js/cusdis.es.js
                  </a></li>
                </ol>
                <p className="mt-2 text-xs text-amber-600">
                  💡 Alternative: Use Cusdis Cloud at <a
                    href="https://cusdis.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >cusdis.com</a> while debugging
                </p>
              </div>
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
                    or self-host on Railway
                  </li>
                  <li>Create a website and get your App ID</li>
                  <li>
                    Add the following to your environment variables (Railway or{" "}
                    <code className="bg-muted px-1 rounded">.env.local</code>):
                  </li>
                </ol>
                <pre className="bg-background p-3 rounded mt-2 text-xs overflow-x-auto">
                  {`NEXT_PUBLIC_CUSDIS_APP_ID=your-app-id-here
# For self-hosted Cusdis (e.g., Railway deployment)
NEXT_PUBLIC_CUSDIS_HOST=https://your-cusdis-instance.railway.app`}
                </pre>
              </div>
            </div>
          ) : (
            <>
              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mr-2" />
                  <span className="text-sm text-muted-foreground">Loading comments...</span>
                </div>
              )}
              <div
                ref={ref}
                className="cusdis-container"
                style={{
                  minHeight: "300px",
                  position: "relative",
                  zIndex: 1,
                }}
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
