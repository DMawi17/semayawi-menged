"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // TODO: Integrate with your newsletter service (e.g., Mailchimp, ConvertKit, etc.)
    // This is a placeholder implementation
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("success");
      setMessage("አመሰግናለሁ! የደብዳቤ መላኪያ ዝርዝራችን ተቀላቅለዋል።");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("የሆነ ችግር ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።");
    }
  };

  return (
    <div className="mt-12 p-6 rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2">አዲስ ጽሁፎችን ይቀበሉ</h3>
          <p className="text-sm text-muted-foreground mb-4">
            የመጽሐፍ ቅዱስ ጥናቶችን እና አዲስ ጽሁፎችን በቀጥታ ወደ ኢሜልዎ ይቀበሉ።
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ኢሜልዎን ያስገቡ"
              required
              className="flex-1 h-10 px-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-10 px-6 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "በመላክ ላይ..." : "ይመዝገቡ"}
            </button>
          </form>
          {message && (
            <p
              className={`mt-2 text-sm ${
                status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
