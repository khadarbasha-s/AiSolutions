import { Hero } from "@/components/sections/home/Hero";
import { TechMarquee } from "@/components/sections/home/TechMarquee";
import { JourneySection } from "@/components/sections/home/JourneySection";
import { AgentsSection } from "@/components/sections/home/AgentsSection";
import { PipelineSection } from "@/components/sections/home/PipelineSection";
import { BentoSection } from "@/components/sections/home/BentoSection";
import { StatsSection } from "@/components/sections/home/StatsSection";
import { IndustriesSection } from "@/components/sections/home/IndustriesSection";
import { CtaBand } from "@/components/layout/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <JourneySection />
      <AgentsSection />
      <PipelineSection />
      <BentoSection />
      <StatsSection />
      <IndustriesSection />
      <CtaBand />
    </>
  );
}
