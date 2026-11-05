import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/fx";
import { cn } from "@/lib/cn";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <RevealGroup className="mx-auto max-w-3xl space-y-3" gap={0.06}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <RevealItem key={item.q}>
            <div className={cn("panel overflow-hidden transition-colors", isOpen ? "border-violet/40" : "hover:border-white/20")}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display text-base font-medium">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border", isOpen ? "border-violet/50 text-violet-soft" : "border-line text-ink-muted")}
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
