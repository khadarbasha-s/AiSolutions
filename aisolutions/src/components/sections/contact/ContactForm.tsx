import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, HelpCircle, Handshake, MessageSquare, Send, RotateCcw } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/Field";
import { BorderBeam } from "@/components/fx";
import { cn } from "@/lib/cn";

type Topic = "sales" | "support" | "partnership" | "other";
type Values = { name: string; email: string; company: string; topic: Topic; message: string };
type Errors = Partial<Record<keyof Values | "form", string>>;

const topics: { value: Topic; label: string; icon: typeof Briefcase }[] = [
  { value: "sales", label: "Sales", icon: Briefcase },
  { value: "support", label: "Support", icon: HelpCircle },
  { value: "partnership", label: "Partnership", icon: Handshake },
  { value: "other", label: "Other", icon: MessageSquare },
];

const empty: Values = { name: "", email: "", company: "", topic: "sales", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
  if (v.message.length > 4000) e.message = "Please keep the message under 4000 characters.";
  return e;
}

function SuccessCheck() {
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden>
      <motion.circle cx="40" cy="40" r="34" fill="none" stroke="url(#ok-g)" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: "easeOut" }} />
      <motion.path d="M25 41 l10 10 l20 -22" fill="none" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.6, ease: "easeOut" }} />
      <defs>
        <linearGradient id="ok-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Values>(k: K, v: Values[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      await api<{ ok: true }>("/contact", {
        method: "POST",
        json: { ...values, name: values.name.trim(), email: values.email.trim(), company: values.company.trim() || undefined, message: values.message.trim() },
      });
      setSent(true);
    } catch (err) {
      if (err instanceof ApiError) setErrors({ ...(err.fields as Errors | undefined), form: err.fields ? undefined : err.message });
      else setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/70 p-6 shadow-panel backdrop-blur-xl sm:p-9">
      <BorderBeam duration={14} />
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex min-h-[460px] flex-col items-center justify-center text-center">
            <SuccessCheck />
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-6 text-2xl font-semibold">
              Message received
            </motion.h3>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-3 max-w-sm text-ink-muted">
              Thanks, {values.name.split(" ")[0]}. Our team will reply to {values.email} soon.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <Button variant="secondary" className="mt-8" onClick={() => { setValues(empty); setSent(false); }}>
                <RotateCcw className="h-4 w-4" /> Send another message
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="relative space-y-5">
            <div>
              <Label>What can we help with?</Label>
              <div role="radiogroup" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {topics.map((t) => {
                  const on = values.topic === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => set("topic", t.value)}
                      className={cn("relative flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs transition-colors", on ? "border-violet/50 text-ink" : "border-line text-ink-muted hover:border-violet/30 hover:text-ink")}
                    >
                      {on && <motion.span layoutId="topic-pill" className="absolute inset-0 rounded-xl bg-violet/10 shadow-glow" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                      <t.icon className={cn("relative h-4 w-4 transition-transform", on && "scale-110 text-violet-soft")} />
                      <span className="relative">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="c-name">Name</Label>
                <Input id="c-name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} className={cn(errors.name && "border-danger/60")} placeholder="Your full name" />
                <FieldError>{errors.name}</FieldError>
              </div>
              <div>
                <Label htmlFor="c-email">Work email</Label>
                <Input id="c-email" type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} className={cn(errors.email && "border-danger/60")} placeholder="you@company.com" />
                <FieldError>{errors.email}</FieldError>
              </div>
            </div>

            <div>
              <Label htmlFor="c-company">Company <span className="font-normal text-ink-faint">(optional)</span></Label>
              <Input id="c-company" autoComplete="organization" value={values.company} onChange={(e) => set("company", e.target.value)} placeholder="Where do you work?" />
              <FieldError>{errors.company}</FieldError>
            </div>

            <div>
              <Label htmlFor="c-message">Message</Label>
              <Textarea id="c-message" rows={6} value={values.message} onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} className={cn(errors.message && "border-danger/60")} placeholder="Tell us about the application you want to build, or the question you have." />
              <div className="flex items-start justify-between gap-3">
                <FieldError>{errors.message}</FieldError>
                <span className="ml-auto mt-1.5 font-mono text-[11px] text-ink-faint">{values.message.length}/4000</span>
              </div>
            </div>

            <AnimatePresence>
              {errors.form && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
                  {errors.form}
                </motion.p>
              )}
            </AnimatePresence>

            <Button type="submit" size="lg" loading={loading} className="w-full">
              {loading ? "Sending" : "Send message"} {!loading && <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
