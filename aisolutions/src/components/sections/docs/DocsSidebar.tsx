import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";
import { getLenis } from "@/components/fx";
import type { DocSection } from "@/data/docs";
import { cn } from "@/lib/cn";

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: -110 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

function Links({ sections, active, onPick }: { sections: DocSection[]; active: string; onPick: (id: string) => void }) {
  return (
    <ul className="relative space-y-0.5 border-l border-line">
      {sections.map((s) => {
        const on = s.id === active;
        return (
          <li key={s.id} className="relative">
            {on && <motion.span layoutId="docs-active" className="absolute -left-px top-0 h-full w-0.5 bg-brand-gradient shadow-[0_0_10px_#8B5CF6]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <button
              type="button"
              onClick={() => onPick(s.id)}
              className={cn("group flex w-full items-center gap-2 py-2 pl-4 pr-2 text-left text-sm transition-colors", on ? "text-ink" : "text-ink-muted hover:text-ink")}
            >
              <span className={cn("font-mono text-[10px] transition-colors", on ? "text-cyan" : "text-ink-faint group-hover:text-violet-soft")}>{s.eyebrow.slice(0, 2)}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">{s.title}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Sticky contents list on desktop, collapsible dropdown on mobile. Highlights the section in view. */
export function DocsSidebar({ sections, active }: { sections: DocSection[]; active: string }) {
  const [open, setOpen] = useState(false);
  const current = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <>
      <div className="sticky top-24 z-20 mb-8 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="glass flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm"
        >
          <BookOpen className="h-4 w-4 text-violet-soft" />
          <span className="flex-1 truncate">{current.title}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown className="h-4 w-4 text-ink-muted" />
          </motion.span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass mt-2 overflow-hidden rounded-xl bg-surface/95 px-2 py-3"
            >
              <Links sections={sections} active={active} onPick={(id) => { setOpen(false); scrollToSection(id); }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            <BookOpen className="h-3.5 w-3.5" /> On this page
          </p>
          <Links sections={sections} active={active} onPick={scrollToSection} />
          <div className="mt-6 h-1 overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full bg-brand-gradient"
              animate={{ width: `${((sections.findIndex((s) => s.id === active) + 1) / sections.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
