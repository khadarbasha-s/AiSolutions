import { AnimatedCounter, RevealGroup, RevealItem, ScrambleText } from "@/components/fx";
import { Section } from "@/components/ui/Section";

const stats = [
  { value: 10, label: "Specialist agents", note: "Requirement to Security" },
  { value: 7, label: "Plan-first stages", note: "Nothing builds without approval" },
  { value: 3, label: "LLM providers", note: "OpenAI, Anthropic, Gemini" },
  { value: 100, suffix: "%", label: "Code ownership", note: "Inspect, edit and export" },
];

export function StatsSection() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/60">
        <div aria-hidden className="grid-bg absolute inset-0 animate-grid-pan opacity-50" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
        <RevealGroup className="relative grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x" gap={0.1}>
          {stats.map((s) => (
            <RevealItem key={s.label} className="group p-6 text-center transition-colors duration-300 hover:bg-white/[0.02] sm:p-10">
              <AnimatedCounter to={s.value} suffix={s.suffix} className="block font-display text-4xl font-semibold text-gradient sm:text-6xl" />
              <ScrambleText text={s.label} className="mt-3 block font-mono text-xs uppercase tracking-[0.18em] text-ink" />
              <p className="mt-2 text-xs text-ink-muted sm:text-sm">{s.note}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
