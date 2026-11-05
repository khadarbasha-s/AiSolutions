import { useEffect, useState } from "react";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, Search, X, Bell, ChevronDown, Lock } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/cn";
import { studioBuild, studioPrimary, studioSettings, type StudioNavItem } from "@/data/studioNav";
import { FrozenOutlet } from "./FrozenOutlet";
import { FullPageLoader } from "./FullPageLoader";

function NavItem({ item, onNavigate }: { item: StudioNavItem; onNavigate?: () => void }) {
  return (
    <NavLink
      to={item.to}
      end={item.to === "/studio"}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn("group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors", isActive ? "text-ink" : "text-ink-muted hover:text-ink")
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span layoutId="studio-active" className="absolute inset-0 rounded-lg border border-violet/30 bg-violet/10" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
          )}
          <item.icon className={cn("relative h-4 w-4 shrink-0 transition-all group-hover:scale-110", isActive ? "text-violet-soft" : "")} />
          <span className="relative flex-1 truncate">{item.label}</span>
          {item.phase && (
            <span className="relative flex items-center gap-1 rounded border border-line px-1.5 py-px font-mono text-[9px] uppercase text-ink-faint">
              <Lock className="h-2.5 w-2.5" />P{item.phase}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { user, workspace, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Logo to="/studio" />
      </div>
      <button type="button" className="mx-3 mb-4 flex items-center gap-3 rounded-xl border border-line bg-elevated/50 p-2.5 text-left transition-colors hover:border-violet/40">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient font-display text-sm font-bold text-white">
          {workspace?.name.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">{workspace?.name}</span>
          <span className="block text-[11px] capitalize text-ink-faint">{workspace?.plan} plan</span>
        </span>
        <ChevronDown className="h-4 w-4 text-ink-faint" />
      </button>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        <div className="space-y-1">{studioPrimary.map((i) => <NavItem key={i.to} item={i} onNavigate={onNavigate} />)}</div>
        <div>
          <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">Build pipeline</p>
          <div className="space-y-1">{studioBuild.map((i) => <NavItem key={i.to} item={i} onNavigate={onNavigate} />)}</div>
        </div>
        <div className="space-y-1">
          <NavItem item={studioSettings} onNavigate={onNavigate} />
        </div>
      </nav>
      <div className="border-t border-line p-3">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-elevated text-xs font-semibold uppercase">
            {user?.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm">{user?.name}</span>
            <span className="block truncate text-[11px] text-ink-faint">{user?.email}</span>
          </span>
          <button
            type="button"
            aria-label="Log out"
            onClick={async () => {
              await logout();
              navigate("/");
            }}
            className="rounded-md p-1.5 text-ink-faint transition-colors hover:bg-white/5 hover:text-danger"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function StudioLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  if (loading) return <FullPageLoader />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return (
    <div className="min-h-screen bg-bg">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="dot-bg absolute inset-0 opacity-40" />
        <motion.div
          className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-violet/15 blur-[120px]"
          animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-cyan/10 blur-[120px]"
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[17.5rem] border-r border-line bg-surface/70 backdrop-blur-xl lg:block">
        <Sidebar />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-line bg-surface lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute right-3 top-4 rounded-md p-1.5 text-ink-muted">
                <X className="h-5 w-5" />
              </button>
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="relative lg:pl-[17.5rem]">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-bg/70 px-4 backdrop-blur-xl sm:px-6">
          <button type="button" aria-label="Open menu" className="rounded-md p-1.5 text-ink lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              placeholder="Search projects, docs and settings"
              className="h-9 w-full rounded-lg border border-line bg-surface/60 pl-9 pr-14 text-sm placeholder:text-ink-faint focus:border-violet/50 focus:outline-none"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-line px-1.5 font-mono text-[10px] text-ink-faint">Ctrl K</kbd>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button type="button" aria-label="Notifications" className="relative rounded-lg p-2 text-ink-muted transition-colors hover:bg-white/5 hover:text-ink">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan" />
            </button>
          </div>
        </header>
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative px-4 py-8 sm:px-6 lg:px-10"
          >
            <FrozenOutlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
