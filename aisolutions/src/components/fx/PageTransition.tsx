import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

/** Route-level enter and exit animation. Used inside AnimatePresence keyed by pathname. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      // The filter must be removed once the page is in. Any filter (even blur(0)) on an ancestor
      // breaks GSAP ScrollTrigger pinning, which relies on position: fixed.
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none", transform: "none" } }}
      exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}
