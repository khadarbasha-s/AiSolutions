import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CreditCard, KeyRound, User as UserIcon, Users, Building2 } from "lucide-react";
import type { User, Workspace } from "@shared/types";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input, Label, FieldError } from "@/components/ui/Field";
import { Badge } from "@/components/ui/Badge";
import { PageHeader, Panel } from "@/components/studio/studioBits";
import { cn } from "@/lib/cn";

const TABS = [
  { key: "profile", label: "Profile", icon: UserIcon },
  { key: "workspace", label: "Workspace", icon: Building2 },
  { key: "team", label: "Team", icon: Users },
  { key: "security", label: "Security", icon: KeyRound },
  { key: "billing", label: "Billing", icon: CreditCard },
] as const;
type Tab = (typeof TABS)[number]["key"];

function useForm<T extends Record<string, string>>(initial: T) {
  const [values, setValues] = useState(initial);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const run = async (fn: () => Promise<void>) => {
    setSaving(true);
    setFields({});
    setSaved(false);
    try {
      await fn();
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2200);
    } catch (e) {
      if (e instanceof ApiError) setFields(e.fields ?? { form: e.message });
    } finally {
      setSaving(false);
    }
  };
  return { values, setValues, fields, saving, saved, run };
}

function SaveButton({ saving, saved, children = "Save changes" }: { saving: boolean; saved: boolean; children?: ReactNode }) {
  return (
    <Button type="submit" size="sm" loading={saving}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={String(saved)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
          {saved ? <><Check className="h-4 w-4" /> Saved</> : children}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

function ProfileTab() {
  const { user, refresh } = useAuth();
  const f = useForm({ name: user?.name ?? "" });
  return (
    <Panel>
      <h2 className="font-display text-lg font-semibold">Profile</h2>
      <p className="mt-1 text-sm text-ink-muted">How you appear to your teammates.</p>
      <form className="mt-6 max-w-md space-y-4" onSubmit={(e: FormEvent) => { e.preventDefault(); void f.run(async () => { await api("/account/profile", { method: "PATCH", json: f.values }); await refresh(); }); }}>
        <div>
          <Label htmlFor="s-name">Full name</Label>
          <Input id="s-name" value={f.values.name} onChange={(e) => f.setValues({ name: e.target.value })} />
          <FieldError>{f.fields.name ?? f.fields.form}</FieldError>
        </div>
        <div>
          <Label htmlFor="s-email">Email</Label>
          <Input id="s-email" value={user?.email ?? ""} disabled className="opacity-60" />
        </div>
        <SaveButton saving={f.saving} saved={f.saved} />
      </form>
    </Panel>
  );
}

function WorkspaceTab() {
  const { workspace, user, setWorkspace } = useAuth();
  const f = useForm({ name: workspace?.name ?? "" });
  const canEdit = user?.role === "owner" || user?.role === "admin";
  return (
    <Panel>
      <h2 className="font-display text-lg font-semibold">Workspace</h2>
      <p className="mt-1 text-sm text-ink-muted">Projects, members and billing belong to a workspace.</p>
      <form className="mt-6 max-w-md space-y-4" onSubmit={(e: FormEvent) => { e.preventDefault(); void f.run(async () => setWorkspace(await api<Workspace>("/account/workspace", { method: "PATCH", json: f.values }))); }}>
        <div>
          <Label htmlFor="w-name">Workspace name</Label>
          <Input id="w-name" value={f.values.name} disabled={!canEdit} onChange={(e) => f.setValues({ name: e.target.value })} />
          <FieldError>{f.fields.name ?? f.fields.form}</FieldError>
        </div>
        <div>
          <Label>Workspace ID</Label>
          <p className="rounded-xl border border-line bg-bg/60 px-4 py-2.5 font-mono text-xs text-ink-muted">{workspace?.slug}</p>
        </div>
        {canEdit ? <SaveButton saving={f.saving} saved={f.saved} /> : <p className="text-xs text-ink-faint">Only owners and admins can rename the workspace.</p>}
      </form>
    </Panel>
  );
}

function TeamTab() {
  const [members, setMembers] = useState<User[] | null>(null);
  useEffect(() => void api<User[]>("/account/workspace/members").then(setMembers), []);
  return (
    <Panel>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold">Team</h2>
          <p className="mt-1 text-sm text-ink-muted">People with access to this workspace.</p>
        </div>
        <span title="Invitations arrive with multi-user collaboration">
          <Button size="sm" variant="secondary" disabled>Invite members · soon</Button>
        </span>
      </div>
      <ul className="mt-6 divide-y divide-line">
        {(members ?? []).map((m, i) => (
          <motion.li key={m.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold uppercase text-white">
              {m.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{m.name}</span>
              <span className="block truncate text-xs text-ink-faint">{m.email}</span>
            </span>
            <Badge tone={m.role === "owner" ? "violet" : "neutral"} className="capitalize">{m.role}</Badge>
          </motion.li>
        ))}
        {members === null && <li className="h-12 animate-pulse rounded bg-elevated/50" />}
      </ul>
    </Panel>
  );
}

function SecurityTab() {
  const f = useForm({ currentPassword: "", newPassword: "" });
  return (
    <Panel>
      <h2 className="font-display text-lg font-semibold">Change password</h2>
      <p className="mt-1 text-sm text-ink-muted">Use at least 8 characters.</p>
      <form
        className="mt-6 max-w-md space-y-4"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          void f.run(async () => {
            await api("/account/password", { method: "POST", json: f.values });
            f.setValues({ currentPassword: "", newPassword: "" });
          });
        }}
      >
        <div>
          <Label htmlFor="cur">Current password</Label>
          <Input id="cur" type="password" autoComplete="current-password" value={f.values.currentPassword} onChange={(e) => f.setValues({ ...f.values, currentPassword: e.target.value })} />
          <FieldError>{f.fields.currentPassword}</FieldError>
        </div>
        <div>
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" autoComplete="new-password" value={f.values.newPassword} onChange={(e) => f.setValues({ ...f.values, newPassword: e.target.value })} />
          <FieldError>{f.fields.newPassword ?? f.fields.form}</FieldError>
        </div>
        <SaveButton saving={f.saving} saved={f.saved}>Update password</SaveButton>
      </form>
    </Panel>
  );
}

function BillingTab() {
  const { workspace } = useAuth();
  return (
    <Panel className="relative overflow-hidden">
      <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet/20 blur-[70px]" />
      <h2 className="font-display text-lg font-semibold">Plan and billing</h2>
      <p className="mt-1 text-sm text-ink-muted">Usage-based credits with subscription plans.</p>
      <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-bg/50 p-5">
        <div>
          <p className="text-xs text-ink-faint">Current plan</p>
          <p className="mt-1 font-display text-2xl font-semibold capitalize">{workspace?.plan}</p>
        </div>
        <ButtonLink to="/pricing" size="sm">Compare plans</ButtonLink>
      </div>
      <p className="mt-4 text-xs text-ink-faint">Payments and credit usage tracking arrive with the billing release.</p>
    </Panel>
  );
}

export default function Settings() {
  const [tab, setTab] = useState<Tab>("profile");
  const Content = { profile: ProfileTab, workspace: WorkspaceTab, team: TeamTab, security: SecurityTab, billing: BillingTab }[tab];
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader eyebrow="Settings" title="Account and workspace" subtitle="Manage your profile, workspace, team, security and billing." />
      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <nav className="flex gap-1 overflow-x-auto md:flex-col" aria-label="Settings sections">
          {TABS.map((t) => (
            <button key={t.key} type="button" onClick={() => setTab(t.key)} className={cn("relative flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors", tab === t.key ? "text-ink" : "text-ink-muted hover:text-ink")}>
              {tab === t.key && <motion.span layoutId="settings-tab" className="absolute inset-0 rounded-lg border border-violet/30 bg-violet/10" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <t.icon className="relative h-4 w-4" />
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </nav>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            <Content />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
