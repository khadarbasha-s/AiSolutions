import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-8 w-8", className)} aria-hidden>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#111522" stroke="rgba(148,163,184,0.18)" />
      <path d="M32 10c7 10 14 17.5 14 26a14 14 0 0 1-28 0c0-8.5 7-16 14-26Z" fill="url(#logo-g)" />
      <circle cx="32" cy="37" r="5" fill="#090B12" />
    </svg>
  );
}

export function Logo({ to = "/", className }: { to?: string; className?: string }) {
  return (
    <Link to={to} className={cn("group flex items-center gap-2.5", className)} aria-label="InfoDrizzle AI Solutions home">
      <motion.span whileHover={{ rotate: -12, scale: 1.08 }} transition={{ type: "spring", stiffness: 300, damping: 12 }}>
        <LogoMark />
      </motion.span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-semibold tracking-tight text-ink">InfoDrizzle</span>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-cyan">AI Solutions</span>
      </span>
    </Link>
  );
}
