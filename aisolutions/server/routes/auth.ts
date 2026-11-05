import { Router } from "express";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { z } from "zod";
import { query, tx } from "../db";
import { env } from "../env";
import { handle, HttpError, parse, rateLimit } from "../http";
import { toUser, toWorkspace } from "../mappers";
import { regenerate } from "../session";

export const authRouter = Router();
const limiter = rateLimit({ windowMs: 60_000, max: 10 });

const password = z.string().min(8, "Use at least 8 characters.").max(128, "Use at most 128 characters.");
const email = z.string().trim().toLowerCase().email("Enter a valid email address.").max(254);

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "workspace";

async function loadSession(userId: string, workspaceId?: string) {
  const { rows } = await query(
    `SELECT u.id, u.name, u.email, u.created_at, m.role,
            w.id AS w_id, w.name AS w_name, w.slug AS w_slug, w.plan AS w_plan, w.created_at AS w_created_at
       FROM users u
       JOIN workspace_members m ON m.user_id = u.id
       JOIN workspaces w ON w.id = m.workspace_id
      WHERE u.id = $1 AND ($2::uuid IS NULL OR w.id = $2::uuid)
      ORDER BY m.created_at
      LIMIT 1`,
    [userId, workspaceId ?? null],
  );
  const r = rows[0];
  if (!r) return null;
  return {
    user: toUser(r),
    workspace: toWorkspace({ id: r.w_id, name: r.w_name, slug: r.w_slug, plan: r.w_plan, created_at: r.w_created_at }),
  };
}

authRouter.get(
  "/me",
  handle(async (req, res) => {
    if (!req.session.userId) return res.json({ user: null, workspace: null });
    const s = await loadSession(req.session.userId, req.session.workspaceId);
    if (!s) {
      req.session.destroy(() => {});
      return res.json({ user: null, workspace: null });
    }
    res.json(s);
  }),
);

authRouter.post(
  "/signup",
  limiter,
  handle(async (req, res) => {
    const input = parse(
      z.object({
        name: z.string().trim().min(2, "Enter your full name.").max(80),
        email,
        password,
        workspaceName: z.string().trim().min(2, "Name your workspace.").max(60),
      }),
      req.body,
    );
    const exists = await query("SELECT 1 FROM users WHERE lower(email) = $1", [input.email]);
    if (exists.rowCount) throw new HttpError(409, "An account with this email already exists.", { email: "This email is already registered. Try logging in." });

    const hash = await bcrypt.hash(input.password, 12);
    const ids = await tx(async (c) => {
      const u = await c.query("INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3) RETURNING id", [input.name, input.email, hash]);
      const slug = `${slugify(input.workspaceName)}-${crypto.randomBytes(3).toString("hex")}`;
      const w = await c.query("INSERT INTO workspaces (name, slug) VALUES ($1,$2) RETURNING id", [input.workspaceName, slug]);
      await c.query("INSERT INTO workspace_members (workspace_id, user_id, role) VALUES ($1,$2,'owner')", [w.rows[0].id, u.rows[0].id]);
      return { userId: u.rows[0].id as string, workspaceId: w.rows[0].id as string };
    });

    await regenerate(req);
    req.session.userId = ids.userId;
    req.session.workspaceId = ids.workspaceId;
    res.status(201).json(await loadSession(ids.userId, ids.workspaceId));
  }),
);

authRouter.post(
  "/login",
  limiter,
  handle(async (req, res) => {
    const input = parse(z.object({ email, password: z.string().min(1, "Enter your password.") }), req.body);
    const { rows } = await query("SELECT id, password_hash FROM users WHERE lower(email) = $1", [input.email]);
    const ok = rows[0] && (await bcrypt.compare(input.password, rows[0].password_hash));
    if (!ok) throw new HttpError(401, "That email and password don't match.");

    const s = await loadSession(rows[0].id);
    if (!s) throw new HttpError(403, "Your account has no workspace. Contact support.");
    await regenerate(req);
    req.session.userId = s.user.id;
    req.session.workspaceId = s.workspace.id;
    res.json(s);
  }),
);

authRouter.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("idai.sid");
    res.json({ ok: true });
  });
});

const hashToken = (t: string) => crypto.createHash("sha256").update(t).digest("hex");

authRouter.post(
  "/forgot-password",
  limiter,
  handle(async (req, res) => {
    const input = parse(z.object({ email }), req.body);
    const { rows } = await query("SELECT id FROM users WHERE lower(email) = $1", [input.email]);
    if (rows[0]) {
      const token = crypto.randomBytes(32).toString("base64url");
      await query("INSERT INTO password_resets (token_hash, user_id, expires_at) VALUES ($1,$2, now() + interval '1 hour')", [hashToken(token), rows[0].id]);
      // Email delivery is not wired up yet. Until it is, the link is printed in the server log.
      console.log(`[auth] Password reset link for ${input.email}: ${env.appUrl}/forgot-password?token=${token}`);
    }
    // Same response either way, so the endpoint can't be used to discover accounts.
    res.json({ ok: true });
  }),
);

authRouter.post(
  "/reset-password",
  limiter,
  handle(async (req, res) => {
    const input = parse(z.object({ token: z.string().min(10), password }), req.body);
    const { rows } = await query(
      "SELECT user_id FROM password_resets WHERE token_hash = $1 AND used_at IS NULL AND expires_at > now()",
      [hashToken(input.token)],
    );
    if (!rows[0]) throw new HttpError(400, "This reset link is invalid or has expired. Request a new one.");
    const hash = await bcrypt.hash(input.password, 12);
    await tx(async (c) => {
      await c.query("UPDATE users SET password_hash = $1 WHERE id = $2", [hash, rows[0].user_id]);
      await c.query("UPDATE password_resets SET used_at = now() WHERE user_id = $1 AND used_at IS NULL", [rows[0].user_id]);
      await c.query("DELETE FROM sessions WHERE sess->>'userId' = $1", [rows[0].user_id]);
    });
    res.json({ ok: true });
  }),
);
