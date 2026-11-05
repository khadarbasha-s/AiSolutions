import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Lock, Pencil, Trash2, X } from "lucide-react";
import type { GenerationScope, Project } from "@shared/types";
import { api, ApiError } from "@/lib/api";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/Field";
import { Modal, Panel, PIPELINE, SCOPE_LABEL, StatusBadge, timeAgo } from "@/components/studio/studioBits";
import { cn } from "@/lib/cn";

function Pipeline() {
  return (
    <ol className="relative">
      <motion.span aria-hidden className="absolute left-[15px] top-2 w-px origin-top bg-gradient-to-b from-success via-violet/50 to-transparent" style={{ bottom: 8 }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />
      {PIPELINE.map((step, i) => {
        const done = step.phase === 1;
        const next = i === 1;
        return (
          <motion.li key={step.key} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.08 }} className="relative flex gap-4 pb-6 last:pb-0">
            <span className={cn("relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs", done ? "border-success/60 bg-success/15 text-success" : next ? "border-violet/60 bg-violet/15 text-violet-soft" : "border-line bg-surface text-ink-faint")}>
              {next && <span className="absolute inset-0 animate-pulse-ring rounded-full border border-violet/60" />}
              {done ? <Check className="h-4 w-4" /> : next ? i + 1 : <Lock className="h-3.5 w-3.5" />}
            </span>
            <div className="pt-1">
              <p className={cn("text-sm font-medium", !done && !next && "text-ink-muted")}>
                {step.label}
                {!done && <span className="ml-2 rounded border border-line px-1.5 py-px font-mono text-[9px] uppercase text-ink-faint">Phase {step.phase}</span>}
              </p>
              <p className="mt-0.5 text-xs text-ink-faint">{step.text}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: "", problemStatement: "", scope: "full" as GenerationScope, context: "" });
  const [fields, setFields] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api<Project>(`/projects/${id}`)
      .then(setProject)
      .catch((e) => (e instanceof ApiError && e.status === 404 ? setNotFound(true) : console.error(e)));
  }, [id]);

  const startEdit = () => {
    if (!project) return;
    setDraft({ name: project.name, problemStatement: project.problemStatement, scope: project.scope, context: project.context ?? "" });
    setFields({});
    setEditing(true);
  };

  async function save() {
    setSaving(true);
    setFields({});
    try {
      setProject(await api<Project>(`/projects/${id}`, { method: "PATCH", json: { ...draft, context: draft.context || null } }));
      setEditing(false);
    } catch (e) {
      if (e instanceof ApiError) setFields(e.fields ?? { form: e.message });
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    setDeleting(true);
    try {
      await api(`/projects/${id}`, { method: "DELETE" });
      navigate("/studio", { replace: true });
    } finally {
      setDeleting(false);
    }
  }

  if (notFound)
    return (
      <div className="mx-auto max-w-md py-24 text-center">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <p className="mt-2 text-ink-muted">It may have been deleted, or it belongs to another workspace.</p>
        <ButtonLink to="/studio" className="mt-6" variant="secondary"><ArrowLeft className="h-4 w-4" /> Back to dashboard</ButtonLink>
      </div>
    );

  if (!project)
    return (
      <div className="mx-auto max-w-[1600px] space-y-4">
        <div className="h-8 w-64 animate-pulse rounded bg-elevated" />
        <div className="h-64 animate-pulse rounded-2xl bg-surface" />
      </div>
    );

  return (
    <div className="mx-auto max-w-[1600px]">
      <Link to="/studio" className="group mb-6 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Dashboard
      </Link>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="break-words text-2xl font-semibold sm:text-3xl">{project.name}</motion.h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-1.5 text-sm text-ink-faint">Created {timeAgo(project.createdAt)} · Updated {timeAgo(project.updatedAt)}</p>
        </div>
        {!editing && (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={startEdit}><Pencil className="h-4 w-4" /> Edit</Button>
            <Button variant="danger" size="sm" onClick={() => setConfirmDelete(true)}><Trash2 className="h-4 w-4" /> Delete</Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Panel>
            {editing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="p-name">Name</Label>
                  <Input id="p-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                  <FieldError>{fields.name}</FieldError>
                </div>
                <div>
                  <Label htmlFor="p-problem">Problem statement</Label>
                  <Textarea id="p-problem" rows={8} value={draft.problemStatement} onChange={(e) => setDraft({ ...draft, problemStatement: e.target.value })} />
                  <FieldError>{fields.problemStatement}</FieldError>
                </div>
                <div>
                  <Label htmlFor="p-scope">Generation scope</Label>
                  <Select id="p-scope" value={draft.scope} onChange={(e) => setDraft({ ...draft, scope: e.target.value as GenerationScope })}>
                    {Object.entries(SCOPE_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="p-context">Additional context</Label>
                  <Textarea id="p-context" value={draft.context} onChange={(e) => setDraft({ ...draft, context: e.target.value })} />
                </div>
                <FieldError>{fields.form}</FieldError>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditing(false)}><X className="h-4 w-4" /> Cancel</Button>
                  <Button size="sm" onClick={save} loading={saving}><Check className="h-4 w-4" /> Save changes</Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">Problem statement</h2>
                <p className="mt-3 whitespace-pre-wrap leading-relaxed">{project.problemStatement}</p>
                <div className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
                  <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">Generation scope</h3>
                    <p className="mt-1.5 text-sm">{SCOPE_LABEL[project.scope]}</p>
                  </div>
                  <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">Additional context</h3>
                    <p className="mt-1.5 whitespace-pre-wrap text-sm text-ink-muted">{project.context || "None added"}</p>
                  </div>
                </div>
              </>
            )}
          </Panel>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
          <Panel>
            <h2 className="font-display font-semibold">Build pipeline</h2>
            <p className="mt-1 text-xs text-ink-muted">The AI analysis steps arrive with the Phase 2 engine. This project is saved and will move through them automatically.</p>
            <div className="mt-5"><Pipeline /></div>
          </Panel>
        </motion.div>
      </div>

      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete this project?">
        <p className="text-sm text-ink-muted">"{project.name}" and its problem statement will be permanently deleted. This cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button variant="danger" size="sm" onClick={remove} loading={deleting}><Trash2 className="h-4 w-4" /> Delete project</Button>
        </div>
      </Modal>
    </div>
  );
}
