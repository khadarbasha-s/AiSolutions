import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { PageHero } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ParticleField, RevealGroup, RevealItem, TiltCard } from "@/components/fx";
import { CtaBand } from "@/components/layout/CtaBand";
import { DocsSidebar, scrollToSection } from "@/components/sections/docs/DocsSidebar";
import { DocContent } from "@/components/sections/docs/DocContent";
import { docSections } from "@/data/docs";

const quickStarts = [
  { id: "getting-started", title: "Quick start", text: "From sign-up to your first project in four steps." },
  { id: "problem-statement", title: "Write better prompts", text: "What the AI needs to plan the right application." },
  { id: "api", title: "API preview", text: "The REST endpoints planned for Phase 2." },
];

export default function Docs() {
  const [active, setActive] = useState(docSections[0].id);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-doc-section]"));
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.set(e.target.id, e.boundingClientRect.top) : visible.delete(e.target.id)));
        if (visible.size) {
          const first = docSections.find((s) => visible.has(s.id));
          if (first) setActive(first.id);
        }
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const matches = query.trim()
    ? docSections.filter((s) => (s.title + JSON.stringify(s.blocks)).toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <ParticleField id="docs-particles" density={35} />
        </div>
        <PageHero
          eyebrow="Documentation"
          title="Build with InfoDrizzle"
          subtitle="Guides for writing problem statements, understanding the plan-first pipeline, exporting code and deploying applications."
        >
          <div className="relative mx-auto mt-9 max-w-xl text-left">
            <Search className="pointer-events-none absolute left-4 top-[22px] h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the docs"
              aria-label="Search the docs"
              className="glass h-11 w-full rounded-xl pl-11 pr-4 text-sm placeholder:text-ink-faint transition-all focus:border-violet/50 focus:outline-none focus:ring-4 focus:ring-violet/15"
            />
            {query.trim() && (
              <motion.ul initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="glass absolute inset-x-0 top-full z-30 mt-2 rounded-xl bg-surface/95 p-2">
                {matches.length ? (
                  matches.map((m) => (
                    <li key={m.id}>
                      <button type="button" onClick={() => { setQuery(""); scrollToSection(m.id); }} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-ink-muted hover:bg-white/5 hover:text-ink">
                        {m.title} <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-sm text-ink-faint">No matching sections.</li>
                )}
              </motion.ul>
            )}
          </div>
        </PageHero>
      </div>

      <div className="container">
        <RevealGroup className="mb-16 grid gap-4 md:grid-cols-3">
          {quickStarts.map((q) => (
            <RevealItem key={q.id}>
              <TiltCard className="h-full rounded-2xl" max={6}>
                <button type="button" onClick={() => scrollToSection(q.id)} className="panel group h-full w-full p-5 text-left transition-colors hover:border-violet/40">
                  <h3 className="flex items-center justify-between font-display font-medium">
                    {q.title}
                    <ArrowRight className="h-4 w-4 text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-cyan" />
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">{q.text}</p>
                </button>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="grid gap-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14">
          <DocsSidebar sections={docSections} active={active} />
          <div className="min-w-0 max-w-3xl">
            {docSections.map((s) => (
              <DocContent key={s.id} section={s} />
            ))}
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink to="/signup">Start building <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></ButtonLink>
              <ButtonLink to="/contact" variant="secondary">Ask a question</ButtonLink>
            </div>
          </div>
        </div>
      </div>
      <CtaBand title="Ready to try the pipeline yourself?" />
    </>
  );
}
