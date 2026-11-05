import { useState, type ReactNode, type InputHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, AlertCircle, type LucideIcon } from "lucide-react";
import { Input, Label, FieldError } from "@/components/ui/Field";
import { cn } from "@/lib/cn";

export function AuthHeading({ title, subtitle }: { title: string; subtitle: ReactNode }) {
  return (
    <div className="mb-8">
      <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-3xl font-semibold sm:text-4xl">
        {title}
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-2 text-ink-muted">
        {subtitle}
      </motion.p>
    </div>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; icon: LucideIcon; error?: string; index?: number; trailing?: ReactNode };

/** Labelled input with a leading icon, staggered entrance and inline error. */
export function AuthField({ label, icon: Icon, error, index = 0, id, trailing, className, type, ...rest }: FieldProps) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {trailing}
      </div>
      <div className="group relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint transition-colors group-focus-within:text-violet-soft" />
        <Input
          id={id}
          type={isPassword && show ? "text" : type}
          aria-invalid={!!error}
          className={cn("pl-10", isPassword && "pr-11", error && "border-danger/60 focus:border-danger/60 focus:ring-danger/15", className)}
          {...rest}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-ink-faint transition-colors hover:text-ink">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={String(show)} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} className="block">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        )}
      </div>
      <AnimatePresence>{error && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><FieldError>{error}</FieldError></motion.div>}</AnimatePresence>
    </motion.div>
  );
}

export function FormAlert({ message, tone = "danger" }: { message?: string | null; tone?: "danger" | "success" }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto", x: tone === "danger" ? [0, -6, 6, -4, 4, 0] : 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          role="alert"
          className={cn(
            "flex items-start gap-2 rounded-xl border px-3.5 py-3 text-sm",
            tone === "danger" ? "border-danger/40 bg-danger/10 text-danger" : "border-success/40 bg-success/10 text-success",
          )}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Four-segment strength meter that fills and recolours as the password improves. */
export function PasswordStrength({ value }: { value: string }) {
  const score = [value.length >= 8, /[A-Z]/.test(value) && /[a-z]/.test(value), /\d/.test(value), /[^A-Za-z0-9]/.test(value) || value.length >= 14].filter(Boolean).length;
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-danger", "bg-danger", "bg-warning", "bg-cyan", "bg-success"];
  if (!value) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-elevated">
            <motion.div className={cn("h-full", colors[score])} initial={false} animate={{ width: i < score ? "100%" : "0%" }} transition={{ duration: 0.35 }} />
          </div>
        ))}
      </div>
      <p className="mt-1.5 text-xs text-ink-faint">{value.length < 8 ? labels[0] : labels[score]}</p>
    </div>
  );
}
