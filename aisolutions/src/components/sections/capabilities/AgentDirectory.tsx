import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpFromLine, Wrench } from "lucide-react";
import { AGENTS, AgentGraph, SpotlightCard, RevealGroup, RevealItem } from "@/components/fx";
import { SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { AGENT_DETAILS } from "./agentDetails";

function Chips({ label, icon: Icon, items, tone }: { label: string; icon: typeof Wrench; items: string[]; tone: string }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
        <Icon className="h-3 w-3" /> {label}
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {items.map((i) => (
          <span key={i} className={cn("rounded-md border px-2 py-0.5 text-[11px]", tone)}>{i}</span>
        ))}
      </div>
    </div>
  );
}

/** The orchestrator graph plus a card for each of the ten specialist agents. Cards expand on hover or tap. */
export function AgentDirectory() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="absolute left-1/2 top-40 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Ten specialist agents"
          title="A central orchestrator, and a team that knows its job."
          subtitle="Each agent has a defined responsibility, inputs, outputs, tools and validation rules. They never all edit the same code at once: the orchestrator sequences their work."
        />
        <AgentGraph className="mb-16 max-w-[520px]" />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" gap={0.05}>
          {AGENTS.map((a, i) => {
            const d = AGENT_DETAILS[a.key];
            const expanded = open === a.key;
            return (
              <RevealItem key={a.key} className="h-full">
                <SpotlightCard glow={i % 2 ? "cyan" : "violet"} className="h-full">
                  <button
                    type="button"
                    onMouseEnter={() => setOpen(a.key)}
                    onMouseLeave={() => setOpen(null)}
                    onClick={() => setOpen(expanded ? null : a.key)}
                    aria-expanded={expanded}
                    className="flex h-full w-full flex-col p-5 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-elevated transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-cyan/50">
                        <a.icon className="h-5 w-5 text-violet-soft transition-colors group-hover:text-cyan" />
                      </span>
                      <span className="font-mono text-[10px] text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">{a.label} Agent</h3>
                    <p className="mt-1 text-sm text-ink-muted">{d.responsibility}</p>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 space-y-3 border-t border-line pt-4">
                            <Chips label="Inputs" icon={ArrowDownToLine} items={d.inputs} tone="border-violet/30 bg-violet/10 text-violet-soft" />
                            <Chips label="Outputs" icon={ArrowUpFromLine} items={d.outputs} tone="border-cyan/30 bg-cyan/10 text-cyan-soft" />
                            <Chips label="Tools" icon={Wrench} items={d.tools} tone="border-line bg-white/5 text-ink-muted" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
