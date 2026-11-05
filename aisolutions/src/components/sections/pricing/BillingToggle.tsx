import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export type Billing = "monthly" | "yearly";

/** Segmented control with a spring-animated sliding pill. */
export function BillingToggle({ value, onChange }: { value: Billing; onChange: (b: Billing) => void }) {
  return (
    <div role="radiogroup" aria-label="Billing period" className="relative inline-flex rounded-full border border-line bg-surface/80 p-1 backdrop-blur">
      {(["monthly", "yearly"] as const).map((b) => (
        <button
          key={b}
          type="button"
          role="radio"
          aria-checked={value === b}
          onClick={() => onChange(b)}
          className={cn("relative z-10 flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors", value === b ? "text-white" : "text-ink-muted hover:text-ink")}
        >
          {value === b && (
            <motion.span layoutId="billing-pill" className="absolute inset-0 -z-10 rounded-full bg-brand-gradient shadow-glow" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
          )}
          {b}
          {b === "yearly" && (
            <span className={cn("rounded-full px-1.5 py-px text-[10px] font-semibold", value === b ? "bg-white/20 text-white" : "bg-success/15 text-success")}>-20%</span>
          )}
        </button>
      ))}
    </div>
  );
}
