"use client";

import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { logError } from "@/lib/logger";

// Constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
const NOTIFICATION_TIMEOUT_MS = 5000; // Auto-hide notification after 5 seconds

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Auto-reset status and message after success/error (with proper cleanup)
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, NOTIFICATION_TIMEOUT_MS);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate name
    if (!name.trim()) {
      setStatus("error");
      setMessage("እባክዎ ስምዎን ያስገቡ።");
      return;
    }

    // Validate email format
    if (!email.trim()) {
      setStatus("error");
      setMessage("እባክዎ ኢሜል አድራሻዎን ያስገቡ።");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setStatus("error");
      setMessage("እባክዎ ትክክለኛ ኢሜል አድራሻ ያስገቡ።");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "እናመሰግናለን! ተመዝግበዋል።");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "የሆነ ችግር ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።");
      }
    } catch (error) {
      logError("Newsletter subscription error", { context: "Newsletter", data: error });
      setStatus("error");
      setMessage("የተጠበቀ ስህተት አጋጥሟል። እባክዎ እንደገና ይሞክሩ።");
    }
  };

  return (
    <div className="mt-12 p-6 rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-bold text-lg mb-2">አዲስ ጽሁፎችን ይቀበሉ</h3>
          <p className="text-sm text-muted-foreground mb-4">
            የመጽሐፍ ቅዱስ ጥናቶችን እና አዲስ ጽሁፎችን በቀጥታ ወደ ኢሜልዎ ይቀበሉ።
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="newsletter-name" className="block text-sm font-medium mb-1.5 text-left">
                  ስም
                </label>
                <input
                  id="newsletter-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ስምዎን ያስገቡ"
                  className="w-full h-11 px-4 rounded-lg border bg-white/60 dark:bg-white/5 focus:outline-none focus:border-primary/50 text-sm"
                  disabled={status === "loading"}
                  aria-invalid={status === "error"}
                  aria-describedby={message ? "newsletter-message" : undefined}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="block text-sm font-medium mb-1.5 text-left">
                  ኢሜል
                </label>
                <input
                  id="newsletter-email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ኢሜልዎን ያስገቡ"
                  className="w-full h-11 px-4 rounded-lg border bg-white/60 dark:bg-white/5 focus:outline-none focus:border-primary/50 text-sm"
                  disabled={status === "loading"}
                  aria-invalid={status === "error"}
                  aria-describedby={message ? "newsletter-message" : undefined}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              {/* Fixed height container to prevent layout shift */}
              <div className="flex-1 h-11 flex items-center" role="status" aria-live="polite">
                {message && (
                  <p
                    id="newsletter-message"
                    className={`text-sm transition-opacity ${
                      status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-11 px-8 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                {status === "loading" ? "በመላክ ላይ..." : "ይመዝገቡ"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
