import express from "express";
import path from "node:path";
import { existsSync } from "node:fs";
import { env } from "./env";
import { migrate, pool } from "./db";
import { errorHandler, HttpError } from "./http";
import { sessionMiddleware } from "./session";
import { authRouter } from "./routes/auth";
import { projectsRouter } from "./routes/projects";
import { accountRouter } from "./routes/account";
import { contactRouter } from "./routes/contact";

async function main() {
  await migrate();

  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(express.json({ limit: "200kb" }));
  app.use("/api", sessionMiddleware);

  app.get("/api/health", async (_req, res) => {
    await pool.query("SELECT 1");
    res.json({ ok: true, service: "infodrizzle-ai-api" });
  });
  app.use("/api/auth", authRouter);
  app.use("/api/projects", projectsRouter);
  app.use("/api/account", accountRouter);
  app.use("/api/contact", contactRouter);
  app.use("/api", (_req, _res, next) => next(new HttpError(404, "Not found.")));

  // In production the API also serves the built React app.
  const webDir = path.resolve(import.meta.dirname, "..", "dist", "web");
  if (env.isProd && existsSync(webDir)) {
    app.use(express.static(webDir, { maxAge: "1h", index: false }));
    app.get("*", (_req, res) => res.sendFile(path.join(webDir, "index.html")));
  }

  app.use(errorHandler);
  app.listen(env.port, () => console.log(`[api] InfoDrizzle AI API listening on http://localhost:${env.port}`));
}

main().catch((err) => {
  console.error("[api] failed to start", err);
  process.exit(1);
});
