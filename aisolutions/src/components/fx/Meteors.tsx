import { useMemo } from "react";
import { cn } from "@/lib/cn";

/** Diagonal light streaks falling across a section. */
export function Meteors({ count = 14, className }: { count?: number; className?: string }) {
  const meteors = useMemo(
    () => Array.from({ length: count }, () => ({ left: Math.random() * 100, delay: Math.random() * 6, duration: 3 + Math.random() * 5 })),
    [count],
  );
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <style>{`@keyframes meteor{0%{transform:translate3d(0,0,0) rotate(215deg);opacity:0}8%{opacity:1}70%{opacity:1}100%{transform:translate3d(-60vh,60vh,0) rotate(215deg);opacity:0}}`}</style>
      {meteors.map((m, i) => (
        <span
          key={i}
          className="absolute top-[-10%] h-px w-[90px] bg-gradient-to-r from-cyan to-transparent"
          style={{ left: `${m.left}%`, animation: `meteor ${m.duration}s linear ${m.delay}s infinite` }}
        />
      ))}
    </div>
  );
}
