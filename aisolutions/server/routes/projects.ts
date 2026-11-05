import { Router } from "express";
import { z } from "zod";
import { query } from "../db";
import { handle, HttpError, parse } from "../http";
import { toProject } from "../mappers";
import { requireAuth } from "../session";

export const projectsRouter = Router();
projectsRouter.use(requireAuth);

const STATUSES = ["draft", "analyzing", "awaiting_approval", "generating", "ready", "deployed"] as const;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const projectId = (raw: string) => {
  if (!UUID.test(raw)) throw new HttpError(404, "Project not found.");
  return raw;
};

const projectInput = z.object({
  name: z.string().trim().min(2, "Give the project a name.").max(80),
  problemStatement: z
    .string()
    .trim()
    .min(30, "Describe the problem in at least 30 characters so the AI has enough to work with.")
    .max(8000, "Keep the problem statement under 8,000 characters."),
  scope: z.enum(["full", "frontend", "backend", "ai"]).default("full"),
  context: z.string().trim().max(8000).optional().nullable(),
});

// Every query is scoped to the session's workspace, so one tenant can never read another's projects.
projectsRouter.get(
  "/",
  handle(async (req, res) => {
    const { q, status } = parse(z.object({ q: z.string().max(100).optional(), status: z.enum(STATUSES).optional() }), req.query);
    const { rows } = await query(
      `SELECT * FROM projects
        WHERE workspace_id = $1
          AND ($2::text IS NULL OR name ILIKE '%' || $2 || '%' OR problem_statement ILIKE '%' || $2 || '%')
          AND ($3::text IS NULL OR status = $3)
        ORDER BY updated_at DESC
        LIMIT 200`,
      [req.session.workspaceId, q || null, status ?? null],
    );
    res.json(rows.map(toProject));
  }),
);

projectsRouter.get(
  "/stats",
  handle(async (req, res) => {
    const [counts, recent] = await Promise.all([
      query<{ status: (typeof STATUSES)[number]; n: string }>("SELECT status, count(*) AS n FROM projects WHERE workspace_id = $1 GROUP BY status", [req.session.workspaceId]),
      query("SELECT * FROM projects WHERE workspace_id = $1 ORDER BY updated_at DESC LIMIT 6", [req.session.workspaceId]),
    ]);
    const byStatus = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<(typeof STATUSES)[number], number>;
    let total = 0;
    for (const r of counts.rows) {
      byStatus[r.status] = Number(r.n);
      total += Number(r.n);
    }
    res.json({ totalProjects: total, byStatus, recent: recent.rows.map(toProject) });
  }),
);

projectsRouter.post(
  "/",
  handle(async (req, res) => {
    const input = parse(projectInput, req.body);
    const { rows } = await query(
      `INSERT INTO projects (workspace_id, created_by, name, problem_statement, scope, context)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [req.session.workspaceId, req.session.userId, input.name, input.problemStatement, input.scope, input.context || null],
    );
    res.status(201).json(toProject(rows[0]));
  }),
);

projectsRouter.get(
  "/:id",
  handle(async (req, res) => {
    const id = projectId(req.params.id);
    const { rows } = await query("SELECT * FROM projects WHERE id = $1 AND workspace_id = $2", [id, req.session.workspaceId]);
    if (!rows[0]) throw new HttpError(404, "Project not found.");
    res.json(toProject(rows[0]));
  }),
);

projectsRouter.patch(
  "/:id",
  handle(async (req, res) => {
    const id = projectId(req.params.id);
    const input = parse(projectInput.partial(), req.body);
    const { rows } = await query(
      `UPDATE projects SET
          name = COALESCE($3, name),
          problem_statement = COALESCE($4, problem_statement),
          scope = COALESCE($5, scope),
          context = CASE WHEN $6::boolean THEN $7 ELSE context END,
          updated_at = now()
        WHERE id = $1 AND workspace_id = $2
        RETURNING *`,
      [id, req.session.workspaceId, input.name ?? null, input.problemStatement ?? null, input.scope ?? null, input.context !== undefined, input.context || null],
    );
    if (!rows[0]) throw new HttpError(404, "Project not found.");
    res.json(toProject(rows[0]));
  }),
);

projectsRouter.delete(
  "/:id",
  handle(async (req, res) => {
    const id = projectId(req.params.id);
    const { rowCount } = await query("DELETE FROM projects WHERE id = $1 AND workspace_id = $2", [id, req.session.workspaceId]);
    if (!rowCount) throw new HttpError(404, "Project not found.");
    res.json({ ok: true });
  }),
);
