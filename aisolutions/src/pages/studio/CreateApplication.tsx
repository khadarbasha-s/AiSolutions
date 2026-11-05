import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Boxes, BrainCircuit, ChevronDown, Layout, Paperclip, Server, Lightbulb, CheckCircle2 } from "lucide-react";
import type { GenerationScope, Project } from "@shared/types";
import { api, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea, FieldError } from "@/components/ui/Field";
import { BorderBeam, Typewriter } from "@/components/fx";
import { cn } from "@/lib/cn";

const SCOPES: { value: GenerationScope; title: string; text: string; icon: typeof Boxes }[] = [
  { value: "full", title: "Complete application", text: "Frontend, backend, database and AI", icon: Boxes },
  { value: "frontend", title: "Frontend only", text: "Pages, components and design", icon: Layout },
  { value: "backend", title: "Backend and database", text: "APIs, logic and schema", icon: Server },
  { value: "ai", title: "AI components only", text: "Agents, workflows and RAG", icon: BrainCircuit },
];

const EXAMPLES = [
  "An AI-powered recruitment platform that analyzes resumes, matches candidates with job descriptions and schedules interviews automatically.",
  "A learning app where students upload notes and an AI tutor quizzes them and tracks weak topics.",
  "An invoice processing tool that reads supplier PDFs, flags mismatches with purchase orders and posts approved invoices to accounting.",
];

const TIPS = ["Who will use it, and what roles do they have?", "What problem does it solve today, and how is it done now?", "Which data or documents should the AI use?", "Which systems should it connect to?"];

const MIN = 30;
const MAX = 8000;

export default function CreateApplication() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [problem, setProblem] = useState(params.get("prompt") ?? "");
  const [name, setName] = useState(params.get("name") ?? "");
  const [scope, setScope] = useState<GenerationScope>("full");
  const [context, setContext] = useState("");
  const [showContext, setShowContext] = useState(false);
  const [focused, setFocused] = useState(false);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => textRef.current?.focus(), []);

  const remaining = Math.max(0, MIN - problem.trim().length);
  const ready = remaining === 0;

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    setError(null);
    setFields({});
    const finalName = name.trim() || problem.trim().split(/[.,\n]/)[0].split(" ").slice(0, 5).join(" ");
    setSaving(true);
    try {
      const project = await api<Project>("/projects", { method: "POST", json: { name: finalName, problemStatement: problem, scope, context: context || null } });
      setSaved(true);
      window.setTimeout(() => navigate(`/studio/projects/${project.id}`), 900);
    } catch (err) {
      if (err instanceof ApiError) {
        setFields(err.fields ?? {});
        if (!err.fields) setError(err.message);
      } else setError("Could not reach the server. Check your connection.");
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 text-center">
        <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_#22D3EE]" /> New project
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 14, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.08, duration: 0.7 }} className="mt-5 text-3xl font-semibold sm:text-5xl">
          What would you like to <span className="text-gradient">build</span>?
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mx-auto mt-3 max-w-xl text-ink-muted">
          Describe your problem. Our AI will help you design and build the solution.
        </motion.p>
      </div>

      <form onSubmit={submit} noValidate>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="relative">
          <motion.div aria-hidden className="absolute -inset-px rounded-[22px] bg-brand-gradient opacity-0 blur-md" animate={{ opacity: focused ? 0.45 : 0 }} transition={{ duration: 0.4 }} />
          <div className={cn("relative overflow-hidden rounded-[21px] border bg-surface/90 backdrop-blur transition-colors", focused ? "border-violet/50" : "border-line")}>
            {focused && <BorderBeam duration={6} />}
            <div className="relative">
              <textarea
                ref={textRef}
                value={problem}
                onChange={(e) => setProblem(e.target.value.slice(0, MAX))}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && ready) void submit();
                }}
                aria-label="Problem statement"
                aria-invalid={!!fields.problemStatement}
                rows={7}
                className="relative z-10 block w-full resize-none bg-transparent px-6 pb-4 pt-6 text-base leading-relaxed text-ink placeholder:text-transparent focus:outline-none sm:text-lg"
                placeholder="Describe your problem"
              />
              {!problem && (
                <div aria-hidden className="pointer-events-none absolute inset-0 px-6 pt-6 text-base leading-relaxed text-ink-faint sm:text-lg">
                  <Typewriter phrases={EXAMPLES} typeMs={28} holdMs={2600} />
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3">
              <div className="flex items-center gap-1">
                <span title="Document upload arrives with the AI engine in Phase 2">
                  <button type="button" disabled className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-ink-faint">
                    <Paperclip className="h-3.5 w-3.5" /> Attach documents
                    <span className="rounded border border-line px-1 font-mono text-[9px]">SOON</span>
                  </button>
                </span>
                <button type="button" onClick={() => setShowContext((s) => !s)} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-ink-muted transition-colors hover:bg-white/5 hover:text-ink">
                  Add context
                  <motion.span animate={{ rotate: showContext ? 180 : 0 }}><ChevronDown className="h-3.5 w-3.5" /></motion.span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn("font-mono text-xs transition-colors", ready ? "text-success" : "text-ink-faint")}>
                  {ready ? `${problem.length.toLocaleString()} chars` : `${remaining} more to go`}
                </span>
                <Button type="submit" size="sm" loading={saving} disabled={!ready || saved}>
                  {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved</> : <>Analyze problem <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
        <FieldError>{fields.problemStatement}</FieldError>
        {error && <p role="alert" className="mt-3 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>}

        <AnimatePresence initial={false}>
          {showContext && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
              <div className="pt-5">
                <Label htmlFor="context">Additional context</Label>
                <Textarea id="context" value={context} onChange={(e) => setContext(e.target.value)} placeholder="Constraints, existing systems, users, budget, compliance needs, anything that helps." />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10">
          <h2 className="font-display text-lg font-semibold">How much should the AI generate?</h2>
          <p className="mt-1 text-sm text-ink-muted">You can change this later, before you approve the plan.</p>
          <div role="radiogroup" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SCOPES.map((s, i) => {
              const active = scope === s.value;
              return (
                <motion.button
                  key={s.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setScope(s.value)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn("relative rounded-2xl border p-4 text-left transition-colors", active ? "border-transparent" : "border-line bg-surface/60 hover:border-violet/30")}
                >
                  {active && <motion.span layoutId="scope-active" className="absolute inset-0 rounded-2xl border border-violet/60 bg-violet/10 shadow-glow" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                  <span className="relative">
                    <s.icon className={cn("h-5 w-5 transition-colors", active ? "text-violet-soft" : "text-ink-muted")} />
                    <span className="mt-3 block text-sm font-medium">{s.title}</span>
                    <span className="mt-0.5 block text-xs text-ink-faint">{s.text}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-10 grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div>
            <Label htmlFor="name">Project name <span className="font-normal text-ink-faint">(optional)</span></Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="We'll suggest one from your description" aria-invalid={!!fields.name} />
            <FieldError>{fields.name}</FieldError>
          </div>
          <div className="rounded-2xl border border-line bg-surface/50 p-4">
            <p className="flex items-center gap-2 text-sm font-medium"><Lightbulb className="h-4 w-4 text-warning" /> A great problem statement answers</p>
            <ul className="mt-3 space-y-1.5">
              {TIPS.map((t, i) => (
                <motion.li key={t} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.06 }} className="flex gap-2 text-xs text-ink-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" /> {t}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-xs text-ink-faint">
          Press <kbd className="rounded border border-line px-1.5 font-mono">Ctrl</kbd> + <kbd className="rounded border border-line px-1.5 font-mono">Enter</kbd> to submit. Nothing is generated until you approve the plan.
        </p>
      </form>
    </div>
  );
}
