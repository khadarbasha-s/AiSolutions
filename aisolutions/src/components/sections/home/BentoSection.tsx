import { motion } from "framer-motion";
import { Code2, Download, Eye, FileText, Lock, ShieldCheck, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem, SpotlightCard, TiltCard } from "@/components/fx";
import { cn } from "@/lib/cn";

function Feature({ icon: Icon, title, body, className, glow = "violet", children }: { icon: LucideIcon; title: string; body: string; className?: string; glow?: "violet" | "cyan"; children?: React.ReactNode }) {
  return (
    <RevealItem className={className}>
      <SpotlightCard glow={glow} className="h-full">
        <div className="flex h-full flex-col p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-elevated text-violet-soft transition-all duration-300 group-hover:border-violet/50 group-hover:text-cyan group-hover:shadow-glow">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="mt-5 text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
          {children && <div className="mt-6 flex-1">{children}</div>}
        </div>
      </SpotlightCard>
    </RevealItem>
  );
}

const codeLines = [
  { t: "export async function matchCandidates(jobId: string) {", c: "text-ink" },
  { t: "  const job = await db.jobs.find(jobId);", c: "text-ink-muted" },
  { t: "  const hits = await vectors.search(job.embedding, 20);", c: "text-cyan-soft" },
  { t: "  return rankWithLLM(job, hits);", c: "text-violet-soft" },
  { t: "}", c: "text-ink" },
];

export function BentoSection() {
  return (
    <Section>
      <SectionHeading eyebrow="Why InfoDrizzle" title="Everything you need to go from prompt to production." subtitle="Not a template picker. Every application is designed for your problem, and you keep full control of the result." />
      <RevealGroup className="grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-3" gap={0.07}>
        <Feature className="md:col-span-2" icon={Code2} title="You own the source code" body="Inspect, edit and export every file. Generated code is readable, typed and structured the way a senior team would write it.">
          <TiltCard className="rounded-xl" max={6}>
            <div className="overflow-hidden rounded-xl border border-line bg-bg/80 p-4 font-mono text-[11.5px] leading-6 sm:text-xs">
              {codeLines.map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i }} className={cn("truncate", l.c)}>
                  <span className="mr-3 select-none text-ink-faint">{i + 1}</span>
                  {l.t}
                </motion.div>
              ))}
            </div>
          </TiltCard>
        </Feature>
        <Feature icon={FileText} glow="cyan" title="Requirements you approve" body="Review the AI-written requirement document and architecture before a single line of code is generated." />
        <Feature icon={Workflow} title="Visual agent workflows" body="Design and modify the AI workflows inside your app on a canvas, with retrieval, tools and guardrails." />
        <Feature icon={ShieldCheck} glow="cyan" title="Isolated by design" body="Every project runs in its own sandbox with resource limits. Credentials and files never cross between tenants.">
          <div className="flex items-center gap-2">
            {["Project A", "Project B", "Project C"].map((p, i) => (
              <motion.div
                key={p}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                className="flex flex-1 flex-col items-center gap-1 rounded-lg border border-line bg-bg/50 py-3 text-[10px] text-ink-muted"
              >
                <Lock className="h-3.5 w-3.5 text-cyan" />
                {p}
              </motion.div>
            ))}
          </div>
        </Feature>
        <Feature icon={Eye} title="Live preview and tests" body="Open the running app, read test and AI-evaluation results, and ask for fixes in plain language." />
        <Feature className="md:col-span-2" icon={Download} glow="cyan" title="Hosted or downloaded, your choice" body="Deploy to a managed, isolated environment with one click, or download the full project and run it anywhere.">
          <div className="grid grid-cols-2 gap-3">
            {[{ l: "Live hosted app", s: "Managed deploy, logs and monitoring" }, { l: "Source code export", s: "Full repository, ready for your CI" }].map((o) => (
              <div key={o.l} className="rounded-xl border border-line bg-bg/50 p-4 transition-colors duration-300 hover:border-cyan/40">
                <Sparkles className="h-4 w-4 text-violet-soft" />
                <p className="mt-2 text-sm font-medium">{o.l}</p>
                <p className="text-xs text-ink-muted">{o.s}</p>
              </div>
            ))}
          </div>
        </Feature>
      </RevealGroup>
    </Section>
  );
}
