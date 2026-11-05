import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquareText, Sparkles, Wand2 } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam, Magnetic, Marquee, ParticleField, RevealGroup, RevealItem, Reveal, Typewriter, AnimatedCounter } from "@/components/fx";
import { CtaBand } from "@/components/layout/CtaBand";
import { IndustryTile } from "@/components/sections/solutions/IndustryTile";
import { industries } from "@/data/industries";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { scaleIn } from "@/lib/motion";

const steps = [
  { icon: MessageSquareText, title: "Describe it", detail: "Write the problem in plain language, in any industry." },
  { icon: Sparkles, title: "Review the plan", detail: "The AI asks questions, then proposes requirements and architecture." },
  { icon: Wand2, title: "Generate and ship", detail: "Approve the plan and the agents build, test and deploy it." },
];

export default function Solutions() {
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !lineRef.current) return;
      gsap.fromTo(
        lineRef.current.querySelector("[data-line]"),
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: lineRef.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 } },
      );
    },
    { scope: lineRef },
  );

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={<>AI applications for <span className="text-gradient">every industry</span></>}
        subtitle="One platform, shaped by your domain. Start from what your industry needs, then describe the specifics and let the agents build it."
      >
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {industries.map((i, idx) => (
            <motion.a
              key={i.slug}
              href={`#tile-${i.slug}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + idx * 0.06 }}
              whileHover={{ y: -3 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-sm text-ink-muted backdrop-blur transition-colors hover:border-violet/40 hover:text-ink"
            >
              <i.icon className="h-3.5 w-3.5" /> {i.name}
            </motion.a>
          ))}
        </div>
      </PageHero>

      <Section className="pt-0">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-violet/15 blur-[100px]"
            animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <RevealGroup className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
          {industries.map((ind, i) => (
            <RevealItem key={ind.slug} variants={scaleIn} className="scroll-mt-28">
              <div id={`tile-${ind.slug}`} className="h-full">
                <IndustryTile industry={ind} index={i} />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { to: industries.length, suffix: "", label: "Industry starting points" },
            { to: 10, suffix: "", label: "Specialist AI agents per build" },
            { to: 100, suffix: "%", label: "Source code you own" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="panel group relative overflow-hidden p-6 text-center transition-colors hover:border-violet/40">
                <div aria-hidden className="absolute inset-0 bg-brand-gradient-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="relative font-display text-5xl font-semibold text-gradient">
                  <AnimatedCounter to={s.to} suffix={s.suffix} />
                </p>
                <p className="relative mt-2 text-sm text-ink-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Don't see your industry?"
          title="Describe your problem. We'll design the solution."
          subtitle="Industry pages are starting points, not limits. The platform generates applications dynamically from your problem statement."
        />
        <div ref={lineRef} className="relative">
          <div aria-hidden className="absolute left-[16%] right-[16%] top-8 hidden h-px bg-line sm:block">
            <div data-line className="h-full origin-left bg-brand-gradient" />
          </div>
          <RevealGroup className="relative grid gap-8 sm:grid-cols-3" gap={0.15}>
            {steps.map((s, i) => (
              <RevealItem key={s.title} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet/30 bg-surface shadow-glow"
                >
                  <s.icon className="h-7 w-7 text-violet-soft" />
                </motion.div>
                <p className="mt-2 font-mono text-[11px] text-ink-faint">STEP 0{i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-ink-muted">{s.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-line bg-surface/70 p-6 sm:p-10">
            <BorderBeam duration={9} />
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <ParticleField id="solutions-particles" density={30} />
            </div>
            <div className="relative">
              <Badge tone="cyan" dot>Any domain</Badge>
              <p className="mt-5 min-h-[5.5rem] font-display text-xl leading-snug text-ink sm:min-h-[4.5rem] sm:text-2xl">
                <Typewriter
                  phrases={[
                    "A legal intake app that summarises case files and flags deadlines.",
                    "A logistics tracker that predicts late shipments and alerts customers.",
                    "An NGO volunteer portal that matches skills with field projects.",
                    "A real-estate CRM that qualifies leads and books site visits.",
                  ]}
                />
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Magnetic>
                  <ButtonLink to="/signup" size="lg">
                    Describe your problem <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </ButtonLink>
                </Magnetic>
                <Magnetic>
                  <ButtonLink to="/use-cases" size="lg" variant="secondary">See use cases</ButtonLink>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <div className="py-6">
        <Marquee speed={45}>
          {industries.flatMap((i) => i.apps).map((a) => (
            <span key={a.title} className="whitespace-nowrap rounded-full border border-line bg-surface/60 px-4 py-2 text-sm text-ink-muted">
              {a.title}
            </span>
          ))}
        </Marquee>
      </div>

      <CtaBand />
    </>
  );
}
