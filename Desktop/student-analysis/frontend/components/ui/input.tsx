import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string | null;
};

export function Input({ className, error, ...props }: Props) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500",
        error
          ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200 dark:border-rose-500/40 dark:focus:ring-rose-500/20"
          : "border-slate-200 focus:border-accent focus:ring-accent/20 dark:border-white/10 dark:focus:ring-accent/20",
        className
      )}
      {...props}
    />
  );
}
