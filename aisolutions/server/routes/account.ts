import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { query } from "../db";
import { handle, HttpError, parse } from "../http";
import { toUser, toWorkspace } from "../mappers";
import { requireAuth } from "../session";

export const accountRouter = Router();
accountRouter.use(requireAuth);

accountRouter.patch(
  "/profile",
  handle(async (req, res) => {
    const { name } = parse(z.object({ name: z.string().trim().min(2, "Enter your full name.").max(80) }), req.body);
    const { rows } = await query("UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, email, created_at", [name, req.session.userId]);
    res.json(toUser(rows[0]));
  }),
);

accountRouter.post(
  "/password",
  handle(async (req, res) => {
    const input = parse(
      z.object({
        currentPassword: z.string().min(1, "Enter your current password."),
        newPassword: z.string().min(8, "Use at least 8 characters.").max(128),
      }),
      req.body,
    );
    const { rows } = await query("SELECT password_hash FROM users WHERE id = $1", [req.session.userId]);
    if (!(await bcrypt.compare(input.currentPassword, rows[0].password_hash)))
      throw new HttpError(400, "Your current password is incorrect.", { currentPassword: "This password is incorrect." });
    await query("UPDATE users SET password_hash = $1 WHERE id = $2", [await bcrypt.hash(input.newPassword, 12), req.session.userId]);
    res.json({ ok: true });
  }),
);

async function memberRole(req: { session: { userId?: string; workspaceId?: string } }) {
  const { rows } = await query("SELECT role FROM workspace_members WHERE workspace_id = $1 AND user_id = $2", [req.session.workspaceId, req.session.userId]);
  return rows[0]?.role as "owner" | "admin" | "member" | undefined;
}

accountRouter.patch(
  "/workspace",
  handle(async (req, res) => {
    const { name } = parse(z.object({ name: z.string().trim().min(2, "Name your workspace.").max(60) }), req.body);
    const role = await memberRole(req);
    if (role !== "owner" && role !== "admin") throw new HttpError(403, "Only workspace owners and admins can rename the workspace.");
    const { rows } = await query("UPDATE workspaces SET name = $1 WHERE id = $2 RETURNING *", [name, req.session.workspaceId]);
    res.json(toWorkspace(rows[0]));
  }),
);

accountRouter.get(
  "/workspace/members",
  handle(async (req, res) => {
    const { rows } = await query(
      `SELECT u.id, u.name, u.email, m.role, m.created_at
         FROM workspace_members m JOIN users u ON u.id = m.user_id
        WHERE m.workspace_id = $1 ORDER BY m.created_at`,
      [req.session.workspaceId],
    );
    res.json(rows.map((r) => toUser(r)));
  }),
);
