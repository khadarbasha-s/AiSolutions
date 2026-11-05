import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, Database, Workflow, Gauge, FileText, Scissors, Binary, Search, MessageSquareText, CheckCircle2, RotateCcw, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/Section";
import { BorderBeam } from "@/components/fx";
import { cn } from "@/lib/cn";

type TabKey = "models" | "rag" | "workflows" | "evals";

const TABS: { key: TabKey; label: string; icon: LucideIcon; title: string; body: string; points: string[] }[] = [
  {
    key: "models", label: "LLM providers", icon: Cpu, title: "The right model for each task",
    body: "The orchestrator routes each step to a suitable model from OpenAI, Anthropic or Gemini, balancing quality, speed and cost. Generated applications can use the same providers.",
    points: ["Per-task model routing", "Automatic fallback between providers", "Bring your own API keys"],
  },
  {
    key: "rag", label: "RAG with pgvector", icon: Database, title: "Answers grounded in your documents",
    body: "Upload policies, manuals or records. They are chunked, embedded and stored in PostgreSQL with pgvector, so retrieval sits next to your application data.",
    points: ["Hybrid keyword and vector search", "Source citations in every answer", "Per-tenant knowledge bases"],
  },
  {
    key: "workflows", label: "Agent workflows", icon: Workflow, title: "Stateful workflows with LangGraph",
    body: "Agent workflows are graphs with explicit state, branches, retries and human approval steps, rather than one long prompt.",
    points: ["Branching and loops", "Human-in-the-loop checkpoints", "Resumable long-running jobs"],
  },
  {
    key: "evals", label: "Evaluation", icon: Gauge, title: "Quality you can measure",
    body: "The QA Agent tests functionality and evaluates AI responses against reference cases, so regressions are caught before release.",
    points: ["Functional test suites", "Answer accuracy and grounding checks", "Traces through OpenTelemetry and Langfuse"],
  },
];

function ModelsVisual() {
  const providers = ["OpenAI", "Anthropic", "Gemini"];
  return (
    <div className="relative flex h-full items-center justify-between gap-4 px-2">
      <div className="space-y-3">
        {["Plan", "Code", "Review"].map((t, i) => (
          <motion.div key={t} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="rounded-lg border border-line bg-bg/70 px-3 py-2 font-mono text-xs">
            {t}
          </motion.div>
        ))}
      </div>
      <div className="relative flex flex-1 items-center justify-center">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-violet/0 via-violet/60 to-cyan/0" />
        {[0, 1, 2].map((k) => (
          <motion.span key={k} className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_#22D3EE]" animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: k * 0.6 }} />
        ))}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="relative flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-violet/50">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient">
            <Cpu className="h-5 w-5 text-white" />
          </span>
        </motion.div>
      </div>
      <div className="space-y-3">
        {providers.map((p, i) => (
          <motion.div
            key={p}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, borderColor: ["rgba(148,163,184,0.12)", "rgba(34,211,238,0.6)", "rgba(148,163,184,0.12)"] }}
            transition={{ delay: i * 0.1, borderColor: { duration: 1.8, repeat: Infinity, delay: i * 0.6 } }}
            className="rounded-lg border bg-bg/70 px-3 py-2 font-display text-sm"
          >
            {p}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RagVisual() {
  const steps: { label: string; icon: LucideIcon }[] = [
    { label: "Documents", icon: FileText }, { label: "Chunk", icon: Scissors }, { label: "Embed", icon: Binary },
    { label: "pgvector", icon: Database }, { label: "Retrieve", icon: Search }, { label: "Answer", icon: MessageSquareText },
  ];
  return (
    <div className="grid h-full grid-cols-3 content-center gap-3 sm:grid-cols-6">
      {steps.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="relative flex flex-col items-center gap-2">
          <motion.span
            animate={{ boxShadow: ["0 0 0 0 rgba(34,211,238,0)", "0 0 24px 2px rgba(34,211,238,0.45)", "0 0 0 0 rgba(34,211,238,0)"] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            className={cn("flex h-12 w-12 items-center justify-center rounded-xl border bg-bg/70", s.label === "pgvector" ? "border-violet/60" : "border-line")}
          >
            <s.icon className={cn("h-5 w-5", s.label === "pgvector" ? "text-violet-soft" : "text-cyan")} />
          </motion.span>
          <span className="text-center font-mono text-[10px] text-ink-muted">{s.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function WorkflowVisual() {
  const nodes = [
    { id: "in", x: 10, y: 50, label: "Input" },
    { id: "plan", x: 32, y: 25, label: "Plan" },
    { id: "act", x: 55, y: 50, label: "Act" },
    { id: "check", x: 78, y: 25, label: "Check" },
    { id: "human", x: 78, y: 78, label: "Approve" },
    { id: "out", x: 94, y: 50, label: "Done" },
  ];
  const edges: [string, string][] = [["in", "plan"], ["plan", "act"], ["act", "check"], ["check", "human"], ["human", "out"], ["check", "out"]];
  const pos = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <div className="relative h-full min-h-[220px]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {edges.map(([a, b], i) => (
          <motion.line key={i} x1={pos[a].x} y1={pos[a].y} x2={pos[b].x} y2={pos[b].y} stroke="url(#wf)" strokeWidth={0.5} vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: i * 0.15 }} />
        ))}
        <motion.path d="M 78 25 C 70 0, 50 0, 55 50" fill="none" stroke="#F59E0B" strokeWidth={0.5} strokeDasharray="2 2" vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} />
        <defs>
          <linearGradient id="wf"><stop offset="0" stopColor="#8B5CF6" /><stop offset="1" stopColor="#22D3EE" /></linearGradient>
        </defs>
      </svg>
      {nodes.map((n, i) => (
        <motion.div key={n.id} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 * i, type: "spring", stiffness: 220, damping: 14 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border border-line bg-surface px-2.5 py-1.5 font-mono text-[10px] text-ink shadow-panel sm:text-xs"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          {n.label}
        </motion.div>
      ))}
      <span className="absolute left-[52%] top-[3%] flex items-center gap-1 font-mono text-[10px] text-warning"><RotateCcw className="h-3 w-3" />retry</span>
    </div>
  );
}

function EvalVisual() {
  const metrics = [{ label: "Functional tests", v: 96 }, { label: "Answer grounding", v: 91 }, { label: "Response accuracy", v: 88 }, { label: "Security checks", v: 100 }];
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      {metrics.map((m, i) => (
        <div key={m.label}>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="flex items-center gap-1.5 text-ink-muted"><CheckCircle2 className="h-3.5 w-3.5 text-success" />{m.label}</span>
            <span className="font-mono text-ink">{m.v}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-line">
            <motion.div className="h-full rounded-full bg-brand-gradient" initial={{ width: 0 }} animate={{ width: `${m.v}%` }} transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }} />
          </div>
        </div>
      ))}
      <p className="font-mono text-[10px] text-ink-faint">Illustrative example report</p>
    </div>
  );
}

const VISUALS: Record<TabKey, () => JSX.Element> = { models: ModelsVisual, rag: RagVisual, workflows: WorkflowVisual, evals: EvalVisual };

/** Tabbed explorer of the AI technologies, with an animated indicator and cross-fading content. */
export function CapabilityExplorer() {
  const [tab, setTab] = useState<TabKey>("models");
  const current = TABS.find((t) => t.key === tab)!;
  const Visual = VISUALS[tab];

  return (
    <section className="relative py-20 sm:py-28">
      <div aria-hidden className="grid-bg mask-radial pointer-events-none absolute inset-0 opacity-60" />
      <div className="container relative">
        <SectionHeading eyebrow="AI technologies" title="The intelligence under the hood." subtitle="The same building blocks power the platform and the AI features inside the applications it generates." />
        <div role="tablist" aria-label="AI capabilities" className="mx-auto mb-10 flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-line bg-surface/70 p-1.5 backdrop-blur sm:w-fit">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              type="button"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={cn("relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-colors", tab === t.key ? "text-white" : "text-ink-muted hover:text-ink")}
            >
              {tab === t.key && <motion.span layoutId="cap-tab" className="absolute inset-0 rounded-xl bg-brand-gradient shadow-glow" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <t.icon className="relative h-4 w-4" />
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/70 backdrop-blur">
          <BorderBeam duration={12} />
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2"
            >
              <div>
                <h3 className="text-2xl font-semibold sm:text-3xl">{current.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-muted">{current.body}</p>
                <ul className="mt-6 space-y-3">
                  {current.points.map((p, i) => (
                    <motion.li key={p} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.08 }} className="flex items-center gap-3 text-sm">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10"><CheckCircle2 className="h-3.5 w-3.5 text-cyan" /></span>
                      {p}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="min-h-[240px] rounded-2xl border border-line bg-bg/50 p-5">
                <Visual />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
