import { useRef } from "react";
import { Search, MessageCircleQuestion, FileText, Network, ShieldCheck, Rocket, type LucideIcon } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Badge } from "@/components/ui/Badge";

type Step = { n: string; title: string; body: string; icon: LucideIcon; output: string[] };

export const PLAN_STEPS: Step[] = [
  { n: "01", title: "Understand the problem", body: "The Requirement Agent reads your problem statement and any documents you attach, and identifies the users, goals and constraints.", icon: Search, output: ["Problem summary", "Primary users", "Constraints"] },
  { n: "02", title: "Ask clarifying questions", body: "Missing information is surfaced as short, targeted questions instead of guesses. You answer only what matters.", icon: MessageCircleQuestion, output: ["Open questions", "Assumptions to confirm"] },
  { n: "03", title: "Write the requirements", body: "A structured requirement document lists features, user roles, data and AI workflows. You can edit or remove anything.", icon: FileText, output: ["Feature list", "User roles", "Data entities"] },
  { n: "04", title: "Propose the architecture", body: "The Architect Agent proposes the stack, database design, integrations and agent workflows, with the reasoning behind each choice.", icon: Network, output: ["Tech stack", "Schema draft", "Integration map"] },
  { n: "05", title: "Get your approval", body: "Nothing is generated until you approve the plan. Request changes as often as you like before committing.", icon: ShieldCheck, output: ["Approved scope", "Change log"] },
  { n: "06", title: "Generate the application", body: "Frontend, backend, database, AI components and tests are generated in order, each checked by the QA and Security agents.", icon: Rocket, output: ["Source code", "Tests", "Live preview"] },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/85 p-7 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-violet/50 hover:shadow-glow">
      <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet/15 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-cyan/20" />
      <div className="relative flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet/40 bg-violet/10 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
          <step.icon className="h-5 w-5 text-violet-soft" />
        </span>
        <span className="font-display text-5xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(148,163,184,0.25)] transition-all duration-500 group-hover:[-webkit-text-stroke:1px_rgba(34,211,238,0.7)]">
          {step.n}
        </span>
      </div>
      <h3 className="relative mt-6 text-2xl font-semibold">{step.title}</h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
      <div className="relative mt-6 flex flex-wrap gap-2">
        {step.output.map((o) => (
          <Badge key={o} tone={index === 4 ? "success" : "neutral"}>{o}</Badge>
        ))}
      </div>
    </article>
  );
}

/**
 * The plan-first flow. On desktop the section pins and the steps scroll horizontally
 * with a progress line; on mobile and with reduced motion it is a vertical stack.
 */
export function PlanFirstFlow() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth + 64;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.8, invalidateOnRefresh: true } });
        gsap.utils.toArray<HTMLElement>(".plan-card").forEach((card) => {
          gsap.from(card, {
            opacity: 0.35,
            scale: 0.92,
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 90%", end: "left 55%", scrub: true },
          });
        });
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".plan-card").forEach((card) => {
          gsap.from(card, { opacity: 0, y: 40, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 88%", once: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <div ref={section} className="relative overflow-hidden lg:flex lg:h-screen lg:flex-col lg:justify-center">
      <div aria-hidden className="grid-bg mask-fade-y pointer-events-none absolute inset-0 opacity-50" />
      <div className="container relative mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_#22D3EE]" />Plan first, then build</span>
          <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-5xl">Six steps before a single line of code.</h2>
        </div>
        <p className="max-w-sm text-ink-muted">Generating code too early wastes time and produces the wrong product. The platform agrees on the plan with you first.</p>
      </div>
      <div className="container relative mb-8 hidden lg:block">
        <div className="h-px w-full bg-line">
          <div ref={bar} className="h-px origin-left bg-brand-gradient shadow-[0_0_12px_#8B5CF6]" />
        </div>
      </div>
      <div ref={track} className="relative flex flex-col gap-5 px-4 sm:px-6 lg:w-max lg:flex-row lg:gap-6 lg:pl-8 xl:pl-[calc(50vw_-_608px)] lg:pr-16">
        {PLAN_STEPS.map((s, i) => (
          <div key={s.n} className="plan-card lg:h-[400px] lg:w-[380px] lg:shrink-0">
            <StepCard step={s} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
