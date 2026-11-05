import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { SessionPayload, User, Workspace } from "@shared/types";
import { api } from "./api";

type AuthState = {
  user: User | null;
  workspace: Workspace | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (input: { name: string; email: string; password: string; workspaceName: string }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  setWorkspace: (w: Workspace) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionPayload>({ user: null, workspace: null });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setSession(await api<SessionPayload>("/auth/me"));
    } catch {
      setSession({ user: null, workspace: null });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = async (email: string, password: string) => {
    setSession(await api<SessionPayload>("/auth/login", { method: "POST", json: { email, password } }));
  };
  const signup: AuthState["signup"] = async (input) => {
    setSession(await api<SessionPayload>("/auth/signup", { method: "POST", json: input }));
  };
  const logout = async () => {
    await api("/auth/logout", { method: "POST" });
    setSession({ user: null, workspace: null });
  };
  const setWorkspace = (workspace: Workspace) =>
    setSession((s) => (s.user ? { user: s.user, workspace } : s));

  return (
    <AuthContext.Provider
      value={{ user: session.user, workspace: session.workspace, loading, login, signup, logout, refresh, setWorkspace }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
