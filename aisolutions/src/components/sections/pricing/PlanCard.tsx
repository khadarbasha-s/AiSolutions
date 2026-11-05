import { motion } from "framer-motion";
import { ArrowRight, Check, Coins, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { BorderBeam, SpotlightCard } from "@/components/fx";
import type { Plan } from "@/data/pricing";
import { AnimatedPrice } from "./AnimatedPrice";
import type { Billing } from "./BillingToggle";
import { cn } from "@/lib/cn";

export function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price = billing === "monthly" ? plan.monthly : plan.yearly;
  const period = plan.monthly === 0 ? "forever" : billing === "monthly" ? "/ month" : "/ month, billed yearly";
  const rec = plan.recommended;

  return (
    <div className={cn("relative h-full", rec && "lg:-mt-4")}>
      {rec && (
        <motion.div aria-hidden className="absolute -inset-3 -z-10 rounded-[28px] bg-violet/20 blur-2xl" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 4, repeat: Infinity }} />
      )}
      <SpotlightCard glow={rec ? "violet" : "cyan"} className={cn("h-full", rec && "bg-violet/40")}>
        {rec && <BorderBeam duration={6} />}
        <div className={cn("flex h-full flex-col p-6", rec && "lg:pb-10 lg:pt-10")}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            {rec && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-gradient px-2.5 py-0.5 text-[11px] font-semibold text-white">
                <Sparkles className="h-3 w-3" /> Recommended
              </span>
            )}
          </div>
          <p className="mt-2 min-h-[2.5rem] text-sm text-ink-muted">{plan.blurb}</p>
          <div className="mt-6 min-h-[3rem]">
            <AnimatedPrice value={price} period={plan.monthly === null ? "" : period} />
          </div>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-cyan-soft">
            <Coins className="h-4 w-4" /> {plan.credits}
          </p>
          <ButtonLink to={plan.cta.to} variant={rec ? "primary" : "secondary"} className="mt-6 w-full">
            {plan.cta.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
          <ul className="mt-7 space-y-3 border-t border-line pt-6">
            {plan.highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex items-start gap-2.5 text-sm text-ink-muted"
              >
                <span className={cn("mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full", rec ? "bg-violet/20 text-violet-soft" : "bg-cyan/10 text-cyan")}>
                  <Check className="h-3 w-3" />
                </span>
                {h}
              </motion.li>
            ))}
          </ul>
        </div>
      </SpotlightCard>
    </div>
  );
}
