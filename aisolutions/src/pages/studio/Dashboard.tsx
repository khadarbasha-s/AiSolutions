import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FolderKanban, FileEdit, Hourglass, Rocket, Plus, Search, Sparkles, Wand2 } from "lucide-react";
import type { DashboardStats, Project, ProjectStatus } from "@shared/types";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { ButtonLink } from "@/components/ui/Button";
import { AnimatedCounter, BorderBeam, SpotlightCard } from "@/components/fx";
import { PageHeader, STATUS_META, SCOPE_LABEL, StatusBadge, timeAgo } from "@/components/studio/studioBits";
import { cn } from "@/lib/cn";

const STARTERS = [
  { title: "Recruitment platform", prompt: "An AI-powered recruitment platform that analyzes resumes, matches candidates with job descriptions and schedules interviews automatically." },
  { title: "Clinic assistant", prompt: "A clinic management app with appointment booking, patient records and an AI triage assistant that summarises symptoms for doctors." },
  { title: "Support copilot", prompt: "A customer support copilot that answers questions from our help-centre documents and hands complex tickets to a human agent." },
];

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<DashboardStats>("/projects/stats").then(setStats).catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (status !== "all") params.set("status", status);
      api<Project[]>(`/projects?${params}`).then(setProjects).catch((e) => setError(e.message));
    }, 220);
    return () => window.clearTimeout(t);
  }, [q, status]);

  const cards = useMemo(
    () => [
      { label: "Total projects", value: stats?.totalProjects ?? 0, icon: FolderKanban, glow: "violet" as const },
      { label: "Drafts", value: stats?.byStatus.draft ?? 0, icon: FileEdit, glow: "cyan" as const },
      { label: "Awaiting approval", value: stats?.byStatus.awaiting_approval ?? 0, icon: Hourglass, glow: "violet" as const },
      { label: "Deployed", value: stats?.byStatus.deployed ?? 0, icon: Rocket, glow: "cyan" as const },
    ],
    [stats],
  );

  return (
    <div className="mx-auto max-w-[1600px]">
      <PageHeader
        eyebrow="Dashboard"
        title={<>{greeting()}, <span className="text-gradient">{user?.name.split(" ")[0]}</span></>}
        subtitle="Here is everything happening across your workspace."
        actions={<ButtonLink to="/studio/new"><Plus className="h-4 w-4" /> New application</ButtonLink>}
      />

      {error && <p className="mb-6 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>}

      <motion.div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}>
        {cards.map((c) => (
          <motion.div key={c.label} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <SpotlightCard glow={c.glow} className="h-full">
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink-muted sm:text-sm">{c.label}</span>
                  <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-110 group-hover:rotate-6", c.glow === "violet" ? "bg-violet/15 text-violet-soft" : "bg-cyan/15 text-cyan")}>
                    <c.icon className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl font-semibold">{stats ? <AnimatedCounter to={c.value} duration={1.2} /> : <span className="inline-block h-8 w-10 animate-pulse rounded bg-elevated" />}</p>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative overflow-hidden rounded-2xl border border-line bg-surface/80 p-6 sm:p-8">
          <BorderBeam duration={9} />
          <div aria-hidden className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet/25 blur-[80px]" />
          <motion.div aria-hidden className="absolute bottom-6 right-8 hidden sm:block" animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity }}>
            <Wand2 className="h-20 w-20 text-violet/25" />
          </motion.div>
          <div className="relative max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">Start here</p>
            <h2 className="mt-3 text-2xl font-semibold">What would you like to build?</h2>
            <p className="mt-2 text-sm text-ink-muted">Describe the problem in plain language. The AI plans first and builds only after you approve.</p>
            <ButtonLink to="/studio/new" className="mt-6">
              Describe a problem <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="panel p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan" />
            <h2 className="font-display font-semibold">Starter ideas</h2>
          </div>
          <ul className="mt-4 space-y-2">
            {STARTERS.map((s) => (
              <li key={s.title}>
                <Link to={`/studio/new?prompt=${encodeURIComponent(s.prompt)}&name=${encodeURIComponent(s.title)}`} className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all hover:border-line hover:bg-elevated/60">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{s.title}</span>
                    <span className="line-clamp-1 block text-xs text-ink-faint">{s.prompt}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-cyan" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-xl font-semibold">All projects</h2>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects" className="h-9 w-full rounded-lg border border-line bg-surface/60 pl-9 pr-3 text-sm placeholder:text-ink-faint focus:border-violet/50 focus:outline-none sm:w-56" />
            </div>
            <div className="flex gap-1 overflow-x-auto rounded-lg border border-line bg-surface/60 p-1">
              {(["all", "draft", "awaiting_approval", "deployed"] as const).map((s) => (
                <button key={s} type="button" onClick={() => setStatus(s)} className={cn("relative whitespace-nowrap rounded-md px-3 py-1 text-xs transition-colors", status === s ? "text-ink" : "text-ink-muted hover:text-ink")}>
                  {status === s && <motion.span layoutId="status-filter" className="absolute inset-0 rounded-md bg-elevated" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative">{s === "all" ? "All" : STATUS_META[s].label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {projects === null ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {[0, 1, 2].map((i) => <div key={i} className="h-40 animate-pulse rounded-2xl border border-line bg-surface/60" />)}
          </div>
        ) : projects.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet/30 bg-violet/10">
              <FolderKanban className="h-6 w-6 text-violet-soft" />
            </motion.div>
            <p className="font-medium">{q || status !== "all" ? "No projects match your filters" : "No projects yet"}</p>
            <p className="mt-1 text-sm text-ink-muted">{q || status !== "all" ? "Try a different search or filter." : "Your first application starts with a problem statement."}</p>
            {!q && status === "all" && <ButtonLink to="/studio/new" className="mt-6" size="sm"><Plus className="h-4 w-4" /> Create application</ButtonLink>}
          </motion.div>
        ) : (
          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {projects.map((p, i) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.04 } }} exit={{ opacity: 0, scale: 0.94 }}>
                  <Link to={`/studio/projects/${p.id}`} className="block h-full">
                    <SpotlightCard className="h-full">
                      <div className="flex h-full flex-col p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display font-semibold leading-snug transition-colors group-hover:text-white">{p.name}</h3>
                          <StatusBadge status={p.status} />
                        </div>
                        <p className="mt-2 line-clamp-3 flex-1 text-sm text-ink-muted">{p.problemStatement}</p>
                        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs text-ink-faint">
                          <span>{SCOPE_LABEL[p.scope]}</span>
                          <span>{timeAgo(p.updatedAt)}</span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
}
