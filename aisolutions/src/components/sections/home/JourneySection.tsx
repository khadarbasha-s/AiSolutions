import { useRef, useState } from "react";
import { Brain, CheckCircle2, ClipboardList, HelpCircle, Network, Rocket, Wand2, type LucideIcon } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { RevealGroup, RevealItem } from "@/components/fx";
import { SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

type Step = { title: string; body: string; icon: LucideIcon; detail: string[] };

const steps: Step[] = [
  { title: "Understand the problem", icon: Brain, body: "The orchestrator reads your problem statement and any documents you attach, and works out the goal, users and constraints.", detail: ["Goal and success criteria", "Target users", "Constraints and risks"] },
  { title: "Ask clarifying questions", icon: HelpCircle, body: "Missing information is identified up front. You answer a few focused questions instead of fixing wrong code later.", detail: ["Who signs in?", "Which systems must it connect to?", "What data already exists?"] },
  { title: "Write the requirements", icon: ClipboardList, body: "A requirement document lists features, user roles, AI workflows and acceptance criteria you can edit line by line.", detail: ["Features and user roles", "AI workflows", "Acceptance criteria"] },
  { title: "Propose the architecture", icon: Network, body: "The Architect Agent designs the database, APIs, technology stack and integrations, and explains the trade-offs.", detail: ["Database design", "Technology stack", "Integrations"] },
  { title: "Get your approval", icon: CheckCircle2, body: "Nothing is generated until you approve. Remove features, change the stack or ask for revisions first.", detail: ["Edit or remove features", "Request changes", "Approve to continue"] },
  { title: "Generate the application", icon: Wand2, body: "Specialist agents build frontend, backend, database and AI components in order, each checked before the next starts.", detail: ["Frontend and backend", "Database and AI", "Automated tests"] },
  { title: "Preview and deploy", icon: Rocket, body: "Open a live preview, read the test results, then deploy to an isolated environment or download the source code.", detail: ["Live preview", "Test results", "Hosted app or source download"] },
];

function StepPanel({ step, index }: { step: Step; index: number }) {
  return (
    <div className="panel relative overflow-hidden p-7">
      <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet/20 blur-3xl" />
      <div className="relative flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet/40 bg-violet/10 text-violet-soft">
          <step.icon className="h-6 w-6" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">Step {String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="relative mt-5 text-2xl font-semibold">{step.title}</h3>
      <p className="relative mt-3 leading-relaxed text-ink-muted">{step.body}</p>
      <ul className="relative mt-6 space-y-2.5">
        {step.detail.map((d) => (
          <li key={d} className="flex items-center gap-3 rounded-lg border border-line bg-bg/40 px-3 py-2 text-sm text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_#22D3EE]" /> {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function JourneySection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".journey-panel");
        gsap.set(panels, { autoAlpha: 0, y: 60, scale: 0.96 });
        gsap.set(panels[0], { autoAlpha: 1, y: 0, scale: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (steps.length - 1) * 0.7}`,
            pin: true,
            scrub: 0.8,
            snap: { snapTo: 1 / (steps.length - 1), duration: 0.4, ease: "power2.inOut" },
            onUpdate: (self) => setActive(Math.round(self.progress * (steps.length - 1))),
          },
        });
        tl.to(".journey-progress", { scaleY: 1, ease: "none", duration: steps.length - 1 }, 0);
        panels.forEach((panel, i) => {
          if (i === 0) return;
          tl.to(panels[i - 1], { autoAlpha: 0, y: -60, scale: 0.96, duration: 0.5 }, i - 1 + 0.25);
          tl.to(panel, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, i - 1 + 0.5);
        });
        return () => ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: pinRef },
  );

  return (
    <section className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="dot-bg mask-fade-y absolute inset-0 opacity-40" />
      </div>

      {/* Desktop: pinned, scroll-scrubbed sequence */}
      <div ref={pinRef} className="relative hidden min-h-screen items-center lg:flex">
        <div className="container grid grid-cols-[1fr_1.1fr] items-center gap-16">
          <div>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_#22D3EE]" /> Plan first, then build
            </span>
            <h2 className="mt-5 text-5xl font-semibold leading-[1.1]">
              Seven stages from idea to <span className="text-gradient">deployed product</span>.
            </h2>
            <p className="mt-5 max-w-md text-lg text-ink-muted">
              The AI never jumps straight to code. It understands, asks, plans and waits for your approval.
            </p>
            <div className="relative mt-10 pl-6">
              <div className="absolute bottom-1 left-[5px] top-1 w-px bg-line" />
              <div className="journey-progress absolute bottom-1 left-[5px] top-1 w-px origin-top scale-y-0 bg-brand-gradient" />
              <ol className="space-y-3">
                {steps.map((s, i) => (
                  <li key={s.title} className="relative flex items-center gap-3">
                    <span
                      className={cn(
                        "absolute -left-6 h-[11px] w-[11px] rounded-full border-2 transition-all duration-300",
                        i <= active ? "border-cyan bg-cyan shadow-[0_0_10px_#22D3EE]" : "border-line bg-bg",
                      )}
                    />
                    <span className={cn("text-sm transition-colors duration-300", i === active ? "font-medium text-ink" : i < active ? "text-ink-muted" : "text-ink-faint")}>
                      {s.title}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="relative h-[460px]">
            {steps.map((s, i) => (
              <div key={s.title} className="journey-panel absolute inset-0 flex items-center">
                <div className="w-full">
                  <StepPanel step={s} index={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile and tablet: stacked */}
      <div className="container relative py-20 lg:hidden">
        <SectionHeading eyebrow="Plan first, then build" title="Seven stages from idea to deployed product." subtitle="The AI never jumps straight to code. It understands, asks, plans and waits for your approval." />
        <RevealGroup className="space-y-5" gap={0.1}>
          {steps.map((s, i) => (
            <RevealItem key={s.title}>
              <StepPanel step={s} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
