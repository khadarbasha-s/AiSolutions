import { motion } from "framer-motion";
import { ClipboardCheck, Code2, Eye, Lock, Layers, ShieldCheck, Sparkles, Users, UserCheck } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { CtaBand } from "@/components/layout/CtaBand";
import { AgentGraph, BorderBeam, Marquee, ParallaxY, ParticleField, Reveal, RevealGroup, RevealItem, ScrambleText, SpotlightCard, SplitReveal, TiltCard } from "@/components/fx";
import { RoadmapTimeline } from "@/components/sections/about/RoadmapTimeline";

const principles = [
  { icon: ClipboardCheck, title: "Plan before build", text: "The AI understands the problem, asks questions and writes a plan before it writes any code." },
  { icon: Code2, title: "You own the code", text: "Every generated application can be inspected, edited and exported as a standard repository." },
  { icon: Lock, title: "Isolation by default", text: "Each project runs in its own sandbox. One customer's files and secrets are never visible to another." },
  { icon: UserCheck, title: "Human approval", text: "People decide. Requirements and architecture need your sign-off before generation starts." },
];

const values = [
  { icon: Eye, title: "Transparency", text: "Show the reasoning, the plan and the code. No black boxes." },
  { icon: Layers, title: "Modularity", text: "Specialist agents with clear inputs, outputs and validation rules." },
  { icon: ShieldCheck, title: "Security first", text: "Sandboxed execution, scoped credentials and security review on every build." },
  { icon: Users, title: "For everyone", text: "Useful to non-technical founders, developers and enterprise teams alike." },
  { icon: Sparkles, title: "Craft", text: "Generated software should be as readable as software written by a careful engineer." },
  { icon: ClipboardCheck, title: "Quality gates", text: "QA and Security agents review every change before you see it." },
];

const words = ["Understand", "Clarify", "Specify", "Design", "Approve", "Generate", "Test", "Deploy", "Monitor"];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About InfoDrizzle"
        title="From problem to product, with you in control"
        subtitle="InfoDrizzle AI Solutions is building an AI development platform that plans like an architect, builds like a team and lets you own the result."
      />

      <div className="relative border-y border-line bg-surface/30 py-5">
        <Marquee speed={35}>
          {words.map((w) => (
            <span key={w} className="flex items-center gap-4 font-display text-2xl font-medium text-ink-faint transition-colors hover:text-ink sm:text-3xl">
              {w} <span className="h-1.5 w-1.5 rounded-full bg-violet" />
            </span>
          ))}
        </Marquee>
      </div>

      <Section className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <ParticleField id="about-particles" density={30} />
        </div>
        <div className="relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow">Our mission</span>
            </Reveal>
            <SplitReveal as="h2" by="words" className="mt-5 text-3xl font-semibold leading-tight sm:text-5xl">
              Make building software as simple as describing a problem.
            </SplitReveal>
            <Reveal delay={0.15}>
              <p className="mt-6 leading-relaxed text-ink-muted">
                Most ideas never become software because building it takes time, money and a specialist team. We are building a platform where you describe what you need in plain language, and a coordinated team of AI agents designs, builds, tests and deploys it.
              </p>
              <p className="mt-4 leading-relaxed text-ink-muted">
                The difference is discipline. Our agents do not guess. They ask, plan and wait for your approval, the way a good engineering team would.
              </p>
            </Reveal>
          </div>
          <ParallaxY offset={40}>
            <div className="relative rounded-3xl border border-line bg-surface/50 p-4 sm:p-8">
              <BorderBeam duration={12} />
              <AgentGraph />
            </div>
          </ParallaxY>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Principles" title="Four rules we build by" subtitle="These decisions shape every part of the product, from the first prompt to the deployed application." />
        <RevealGroup className="grid gap-5 sm:grid-cols-2">
          {principles.map((p, i) => (
            <RevealItem key={p.title}>
              <TiltCard className="h-full rounded-2xl" max={7}>
                <div className="panel group relative h-full overflow-hidden p-7">
                  <span className="absolute right-6 top-5 font-display text-6xl font-bold text-white/[0.03] transition-colors duration-500 group-hover:text-violet/10">0{i + 1}</span>
                  <motion.span whileHover={{ rotate: 8, scale: 1.1 }} className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet/30 bg-violet/10 text-violet-soft transition-shadow group-hover:shadow-glow">
                    <p.icon className="h-5 w-5" />
                  </motion.span>
                  <h3 className="mt-5 text-xl font-semibold">
                    <ScrambleText text={p.title} />
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{p.text}</p>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHeading eyebrow="Roadmap" title="Five phases to a complete platform" subtitle="We ship in deliberate stages. Scroll to follow the plan." />
        <RoadmapTimeline />
      </Section>

      <Section>
        <SectionHeading eyebrow="Values" title="What we care about" />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {values.map((v, i) => (
            <RevealItem key={v.title}>
              <SpotlightCard glow={i % 2 ? "cyan" : "violet"} className="h-full">
                <div className="p-6">
                  <v.icon className="h-5 w-5 text-cyan transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-125" />
                  <h3 className="mt-4 font-display text-lg font-medium">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.text}</p>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand title="Help shape what we build next." subtitle="Start a project today, or tell us what you need from the platform." />
    </>
  );
}
