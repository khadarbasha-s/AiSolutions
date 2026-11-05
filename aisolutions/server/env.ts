import { existsSync } from "node:fs";
import path from "node:path";

const envFile = path.resolve(import.meta.dirname, "..", ".env");
if (existsSync(envFile)) process.loadEnvFile(envFile);

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}. Copy .env.example to .env.`);
  return v;
}

export const env = {
  databaseUrl: required("DATABASE_URL"),
  sessionSecret: required("SESSION_SECRET"),
  port: Number(process.env.API_PORT ?? process.env.PORT ?? 5050),
  isProd: process.env.NODE_ENV === "production",
  appUrl: process.env.APP_URL ?? "http://localhost:5173",
};
