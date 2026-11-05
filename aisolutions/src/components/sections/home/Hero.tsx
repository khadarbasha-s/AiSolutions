import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Paperclip, Sparkles, Wand2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam, Magnetic, ParticleField, SplitReveal, Typewriter } from "@/components/fx";
import { ease } from "@/lib/motion";

const HeroScene = lazy(() => import("@/components/fx/HeroScene"));

function OrbFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-56 w-56">
        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-violet/60 to-cyan/40 blur-2xl" />
        <div className="absolute inset-6 animate-spin-slow rounded-full border border-cyan/30" />
        <div className="absolute inset-12 rounded-full bg-gradient-to-br from-violet-deep to-violet" />
      </div>
    </div>
  );
}

/** Renders the WebGL scene only on capable, motion-friendly devices. */
function useCanRender3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setOk(webgl && !reduced);
  }, []);
  return ok;
}

const prompts = [
  "An AI recruitment platform that screens resumes, matches candidates to jobs and books interviews automatically.",
  "A clinic app with appointments, patient records and an AI triage assistant.",
  "A retail dashboard that forecasts demand and reorders stock on its own.",
  "A learning portal that builds personalised study plans from a syllabus PDF.",
];

export function Hero() {
  const can3D = useCanRender3D();
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:flex lg:min-h-screen lg:items-center lg:pb-16 lg:pt-28">
      <ParticleField id="home-hero-particles" density={60} className="opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />

      <div className="container relative grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: ease.out }}>
            <span className="eyebrow">
              <Sparkles className="h-3 w-3" /> InfoDrizzle AI Solutions
            </span>
          </motion.div>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.04] sm:text-6xl xl:text-7xl 2xl:text-[5.25rem]">
            <SplitReveal as="span" by="chars" immediate className="block">
              Describe a problem.
            </SplitReveal>
            {/* Gradient text is animated as one block: split characters lose background-clip text in Chromium. */}
            <motion.span
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.45, ease: ease.out }}
              className="text-gradient block pb-1"
            >
              Get a working AI application.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: ease.out }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg lg:mx-0 2xl:max-w-2xl 2xl:text-xl"
          >
            A central orchestrator and ten specialist agents understand your problem, ask the right questions, design the architecture and, once you approve, build, test and deploy it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.7, ease: ease.out }}
            className="relative mx-auto mt-9 max-w-xl 2xl:max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface/80 p-4 text-left shadow-panel backdrop-blur-xl lg:mx-0"
          >
            <BorderBeam duration={7} />
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-medium text-ink">What would you like to build?</p>
              <Badge tone="cyan" dot>AI ready</Badge>
            </div>
            <p className="mt-3 min-h-[4.5rem] text-sm leading-relaxed text-ink-muted sm:min-h-[3.5rem]">
              <Typewriter phrases={prompts} />
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-faint">
                <Paperclip className="h-3.5 w-3.5" /> Attach documents · Add context
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-gradient px-3 py-1.5 text-xs font-medium text-white">
                <Wand2 className="h-3.5 w-3.5" /> Analyze problem
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: ease.out }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Magnetic>
              <ButtonLink to="/signup" size="lg">
                Start building free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink to="/platform" size="lg" variant="secondary">See how it works</ButtonLink>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: ease.out }}
          className="relative mx-auto aspect-square w-full max-w-[520px] 2xl:max-w-[720px]"
        >
          <div aria-hidden className="absolute inset-[12%] rounded-full bg-violet/20 blur-[80px]" />
          {can3D ? (
            <Suspense fallback={<OrbFallback />}>
              <HeroScene />
            </Suspense>
          ) : (
            <OrbFallback />
          )}
          <motion.div
            className="glass absolute left-0 top-[14%] hidden rounded-xl px-3 py-2 text-xs sm:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-ink-faint">Requirement Agent</span>
            <span className="mt-0.5 block font-medium text-ink">3 clarifying questions</span>
          </motion.div>
          <motion.div
            className="glass absolute bottom-[16%] right-0 hidden rounded-xl px-3 py-2 text-xs sm:block"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-ink-faint">QA Agent</span>
            <span className="mt-0.5 flex items-center gap-1.5 font-medium text-success">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> Tests passing
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
