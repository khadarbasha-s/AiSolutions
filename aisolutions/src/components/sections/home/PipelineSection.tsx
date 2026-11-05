import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam, Reveal } from "@/components/fx";
import { cn } from "@/lib/cn";

const stages = [
  { name: "Frontend", agent: "UI/UX Agent", log: ["Creating 14 pages and shared layout", "Wiring forms to API client", "Applying design tokens"] },
  { name: "Backend", agent: "Backend Agent", log: ["Generating REST endpoints", "Adding role-based access control", "Writing request validation"] },
  { name: "Database", agent: "Database Agent", log: ["Designing schema from requirements", "Creating migrations and indexes", "Seeding sample data"] },
  { name: "AI", agent: "AI Engineer Agent", log: ["Building resume-matching workflow", "Indexing documents into vector store", "Adding evaluation prompts"] },
  { name: "Integrations", agent: "Integration Agent", log: ["Connecting calendar for interviews", "Configuring email notifications", "Storing credentials in vault"] },
  { name: "Testing", agent: "QA Agent", log: ["Running unit and API tests", "Evaluating AI answer quality", "Security checks passed"] },
];

const STEP_MS = 2200;

export function PipelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setTick((t) => (t + 1) % (stages.length * 3 + 4)), STEP_MS / 3);
    return () => window.clearInterval(id);
  }, [inView]);

  const current = Math.min(Math.floor(tick / 3), stages.length);
  const sub = tick % 3;
  const done = current >= stages.length;
  const overall = done ? 100 : Math.round(((current + (sub + 1) / 3) / stages.length) * 100);
  const logLines = stages.slice(0, Math.min(current + 1, stages.length)).flatMap((s, i) =>
    s.log.slice(0, i < current ? 3 : sub + 1).map((l) => ({ key: `${s.name}-${l}`, agent: s.agent, text: l })),
  );

  return (
    <Section>
      <SectionHeading
        eyebrow="Application generation"
        title="Watch your application assemble itself."
        subtitle="Agents work in a fixed order, and each layer is validated before the next one starts. Illustrative run shown below."
      />
      <Reveal>
        <div ref={ref} className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-panel backdrop-blur-xl">
          <BorderBeam duration={9} />
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
              <span className="ml-3 font-mono text-xs text-ink-faint">recruitment-platform · generation</span>
            </div>
            <Badge tone={done ? "success" : "cyan"} dot>{done ? "Ready for preview" : "Generating"}</Badge>
          </div>

          <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
            <div className="space-y-2 border-b border-line p-5 md:border-b-0 md:border-r">
              {stages.map((s, i) => {
                const state = i < current ? "done" : i === current ? "running" : "queued";
                const pct = state === "done" ? 100 : state === "running" ? ((sub + 1) / 3) * 100 : 0;
                return (
                  <div key={s.name} className={cn("rounded-xl border p-3 transition-colors duration-500", state === "running" ? "border-violet/40 bg-violet/5" : "border-line bg-bg/30")}>
                    <div className="flex items-center gap-3">
                      {state === "done" ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : state === "running" ? (
                        <Loader2 className="h-4 w-4 animate-spin text-cyan" />
                      ) : (
                        <Circle className="h-4 w-4 text-ink-faint" />
                      )}
                      <span className="flex-1 text-sm font-medium">{s.name}</span>
                      <span className="font-mono text-[11px] text-ink-faint">{s.agent}</span>
                    </div>
                    <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-line">
                      <motion.div className="h-full rounded-full bg-brand-gradient" animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease: "easeOut" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">Agent log</span>
                <span className="font-mono text-xs text-cyan">{overall}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                <motion.div className="h-full bg-brand-gradient" animate={{ width: `${overall}%` }} transition={{ duration: 0.6 }} />
              </div>
              <div className="mt-4 h-[300px] overflow-hidden rounded-xl border border-line bg-bg/70 p-4 font-mono text-[12px] leading-relaxed">
                <div className="flex h-full flex-col justify-end">
                  <AnimatePresence initial={false}>
                    {logLines.slice(-11).map((l) => (
                      <motion.div key={l.key} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="truncate">
                        <span className="text-violet-soft">[{l.agent}]</span> <span className="text-ink-muted">{l.text}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {done && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-success">
                      ✓ Application ready. Live preview, source code and deployment controls unlocked.
                    </motion.div>
                  )}
                  <span className="mt-1 inline-block h-3.5 w-2 animate-blink bg-cyan" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
