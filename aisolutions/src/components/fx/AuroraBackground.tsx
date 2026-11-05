import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Site-wide animated backdrop: drifting gradient orbs, a slowly panning grid,
 * a noise layer and a vignette. Fixed behind all content.
 */
export function AuroraBackground({ className, intensity = 1 }: { className?: string; intensity?: number }) {
  const { scrollYProgress } = useScroll();
  const shift = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const hue = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const filter = useTransform(hue, (h) => `hue-rotate(${h}deg)`);

  return (
    <div aria-hidden className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg", className)}>
      <motion.div style={{ y: shift, filter, opacity: intensity }} className="absolute inset-0">
        <motion.div
          className="absolute -left-[10%] -top-[15%] h-[60vmax] w-[60vmax] rounded-full bg-violet/25 blur-[120px]"
          animate={{ x: [0, 120, -40, 0], y: [0, 60, 140, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[15%] top-[10%] h-[50vmax] w-[50vmax] rounded-full bg-cyan/20 blur-[120px]"
          animate={{ x: [0, -140, 40, 0], y: [0, 120, -30, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] left-[25%] h-[45vmax] w-[45vmax] rounded-full bg-fuchsia-600/15 blur-[130px]"
          animate={{ x: [0, 80, -100, 0], y: [0, -80, 20, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="grid-bg mask-radial absolute inset-0 animate-grid-pan opacity-70" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#090B12_100%)]" />
    </div>
  );
}
