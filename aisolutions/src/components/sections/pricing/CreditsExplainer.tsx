import { useState } from "react";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import { creditCosts } from "@/data/pricing";
import { RevealGroup, RevealItem } from "@/components/fx";

const MAX = Math.max(...creditCosts.map((c) => c.credits));

/** Bars that grow on scroll to show what each action costs in credits. */
export function CreditsExplainer() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <span className="eyebrow">Credits</span>
        <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">Pay for the work the agents do</h2>
        <p className="mt-4 text-ink-muted">
          Every plan includes monthly credits. Planning is cheap, so you can explore freely. Full generation costs more because many agents work in parallel.
        </p>
        <p className="mt-4 text-xs text-ink-faint">Costs shown are illustrative and may change before launch.</p>
      </div>
      <RevealGroup className="panel space-y-4 p-6" gap={0.08}>
        {creditCosts.map((c, i) => (
          <RevealItem key={c.action}>
            <div onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="group cursor-default">
              <div className="flex items-center justify-between text-sm">
                <span className={hover === i ? "text-ink" : "text-ink-muted"}>{c.action}</span>
                <span className="inline-flex items-center gap-1 font-mono text-cyan-soft">
                  <Coins className="h-3.5 w-3.5" /> {c.credits}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-elevated">
                <motion.div
                  className="h-full rounded-full bg-brand-gradient"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.max(4, (c.credits / MAX) * 100)}%` }}
                  viewport={{ once: true }}
                  animate={{ filter: hover === i ? "brightness(1.4)" : "brightness(1)" }}
                  transition={{ duration: 1.1, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
