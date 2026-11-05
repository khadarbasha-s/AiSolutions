import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { MessageSquareText, ClipboardCheck, AppWindow, CheckCircle2, Users, CalendarClock, Sparkles, type LucideIcon } from "lucide-react";
import { BorderBeam } from "@/components/fx";
import { cn } from "@/lib/cn";

const STAGES: { key: string; label: string; icon: LucideIcon; caption: string }[] = [
  { key: "problem", label: "Problem", icon: MessageSquareText, caption: "You describe the problem in plain language." },
  { key: "plan", label: "Plan", icon: ClipboardCheck, caption: "The agents return a plan for you to review and approve." },
  { key: "app", label: "Generated app", icon: AppWindow, caption: "The approved plan becomes a working application." },
];

const PROMPT = "We hire 40 people a month. Build a platform that reads resumes, matches them to open roles and books interviews with our hiring managers automatically.";

function ProblemView() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= PROMPT.length) return;
    const t = window.setTimeout(() => setN((v) => v + 2), 18);
    return () => window.clearTimeout(t);
  }, [n]);
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">What would you like to build?</p>
      <div className="mt-3 rounded-2xl border border-violet/30 bg-bg/70 p-5 text-base leading-relaxed text-ink sm:text-lg">
        {PROMPT.slice(0, n)}
        <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-blink bg-cyan" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["job_descriptions.pdf", "interview_policy.docx"].map((f, i) => (
          <motion.span key={f} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.2 }} className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-xs text-ink-muted">
            {f}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function PlanView() {
  const sections = [
    { h: "Requirements", items: ["Resume parsing for PDF and Word", "Match score per open role", "Calendar-based interview booking"] },
    { h: "Architecture", items: ["React + FastAPI + PostgreSQL", "pgvector for matching", "Calendar and email integrations"] },
    { h: "Questions for you", items: ["Which calendar do managers use?", "Should candidates pick their own slot?"] },
  ];
  return (
    <div className="grid h-full gap-3 sm:grid-cols-3">
      {sections.map((s, i) => (
        <motion.div key={s.h} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className={cn("rounded-2xl border bg-bg/60 p-4", i === 2 ? "border-warning/30" : "border-line")}>
          <p className={cn("font-display text-sm font-semibold", i === 2 && "text-warning")}>{s.h}</p>
          <ul className="mt-3 space-y-2">
            {s.items.map((it, j) => (
              <motion.li key={it} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 + j * 0.1 }} className="flex items-start gap-2 text-xs text-ink-muted">
                <CheckCircle2 className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", i === 2 ? "text-warning" : "text-success")} />{it}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex items-center justify-between rounded-xl border border-success/30 bg-success/10 px-4 py-2.5 text-sm sm:col-span-3">
        <span className="text-success">Waiting for your approval</span>
        <span className="rounded-lg bg-success px-3 py-1 text-xs font-medium text-bg">Approve plan</span>
      </motion.div>
    </div>
  );
}

function AppView() {
  const candidates = [{ n: "A. Rao", s: 92 }, { n: "M. Khan", s: 87 }, { n: "S. Iyer", s: 81 }, { n: "P. Das", s: 74 }];
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-line bg-bg/70">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" /><span className="h-2.5 w-2.5 rounded-full bg-warning/70" /><span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <span className="ml-2 truncate rounded-md bg-surface px-2 py-0.5 font-mono text-[10px] text-ink-faint">preview.sandbox / recruitment</span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-[1fr_1.4fr]">
        <div className="space-y-3">
          {[{ icon: Users, k: "Candidates", v: "312" }, { icon: Sparkles, k: "Shortlisted", v: "48" }, { icon: CalendarClock, k: "Interviews", v: "19" }].map((s, i) => (
            <motion.div key={s.k} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 rounded-xl border border-line bg-surface/80 p-3">
              <s.icon className="h-4 w-4 text-cyan" />
              <span className="flex-1 text-xs text-ink-muted">{s.k}</span>
              <span className="font-display text-lg font-semibold">{s.v}</span>
            </motion.div>
          ))}
        </div>
        <div className="rounded-xl border border-line bg-surface/80 p-3">
          <p className="mb-2 text-xs font-medium">Top matches · Backend Engineer</p>
          {candidates.map((c, i) => (
            <motion.div key={c.n} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-3 py-1.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-elevated text-[10px]">{c.n.split(" ")[1][0]}</span>
              <span className="w-16 truncate text-xs">{c.n}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                <motion.div className="h-full rounded-full bg-brand-gradient" initial={{ width: 0 }} animate={{ width: `${c.s}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }} />
              </div>
              <span className="font-mono text-[10px] text-ink-muted">{c.s}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <p className="px-4 pb-3 font-mono text-[10px] text-ink-faint">Illustrative preview with sample data</p>
    </div>
  );
}

const VIEWS = [ProblemView, PlanView, AppView];
const STAGE_MS = 7000;

/** Auto-advancing three-stage walkthrough of one featured use case. Pauses on hover. */
export function FeaturedWalkthrough() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const running = inView && !paused;
  const View = VIEWS[stage];

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setStage((s) => (s + 1) % STAGES.length), STAGE_MS);
    return () => window.clearTimeout(t);
  }, [running, stage]);

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative overflow-hidden rounded-3xl border border-line bg-surface/70 backdrop-blur">
      <BorderBeam duration={11} />
      <div className="grid lg:grid-cols-[300px_1fr]">
        <div className="flex gap-2 overflow-x-auto border-b border-line p-4 lg:flex-col lg:border-b-0 lg:border-r lg:p-6">
          {STAGES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setStage(i)}
              className={cn("relative min-w-[150px] flex-1 overflow-hidden rounded-2xl border p-4 text-left transition-colors lg:flex-none", stage === i ? "border-violet/40 bg-violet/10" : "border-transparent hover:border-line")}
            >
              <span className="flex items-center gap-2">
                <s.icon className={cn("h-4 w-4", stage === i ? "text-cyan" : "text-ink-faint")} />
                <span className="font-mono text-[10px] text-ink-faint">0{i + 1}</span>
                <span className="font-display font-medium">{s.label}</span>
              </span>
              <span className="mt-1 hidden text-xs text-ink-muted sm:block">{s.caption}</span>
              {stage === i && (
                <motion.span
                  key={`${stage}-${running}`}
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-gradient"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: running ? 1 : 0.0001 }}
                  transition={{ duration: running ? STAGE_MS / 1000 : 0, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="min-h-[380px] p-5 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={stage} className="h-full" initial={{ opacity: 0, x: 30, filter: "blur(6px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -30, filter: "blur(6px)" }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
              <View />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
