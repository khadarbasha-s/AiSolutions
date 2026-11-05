import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import type { NextFunction, Request, Response } from "express";
import { pool } from "./db";
import { env } from "./env";
import { HttpError } from "./http";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    workspaceId?: string;
  }
}

const PgStore = connectPgSimple(session);

export const sessionMiddleware = session({
  store: new PgStore({ pool, tableName: "sessions", createTableIfMissing: true }),
  name: "idai.sid",
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { httpOnly: true, sameSite: "lax", secure: env.isProd, maxAge: 1000 * 60 * 60 * 24 * 14 },
});

/** Rejects requests without a signed-in user and workspace. */
export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  if (!req.session.userId || !req.session.workspaceId) return next(new HttpError(401, "Please log in to continue."));
  next();
}

export function regenerate(req: Request) {
  return new Promise<void>((resolve, reject) => req.session.regenerate((err) => (err ? reject(err) : resolve())));
}
