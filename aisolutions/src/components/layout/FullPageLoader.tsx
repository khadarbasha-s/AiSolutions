import { motion } from "framer-motion";
import { LogoMark } from "@/components/ui/Logo";

export function FullPageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="relative">
        <span className="absolute inset-0 animate-pulse-ring rounded-2xl border border-violet/50" />
        <motion.div animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.06, 1] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <LogoMark className="h-14 w-14" />
        </motion.div>
      </div>
    </div>
  );
}
