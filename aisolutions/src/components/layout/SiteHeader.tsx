import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { siteNav } from "@/data/nav";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !open);
  });

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
    >
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1760px] items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-5",
          scrolled ? "glass shadow-panel" : "border border-transparent",
        )}
      >
        <Logo />

        <nav className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
          {siteNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onMouseEnter={() => setHovered(item.to)}
              className={({ isActive }) => cn("relative px-3.5 py-2 text-sm transition-colors", isActive ? "text-ink" : "text-ink-muted hover:text-ink")}
            >
              {({ isActive }) => (
                <>
                  {hovered === item.to && (
                    <motion.span layoutId="nav-hover" className="absolute inset-0 rounded-lg bg-white/[0.06]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  )}
                  {isActive && <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-0.5 h-px bg-brand-gradient" />}
                  <span className="relative">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <ButtonLink to="/studio" size="sm">
              Open Studio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          ) : (
            <>
              <ButtonLink to="/login" variant="ghost" size="sm">Log in</ButtonLink>
              <ButtonLink to="/signup" size="sm">
                Start building <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </>
          )}
        </div>

        <button type="button" className="rounded-lg p-2 text-ink lg:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={open ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="block">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-auto mt-2 max-w-[1760px] rounded-2xl p-4 lg:hidden"
          >
            <motion.ul initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}>
              {[...siteNav, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }].map((item) => (
                <motion.li key={item.to} variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}>
                  <Link to={item.to} className="block rounded-lg px-3 py-3 text-base text-ink-muted hover:bg-white/5 hover:text-ink">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-4">
              {user ? (
                <ButtonLink to="/studio" className="col-span-2">Open Studio</ButtonLink>
              ) : (
                <>
                  <ButtonLink to="/login" variant="secondary">Log in</ButtonLink>
                  <ButtonLink to="/signup">Start building</ButtonLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
