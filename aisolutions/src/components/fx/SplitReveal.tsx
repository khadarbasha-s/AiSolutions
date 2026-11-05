import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** "chars" for headlines, "words" for longer copy, "lines" for paragraphs. */
  by?: "chars" | "words" | "lines";
  delay?: number;
  /** Play on mount instead of when scrolled into view. */
  immediate?: boolean;
};

/** GSAP SplitText reveal: pieces rise out of a mask with a blur and stagger. */
export function SplitReveal({ children, as: Tag = "div", className, by = "words", delay = 0, immediate = false }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      const split = SplitText.create(ref.current, { type: by === "chars" ? "words,chars" : by, mask: by === "chars" ? "words" : by, autoSplit: true, wordsClass: "split-piece", charsClass: "split-piece", linesClass: "split-piece",
        onSplit(self) {
          const targets = by === "chars" ? self.chars : by === "words" ? self.words : self.lines;
          return gsap.from(targets, {
            yPercent: 110,
            opacity: 0,
            filter: "blur(8px)",
            rotateX: by === "chars" ? -60 : 0,
            duration: by === "chars" ? 0.9 : 1,
            ease: "expo.out",
            stagger: by === "chars" ? 0.018 : by === "words" ? 0.045 : 0.1,
            delay,
            scrollTrigger: immediate ? undefined : { trigger: ref.current, start: "top 88%", once: true },
          });
        },
      });
      return () => split.revert();
    },
    { scope: ref, dependencies: [by, delay, immediate] },
  );

  return (
    <Tag ref={ref} className={cn("[perspective:600px]", className)}>
      {children}
    </Tag>
  );
}
