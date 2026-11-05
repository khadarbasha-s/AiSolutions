import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, LayoutDashboard, Brain, Workflow, Database, Plug, KeyRound, Activity, Cpu, Server, Boxes, Container, Cloud, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type Layer = { key: string; title: string; caption: string; tone: "violet" | "cyan" | "mix" | "neutral"; items: { label: string; icon: LucideIcon }[] };

const LAYERS: Layer[] = [
  { key: "web", title: "Public Website", caption: "Landing, features, solutions, pricing and docs", tone: "cyan", items: [{ label: "Landing", icon: Globe }, { label: "Solutions", icon: Boxes }, { label: "Docs", icon: LayoutDashboard }] },
  { key: "studio", title: "AI Application Studio", caption: "Dashboard, builder, editor, testing and deployment", tone: "violet", items: [{ label: "Builder", icon: Boxes }, { label: "Editor", icon: LayoutDashboard }, { label: "Deploy", icon: Cloud }] },
  {
    key: "backend", title: "Shared Platform Backend", caption: "One backend serves both experiences", tone: "mix",
    items: [
      { label: "AI Orchestrator", icon: Brain }, { label: "Agent Engine", icon: Workflow }, { label: "Data Management", icon: Database },
      { label: "Integration Engine", icon: Plug }, { label: "Authentication", icon: KeyRound }, { label: "Monitoring", icon: Activity },
    ],
  },
  { key: "infra", title: "Infrastructure", caption: "Models, storage and isolated compute", tone: "neutral", items: [{ label: "LLMs", icon: Cpu }, { label: "PostgreSQL", icon: Database }, { label: "Vector DB", icon: Server }, { label: "Docker", icon: Container }, { label: "Cloud", icon: Cloud }] },
];

const toneRing: Record<Layer["tone"], string> = {
  cyan: "border-cyan/30 hover:border-cyan/70 hover:shadow-glow-cyan",
  violet: "border-violet/30 hover:border-violet/70 hover:shadow-glow",
  mix: "border-violet/40 hover:border-cyan/60 hover:shadow-glow",
  neutral: "border-line hover:border-ink-faint/60",
};

/** Animated stacked layer diagram of the product architecture with flowing connectors. */
export function ArchitectureStack() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative mx-auto max-w-4xl [perspective:1400px]">
      {LAYERS.map((layer, i) => (
        <div key={layer.key}>
          <motion.div
            initial={{ opacity: 0, rotateX: 35, y: 60 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: ease.out, delay: i * 0.12 }}
            onMouseEnter={() => setActive(layer.key)}
            onMouseLeave={() => setActive(null)}
            className={cn(
              "relative overflow-hidden rounded-2xl border bg-surface/80 p-5 backdrop-blur transition-all duration-500 sm:p-6",
              toneRing[layer.tone],
              active && active !== layer.key && "opacity-50",
            )}
          >
            {layer.tone === "mix" && <div aria-hidden className="absolute inset-0 bg-brand-gradient-soft" />}
            <motion.div
              aria-hidden
              className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
              animate={{ x: ["0%", "450%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: i * 0.8 }}
            />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">Layer {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-xl font-semibold">{layer.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{layer.caption}</p>
              </div>
              <div className={cn("grid gap-2", layer.items.length > 5 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:flex sm:flex-wrap sm:justify-end")}>
                {layer.items.map((it, j) => (
                  <motion.span
                    key={it.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12 + j * 0.05, type: "spring", stiffness: 260, damping: 18 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="flex items-center gap-2 rounded-lg border border-line bg-bg/60 px-3 py-2 text-xs text-ink transition-colors hover:border-cyan/50"
                  >
                    <it.icon className="h-3.5 w-3.5 shrink-0 text-cyan" />
                    <span className="truncate">{it.label}</span>
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
          {i < LAYERS.length - 1 && (
            <div aria-hidden className="relative mx-auto flex h-10 w-40 justify-between">
              {[0, 1, 2].map((k) => (
                <div key={k} className="relative h-full w-px bg-gradient-to-b from-violet/50 to-cyan/30">
                  <motion.span
                    className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-cyan shadow-[0_0_10px_#22D3EE]"
                    animate={{ top: k === 1 ? ["100%", "-10%"] : ["-10%", "100%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: k * 0.4 + i * 0.2, ease: "easeInOut" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
