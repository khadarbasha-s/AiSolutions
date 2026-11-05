import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Factory, GraduationCap, HeartPulse, Landmark, ShoppingBag, Users, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem, TiltCard } from "@/components/fx";

const industries: { slug: string; name: string; icon: LucideIcon; example: string }[] = [
  { slug: "healthcare", name: "Healthcare", icon: HeartPulse, example: "Patient triage, appointments and clinical notes" },
  { slug: "education", name: "Education", icon: GraduationCap, example: "Personalised learning paths and auto-graded work" },
  { slug: "finance", name: "Finance", icon: Landmark, example: "Document review, risk scoring and reporting" },
  { slug: "hr", name: "HR", icon: Users, example: "Resume screening, matching and interview scheduling" },
  { slug: "retail", name: "Retail", icon: ShoppingBag, example: "Demand forecasting and AI shopping assistants" },
  { slug: "manufacturing", name: "Manufacturing", icon: Factory, example: "Maintenance prediction and quality inspection" },
];

export function IndustriesSection() {
  return (
    <Section>
      <SectionHeading eyebrow="Solutions" title="Built for the problems your industry actually has." subtitle="Start from a blank prompt or from an industry blueprint, then shape it to your workflow." />
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
        {industries.map((ind) => (
          <RevealItem key={ind.slug}>
            <TiltCard className="rounded-2xl" max={8}>
              <Link to={`/solutions/${ind.slug}`} className="group relative block overflow-hidden rounded-2xl border border-line bg-surface/70 p-6 transition-colors duration-300 hover:border-violet/50">
                <motion.div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet/0 blur-2xl transition-colors duration-500 group-hover:bg-violet/30" />
                <div className="relative flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient-soft text-cyan transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
                    <ind.icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan" />
                </div>
                <h3 className="relative mt-5 text-lg font-semibold">{ind.name}</h3>
                <p className="relative mt-1.5 text-sm text-ink-muted">{ind.example}</p>
              </Link>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
