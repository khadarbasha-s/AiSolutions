import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Bot, CheckCircle2, ChevronRight } from "lucide-react";
import { SpotlightCard } from "@/components/fx";
import { Badge } from "@/components/ui/Badge";
import { USE_CASES, USE_CASE_INDUSTRIES } from "@/data/useCases";
import { cn } from "@/lib/cn";

/** Filterable grid of use cases with layout animations when the filter changes. */
export function UseCaseGrid() {
  const [filter, setFilter] = useState<string>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const items = filter === "All" ? USE_CASES : USE_CASES.filter((u) => u.industry === filter);

  return (
    <LayoutGroup>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {USE_CASE_INDUSTRIES.map((ind) => (
          <button
            key={ind}
            type="button"
            onClick={() => setFilter(ind)}
            aria-pressed={filter === ind}
            className={cn("relative rounded-full border px-4 py-2 text-sm transition-colors", filter === ind ? "border-transparent text-white" : "border-line text-ink-muted hover:border-violet/40 hover:text-ink")}
          >
            {filter === ind && <motion.span layoutId="uc-filter" className="absolute inset-0 rounded-full bg-brand-gradient shadow-glow" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{ind}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((u, i) => {
            const open = expanded === u.slug;
            return (
              <motion.div
                key={u.slug}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 26, delay: i * 0.03 }}
              >
                <SpotlightCard glow={i % 2 ? "cyan" : "violet"} className="h-full">
                  <div className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <Badge tone={i % 2 ? "cyan" : "violet"}>{u.industry}</Badge>
                      <span className="font-mono text-[10px] text-ink-faint">{String(USE_CASES.indexOf(u) + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{u.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{u.problem}</p>
                    <motion.div layout className="mt-4 flex flex-wrap gap-1.5">
                      {u.agents.map((a) => (
                        <span key={a} className="flex items-center gap-1 rounded-md border border-line bg-bg/50 px-2 py-0.5 text-[11px] text-ink-muted">
                          <Bot className="h-3 w-3 text-cyan" />{a}
                        </span>
                      ))}
                    </motion.div>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">What the AI builds</p>
                          <ul className="mt-2 space-y-1.5">
                            {u.builds.map((b) => (
                              <li key={b} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />{b}</li>
                            ))}
                          </ul>
                          <p className="mt-4 rounded-xl border border-cyan/20 bg-cyan/5 p-3 text-sm text-ink">{u.outcome}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button
                      type="button"
                      onClick={() => setExpanded(open ? null : u.slug)}
                      aria-expanded={open}
                      className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-violet-soft transition-colors hover:text-cyan"
                    >
                      {open ? "Show less" : "See what gets built"}
                      <ChevronRight className={cn("h-4 w-4 transition-transform duration-300", open ? "rotate-90" : "group-hover:translate-x-1")} />
                    </button>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
