import { motion } from "framer-motion";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem, SpotlightCard } from "@/components/fx";
import type { DocBlock, DocSection } from "@/data/docs";
import { cn } from "@/lib/cn";
import { CodeBlock } from "./CodeBlock";

const calloutStyles = {
  info: { icon: Info, cls: "border-cyan/30 bg-cyan/[0.06] text-cyan-soft" },
  tip: { icon: Lightbulb, cls: "border-violet/30 bg-violet/[0.08] text-violet-soft" },
  warning: { icon: AlertTriangle, cls: "border-warning/30 bg-warning/[0.07] text-warning" },
};

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "p":
      return <p className="my-4 leading-relaxed text-ink-muted">{block.text}</p>;
    case "list":
      return (
        <ul className="my-5 space-y-2.5">
          {block.items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-3 text-ink-muted"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan shadow-[0_0_8px_#22D3EE]" />
              <span className="leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>
      );
    case "code":
      return (
        <Reveal>
          <CodeBlock code={block.code} lang={block.lang} title={block.title} />
        </Reveal>
      );
    case "callout": {
      const { icon: Icon, cls } = calloutStyles[block.tone];
      return (
        <Reveal>
          <div className={cn("my-6 flex gap-3 rounded-xl border p-4 text-sm leading-relaxed", cls)}>
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-ink/85">{block.text}</p>
          </div>
        </Reveal>
      );
    }
    case "steps":
      return (
        <RevealGroup className="relative my-6 space-y-4 pl-2" gap={0.08}>
          <span aria-hidden className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-violet/60 via-cyan/40 to-transparent" />
          {block.items.map((s, i) => (
            <RevealItem key={s.title}>
              <div className="group relative flex gap-4">
                <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-violet/40 bg-bg font-mono text-[11px] text-violet-soft transition-all duration-300 group-hover:scale-110 group-hover:border-cyan group-hover:text-cyan">
                  {i + 1}
                </span>
                <div className="pb-1">
                  <h4 className="font-display text-base font-medium text-ink">{s.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.text}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      );
    case "grid":
      return (
        <RevealGroup className="my-6 grid gap-4 sm:grid-cols-2">
          {block.items.map((g, i) => (
            <RevealItem key={g.title}>
              <SpotlightCard glow={i % 2 ? "cyan" : "violet"} className="h-full">
                <div className="p-5">
                  <h4 className="font-display font-medium text-ink">{g.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{g.text}</p>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      );
  }
}

export function DocContent({ section }: { section: DocSection }) {
  return (
    <section id={section.id} data-doc-section className="scroll-mt-28 border-b border-line pb-14 pt-2 last:border-0">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">{section.eyebrow}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold sm:text-3xl">{section.title}</h2>
          {section.badge && <Badge tone="warning" dot>{section.badge}</Badge>}
        </div>
      </Reveal>
      {section.blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </section>
  );
}
