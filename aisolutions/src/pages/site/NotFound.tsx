import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic, ParticleField, ScrambleText } from "@/components/fx";

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden pt-28">
      <ParticleField id="notfound-particles" density={60} />
      <div className="container relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="relative mx-auto inline-block select-none"
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 font-display text-[34vw] font-bold leading-none text-cyan/40 sm:text-[220px]"
            animate={{ x: [0, -4, 3, 0, 2, 0], opacity: [0.6, 0.3, 0.7, 0.5] }}
            transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2.4 }}
          >
            404
          </motion.span>
          <motion.span
            aria-hidden
            className="absolute inset-0 font-display text-[34vw] font-bold leading-none text-violet/50 sm:text-[220px]"
            animate={{ x: [0, 4, -3, 0, -2, 0], opacity: [0.6, 0.3, 0.7, 0.5] }}
            transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2.4, delay: 0.05 }}
          >
            404
          </motion.span>
          <motion.span className="relative block font-display text-[34vw] font-bold leading-none sm:text-[220px]" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <ScrambleText text="404" className="text-gradient" duration={1200} />
          </motion.span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-4 text-2xl font-semibold sm:text-4xl">
          The agents could not find this page
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mx-auto mt-4 max-w-md text-ink-muted">
          Nothing lives at <code className="rounded bg-elevated px-1.5 py-0.5 font-mono text-sm text-cyan-soft">{pathname}</code>. It may have moved, or it was never planned.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <ButtonLink to="/" size="lg">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to home
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink to="/docs" size="lg" variant="secondary">
              <BookOpen className="h-4 w-4" /> Browse the docs
            </ButtonLink>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
