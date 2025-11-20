import { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "danger" | "success" | "spiritual";
  title?: string;
  children: ReactNode;
}

const calloutConfig = {
  info: {
    emoji: "ℹ️",
    bgColor: "bg-gradient-to-r from-[#E8F4F5]/80 to-[#D4E9EB]/80 dark:from-[#57949F]/10 dark:to-[#57949F]/20",
    borderColor: "border-[#57949F] dark:border-[#57949F]",
    titleColor: "text-[#3d6870] dark:text-[#7AAFB8]",
  },
  warning: {
    emoji: "⚠️",
    bgColor: "bg-gradient-to-r from-[#F9EBE5]/80 to-[#F4DDD3]/80 dark:from-[#DD7F68]/10 dark:to-[#DD7F68]/20",
    borderColor: "border-[#DD7F68] dark:border-[#DD7F68]",
    titleColor: "text-[#B05940] dark:text-[#E89A82]",
  },
  danger: {
    emoji: "🚨",
    bgColor: "bg-gradient-to-r from-[#FCE8E8]/80 to-[#F8D6D6]/80 dark:from-red-900/10 dark:to-rose-900/20",
    borderColor: "border-[#d20f39] dark:border-red-400",
    titleColor: "text-[#a00c2e] dark:text-red-300",
  },
  success: {
    emoji: "✅",
    bgColor: "bg-gradient-to-r from-[#E5F3F0]/80 to-[#D4E9E5]/80 dark:from-emerald-900/10 dark:to-teal-900/20",
    borderColor: "border-[#4a9982] dark:border-emerald-400",
    titleColor: "text-[#2d7a63] dark:text-emerald-300",
  },
  spiritual: {
    emoji: "🔥",
    bgColor: "bg-gradient-to-r from-[#F3E8ED]/80 to-[#E9D6DF]/80 dark:from-[#B4637A]/10 dark:to-[#B4637A]/20",
    borderColor: "border-[#B4637A] dark:border-[#B4637A]",
    titleColor: "text-[#8d4d61] dark:text-[#C98399]",
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
