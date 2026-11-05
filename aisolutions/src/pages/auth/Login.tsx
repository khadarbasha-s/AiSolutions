import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AuthField, AuthHeading, FormAlert } from "@/components/auth/AuthBits";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/studio";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setFields({});
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
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
      <AuthHeading title="Welcome back" subtitle="Log in to continue building in the studio." />
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <FormAlert message={error} />
        <AuthField index={0} id="email" label="Work email" icon={Mail} type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} error={fields.email} required />
        <AuthField
          index={1}
          id="password"
          label="Password"
          icon={Lock}
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fields.password}
          required
          trailing={<Link to="/forgot-password" className="mb-1.5 text-xs text-cyan transition-colors hover:text-cyan-soft">Forgot password?</Link>}
        />
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            Log in <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </form>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 text-center text-sm text-ink-muted">
        New to InfoDrizzle?{" "}
        <Link to="/signup" className="font-medium text-ink underline decoration-violet/50 underline-offset-4 transition-colors hover:decoration-cyan">
          Create an account
        </Link>
      </motion.p>
    </>
  );
}
