import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock, CreditCard, MessagesSquare, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero, Section } from "@/components/ui/Section";
import { Meteors, Reveal, RevealGroup, RevealItem, SpotlightCard } from "@/components/fx";
import { ContactForm } from "@/components/sections/contact/ContactForm";

const expectations = [
  { icon: Clock, title: "We read every message", text: "A person on our team reviews each enquiry and replies by email." },
  { icon: MessagesSquare, title: "Sales conversations", text: "Share your use case and we will walk you through how the platform would plan and build it." },
  { icon: ShieldCheck, title: "Your details stay private", text: "We use your information only to respond to this message." },
];

const links = [
  { to: "/docs", icon: BookOpen, title: "Read the docs", text: "Guides for problem statements, scope, export and deployment." },
  { to: "/pricing", icon: CreditCard, title: "Compare plans", text: "See what each plan includes and how credits work." },
];

export default function Contact() {
  return (
    <>
      <div className="relative overflow-hidden">
        <Meteors count={12} className="opacity-60" />
        <PageHero eyebrow="Contact" title="Let's talk about what you want to build" subtitle="Questions about the platform, pricing or partnerships. Send a message and our team will get back to you." />
      </div>

      <Section className="pt-0 sm:pt-0">
        <div aria-hidden className="pointer-events-none absolute left-1/4 top-20 h-72 w-72 rounded-full bg-violet/20 blur-[110px]" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-10 top-1/2 h-64 w-64 rounded-full bg-cyan/15 blur-[110px]"
          animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="space-y-8">
            <div>
              <Reveal>
                <h2 className="font-display text-xl font-semibold">What to expect</h2>
              </Reveal>
              <RevealGroup className="mt-5 space-y-5">
                {expectations.map((e) => (
                  <RevealItem key={e.title}>
                    <div className="group flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-cyan transition-all duration-300 group-hover:border-cyan/50 group-hover:shadow-glow-cyan">
                        <e.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="font-medium text-ink">{e.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{e.text}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <RevealGroup className="space-y-3">
              {links.map((l, i) => (
                <RevealItem key={l.to}>
                  <Link to={l.to} className="block">
                    <SpotlightCard glow={i ? "cyan" : "violet"}>
                      <div className="flex items-center gap-4 p-5">
                        <l.icon className="h-5 w-5 shrink-0 text-violet-soft" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium">{l.title}</h3>
                          <p className="mt-0.5 text-sm text-ink-muted">{l.text}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                      </div>
                    </SpotlightCard>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>
    </>
  );
}
