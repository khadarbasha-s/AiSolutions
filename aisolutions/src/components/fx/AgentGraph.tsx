import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Compass, Palette, Server, Database, Sparkles, Plug, ShieldCheck, Rocket, FlaskConical, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type AgentNode = { key: string; label: string; role: string; icon: LucideIcon };

export const AGENTS: AgentNode[] = [
  { key: "req", label: "Requirement", role: "Problem analysis", icon: Compass },
  { key: "arch", label: "Architect", role: "System design", icon: Brain },
  { key: "ui", label: "UI/UX", role: "Pages and design", icon: Palette },
  { key: "be", label: "Backend", role: "APIs and logic", icon: Server },
  { key: "db", label: "Database", role: "Schema and storage", icon: Database },
  { key: "ai", label: "AI Engineer", role: "Agents and RAG", icon: Sparkles },
  { key: "int", label: "Integration", role: "External services", icon: Plug },
  { key: "qa", label: "QA", role: "Testing and review", icon: FlaskConical },
  { key: "dep", label: "Deployment", role: "Build and publish", icon: Rocket },
  { key: "sec", label: "Security", role: "Security checks", icon: ShieldCheck },
];

const SIZE = 560;
const C = SIZE / 2;
const R = 215;

/**
 * Central orchestrator with ten specialist agents on an orbit. Data packets
 * flow along curved links; hovering an agent highlights its channel.
 */
export function AgentGraph({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const nodes = AGENTS.map((a, i) => {
    const angle = (i / AGENTS.length) * Math.PI * 2 - Math.PI / 2;
    return { ...a, x: C + Math.cos(angle) * R, y: C + Math.sin(angle) * R, angle };
  });

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[560px]", className)}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
          <radialGradient id="coreGlow">
            <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.55" />
            <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(148,163,184,0.12)" strokeDasharray="2 6" />
        <motion.circle cx={C} cy={C} r={R + 30} fill="none" stroke="rgba(34,211,238,0.12)" strokeDasharray="1 10"
          animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} style={{ originX: "50%", originY: "50%" }} />
        <circle cx={C} cy={C} r={110} fill="url(#coreGlow)" />
        {nodes.map((n, i) => {
          const mx = C + Math.cos(n.angle + 0.35) * R * 0.45;
          const my = C + Math.sin(n.angle + 0.35) * R * 0.45;
          const d = `M ${C} ${C} Q ${mx} ${my} ${n.x} ${n.y}`;
          const on = active === n.key;
          return (
            <g key={n.key}>
              <motion.path d={d} fill="none" stroke="url(#link)" strokeWidth={on ? 2 : 1}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: on ? 1 : active ? 0.15 : 0.45 }}
                viewport={{ once: false }}
                transition={{ pathLength: { duration: 1.2, delay: 0.1 * i, ease: "easeOut" }, opacity: { duration: 0.3 } }} />
              <path d={d} fill="none" stroke="#22D3EE" strokeWidth={1.5} strokeDasharray="4 18" opacity={on ? 0.9 : 0.35}>
                <animate attributeName="stroke-dashoffset" from="0" to="-88" dur={`${2 + (i % 3) * 0.6}s`} repeatCount="indefinite" />
              </path>
              <circle r={on ? 4 : 3} fill={i % 2 ? "#22D3EE" : "#A78BFA"}>
                <animateMotion dur={`${2.4 + (i % 4) * 0.5}s`} repeatCount="indefinite" path={d} keyPoints={i % 2 ? "0;1" : "1;0"} keyTimes="0;1" calcMode="linear" />
              </circle>
            </g>
          );
        })}
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-violet/40 bg-elevated/90 text-center shadow-glow backdrop-blur"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full border border-violet/50" />
        <span className="absolute inset-0 animate-pulse-ring rounded-full border border-cyan/40 [animation-delay:1.1s]" />
        <Brain className="h-6 w-6 text-violet-soft sm:h-8 sm:w-8" />
        <span className="mt-1 font-display text-[10px] font-semibold leading-tight sm:text-sm">Central<br />Orchestrator</span>
      </motion.div>

      {nodes.map((n, i) => (
        <motion.button
          type="button"
          key={n.key}
          onMouseEnter={() => setActive(n.key)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(n.key)}
          onBlur={() => setActive(null)}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(n.x / SIZE) * 100}%`, top: `${(n.y / SIZE) * 100}%` }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 + i * 0.07 }}
          whileHover={{ scale: 1.15 }}
        >
          <span className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl border bg-surface/90 backdrop-blur transition-all duration-300 sm:h-12 sm:w-12",
            active === n.key ? "border-cyan shadow-glow-cyan" : "border-line",
          )}>
            <n.icon className={cn("h-4 w-4 transition-colors sm:h-5 sm:w-5", active === n.key ? "text-cyan" : "text-ink-muted")} />
          </span>
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap text-center sm:block">
            <span className="block font-display text-xs font-medium text-ink">{n.label}</span>
            <span className={cn("block text-[10px] text-ink-muted transition-opacity", active === n.key ? "opacity-100" : "opacity-0")}>{n.role}</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}
