import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { PageHero, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic, ParticleField, Meteors, Reveal, ScrambleText, Marquee } from "@/components/fx";
import { CtaBand } from "@/components/layout/CtaBand";
import { AgentDirectory } from "@/components/sections/capabilities/AgentDirectory";
import { CapabilityExplorer } from "@/components/sections/capabilities/CapabilityExplorer";
import { TerminalMock } from "@/components/sections/capabilities/TerminalMock";

const TECH = ["OpenAI", "Anthropic", "Gemini", "LangGraph", "pgvector", "PostgreSQL", "Redis", "Docker", "OpenTelemetry", "Langfuse", "FastAPI", "React"];

export default function AiCapabilities() {
  return (
    <>
      <div className="relative">
        <ParticleField id="cap-hero-particles" density={50} className="opacity-70" />
        <PageHero
          eyebrow="AI capabilities"
          title={<>An AI development team, <span className="text-gradient">orchestrated</span>.</>}
          subtitle="Ten specialist agents, the leading language models, retrieval over your own documents and measurable quality, coordinated by one central orchestrator."
        >
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <ButtonLink to="/signup" size="lg"><Sparkles className="h-4 w-4" /> Try it on your problem</ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink to="/platform" size="lg" variant="secondary">How the platform works <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></ButtonLink>
            </Magnetic>
          </div>
        </PageHero>
      </div>

      <div className="border-y border-line bg-surface/40 py-6">
        <Marquee speed={35}>
          {TECH.map((t) => (
            <span key={t} className="rounded-full border border-line bg-bg/60 px-5 py-2 font-mono text-sm text-ink-muted transition-colors hover:border-violet/50 hover:text-ink">
              {t}
            </span>
          ))}
        </Marquee>
      </div>

      <AgentDirectory />
      <CapabilityExplorer />

      <section className="relative overflow-hidden py-20 sm:py-28">
        <Meteors count={12} />
        <motion.div aria-hidden className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[120px]" animate={{ x: [0, 80, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Watch it work"
              title="Every step is visible."
              subtitle="Follow the orchestrator as agents hand work to each other. When the Security Agent finds a problem, the fix is routed back and re-checked automatically."
              className="mb-8"
            />
            <Reveal>
              <div className="grid grid-cols-3 gap-4">
                {[{ k: "AGENTS", v: "10" }, { k: "PROVIDERS", v: "3" }, { k: "APPROVAL", v: "YOU" }].map((s) => (
                  <div key={s.k} className="rounded-2xl border border-line bg-surface/70 p-4 transition-colors hover:border-cyan/40">
                    <ScrambleText text={s.v} className="block font-display text-3xl font-semibold text-gradient" />
                    <span className="mt-1 block font-mono text-[10px] tracking-[0.16em] text-ink-faint">{s.k}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <TerminalMock />
        </div>
      </section>

      <CtaBand title="Put the whole team on your problem." subtitle="Describe what you need. The orchestrator assigns the right agents and shows you the plan first." />
    </>
  );
}
