import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { GenerationScope, ProjectStatus } from "@shared/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export const STATUS_META: Record<ProjectStatus, { label: string; tone: "neutral" | "violet" | "cyan" | "warning" | "success" }> = {
  draft: { label: "Draft", tone: "neutral" },
  analyzing: { label: "Analyzing", tone: "violet" },
  awaiting_approval: { label: "Awaiting approval", tone: "warning" },
  generating: { label: "Generating", tone: "cyan" },
  ready: { label: "Ready", tone: "success" },
  deployed: { label: "Deployed", tone: "success" },
};

export const SCOPE_LABEL: Record<GenerationScope, string> = {
  full: "Complete application",
  frontend: "Frontend only",
  backend: "Backend and database",
  ai: "AI components only",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const m = STATUS_META[status];
  return <Badge tone={m.tone} dot={status === "analyzing" || status === "generating"}>{m.label}</Badge>;
}

export function PageHeader({ title, subtitle, actions, eyebrow }: { title: ReactNode; subtitle?: ReactNode; actions?: ReactNode; eyebrow?: string }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">{eyebrow}</p>}
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold sm:text-3xl">
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="mt-1.5 text-sm text-ink-muted sm:text-base">
            {subtitle}
          </motion.p>
        )}
      </div>
      {actions && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2">{actions}</motion.div>}
    </div>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("panel p-5 sm:p-6", className)}>{children}</div>;
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="panel relative w-full max-w-md p-6"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-md p-1 text-ink-faint hover:text-ink">
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="mt-3">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function timeAgo(iso: string) {
  const s = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  const units: [number, string][] = [[60, "minute"], [3600, "hour"], [86400, "day"], [604800, "week"], [2629800, "month"]];
  let label = "";
  for (const [secs, name] of units) if (s >= secs) label = `${Math.floor(s / secs)} ${name}${Math.floor(s / secs) > 1 ? "s" : ""} ago`;
  return label;
}

/** The plan-first pipeline every project moves through. `phase` is when the stage ships. */
export const PIPELINE = [
  { key: "capture", label: "Problem captured", text: "Your problem statement, scope and context are saved.", phase: 1 },
  { key: "understand", label: "Understand the problem", text: "The orchestrator reads the problem and identifies missing information.", phase: 2 },
  { key: "clarify", label: "Clarifying questions", text: "The AI asks only the questions it needs answered.", phase: 2 },
  { key: "requirements", label: "Requirement document", text: "Features, user roles, data and AI workflows are written up for review.", phase: 2 },
  { key: "architecture", label: "Architecture proposal", text: "Technology stack, database design and integrations are proposed.", phase: 2 },
  { key: "approval", label: "Your approval", text: "You edit, remove or add features. Nothing is generated until you approve.", phase: 2 },
  { key: "generate", label: "Generation", text: "Frontend, backend, database, AI, integrations and tests are generated.", phase: 3 },
  { key: "deploy", label: "Preview and deploy", text: "Live preview, test results, source download and deployment.", phase: 4 },
] as const;
