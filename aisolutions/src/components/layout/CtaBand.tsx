import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic, Meteors, BorderBeam, SplitReveal, Reveal } from "@/components/fx";

/** Closing call to action shared by marketing pages. */
export function CtaBand({ title = "Your next application is one conversation away.", subtitle = "Describe the problem. Review the plan. Ship the product." }: { title?: string; subtitle?: string }) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/70 px-6 py-16 text-center sm:px-16 sm:py-24">
          <BorderBeam duration={10} />
          <Meteors count={16} />
          <div aria-hidden className="absolute -top-40 left-1/2 h-80 w-[60%] -translate-x-1/2 rounded-full bg-violet/30 blur-[100px]" />
          <div className="relative">
            <SplitReveal as="h2" by="words" className="mx-auto max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
              {title}
            </SplitReveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-5 max-w-xl text-ink-muted sm:text-lg">{subtitle}</p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Magnetic>
                  <ButtonLink to="/signup" size="lg">
                    Start building free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </ButtonLink>
                </Magnetic>
                <Magnetic>
                  <ButtonLink to="/contact" size="lg" variant="secondary">Talk to sales</ButtonLink>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
