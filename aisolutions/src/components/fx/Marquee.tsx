import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Infinite horizontal scroller that pauses on hover. Children are rendered twice for a seamless loop. */
export function Marquee({ children, reverse = false, className, speed = 40 }: { children: ReactNode; reverse?: boolean; className?: string; speed?: number }) {
  return (
    <div className={cn("group mask-fade-x flex overflow-hidden", className)}>
      <div
        className={cn("flex w-max shrink-0 items-center gap-4 pr-4 group-hover:[animation-play-state:paused]", reverse ? "animate-marquee-reverse" : "animate-marquee")}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        <div aria-hidden className="flex items-center gap-4">{children}</div>
      </div>
    </div>
  );
}
