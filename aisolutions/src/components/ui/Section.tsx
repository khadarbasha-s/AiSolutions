import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SplitReveal } from "@/components/fx/SplitReveal";
import { Reveal } from "@/components/fx/Reveal";

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", className)}>
      <div className="container">{children}</div>
    </section>
  );
}

/** Eyebrow, animated SplitText title and subtitle. */
export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; align?: "center" | "left"; className?: string }) {
  return (
    <div className={cn("mb-12 max-w-3xl sm:mb-16", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_#22D3EE]" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <SplitReveal as="h2" by="words" className="mt-5 text-3xl font-semibold leading-[1.1] text-ink sm:text-5xl">
        {title}
      </SplitReveal>
      {subtitle && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Large page hero used by inner marketing pages. */
export function PageHero({ eyebrow, title, subtitle, children }: { eyebrow: string; title: ReactNode; subtitle?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-44">
      <div className="container relative text-center">
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_#22D3EE]" />
            {eyebrow}
          </span>
        </Reveal>
        <SplitReveal as="h1" by="chars" immediate className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl 2xl:max-w-6xl 2xl:text-[5.25rem]">
          {title}
        </SplitReveal>
        {subtitle && (
          <Reveal delay={0.35}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg 2xl:max-w-3xl 2xl:text-xl">{subtitle}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.5}>{children}</Reveal>}
      </div>
    </section>
  );
}
