import { motion } from "framer-motion";
import { Box, KeyRound, Gauge, Split, Lock, type LucideIcon } from "lucide-react";
import { SpotlightCard, RevealGroup, RevealItem, Meteors } from "@/components/fx";
import { SectionHeading } from "@/components/ui/Section";

const PILLARS: { title: string; body: string; icon: LucideIcon }[] = [
  { title: "A sandbox per project", body: "Every generated application runs in its own isolated container. Project A can never read Project B's files.", icon: Box },
  { title: "Separated credentials", body: "API keys and secrets are encrypted and scoped to one project. No other customer or project can see them.", icon: KeyRound },
  { title: "Resource limits", body: "CPU, memory, network and execution time are capped for every run, so a runaway build cannot affect anyone else.", icon: Gauge },
  { title: "Generation is not execution", body: "Code is written by one service and run by another. Generated code never executes on the platform's own servers.", icon: Split },
];

const PROJECTS = ["Recruitment app", "Clinic triage", "Loan review", "Tutor bot"];

/** Visual of isolated sandboxes: each project in its own walled container, with a shield sweep. */
function SandboxVisual() {
  return (
    <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4">
      {PROJECTS.map((p, i) => (
        <motion.div
          key={p}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, type: "spring", stiffness: 180, damping: 18 }}
          whileHover={{ scale: 1.04 }}
          className="relative overflow-hidden rounded-2xl border border-cyan/25 bg-bg/70 p-4"
        >
          <div aria-hidden className="dot-bg absolute inset-0 opacity-50" />
          <motion.div
            aria-hidden
            className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-cyan/15 to-transparent"
            animate={{ top: ["-20%", "110%"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: i * 0.6 }}
          />
          <div className="relative flex items-center justify-between">
            <Lock className="h-4 w-4 text-cyan" />
            <span className="flex items-center gap-1 font-mono text-[9px] uppercase text-success">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />isolated
            </span>
          </div>
          <p className="relative mt-6 font-display text-sm font-medium">{p}</p>
          <div className="relative mt-3 space-y-1.5">
            {[70, 45, 85].map((w, k) => (
              <div key={k} className="h-1 overflow-hidden rounded-full bg-line">
                <motion.div className="h-full rounded-full bg-brand-gradient" initial={{ width: 0 }} whileInView={{ width: `${w - i * 7}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4 + k * 0.1 }} />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-violet/60 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-violet/60 to-transparent" />
    </div>
  );
}

export function IsolationSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Meteors count={10} />
      <div className="container relative">
        <SectionHeading
          eyebrow="Isolation and security"
          title="Every application lives in its own sealed environment."
          subtitle="Multi-tenant by design. Tenant isolation and sandboxed execution are part of the foundation, not an add-on."
        />
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <SandboxVisual />
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <RevealItem key={p.title}>
                <SpotlightCard glow={i % 2 ? "cyan" : "violet"} className="h-full">
                  <div className="p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-elevated transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <p.icon className="h-5 w-5 text-cyan" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
                  </div>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
