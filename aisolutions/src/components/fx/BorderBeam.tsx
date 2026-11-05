import { cn } from "@/lib/cn";

/** A light beam that travels around the border of its (relative, rounded) parent. */
export function BorderBeam({ className, duration = 8, colorFrom = "#8B5CF6", colorTo = "#22D3EE" }: { className?: string; duration?: number; colorFrom?: string; colorTo?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit] p-px", className)}
      style={{
        // Longhands must come after the shorthand, or the shorthand resets the composite mode
        // and the beam fills the whole card instead of only the border.
        mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
        style={{ animationDuration: `${duration}s`, background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 40deg, ${colorTo} 80deg, transparent 120deg, transparent 360deg)` }}
      />
    </div>
  );
}
