import { ReactNode } from "react";
import { AlertTriangle, Info, CheckCircle, Sparkles } from "lucide-react";

interface HighlightProps {
  type?: "info" | "warning" | "success" | "emphasis";
  children: ReactNode;
}

const highlightConfig = {
  info: {
    icon: Info,
    bg: "bg-blue-100/60 dark:bg-blue-950/40",
    text: "text-blue-900 dark:text-blue-100",
    border: "border-blue-300 dark:border-blue-700",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-yellow-100/60 dark:bg-yellow-950/40",
    text: "text-yellow-900 dark:text-yellow-100",
    border: "border-yellow-300 dark:border-yellow-700",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-green-100/60 dark:bg-green-950/40",
    text: "text-green-900 dark:text-green-100",
    border: "border-green-300 dark:border-green-700",
    iconColor: "text-green-600 dark:text-green-400",
  },
  emphasis: {
    icon: Sparkles,
    bg: "bg-purple-100/60 dark:bg-purple-950/40",
    text: "text-purple-900 dark:text-purple-100",
    border: "border-purple-300 dark:border-purple-700",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
};

export function Highlight({ type = "info", children }: HighlightProps) {
  const config = highlightConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`my-4 inline-flex items-start gap-2 rounded-md border px-3 py-2 ${config.bg} ${config.text} ${config.border}`}
    >
      <Icon className={`h-4 w-4 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
      <span className="text-sm font-medium leading-relaxed">{children}</span>
    </div>
  );
}
