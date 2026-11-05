import {
  LayoutDashboard, PlusCircle, ClipboardList, Network, Boxes, Workflow, Code2, Plug, Database,
  FlaskConical, Rocket, Activity, Settings, type LucideIcon,
} from "lucide-react";

export type StudioNavItem = { to: string; label: string; icon: LucideIcon; phase?: number; description?: string };

export const studioPrimary: StudioNavItem[] = [
  { to: "/studio", label: "Dashboard", icon: LayoutDashboard },
  { to: "/studio/new", label: "Create Application", icon: PlusCircle },
];

/** Screens planned for later phases. They render a "coming soon" view for now. */
export const studioBuild: StudioNavItem[] = [
  { to: "/studio/requirements", label: "Requirement Analysis", icon: ClipboardList, phase: 2, description: "Review the requirement document the AI writes from your problem statement, answer its clarifying questions and approve the scope." },
  { to: "/studio/architecture", label: "Architecture Designer", icon: Network, phase: 2, description: "See the proposed technical architecture, technology stack, user roles and integrations before anything is generated." },
  { to: "/studio/builder", label: "Application Builder", icon: Boxes, phase: 3, description: "Watch frontend, backend, database and AI components being generated, and regenerate any part on demand." },
  { to: "/studio/workflows", label: "Workflow Studio", icon: Workflow, phase: 3, description: "Design and modify AI agent workflows on a visual canvas." },
  { to: "/studio/code", label: "Code Workspace", icon: Code2, phase: 3, description: "Inspect, edit and export every file of the generated source code." },
  { to: "/studio/integrations", label: "Integrations", icon: Plug, phase: 3, description: "Connect APIs, payment gateways, CRMs and other external systems." },
  { to: "/studio/data", label: "Data Management", icon: Database, phase: 3, description: "Manage documents, databases and knowledge bases used by your application." },
  { to: "/studio/testing", label: "Testing & Evaluation", icon: FlaskConical, phase: 4, description: "Run automated tests and evaluate the quality of AI responses." },
  { to: "/studio/deploy", label: "Deployment", icon: Rocket, phase: 4, description: "Publish to an isolated hosted environment or download the source." },
  { to: "/studio/monitoring", label: "Monitoring", icon: Activity, phase: 4, description: "Logs, usage, errors and performance for every deployed application." },
];

export const studioSettings: StudioNavItem = { to: "/studio/settings", label: "Settings", icon: Settings };
