import { getWelcomeEmailHtml } from "@/lib/email-templates";

export default function EmailPreview() {
  const htmlContent = getWelcomeEmailHtml("test@example.com");

  return (
    <div>
      <div className="p-4 bg-gray-100 border-b">
        <h1 className="text-xl font-bold">Email Preview</h1>
        <p className="text-sm text-gray-600">This is how the welcome email looks</p>
      </div>
      <iframe
        srcDoc={htmlContent}
        style={{
          width: "100%",
          height: "calc(100vh - 80px)",
          border: "none",
        }}
        title="Email Preview"
      />
    </div>
  );
}
