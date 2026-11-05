import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/cn";

/** Code panel with window chrome, a language tag and an animated copy button. */
export function CodeBlock({ code, lang, title }: { code: string; lang: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard can be blocked; ignore */
    }
  };

  return (
    <div className="group relative my-6 min-w-0 overflow-hidden rounded-xl border border-line bg-[#0B0E17] shadow-panel transition-colors hover:border-violet/30">
      <div className="flex items-center gap-3 border-b border-line bg-surface/70 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        </div>
        <Terminal className="h-3.5 w-3.5 text-ink-faint" />
        <span className="min-w-0 flex-1 truncate text-xs text-ink-muted">{title ?? lang}</span>
        <span className="hidden rounded border border-line px-1.5 py-px font-mono text-[10px] uppercase text-ink-faint sm:inline">{lang}</span>
        <motion.button
          type="button"
          onClick={copy}
          whileTap={{ scale: 0.9 }}
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "relative flex h-7 w-7 items-center justify-center rounded-md border transition-colors",
            copied ? "border-success/40 bg-success/10 text-success" : "border-line text-ink-muted hover:border-cyan/50 hover:text-cyan",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span key="c" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                <Check className="h-3.5 w-3.5" />
              </motion.span>
            ) : (
              <motion.span key="p" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0, rotate: 90 }}>
                <Copy className="h-3.5 w-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[41px] h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-ink/90">
        <code>
          {code.split("\n").map((line, i) => (
            <span key={i} className="block">
              <span className="mr-4 inline-block w-5 select-none text-right text-ink-faint/60">{i + 1}</span>
              {line || " "}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
