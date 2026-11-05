import type { Transition, Variants } from "framer-motion";

/** Shared easing curves and motion variants so every page moves the same way. */
export const ease = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

export const spring: Transition = { type: "spring", stiffness: 260, damping: 26 };
export const softSpring: Transition = { type: "spring", stiffness: 120, damping: 20, mass: 0.8 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: ease.out }, transitionEnd: { filter: "none" } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: ease.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: ease.out } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const inView = { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-80px" } } as const;
