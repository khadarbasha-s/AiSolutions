import { Marquee } from "@/components/fx";

const row1 = ["LangGraph", "Retrieval-augmented generation", "pgvector", "FastAPI", "React", "Docker", "PostgreSQL", "Redis", "TypeScript", "Tailwind CSS"];
const row2 = ["OpenAI", "Anthropic", "Gemini", "Multi-agent orchestration", "Sandboxed execution", "OpenTelemetry", "Langfuse", "AWS", "Temporal", "Vector search"];

function Chip({ label }: { label: string }) {
  return (
    <span className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface/60 px-4 py-2 font-mono text-xs text-ink-muted transition-colors duration-300 hover:border-violet/50 hover:text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-violet to-cyan transition-transform group-hover:scale-150" />
      {label}
    </span>
  );
}

export function TechMarquee() {
  return (
    <section className="relative py-10">
      <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">Built on a modern AI stack</p>
      <div className="space-y-3">
        <Marquee speed={45}>{row1.map((l) => <Chip key={l} label={l} />)}</Marquee>
        <Marquee speed={50} reverse>{row2.map((l) => <Chip key={l} label={l} />)}</Marquee>
      </div>
    </section>
  );
}
