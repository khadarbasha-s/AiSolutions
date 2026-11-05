import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { footerNav } from "@/data/nav";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 border-t border-line">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/60 to-transparent" />
      <div className="container grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
            Describe a problem. A team of AI agents plans, builds, tests and deploys the application, and you own every line of code.
          </p>
          <div className="mt-6 flex gap-2">
            {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                aria-label="Social link"
                whileHover={{ y: -3, scale: 1.08 }}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:border-violet/50 hover:text-ink"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
        {Object.entries(footerNav).map(([group, links]) => (
          <div key={group}>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">{group}</h3>
            <ul className="mt-4 space-y-3">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="group inline-flex items-center text-sm text-ink-muted transition-colors hover:text-ink">
                    <span className="mr-0 h-px w-0 bg-cyan transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden">
        <p aria-hidden className="select-none whitespace-nowrap text-center font-display text-[18vw] font-bold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(139,92,246,0.18)]">
          InfoDrizzle
        </p>
      </div>
      <div className="container flex flex-col items-center justify-between gap-3 border-t border-line py-6 text-xs text-ink-faint sm:flex-row">
        <p>© {new Date().getFullYear()} InfoDrizzle AI Solutions. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          All systems operational
        </div>
      </div>
    </footer>
  );
}
