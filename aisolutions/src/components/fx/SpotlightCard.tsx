import { useRef, type ReactNode, type HTMLAttributes } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLDivElement> & { children: ReactNode; glow?: "violet" | "cyan" };

/** Card whose border and surface light up under the cursor, with a lift on hover. */
export function SpotlightCard({ children, className, glow = "violet", ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const color = glow === "violet" ? "139,92,246" : "34,211,238";
  const surface = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(${color},0.14), transparent 45%)`;
  const border = useMotionTemplate`radial-gradient(300px circle at ${mx}px ${my}px, rgba(${color},0.7), transparent 50%)`;

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-400);
        my.set(-400);
      }}
      className={cn("group relative rounded-2xl bg-line p-px", className)}
      {...(rest as object)}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: border }} />
      <div className="relative h-full overflow-hidden rounded-[15px] bg-surface/95">
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: surface }} />
        <div className="relative h-full">{children}</div>
      </div>
    </motion.div>
  );
}
