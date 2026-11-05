import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AuthField, AuthHeading, FormAlert, PasswordStrength } from "@/components/auth/AuthBits";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", workspaceName: "" });
  const [fields, setFields] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setFields({});
    setLoading(true);
    try {
      await signup(form);
      navigate("/studio/new", { replace: true });
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
    <>
      <AuthHeading title="Create your account" subtitle="Start free. Describe your first application in minutes." />
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <FormAlert message={error} />
        <AuthField index={0} id="name" label="Full name" icon={User} autoComplete="name" placeholder="Your full name" value={form.name} onChange={set("name")} error={fields.name} required />
        <AuthField index={1} id="email" label="Work email" icon={Mail} type="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={set("email")} error={fields.email} required />
        <AuthField index={2} id="workspaceName" label="Workspace name" icon={Building2} autoComplete="organization" placeholder="Your company or team" value={form.workspaceName} onChange={set("workspaceName")} error={fields.workspaceName} required />
        <div>
          <AuthField index={3} id="password" label="Password" icon={Lock} type="password" autoComplete="new-password" placeholder="At least 8 characters" value={form.password} onChange={set("password")} error={fields.password} required />
          <PasswordStrength value={form.password} />
        </div>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="pt-2">
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            Create account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
        <p className="text-center text-xs text-ink-faint">You can export your source code at any time.</p>
      </form>
      <p className="mt-8 text-center text-sm text-ink-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-ink underline decoration-violet/50 underline-offset-4 transition-colors hover:decoration-cyan">
          Log in
        </Link>
      </p>
    </>
  );
}
