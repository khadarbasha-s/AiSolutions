import {
  HeartPulse, GraduationCap, Landmark, Users, ShoppingBag, Factory,
  type LucideIcon,
} from "lucide-react";

export type Accent = "violet" | "cyan";

export type Industry = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  icon: LucideIcon;
  accent: Accent;
  challenges: { title: string; detail: string }[];
  apps: { title: string; detail: string }[];
  workflow: { agent: string; step: string }[];
  integrations: string[];
  security: string[];
};

/** One data model drives the Solutions overview and every /solutions/:slug page. */
export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Care teams spend time on patients, not paperwork.",
    summary: "Generate clinic, hospital and telehealth applications with scheduling, records and AI assistants that support staff.",
    icon: HeartPulse,
    accent: "cyan",
    challenges: [
      { title: "Fragmented records", detail: "Patient data sits across labs, billing and front-desk tools that do not talk to each other." },
      { title: "Admin overload", detail: "Clinicians lose hours each week to intake forms, notes and follow-up reminders." },
      { title: "Long wait times", detail: "Manual scheduling and triage create queues and missed appointments." },
    ],
    apps: [
      { title: "Clinic management portal", detail: "Appointments, patient profiles, prescriptions and billing in one place." },
      { title: "AI triage assistant", detail: "Collects symptoms before a visit and routes patients to the right department." },
      { title: "Discharge summary generator", detail: "Drafts summaries from visit notes for a clinician to review and sign." },
      { title: "Telehealth booking app", detail: "Video consults with reminders, payments and follow-up scheduling." },
    ],
    workflow: [
      { agent: "Requirement", step: "Maps patient journeys and staff roles" },
      { agent: "Database", step: "Designs patient, visit and billing schema" },
      { agent: "AI Engineer", step: "Builds a triage assistant grounded in your protocols" },
      { agent: "Security", step: "Checks access control on sensitive records" },
    ],
    integrations: ["EHR systems", "Lab information systems", "Payment gateways", "Video calling", "SMS reminders", "Calendar", "WhatsApp", "PDF reports"],
    security: [
      "Role-based access so staff only see the records they need.",
      "Sensitive fields can be encrypted at rest, with audit logs on every read.",
      "AI suggestions are drafts for clinicians to approve, never final decisions.",
    ],
  },
  {
    slug: "education",
    name: "Education",
    tagline: "Personal learning at the scale of a whole institution.",
    summary: "Build learning platforms, admissions portals and AI tutors for schools, colleges and training providers.",
    icon: GraduationCap,
    accent: "violet",
    challenges: [
      { title: "One pace for everyone", detail: "Large classes make it hard to adapt material to each learner." },
      { title: "Manual assessment", detail: "Teachers spend evenings grading and writing feedback." },
      { title: "Scattered admissions", detail: "Applications, documents and payments arrive through different channels." },
    ],
    apps: [
      { title: "AI tutor", detail: "Answers questions from your course material and adapts to each learner's level." },
      { title: "Admissions portal", detail: "Applications, document upload, fee payment and status tracking." },
      { title: "Assignment feedback assistant", detail: "Drafts rubric-based feedback that teachers can edit." },
      { title: "Cohort analytics dashboard", detail: "Attendance, progress and at-risk alerts for every batch." },
    ],
    workflow: [
      { agent: "Requirement", step: "Defines learner, teacher and admin journeys" },
      { agent: "AI Engineer", step: "Indexes course content for a grounded tutor" },
      { agent: "UI/UX", step: "Designs mobile-first learning screens" },
      { agent: "QA", step: "Evaluates tutor answers against the syllabus" },
    ],
    integrations: ["LMS platforms", "Video hosting", "Payment gateways", "Google Workspace", "Microsoft Teams", "Zoom", "SMS", "Certificates"],
    security: [
      "Separate data spaces for each institution and cohort.",
      "Parental and admin roles with scoped permissions.",
      "Tutor answers cite the course material they came from.",
    ],
  },
  {
    slug: "finance",
    name: "Finance",
    tagline: "Faster decisions with every number accounted for.",
    summary: "Create lending, accounting and advisory applications with document intelligence and clear audit trails.",
    icon: Landmark,
    accent: "violet",
    challenges: [
      { title: "Document-heavy processes", detail: "Loan and onboarding files need hours of manual review." },
      { title: "Risk blind spots", detail: "Signals are spread across statements, bureaus and internal systems." },
      { title: "Reporting pressure", detail: "Month-end close and reports depend on spreadsheets." },
    ],
    apps: [
      { title: "Loan origination system", detail: "Applications, document checks, scoring rules and approvals." },
      { title: "Statement analyser", detail: "Extracts income, spending patterns and anomalies from bank statements." },
      { title: "Expense and invoice automation", detail: "Reads invoices, matches purchase orders and flags exceptions." },
      { title: "Advisor copilot", detail: "Summarises a client's portfolio and drafts recommendations for review." },
    ],
    workflow: [
      { agent: "Architect", step: "Plans services for intake, scoring and approval" },
      { agent: "AI Engineer", step: "Builds document extraction and summarisation" },
      { agent: "Backend", step: "Implements rule engine and audit logging" },
      { agent: "Security", step: "Reviews secrets, encryption and permissions" },
    ],
    integrations: ["Banking APIs", "Credit bureaus", "Accounting software", "Payment gateways", "e-KYC", "e-Sign", "Excel export", "Email"],
    security: [
      "Every automated decision is logged with the inputs that produced it.",
      "Maker-checker approval flows can be generated by default.",
      "Credentials for external systems are stored per project, never shared.",
    ],
  },
  {
    slug: "hr",
    name: "HR & Recruitment",
    tagline: "Hire, onboard and support people without the busywork.",
    summary: "Generate recruitment platforms, onboarding flows and employee helpdesks with AI screening and scheduling.",
    icon: Users,
    accent: "cyan",
    challenges: [
      { title: "Resume overload", detail: "Recruiters skim hundreds of applications for each role." },
      { title: "Scheduling back-and-forth", detail: "Coordinating interviews across panels takes days." },
      { title: "Repetitive questions", detail: "HR teams answer the same policy questions every week." },
    ],
    apps: [
      { title: "AI recruitment platform", detail: "Parses resumes, matches them to job descriptions and ranks candidates." },
      { title: "Interview scheduler", detail: "Finds panel availability and books slots automatically." },
      { title: "Onboarding workflow", detail: "Document collection, checklists and welcome journeys for new hires." },
      { title: "HR policy assistant", detail: "Answers employee questions from your handbook." },
    ],
    workflow: [
      { agent: "Requirement", step: "Captures hiring stages and approvals" },
      { agent: "AI Engineer", step: "Builds resume parsing and matching" },
      { agent: "Integration", step: "Connects calendars and job boards" },
      { agent: "QA", step: "Tests matching for consistent scoring" },
    ],
    integrations: ["Job boards", "LinkedIn", "Google Calendar", "Outlook", "Slack", "HRMS", "e-Sign", "Video interviews"],
    security: [
      "Candidate data is isolated per workspace with retention controls.",
      "Screening criteria are visible and editable, not a black box.",
      "Final hiring decisions stay with people.",
    ],
  },
  {
    slug: "retail",
    name: "Retail & E-commerce",
    tagline: "Know what customers want before they ask.",
    summary: "Build storefronts, inventory tools and shopping assistants that use your catalogue and sales data.",
    icon: ShoppingBag,
    accent: "violet",
    challenges: [
      { title: "Stock surprises", detail: "Bestsellers run out while slow movers fill the warehouse." },
      { title: "Generic experiences", detail: "Every shopper sees the same products and offers." },
      { title: "Support volume", detail: "Order status and return questions flood support channels." },
    ],
    apps: [
      { title: "Demand forecasting dashboard", detail: "Predicts stock needs and suggests reorder quantities." },
      { title: "AI shopping assistant", detail: "Recommends products from your catalogue in natural conversation." },
      { title: "Order support bot", detail: "Handles tracking, returns and refunds end to end." },
      { title: "Multi-store admin", detail: "Inventory, pricing and promotions across locations." },
    ],
    workflow: [
      { agent: "Database", step: "Models catalogue, orders and inventory" },
      { agent: "AI Engineer", step: "Builds recommendations and forecasting" },
      { agent: "UI/UX", step: "Designs storefront and admin screens" },
      { agent: "Deployment", step: "Ships a fast, hosted storefront" },
    ],
    integrations: ["Shopify", "Payment gateways", "Shipping partners", "POS systems", "WhatsApp", "Google Analytics", "ERP", "Email marketing"],
    security: [
      "Payment details are handled by the payment provider, not stored in your app.",
      "Admin actions such as price changes are logged.",
      "Customer data stays inside your project's isolated environment.",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    tagline: "From the shop floor to the dashboard in real time.",
    summary: "Generate production tracking, maintenance and quality applications connected to your machines and ERP.",
    icon: Factory,
    accent: "cyan",
    challenges: [
      { title: "Unplanned downtime", detail: "Machine failures stop lines with little warning." },
      { title: "Paper-based quality checks", detail: "Inspection results are hard to trace and analyse." },
      { title: "Siloed plant data", detail: "Production, maintenance and inventory live in separate systems." },
    ],
    apps: [
      { title: "Predictive maintenance app", detail: "Watches sensor data and schedules service before failures." },
      { title: "Quality inspection tracker", detail: "Digital checklists with photos, defects and root-cause notes." },
      { title: "Production dashboard", detail: "Live output, efficiency and shift performance per line." },
      { title: "SOP assistant", detail: "Answers operator questions from your standard operating procedures." },
    ],
    workflow: [
      { agent: "Architect", step: "Designs data ingestion from machines" },
      { agent: "Integration", step: "Connects ERP and sensor gateways" },
      { agent: "AI Engineer", step: "Builds anomaly detection and SOP search" },
      { agent: "Deployment", step: "Ships cloud or on-premise builds" },
    ],
    integrations: ["ERP systems", "IoT gateways", "MQTT", "SCADA exports", "Barcode scanners", "Power BI", "Teams", "Excel"],
    security: [
      "Plant data can stay in a dedicated deployment environment.",
      "Operators, supervisors and managers get separate permissions.",
      "Generated code can be exported and reviewed by your own engineers.",
    ],
  },
];

export const getIndustry = (slug?: string) => industries.find((i) => i.slug === slug);
