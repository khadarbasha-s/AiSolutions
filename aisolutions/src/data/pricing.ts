/**
 * PLACEHOLDER PRICING. All INR amounts and credit allowances below are placeholders
 * and must be confirmed with the business before launch.
 */
export type Plan = {
  key: "free" | "pro" | "team" | "enterprise";
  name: string;
  blurb: string;
  monthly: number | null; // INR per month when billed monthly; null = custom
  yearly: number | null; // INR per month when billed yearly; null = custom
  credits: string;
  cta: { label: string; to: string };
  highlights: string[];
  recommended?: boolean;
};

export const plans: Plan[] = [
  {
    key: "free",
    name: "Free",
    blurb: "Explore the studio and plan your first application.",
    monthly: 0,
    yearly: 0,
    credits: "100 credits / month",
    cta: { label: "Start free", to: "/signup" },
    highlights: ["1 workspace, 1 member", "Up to 3 projects", "Requirement and architecture generation", "Community support"],
  },
  {
    key: "pro",
    name: "Pro",
    blurb: "For builders shipping real applications.",
    monthly: 2499,
    yearly: 1999,
    credits: "2,000 credits / month",
    cta: { label: "Start with Pro", to: "/signup?plan=pro" },
    highlights: ["Unlimited projects", "Full application generation", "Live hosted previews", "Source code export", "Email support"],
    recommended: true,
  },
  {
    key: "team",
    name: "Team",
    blurb: "Collaborate across product, design and engineering.",
    monthly: 7999,
    yearly: 6399,
    credits: "8,000 shared credits / month",
    cta: { label: "Start with Team", to: "/signup?plan=team" },
    highlights: ["Up to 10 members", "Shared workspaces and roles", "Custom domains", "Priority generation queue", "Priority support"],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    blurb: "Security, scale and control for large organisations.",
    monthly: null,
    yearly: null,
    credits: "Custom credit pools",
    cta: { label: "Contact sales", to: "/contact" },
    highlights: ["Unlimited members", "Dedicated deployment environment", "Custom AI model configuration", "SSO and audit logs", "Named success manager"],
  },
];

export type Cell = boolean | string;
export const comparison: { group: string; rows: { feature: string; values: [Cell, Cell, Cell, Cell] }[] }[] = [
  {
    group: "Build",
    rows: [
      { feature: "Projects", values: ["3", "Unlimited", "Unlimited", "Unlimited"] },
      { feature: "Requirement and architecture generation", values: [true, true, true, true] },
      { feature: "Full-stack application generation", values: [false, true, true, true] },
      { feature: "AI agent and RAG generation", values: [false, true, true, true] },
      { feature: "Code workspace and editing", values: ["Read only", true, true, true] },
    ],
  },
  {
    group: "Ship",
    rows: [
      { feature: "Live hosted previews", values: [false, true, true, true] },
      { feature: "Source code export", values: [false, true, true, true] },
      { feature: "Custom domains", values: [false, false, true, true] },
      { feature: "Dedicated deployment environment", values: [false, false, false, true] },
    ],
  },
  {
    group: "Collaborate & secure",
    rows: [
      { feature: "Members", values: ["1", "1", "Up to 10", "Unlimited"] },
      { feature: "Roles and permissions", values: [false, false, true, true] },
      { feature: "SSO and audit logs", values: [false, false, false, true] },
      { feature: "Support", values: ["Community", "Email", "Priority", "Dedicated"] },
    ],
  },
];

/** Illustrative credit costs. Placeholders to confirm with the business. */
export const creditCosts = [
  { action: "Analyse a problem statement", credits: 5 },
  { action: "Generate requirements and architecture", credits: 20 },
  { action: "Generate a full application", credits: 300 },
  { action: "Regenerate one component", credits: 15 },
  { action: "Run the automated test suite", credits: 25 },
  { action: "Deploy a hosted preview", credits: 10 },
];

export const pricingFaq = [
  { q: "What is a credit?", a: "Credits measure AI work. Planning, generating, testing and deploying each use credits based on how much work the agents do. Your plan includes a monthly allowance." },
  { q: "What happens if I run out of credits?", a: "Your projects keep running. You can buy a top-up pack or move to a larger plan to keep generating." },
  { q: "Do unused credits roll over?", a: "Monthly credits reset at the start of each billing cycle. Top-up credits stay valid for twelve months." },
  { q: "Do I own the generated code?", a: "Yes. On paid plans you can export the full source code and run it anywhere." },
  { q: "Can I change plans later?", a: "Yes. Upgrades apply immediately and downgrades take effect at the end of the billing cycle." },
  { q: "Is there a discount for yearly billing?", a: "Yes. Yearly billing costs about 20% less than paying month to month." },
];
