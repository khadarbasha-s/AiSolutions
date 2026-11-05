import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Download, Zap } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem, Meteors } from "@/components/fx";
import { CtaBand } from "@/components/layout/CtaBand";
import { BillingToggle, type Billing } from "@/components/sections/pricing/BillingToggle";
import { PlanCard } from "@/components/sections/pricing/PlanCard";
import { ComparisonTable } from "@/components/sections/pricing/ComparisonTable";
import { CreditsExplainer } from "@/components/sections/pricing/CreditsExplainer";
import { FaqAccordion } from "@/components/sections/pricing/FaqAccordion";
import { plans, pricingFaq } from "@/data/pricing";
import { fadeUp } from "@/lib/motion";

const assurances = [
  { icon: Download, text: "Own and export your source code" },
  { icon: ShieldCheck, text: "Isolated environment for every project" },
  { icon: Zap, text: "Upgrade or downgrade any time" },
];

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("yearly");

  return (
    <>
      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <Meteors count={12} />
        </div>
        <PageHero
          eyebrow="Pricing"
          title={<>Simple plans. <span className="text-gradient">Credits that scale.</span></>}
          subtitle="Start free and plan your first application. Upgrade when you're ready to generate, host and export."
        >
          <div className="mt-10 flex justify-center">
            <BillingToggle value={billing} onChange={setBilling} />
          </div>
        </PageHero>
      </div>

      <section className="relative pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-1/3 h-[420px] w-[70%] -translate-x-1/2 rounded-full bg-violet/15 blur-[130px]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="container relative">
          <RevealGroup className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:pt-4" gap={0.1}>
            {plans.map((p) => (
              <RevealItem key={p.key} variants={fadeUp} className="h-full">
                <PlanCard plan={p} billing={billing} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {assurances.map((a) => (
                <span key={a.text} className="inline-flex items-center gap-2 text-sm text-ink-muted">
                  <a.icon className="h-4 w-4 text-cyan" /> {a.text}
                </span>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-ink-faint">Prices in INR, excluding taxes. Plans and prices are indicative and subject to change.</p>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Compare plans" title="Everything in each plan" />
        <Reveal>
          <ComparisonTable />
        </Reveal>
      </Section>

      <Section>
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-cyan/10 blur-[100px]"
            animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="relative">
          <CreditsExplainer />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title="Questions about pricing" />
        <FaqAccordion items={pricingFaq} />
      </Section>

      <CtaBand title="Start free. Upgrade when your app is ready to ship." />
    </>
  );
}
