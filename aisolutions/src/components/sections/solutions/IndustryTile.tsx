import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard, TiltCard } from "@/components/fx";
import type { Industry } from "@/data/industries";
import { cn } from "@/lib/cn";

/** Industry tile: tilt + spotlight, icon that spins up on hover, arrow that slides out. */
export function IndustryTile({ industry, index }: { industry: Industry; index: number }) {
  const Icon = industry.icon;
  const isCyan = industry.accent === "cyan";
  return (
    <TiltCard max={7} className="h-full rounded-2xl">
      <Link to={`/solutions/${industry.slug}`} className="block h-full" aria-label={`${industry.name} solutions`}>
        <SpotlightCard glow={industry.accent} className="h-full">
          <div className="relative flex h-full flex-col p-6 sm:p-7">
            <span aria-hidden className="absolute right-5 top-5 font-mono text-xs text-ink-faint">0{index + 1}</span>
            <motion.span
              whileHover={{ rotate: 12, scale: 1.1 }}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl border transition-shadow duration-300",
                isCyan ? "border-cyan/30 bg-cyan/10 text-cyan group-hover:shadow-glow-cyan" : "border-violet/30 bg-violet/10 text-violet-soft group-hover:shadow-glow",
              )}
            >
              <Icon className="h-6 w-6" />
            </motion.span>
            <h3 className="mt-6 text-xl font-semibold">{industry.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{industry.summary}</p>
            <ul className="mt-5 space-y-1.5">
              {industry.apps.slice(0, 3).map((a) => (
                <li key={a.title} className="flex items-center gap-2 text-xs text-ink-muted">
                  <span className={cn("h-1 w-1 rounded-full", isCyan ? "bg-cyan" : "bg-violet")} /> {a.title}
                </li>
              ))}
            </ul>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
              Explore {industry.name}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </SpotlightCard>
      </Link>
    </TiltCard>
  );
}
