import { Navigate, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/lib/auth";
import { AgentGraph, ParticleField, Typewriter } from "@/components/fx";
import { FullPageLoader } from "./FullPageLoader";

const points = ["Plans before it builds: requirements, architecture, approval", "Ten specialist agents under one orchestrator", "Live hosted app plus downloadable source code"];

export function AuthLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <FullPageLoader />;
  // Logged-in users skip login/signup, but can still use the reset page.
  if (user && location.pathname !== "/forgot-password") return <Navigate to="/studio" replace />;

  return (
    <div className="grid min-h-screen bg-bg lg:grid-cols-2">
      <div className="relative flex flex-col px-6 py-8 sm:px-12">
        <div aria-hidden className="grid-bg mask-radial pointer-events-none absolute inset-0 opacity-50" />
        <Logo className="relative" />
        <div className="relative flex flex-1 items-center justify-center py-12">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md"
          >
            <Outlet />
          </motion.div>
        </div>
        <p className="relative text-xs text-ink-faint">© {new Date().getFullYear()} InfoDrizzle AI Solutions</p>
      </div>

      <div className="relative hidden overflow-hidden border-l border-line bg-surface/40 lg:flex lg:flex-col lg:justify-center lg:px-14">
        <ParticleField id="auth-particles" density={55} />
        <motion.div aria-hidden className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-violet/25 blur-[120px]" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} />
        <motion.div aria-hidden className="absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full bg-cyan/15 blur-[120px]" animate={{ scale: [1.1, 0.9, 1.1] }} transition={{ duration: 12, repeat: Infinity }} />
        <div className="pointer-events-none relative">
          <AgentGraph className="max-w-[420px] opacity-90" />
        </div>
        <div className="relative mt-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">Prompt</p>
          <p className="mt-2 min-h-[3.5rem] font-display text-xl text-ink">
            <Typewriter phrases={["Build a recruitment platform that screens resumes and books interviews.", "Create a clinic app with appointments, records and an AI triage assistant.", "Make a retail dashboard that forecasts stock and reorders automatically."]} />
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p, i) => (
              <motion.li key={p} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12 }} className="flex items-center gap-3 text-sm text-ink-muted">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> {p}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
