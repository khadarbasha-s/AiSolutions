import { useEffect, useRef } from "react";
import { animate, AnimatePresence, motion } from "framer-motion";

const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

/** Price that tweens between values and flips its period label. */
export function AnimatedPrice({ value, period }: { value: number | null; period: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value ?? 0);

  useEffect(() => {
    if (value === null || !ref.current) return;
    const node = ref.current;
    const controls = animate(prev.current, value, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (node.textContent = fmt(v)),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);

  if (value === null) return <span className="font-display text-4xl font-semibold">Custom</span>;

  return (
    <span className="flex items-end gap-1.5">
      <span ref={ref} className="font-display text-4xl font-semibold tabular-nums">{fmt(value)}</span>
      <span className="relative mb-1.5 h-5 overflow-hidden text-sm text-ink-muted">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={period} className="block" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.25 }}>
            {period}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
