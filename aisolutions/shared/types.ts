/** Types shared by the React app (src/) and the Express API (server/). */

export type Role = "owner" | "admin" | "member";
export type Plan = "free" | "pro" | "team" | "enterprise";
export type GenerationScope = "full" | "frontend" | "backend" | "ai";
export type ProjectStatus = "draft" | "analyzing" | "awaiting_approval" | "generating" | "ready" | "deployed";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: Plan;
  createdAt: string;
}

export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  problemStatement: string;
  scope: GenerationScope;
  context: string | null;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export type SessionPayload = { user: User; workspace: Workspace } | { user: null; workspace: null };

export interface DashboardStats {
  totalProjects: number;
  byStatus: Record<ProjectStatus, number>;
  recent: Project[];
}
