import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, ArrowRight, Boxes, CheckCircle2, ShieldCheck, SearchX } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Magnetic, Marquee, Meteors, Reveal, RevealGroup, RevealItem, SpotlightCard, TiltCard, ParallaxY } from "@/components/fx";
import { CtaBand } from "@/components/layout/CtaBand";
import { WorkflowRail } from "@/components/sections/solutions/WorkflowRail";
import { getIndustry, industries } from "@/data/industries";
import { cn } from "@/lib/cn";

function UnknownIndustry() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 14 }}
        className="flex h-20 w-20 items-center justify-center rounded-3xl border border-violet/30 bg-surface shadow-glow"
      >
        <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <SearchX className="h-9 w-9 text-violet-soft" />
        </motion.span>
      </motion.div>
      <h1 className="mt-8 text-3xl font-semibold sm:text-4xl">We haven't mapped that industry yet</h1>
      <p className="mt-4 max-w-md text-ink-muted">
        The platform can still build for it. Describe your problem in the studio, or browse the industries we have mapped.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink to="/solutions" variant="secondary">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All solutions
        </ButtonLink>
        <ButtonLink to="/signup">Describe your problem</ButtonLink>
      </div>
    </section>
  );
}

export default function Industry() {
  const { industry: slug } = useParams();
  const industry = getIndustry(slug);
  if (!industry) return <UnknownIndustry />;

  const idx = industries.indexOf(industry);
  const prev = industries[(idx - 1 + industries.length) % industries.length];
  const next = industries[(idx + 1) % industries.length];
  const Icon = industry.icon;
  const isCyan = industry.accent === "cyan";

  return (
    <>
      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[640px] overflow-hidden">
          <motion.div
            className={cn("absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-[120px]", isCyan ? "bg-cyan/20" : "bg-violet/25")}
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <Meteors count={10} />
        </div>
        <PageHero
          eyebrow={`Solutions / ${industry.name}`}
          title={<>{industry.name} applications, <span className="text-gradient">built by AI agents</span></>}
          subtitle={industry.tagline + " " + industry.summary}
        >
          <div className="mt-10 flex flex-col items-center gap-6">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className={cn("flex h-20 w-20 items-center justify-center rounded-3xl border bg-surface", isCyan ? "border-cyan/40 shadow-glow-cyan" : "border-violet/40 shadow-glow")}
            >
              <Icon className={cn("h-9 w-9", isCyan ? "text-cyan" : "text-violet-soft")} />
            </motion.div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <ButtonLink to="/signup" size="lg">
                  Build for {industry.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink to="/solutions" size="lg" variant="secondary">All solutions</ButtonLink>
              </Magnetic>
            </div>
          </div>
        </PageHero>
      </div>

      <Section>
        <SectionHeading eyebrow="The challenge" title={`What slows ${industry.name.toLowerCase()} teams down`} />
        <RevealGroup className="grid gap-5 md:grid-cols-3" gap={0.12}>
          {industry.challenges.map((c, i) => (
            <RevealItem key={c.title} className="h-full">
              <SpotlightCard glow={industry.accent} className="h-full">
                <div className="p-6">
                  <motion.span
                    whileHover={{ rotate: [0, -12, 12, 0] }}
                    transition={{ duration: 0.5 }}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-warning/30 bg-warning/10 text-warning"
                  >
                    <AlertTriangle className="h-5 w-5" />
                  </motion.span>
                  <p className="mt-1 text-right font-mono text-[11px] text-ink-faint">0{i + 1}</p>
                  <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.detail}</p>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <ParallaxY offset={120} className="absolute -left-20 top-10">
            <div className="h-64 w-64 rounded-full bg-violet/15 blur-[90px]" />
          </ParallaxY>
          <ParallaxY offset={-100} className="absolute -right-10 bottom-0">
            <div className="h-72 w-72 rounded-full bg-cyan/10 blur-[90px]" />
          </ParallaxY>
        </div>
        <SectionHeading eyebrow="What you can build" title="Applications the platform can generate" subtitle="Examples to start from. Each one is generated from your own requirements, not copied from a template." />
        <RevealGroup className="relative grid gap-5 sm:grid-cols-2" gap={0.1}>
          {industry.apps.map((a, i) => (
            <RevealItem key={a.title} className="h-full">
              <TiltCard max={6} className="h-full rounded-2xl">
                <div className="panel group relative h-full overflow-hidden p-6 transition-colors hover:border-violet/40 sm:p-7">
                  <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gradient opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
                  <div className="relative flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-elevated transition-transform duration-300 group-hover:scale-110">
                      <Boxes className={cn("h-5 w-5", i % 2 ? "text-cyan" : "text-violet-soft")} />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{a.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.detail}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHeading eyebrow="Agent workflow" title="How the agents build it" subtitle="The orchestrator splits the work. Each agent owns one responsibility and hands validated output to the next." />
        <WorkflowRail industry={industry} />
      </Section>

      <section className="relative py-16">
        <Reveal className="container mb-8 text-center">
          <span className="eyebrow">Integrations</span>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Connects to the tools you already use</h2>
        </Reveal>
        <div className="space-y-4">
          <Marquee speed={35}>
            {industry.integrations.map((name) => (
              <span key={name} className="whitespace-nowrap rounded-xl border border-line bg-surface/70 px-5 py-3 font-display text-sm text-ink-muted transition-colors hover:border-cyan/40 hover:text-ink">
                {name}
              </span>
            ))}
          </Marquee>
          <Marquee speed={42} reverse>
            {[...industry.integrations].reverse().map((name) => (
              <span key={name} className="whitespace-nowrap rounded-xl border border-line bg-surface/70 px-5 py-3 font-display text-sm text-ink-muted transition-colors hover:border-violet/40 hover:text-ink">
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Badge tone="success"><ShieldCheck className="h-3.5 w-3.5" /> Security & compliance</Badge>
            <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">Built with your data responsibilities in mind</h2>
            <p className="mt-4 text-ink-muted">
              Every project runs in its own isolated environment. Your compliance team can review the generated code and access rules before anything goes live.
            </p>
          </Reveal>
          <RevealGroup className="space-y-3" gap={0.1}>
            {industry.security.map((s) => (
              <RevealItem key={s}>
                <motion.div whileHover={{ x: 6 }} className="panel flex items-start gap-3 p-4 transition-colors hover:border-success/40">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <p className="text-sm text-ink-muted">{s}</p>
                </motion.div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <section className="container py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {[{ ind: prev, dir: "prev" as const }, { ind: next, dir: "next" as const }].map(({ ind, dir }) => (
            <Link key={dir} to={`/solutions/${ind.slug}`} className={cn("group panel relative flex items-center gap-4 overflow-hidden p-5 transition-colors hover:border-violet/40", dir === "next" && "sm:flex-row-reverse sm:text-right")}>
              <div aria-hidden className="absolute inset-0 bg-brand-gradient-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <motion.span
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-elevated"
                whileHover={{ x: dir === "prev" ? -4 : 4 }}
              >
                {dir === "prev" ? (
                  <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </motion.span>
              <span className="relative">
                <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-faint">{dir === "prev" ? "Previous" : "Next"} industry</span>
                <span className="mt-1 flex items-center gap-2 font-display text-lg font-semibold">
                  <ind.icon className="h-4 w-4 text-violet-soft" /> {ind.name}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand title={`Ready to build your ${industry.name.toLowerCase()} application?`} />
    </>
  );
}
