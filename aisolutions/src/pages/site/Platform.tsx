import { ArrowRight, Layers } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic, ParticleField } from "@/components/fx";
import { CtaBand } from "@/components/layout/CtaBand";
import { ArchitectureStack } from "@/components/sections/platform/ArchitectureStack";
import { PlanFirstFlow } from "@/components/sections/platform/PlanFirstFlow";
import { IsolationSection } from "@/components/sections/platform/IsolationSection";
import { CodeOwnership } from "@/components/sections/platform/CodeOwnership";

export default function Platform() {
  return (
    <>
      <div className="relative">
        <ParticleField id="platform-hero-particles" density={45} className="opacity-60" />
        <PageHero
          eyebrow="The platform"
          title={<>One platform from <span className="text-gradient">problem</span> to production.</>}
          subtitle="A public website and an AI Application Studio, running on one shared backend for authentication, projects and AI orchestration."
        >
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <ButtonLink to="/signup" size="lg">Start building <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink to="/ai-capabilities" size="lg" variant="secondary"><Layers className="h-4 w-4" /> Meet the agents</ButtonLink>
            </Magnetic>
          </div>
        </PageHero>
      </div>

      <Section>
        <SectionHeading
          eyebrow="Architecture"
          title="Four layers, one connected system."
          subtitle="Both experiences share the same backend, authentication, project management and AI orchestration. The generation engine runs as its own modular service."
        />
        <ArchitectureStack />
      </Section>

      <PlanFirstFlow />
      <IsolationSection />
      <CodeOwnership />
      <CtaBand title="See the plan before you see the code." subtitle="Start with a problem statement. Approve the plan. Then let the agents build." />
    </>
  );
}
