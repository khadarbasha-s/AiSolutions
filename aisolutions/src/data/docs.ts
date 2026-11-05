export type DocBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; lang: string; title?: string; code: string }
  | { type: "callout"; tone: "info" | "tip" | "warning"; text: string }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "grid"; items: { title: string; text: string }[] };

export type DocSection = { id: string; title: string; eyebrow: string; badge?: string; blocks: DocBlock[] };

export const docSections: DocSection[] = [
  {
    id: "getting-started",
    eyebrow: "01 · Basics",
    title: "Getting started",
    blocks: [
      { type: "p", text: "InfoDrizzle AI Solutions turns a written problem statement into a working application. You describe what you need, review the plan the AI proposes, approve it, and the agents generate the application." },
      {
        type: "steps",
        items: [
          { title: "Create an account", text: "Sign up and name your workspace. Every project you create lives inside a workspace." },
          { title: "Open the Studio", text: "The dashboard lists your projects. Choose Create Application to start a new one." },
          { title: "Describe the problem", text: "Write what the application should do, who uses it and what success looks like. Attach context if you have it." },
          { title: "Review and approve", text: "Nothing is generated until you approve the requirements and architecture." },
        ],
      },
      { type: "callout", tone: "info", text: "Phase 1 covers accounts, workspaces, the dashboard and project creation. The AI planning engine arrives in Phase 2." },
    ],
  },
  {
    id: "problem-statement",
    eyebrow: "02 · Input",
    title: "Writing a good problem statement",
    blocks: [
      { type: "p", text: "The quality of the plan depends on the quality of the description. You do not need technical language. Focus on people, actions and outcomes." },
      {
        type: "list",
        items: [
          "Who uses the application, and what roles they have.",
          "The main tasks each role needs to complete.",
          "Data the application stores or reads, such as documents or records.",
          "External systems it must talk to, such as payments, email or a CRM.",
          "Constraints like compliance, languages or expected users.",
        ],
      },
      {
        type: "code",
        lang: "text",
        title: "Example problem statement",
        code: `Build a recruitment platform for a 40-person HR team.
Recruiters post jobs and upload resumes.
The AI scores each resume against the job description
and shortlists the top candidates.
Candidates book interview slots from a shared calendar.
Hiring managers see a pipeline board and leave feedback.`,
      },
      { type: "callout", tone: "tip", text: "If something is missing, the Requirement Agent asks clarifying questions before it writes the plan." },
    ],
  },
  {
    id: "pipeline",
    eyebrow: "03 · Process",
    title: "The plan-first pipeline",
    blocks: [
      { type: "p", text: "The platform never jumps straight to code. A central orchestrator moves every project through the same gated stages." },
      {
        type: "steps",
        items: [
          { title: "Understand", text: "The Requirement Agent reads the statement and identifies what is missing." },
          { title: "Clarify", text: "It asks focused questions and records your answers." },
          { title: "Specify", text: "It writes a requirement document with features, roles and acceptance criteria." },
          { title: "Design", text: "The Architect Agent proposes the stack, data model, workflows and integrations." },
          { title: "Approve", text: "You edit, remove or add features. Generation starts only after approval." },
          { title: "Generate", text: "Specialist agents build frontend, backend, database, AI and integrations, then QA and Security review." },
        ],
      },
    ],
  },
  {
    id: "scope",
    eyebrow: "04 · Options",
    title: "Generation scope",
    blocks: [
      { type: "p", text: "You choose how much the AI generates for each project. The scope can be changed before approval." },
      {
        type: "grid",
        items: [
          { title: "Full application", text: "Frontend, backend, database, AI workflows and integrations, ready to run." },
          { title: "Frontend only", text: "Pages, components and design system wired to an API contract you provide." },
          { title: "Backend only", text: "APIs, business logic, database schema and tests, with no user interface." },
          { title: "AI components only", text: "Agents, retrieval pipelines and prompts that plug into an existing system." },
        ],
      },
      {
        type: "code",
        lang: "json",
        title: "Scope values",
        code: `{
  "scope": "full" // "full" | "frontend" | "backend" | "ai"
}`,
      },
    ],
  },
  {
    id: "workspaces",
    eyebrow: "05 · Organization",
    title: "Projects and workspaces",
    blocks: [
      { type: "p", text: "A workspace is a shared space for a person or a team. Projects, members and billing belong to a workspace." },
      {
        type: "list",
        items: [
          "Owners manage billing, members and workspace settings.",
          "Admins manage projects and members.",
          "Members create and edit projects.",
          "Each project tracks its status: draft, analyzing, awaiting approval, generating, ready or deployed.",
        ],
      },
      { type: "callout", tone: "info", text: "Data from one workspace is never visible to another. Isolation is enforced at the database and execution layers." },
    ],
  },
  {
    id: "export",
    eyebrow: "06 · Ownership",
    title: "Exporting source code",
    blocks: [
      { type: "p", text: "You own the code the platform generates. Every project can be downloaded as a standard repository you can run anywhere." },
      {
        type: "code",
        lang: "bash",
        title: "Run an exported project",
        code: `unzip recruitment-platform.zip && cd recruitment-platform
cp .env.example .env
docker compose up --build`,
      },
      { type: "list", items: ["Readable code with no proprietary runtime.", "A README with setup steps and architecture notes.", "Tests generated by the QA Agent.", "Infrastructure files for Docker."] },
    ],
  },
  {
    id: "deployment",
    eyebrow: "07 · Shipping",
    title: "Deployment options",
    blocks: [
      { type: "p", text: "Applications can run on the platform's isolated hosting, or you can take the source and deploy it on your own infrastructure." },
      {
        type: "grid",
        items: [
          { title: "Hosted", text: "One-click publish to an isolated container with its own resources, secrets and domain." },
          { title: "Self-hosted", text: "Download the source and deploy with Docker to any cloud or on-premise server." },
        ],
      },
      { type: "callout", tone: "warning", text: "Generated code never runs on the platform's own servers. Each application gets its own sandbox with resource limits and timeouts." },
    ],
  },
  {
    id: "api",
    eyebrow: "08 · Reference",
    title: "API reference preview",
    badge: "Preview, planned for Phase 2",
    blocks: [
      { type: "p", text: "A REST API will let you create and manage projects from your own tools. The shapes below are a preview and may change before release." },
      {
        type: "code",
        lang: "bash",
        title: "Create a project",
        code: `curl -X POST "$INFODRIZZLE_API_URL/v1/projects" \\
  -H "Authorization: Bearer $INFODRIZZLE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Recruitment platform",
    "problemStatement": "Build a recruitment platform that...",
    "scope": "full"
  }'`,
      },
      {
        type: "code",
        lang: "json",
        title: "Response",
        code: `{
  "id": "prj_8f2a1c",
  "name": "Recruitment platform",
  "scope": "full",
  "status": "analyzing",
  "createdAt": "2026-11-01T09:30:00Z"
}`,
      },
      {
        type: "list",
        items: [
          "GET /v1/projects lists projects in the workspace.",
          "GET /v1/projects/{id} returns one project and its status.",
          "POST /v1/projects/{id}/approve approves the plan and starts generation.",
          "GET /v1/projects/{id}/export returns a download link for the source code.",
        ],
      },
    ],
  },
];
