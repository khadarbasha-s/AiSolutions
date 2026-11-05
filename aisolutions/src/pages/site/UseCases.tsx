import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic, Meteors, ParticleField, Reveal } from "@/components/fx";
import { CtaBand } from "@/components/layout/CtaBand";
import { UseCaseGrid } from "@/components/sections/usecases/UseCaseGrid";
import { FeaturedWalkthrough } from "@/components/sections/usecases/FeaturedWalkthrough";

export default function UseCases() {
  return (
    <>
      <div className="relative">
        <ParticleField id="uc-hero-particles" density={40} className="opacity-60" />
        <PageHero
          eyebrow="Use cases"
          title={<>Real problems, <span className="text-gradient">working software</span>.</>}
          subtitle="See the kinds of applications teams describe in a few sentences, and what the agents plan and build from them."
        >
          <div className="mt-9 flex justify-center">
            <Magnetic>
              <ButtonLink to="/signup" size="lg">Describe your problem <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></ButtonLink>
            </Magnetic>
          </div>
        </PageHero>
      </div>

      <section className="relative overflow-hidden py-16 sm:py-24">
        <motion.div aria-hidden className="absolute right-[-10%] top-10 h-[460px] w-[460px] rounded-full bg-violet/15 blur-[130px]" animate={{ y: [0, 60, 0], scale: [1, 1.1, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container relative">
          <SectionHeading eyebrow="Featured walkthrough" title="From a paragraph to a preview." subtitle="One example, end to end: the problem as written, the plan the agents return, and the application they generate after approval." />
          <Reveal>
            <FeaturedWalkthrough />
          </Reveal>
        </div>
      </section>

      <Section className="overflow-hidden">
        <Meteors count={10} />
        <div aria-hidden className="dot-bg mask-radial pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative">
          <SectionHeading eyebrow="Browse by industry" title="Ideas to start from." subtitle="Every application is generated from your own problem statement, not a fixed template. These examples show what is possible." />
          <UseCaseGrid />
        </div>
      </Section>

      <CtaBand title="Your problem is the next use case." subtitle="Write it the way you would explain it to a colleague. The agents take it from there." />
    </>
  );
}
