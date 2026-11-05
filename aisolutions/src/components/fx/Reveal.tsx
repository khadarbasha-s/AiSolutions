import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { fadeUp, inView, stagger } from "@/lib/motion";

/** Fades and lifts its content in when scrolled into view. */
export function Reveal({ children, className, delay = 0, variants = fadeUp }: { children: ReactNode; className?: string; delay?: number; variants?: Variants }) {
  return (
    <motion.div className={className} variants={variants} {...inView} transition={{ delay }}>
      {children}
    </motion.div>
  );
}

/** Staggers the entrance of RevealItem children. */
export function RevealGroup({ children, className, gap = 0.08, delay = 0 }: { children: ReactNode; className?: string; gap?: number; delay?: number }) {
  return (
    <motion.div className={className} variants={stagger(gap, delay)} {...inView}>
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, variants = fadeUp }: { children: ReactNode; className?: string; variants?: Variants }) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
