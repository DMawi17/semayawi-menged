export function SectionDivider() {
  return (
    <div className="my-12 flex items-center justify-center">
      {/* Left line */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-slate-400 dark:via-slate-600 dark:to-slate-500" />

      {/* Cross icon */}
      <div className="mx-6 flex items-center justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-amber-500"
        >
          {/* Vertical bar */}
          <rect
            x="11"
            y="4"
            width="2"
            height="16"
            className="fill-current"
          />
          {/* Horizontal bar */}
          <rect
            x="4"
            y="11"
            width="16"
            height="2"
            className="fill-current"
          />
          {/* Outline */}
          <rect
            x="11"
            y="4"
            width="2"
            height="16"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
          <rect
            x="4"
            y="11"
            width="16"
            height="2"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Right line */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 to-slate-400 dark:via-slate-600 dark:to-slate-500" />
    </div>
  );
}
