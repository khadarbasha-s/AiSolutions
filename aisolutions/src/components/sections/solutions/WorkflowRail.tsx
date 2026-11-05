import { useRef } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import type { Industry } from "@/data/industries";
import { cn } from "@/lib/cn";

/**
 * Orchestrator feeding a vertical chain of agent steps. The rail fills as you
 * scroll, each step lights up when the fill reaches it, and a packet loops down the rail.
 */
export function WorkflowRail({ industry }: { industry: Industry }) {
  const ref = useRef<HTMLDivElement>(null);
  const isCyan = industry.accent === "cyan";

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo("[data-fill]", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 65%", scrub: 0.5 },
      });
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0.35, x: 24 }, {
          opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 72%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: ref, dependencies: [industry.slug] },
  );

  return (
    <div ref={ref} className="relative mx-auto max-w-2xl">
      <div className="flex items-center gap-4">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet/40 bg-elevated shadow-glow">
          <span className="absolute inset-0 animate-pulse-ring rounded-2xl border border-violet/50" />
          <Brain className="h-6 w-6 text-violet-soft" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold">Central Orchestrator</p>
          <p className="text-sm text-ink-muted">Plans the {industry.name.toLowerCase()} build and assigns each agent its task.</p>
        </div>
      </div>

      <div className="relative ml-7 mt-2 border-l border-line pb-2 pl-10">
        <div data-fill aria-hidden className={cn("absolute -left-px top-0 h-full w-px origin-top", isCyan ? "bg-gradient-to-b from-violet to-cyan" : "bg-gradient-to-b from-cyan to-violet")} />
        <motion.span
          aria-hidden
          className="absolute -left-[3px] top-0 h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_#22D3EE]"
          animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        {industry.workflow.map((w, i) => (
          <div key={w.agent} data-step className="relative pt-8">
            <span aria-hidden className={cn("absolute -left-[45px] top-[46px] h-2.5 w-2.5 rounded-full border-2 border-bg", isCyan ? "bg-cyan" : "bg-violet")} />
            <motion.div
              whileHover={{ x: 6 }}
              className="panel group flex items-start gap-4 p-4 transition-colors hover:border-violet/40 sm:p-5"
            >
              <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
              <div>
                <p className="font-display font-semibold">
                  {w.agent} <span className="text-ink-muted">Agent</span>
                </p>
                <p className="mt-1 text-sm text-ink-muted">{w.step}</p>
              </div>
              <span className="ml-auto mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-success opacity-0 transition-opacity group-hover:opacity-100">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> Ready
              </span>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
