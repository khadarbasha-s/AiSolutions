import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { TiltCard } from "@/components/fx";
import { cn } from "@/lib/cn";

const LINES: { text: string; tone?: "cmd" | "ok" | "info" | "warn" | "agent" }[] = [
  { text: "$ infodrizzle run --project recruitment-app", tone: "cmd" },
  { text: "orchestrator  plan approved by you, starting generation", tone: "info" },
  { text: "[database]    schema: 9 tables, 14 indexes", tone: "agent" },
  { text: "[backend]     38 API routes generated", tone: "agent" },
  { text: "[ai-engineer] resume screening graph built (LangGraph)", tone: "agent" },
  { text: "[ai-engineer] job descriptions embedded into pgvector", tone: "agent" },
  { text: "[ui-ux]       12 pages, 41 components", tone: "agent" },
  { text: "[security]    1 issue found: missing rate limit on /login", tone: "warn" },
  { text: "[backend]     fix applied, re-checking", tone: "agent" },
  { text: "[qa]          126 tests passed", tone: "ok" },
  { text: "✓ preview ready in an isolated sandbox", tone: "ok" },
];

const toneClass = { cmd: "text-cyan", ok: "text-success", info: "text-violet-soft", warn: "text-warning", agent: "text-ink" };

/** A terminal that types out an illustrative orchestrator run when scrolled into view. */
export function TerminalMock({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!inView || line >= LINES.length) return;
    const full = LINES[line].text;
    const isCmd = LINES[line].tone === "cmd";
    if (chars < full.length) {
      const t = window.setTimeout(() => setChars((c) => Math.min(full.length, c + (isCmd ? 1 : 3))), isCmd ? 35 : 12);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => { setLine((l) => l + 1); setChars(0); }, isCmd ? 500 : 260);
    return () => window.clearTimeout(t);
  }, [inView, line, chars]);

  return (
    <TiltCard max={5} className={cn("rounded-2xl", className)}>
      <div ref={ref} className="overflow-hidden rounded-2xl border border-line bg-[#0B0E18] shadow-panel">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-danger/70" />
          <span className="h-3 w-3 rounded-full bg-warning/70" />
          <span className="h-3 w-3 rounded-full bg-success/70" />
          <span className="ml-3 font-mono text-xs text-ink-faint">orchestrator.log</span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-success"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />live</span>
        </div>
        <div className="min-h-[320px] p-4 font-mono text-[11px] leading-6 sm:p-5 sm:text-xs">
          {LINES.slice(0, line + 1).map((l, i) => {
            if (i > line) return null;
            const text = i < line ? l.text : l.text.slice(0, chars);
            return (
              <div key={i} className={cn("break-words", toneClass[l.tone ?? "agent"])}>
                {text}
                {i === line && line < LINES.length && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-blink bg-cyan" />}
              </div>
            );
          })}
        </div>
        <p className="border-t border-line px-4 py-2 font-mono text-[10px] text-ink-faint">Illustrative run</p>
      </div>
    </TiltCard>
  );
}
