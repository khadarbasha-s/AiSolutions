import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** A soft glow and ring that trail the mouse on desktop. Grows over links and buttons. */
export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const gx = useSpring(x, { stiffness: 80, damping: 20 });
  const gy = useSpring(y, { stiffness: 80, damping: 20 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine);
    if (!fine) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHovering(!!(e.target as HTMLElement).closest("a,button,[role=button],input,textarea,select"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div aria-hidden style={{ x: gx, y: gy }} className="pointer-events-none fixed left-0 top-0 z-0 -ml-[200px] -mt-[200px] h-[400px] w-[400px] rounded-full bg-violet/10 blur-[80px]" />
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-4 -mt-4 h-8 w-8 rounded-full border border-cyan/60 mix-blend-screen"
      />
    </>
  );
}
