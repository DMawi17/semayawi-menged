import { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "danger" | "success" | "spiritual";
  title?: string;
  children: ReactNode;
}

const calloutConfig = {
  info: {
    emoji: "ℹ️",
    bgColor: "bg-gradient-to-r from-blue-50/80 to-sky-50/80 dark:from-blue-900/20 dark:to-sky-900/20",
    borderColor: "border-blue-500 dark:border-blue-400",
    titleColor: "text-blue-800 dark:text-blue-300",
  },
  warning: {
    emoji: "⚠️",
    bgColor: "bg-gradient-to-r from-yellow-50/80 to-amber-50/80 dark:from-yellow-900/20 dark:to-amber-900/20",
    borderColor: "border-yellow-500 dark:border-yellow-400",
    titleColor: "text-yellow-800 dark:text-yellow-300",
  },
  danger: {
    emoji: "🚨",
    bgColor: "bg-gradient-to-r from-red-50/80 to-rose-50/80 dark:from-red-900/20 dark:to-rose-900/20",
    borderColor: "border-red-500 dark:border-red-400",
    titleColor: "text-red-800 dark:text-red-300",
  },
  success: {
    emoji: "✅",
    bgColor: "bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20",
    borderColor: "border-green-500 dark:border-green-400",
    titleColor: "text-green-800 dark:text-green-300",
  },
  spiritual: {
    emoji: "🔥",
    bgColor: "bg-gradient-to-r from-purple-50/80 to-violet-50/80 dark:from-purple-900/20 dark:to-violet-900/20",
    borderColor: "border-purple-500 dark:border-purple-400",
    titleColor: "text-purple-800 dark:text-purple-300",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];

  return (
    <div className={`my-6 p-6 ${config.bgColor} border-l-4 ${config.borderColor} rounded-r-xl`}>
      <div className="flex items-start gap-4">
        <div className="flex items-center h-full">
          <span className="text-2xl flex-shrink-0">{config.emoji}</span>
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold text-lg mb-2 ${config.titleColor}`}>
              {title}
            </h4>
          )}
          <div className="text-[#4c4f69] dark:text-gray-200 leading-7">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
