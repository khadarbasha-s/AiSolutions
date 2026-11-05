/** Responsibility, inputs, outputs and tools for each specialist agent, keyed by AGENTS[].key. */
export const AGENT_DETAILS: Record<string, { responsibility: string; inputs: string[]; outputs: string[]; tools: string[] }> = {
  req: { responsibility: "Turns a problem statement into clear, testable requirements and asks about anything missing.", inputs: ["Problem statement", "Attached documents"], outputs: ["Requirement document", "Clarifying questions"], tools: ["Document parser", "Question planner"] },
  arch: { responsibility: "Designs the system: services, data flow, technology stack and user roles.", inputs: ["Approved requirements"], outputs: ["Architecture plan", "Stack choice"], tools: ["Pattern library", "Cost estimator"] },
  ui: { responsibility: "Plans pages, navigation and components, and generates the frontend.", inputs: ["User roles", "Feature list"], outputs: ["Page map", "React components"], tools: ["Design system", "Layout generator"] },
  be: { responsibility: "Builds APIs, business logic, validation and authentication.", inputs: ["Architecture plan", "Schema"], outputs: ["API routes", "Service code"], tools: ["API scaffolder", "Contract checker"] },
  db: { responsibility: "Designs tables, relations, indexes and migrations.", inputs: ["Data entities", "Access patterns"], outputs: ["Schema", "Migrations", "Seed data"], tools: ["Schema designer", "Migration runner"] },
  ai: { responsibility: "Builds the application's own AI features: agents, prompts and retrieval.", inputs: ["AI workflows", "Knowledge sources"], outputs: ["Agent graphs", "RAG pipelines"], tools: ["LangGraph", "pgvector", "Prompt tester"] },
  int: { responsibility: "Connects external services such as payments, email, CRM and calendars.", inputs: ["Integration list", "Credentials vault"], outputs: ["Connectors", "Webhooks"], tools: ["Connector catalog", "Secret scoping"] },
  qa: { responsibility: "Writes and runs tests, reviews code and evaluates AI response quality.", inputs: ["Generated code", "Requirements"], outputs: ["Test suite", "Quality report"], tools: ["Test runner", "Eval harness"] },
  dep: { responsibility: "Builds containers and publishes the application to an isolated environment.", inputs: ["Passing build"], outputs: ["Live URL", "Deploy logs"], tools: ["Docker", "Cloud deployer"] },
  sec: { responsibility: "Checks for vulnerabilities, leaked secrets and unsafe permissions before release.", inputs: ["Source code", "Config"], outputs: ["Security report", "Fix requests"], tools: ["Static analysis", "Dependency audit"] },
};
