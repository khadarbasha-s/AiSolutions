import { useRef } from "react";
import { Boxes, BrainCircuit, Code2, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Badge } from "@/components/ui/Badge";

type Phase = { n: number; title: string; icon: LucideIcon; items: string[]; current?: boolean };

const phases: Phase[] = [
  { n: 1, title: "Product foundation", icon: Boxes, current: true, items: ["Brand identity and design system", "Public website", "Authentication and workspaces", "Dashboard and Create Application"] },
  { n: 2, title: "AI intelligence engine", icon: BrainCircuit, items: ["Problem statement understanding", "Clarifying conversation", "Requirement and architecture generation", "User approval workflow"] },
  { n: 3, title: "Application generation", icon: Code2, items: ["Frontend and backend generation", "Database schema generation", "AI agent and RAG generation", "Code workspace"] },
  { n: 4, title: "Testing and deployment", icon: Rocket, items: ["Automated testing and bug fixing", "Application preview", "Isolated execution", "Deployment and monitoring"] },
  { n: 5, title: "Advanced platform", icon: Sparkles, items: ["Multi-user collaboration", "Templates and integration marketplace", "Custom AI model configuration", "Usage-based billing and enterprise workspaces"] },
];

/** Vertical roadmap. The progress line is scrubbed by scroll and each phase lights up as the line reaches it. */
export function RoadmapTimeline() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const line = el.querySelector<HTMLElement>("[data-line]");
      const items = gsap.utils.toArray<HTMLElement>("[data-phase]", el);
      if (prefersReducedMotion()) {
        gsap.set(line, { scaleY: 1 });
        items.forEach((i) => i.classList.add("is-on"));
        return;
      }
      gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 65%", scrub: 0.6 } });
      items.forEach((item, i) => {
        const card = item.querySelector("[data-card]");
        gsap.from(card, {
          x: i % 2 ? 60 : -60,
          opacity: 0,
          rotateY: i % 2 ? -12 : 12,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 80%", once: true },
        });
        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          onEnter: () => item.classList.add("is-on"),
          onLeaveBack: () => item.classList.remove("is-on"),
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mx-auto max-w-5xl [perspective:1200px]">
      <div aria-hidden className="absolute bottom-0 left-5 top-0 w-px bg-line md:left-1/2 md:-translate-x-1/2" />
      <div data-line aria-hidden className="absolute bottom-0 left-5 top-0 w-[2px] origin-top -translate-x-[0.5px] bg-gradient-to-b from-violet via-cyan to-violet shadow-[0_0_14px_#8B5CF6] md:left-1/2 md:-translate-x-1/2" />
      <ol className="space-y-12 md:space-y-20">
        {phases.map((p, i) => (
          <li key={p.n} data-phase className="group/phase relative grid items-center md:grid-cols-2 md:gap-16">
            <span className="absolute left-5 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-line bg-bg text-ink-faint transition-all duration-500 group-[.is-on]/phase:border-cyan group-[.is-on]/phase:text-cyan group-[.is-on]/phase:shadow-glow-cyan md:left-1/2">
              <p.icon className="h-4 w-4" />
            </span>
            <div data-card className={i % 2 ? "pl-14 md:col-start-2 md:pl-0" : "pl-14 md:pl-0 md:text-right"}>
              <div className="panel group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:border-violet/40 group-[.is-on]/phase:border-violet/30">
                <div aria-hidden className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet/0 blur-3xl transition-all duration-700 group-hover:bg-violet/25" />
                <div className={`relative flex flex-wrap items-center gap-3 ${i % 2 ? "" : "md:justify-end"}`}>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">Phase {p.n}</span>
                  {p.current && <Badge tone="success" dot>Building now</Badge>}
                </div>
                <h3 className="relative mt-2 text-xl font-semibold sm:text-2xl">{p.title}</h3>
                <ul className={`relative mt-4 space-y-2 text-sm text-ink-muted ${i % 2 ? "" : "md:ml-auto"}`}>
                  {p.items.map((it) => (
                    <li key={it} className={`flex items-center gap-2 ${i % 2 ? "" : "md:flex-row-reverse"}`}>
                      <span className="h-1 w-1 shrink-0 rounded-full bg-violet-soft" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
