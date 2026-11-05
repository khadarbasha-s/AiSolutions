import { motion } from "framer-motion";
import { AgentGraph, AGENTS, RevealGroup, RevealItem } from "@/components/fx";
import { Section, SectionHeading } from "@/components/ui/Section";

export function AgentsSection() {
  return (
    <Section className="overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/10 blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <SectionHeading
        eyebrow="Multi-agent engine"
        title="One orchestrator. Ten specialists. Zero chaos."
        subtitle="Each agent has a defined responsibility, inputs, outputs, tools and validation rules. The orchestrator plans the work and hands it off in order, so agents never overwrite each other."
      />
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <AgentGraph />
        <RevealGroup className="grid grid-cols-2 gap-3" gap={0.05}>
          {AGENTS.map((a) => (
            <RevealItem key={a.key}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(34,211,238,0.5)" }}
                className="group h-full rounded-xl border border-line bg-surface/70 p-3.5 transition-colors"
              >
                <a.icon className="h-4 w-4 text-violet-soft transition-all duration-300 group-hover:scale-110 group-hover:text-cyan" />
                <p className="mt-2 font-display text-sm font-medium">{a.label} Agent</p>
                <p className="text-xs text-ink-muted">{a.role}</p>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
