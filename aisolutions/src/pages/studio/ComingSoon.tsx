import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { StudioNavItem } from "@/data/studioNav";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/fx";

const PHASE_NAME: Record<number, string> = { 2: "AI intelligence engine", 3: "Application generation", 4: "Testing and deployment" };

export default function ComingSoon({ item }: { item: StudioNavItem }) {
  const Icon = item.icon;
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center text-center">
      <div className="relative mb-10 flex h-40 w-40 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border border-dashed"
            style={{ inset: i * 18, borderColor: i % 2 ? "rgba(34,211,238,0.3)" : "rgba(139,92,246,0.35)" }}
            animate={{ rotate: i % 2 ? -360 : 360 }}
            transition={{ duration: 18 + i * 8, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_12px_#22D3EE]" />
          </motion.span>
        ))}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          whileHover={{ scale: 1.08, rotate: 6 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-violet/40 bg-elevated shadow-glow"
        >
          <Icon className="h-7 w-7 text-violet-soft" />
        </motion.div>
      </div>
      <Badge tone="cyan" className="mb-4">
        <Sparkles className="h-3 w-3" /> Phase {item.phase}: {PHASE_NAME[item.phase ?? 2]}
      </Badge>
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl font-semibold sm:text-4xl">
        {item.label}
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="mt-4 text-ink-muted">
        {item.description}
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} className="relative mt-8 w-full overflow-hidden rounded-2xl border border-line bg-surface/70 p-5 text-left">
        <BorderBeam duration={12} />
        <p className="text-sm text-ink-muted">
          This screen is part of a later release. Today you can capture problem statements and organise projects. They will flow into this step automatically when it ships.
        </p>
      </motion.div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/studio/new">Create application</ButtonLink>
        <ButtonLink to="/studio" variant="secondary"><ArrowLeft className="h-4 w-4" /> Dashboard</ButtonLink>
      </div>
    </div>
  );
}
