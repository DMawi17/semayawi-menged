import { AlertCircle, Info, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "error" | "success" | "tip";
  title?: string;
  children: ReactNode;
}

const calloutConfig = {
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    title: "መረጃ",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-200 dark:border-yellow-800",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    title: "ማስጠንቀቂያ",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
    title: "ስህተት",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    iconColor: "text-green-600 dark:text-green-400",
    title: "ስኬት",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
    iconColor: "text-purple-600 dark:text-purple-400",
    title: "ምክር",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div className={`my-6 rounded-lg border-l-4 p-4 ${config.bg} ${config.border}`}>
      <div className="flex gap-3">
        <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
        <div className="flex-1">
          {title && <p className="font-semibold mb-2">{title}</p>}
          <div className="text-sm [&>p]:my-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
