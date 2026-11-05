import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, MailCheck, ShieldCheck } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { AuthField, AuthHeading, FormAlert, PasswordStrength } from "@/components/auth/AuthBits";
import { api, ApiError } from "@/lib/api";

function Done({ icon: Icon, title, text, action }: { icon: typeof MailCheck; title: string; text: string; action: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
      <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-2xl border border-success/50" />
        <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.1 }} className="flex h-16 w-16 items-center justify-center rounded-2xl border border-success/40 bg-success/10">
          <Icon className="h-7 w-7 text-success" />
        </motion.span>
      </div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mx-auto mt-3 max-w-sm text-ink-muted">{text}</p>
      <div className="mt-8">{action}</div>
    </motion.div>
  );
}

export default function ForgotPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setFields({});
    setLoading(true);
    try {
      if (token) await api("/auth/reset-password", { method: "POST", json: { token, password } });
      else await api("/auth/forgot-password", { method: "POST", json: { email } });
      setDone(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setFields(err.fields ?? {});
        if (!err.fields) setError(err.message);
      } else setError("Could not reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {done ? (
        token ? (
          <Done key="reset" icon={ShieldCheck} title="Password updated" text="Your password has been changed and other sessions were signed out." action={<ButtonLink to="/login" size="lg">Log in</ButtonLink>} />
        ) : (
          <Done
            key="sent"
            icon={MailCheck}
            title="Check your inbox"
            text={`If an account exists for ${email}, a reset link is on its way. The link expires in one hour.`}
            action={<ButtonLink to="/login" variant="secondary"><ArrowLeft className="h-4 w-4" /> Back to log in</ButtonLink>}
          />
        )
      ) : (
        <motion.div key="form" exit={{ opacity: 0, y: -10 }}>
          <AuthHeading
            title={token ? "Choose a new password" : "Reset your password"}
            subtitle={token ? "Pick something you have not used here before." : "Enter your email and we'll send you a reset link."}
          />
          <form onSubmit={submit} className="space-y-5" noValidate>
            <FormAlert message={error} />
            {token ? (
              <div>
                <AuthField id="password" label="New password" icon={Lock} type="password" autoComplete="new-password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} error={fields.password} required />
                <PasswordStrength value={password} />
              </div>
            ) : (
              <AuthField id="email" label="Email" icon={Mail} type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} error={fields.email} required />
            )}
            <Button type="submit" size="lg" className="w-full" loading={loading}>
              {token ? "Update password" : "Send reset link"}
            </Button>
          </form>
          <Link to="/login" className="group mt-8 flex items-center justify-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to log in
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
