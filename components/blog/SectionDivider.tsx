export function SectionDivider() {
  return (
    <div className="my-12 flex items-center justify-center">
      {/* Left line */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent dark:via-slate-500" />

      {/* Christian Cross emoji */}
      <div className="mx-6 flex items-center justify-center">
        <span className="text-2xl text-slate-400 dark:text-slate-500">✝</span>
      </div>

      {/* Right line */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-400 to-transparent dark:via-slate-500" />
    </div>
  );
}
