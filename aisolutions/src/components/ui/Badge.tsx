import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  violet: "border-violet/30 bg-violet/10 text-violet-soft",
  cyan: "border-cyan/30 bg-cyan/10 text-cyan-soft",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  neutral: "border-line bg-white/5 text-ink-muted",
};

export function Badge({ children, tone = "violet", className, dot }: { children: ReactNode; tone?: keyof typeof tones; className?: string; dot?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", tones[tone], className)}>
      {dot && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />}
      {children}
    </span>
  );
}
