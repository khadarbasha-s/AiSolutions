import type { Project, User, Workspace } from "@shared/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toUser = (r: any, role: User["role"] = "member"): User => ({
  id: r.id,
  name: r.name,
  email: r.email,
  role: r.role ?? role,
  createdAt: new Date(r.created_at).toISOString(),
});

export const toWorkspace = (r: any): Workspace => ({
  id: r.id,
  name: r.name,
  slug: r.slug,
  plan: r.plan,
  createdAt: new Date(r.created_at).toISOString(),
});

export const toProject = (r: any): Project => ({
  id: r.id,
  workspaceId: r.workspace_id,
  name: r.name,
  problemStatement: r.problem_statement,
  scope: r.scope,
  context: r.context,
  status: r.status,
  createdAt: new Date(r.created_at).toISOString(),
  updatedAt: new Date(r.updated_at).toISOString(),
});
