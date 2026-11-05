export type UseCase = {
  slug: string;
  title: string;
  industry: "HR" | "Healthcare" | "Finance" | "Education" | "Retail" | "Customer Support" | "Manufacturing";
  problem: string;
  builds: string[];
  agents: string[];
  outcome: string;
};

/** Illustrative use cases. Outcomes are described qualitatively, with no invented metrics or customers. */
export const USE_CASES: UseCase[] = [
  {
    slug: "recruitment-platform",
    title: "AI recruitment platform",
    industry: "HR",
    problem: "Recruiters spend hours reading resumes and coordinating interview slots across busy calendars.",
    builds: ["Resume parsing and candidate profiles", "Job-to-candidate matching with vector search", "Automatic interview scheduling", "Recruiter dashboard"],
    agents: ["Requirement", "AI Engineer", "Integration", "UI/UX"],
    outcome: "Recruiters review a ranked shortlist instead of a raw inbox, and interviews are booked without email back-and-forth.",
  },
  {
    slug: "clinic-triage",
    title: "Clinic triage assistant",
    industry: "Healthcare",
    problem: "Front-desk staff are overwhelmed by appointment requests that vary widely in urgency.",
    builds: ["Patient intake forms", "AI triage that suggests urgency for staff review", "Appointment booking", "Role-based access for staff and doctors"],
    agents: ["Requirement", "Security", "AI Engineer", "Backend"],
    outcome: "Urgent cases surface first for a clinician to confirm, and routine bookings are handled without phone calls.",
  },
  {
    slug: "loan-document-review",
    title: "Loan document review",
    industry: "Finance",
    problem: "Loan officers manually check long applications and supporting documents for missing or inconsistent information.",
    builds: ["Document upload and extraction", "Consistency checks across documents", "Review queue with flagged fields", "Audit trail"],
    agents: ["Database", "AI Engineer", "QA", "Security"],
    outcome: "Officers start each review with the gaps and inconsistencies already highlighted, with every decision logged.",
  },
  {
    slug: "student-tutor",
    title: "Personal study tutor",
    industry: "Education",
    problem: "Students need help outside class hours, grounded in their own course material rather than generic answers.",
    builds: ["Course material knowledge base (RAG)", "Chat tutor with source citations", "Practice quiz generator", "Teacher insights view"],
    agents: ["AI Engineer", "UI/UX", "Backend", "QA"],
    outcome: "Students get answers that cite their own syllabus, and teachers see which topics cause the most questions.",
  },
  {
    slug: "inventory-forecasting",
    title: "Inventory forecasting",
    industry: "Retail",
    problem: "Store managers over-order slow items and run out of popular ones because forecasting lives in spreadsheets.",
    builds: ["Sales data import", "Demand forecasting per product", "Reorder suggestions with approval", "Supplier integration"],
    agents: ["Architect", "Database", "Integration", "Backend"],
    outcome: "Managers approve suggested reorders in one place instead of rebuilding spreadsheets every week.",
  },
  {
    slug: "support-copilot",
    title: "Customer support copilot",
    industry: "Customer Support",
    problem: "Support agents search several tools to answer repetitive questions, and response quality varies.",
    builds: ["Help-centre knowledge base", "Suggested replies with sources", "Ticketing integration", "Answer quality evaluation"],
    agents: ["AI Engineer", "Integration", "QA", "Deployment"],
    outcome: "Agents start from a sourced draft reply, and the team can measure answer quality over time.",
  },
  {
    slug: "maintenance-planner",
    title: "Predictive maintenance planner",
    industry: "Manufacturing",
    problem: "Maintenance teams react to breakdowns because machine logs and service history are scattered.",
    builds: ["Machine log ingestion", "Anomaly alerts", "Maintenance schedule board", "Technician mobile view"],
    agents: ["Architect", "Database", "AI Engineer", "UI/UX"],
    outcome: "Teams plan service from early warning signs instead of reacting after a machine stops.",
  },
  {
    slug: "onboarding-assistant",
    title: "Employee onboarding assistant",
    industry: "HR",
    problem: "New joiners ask the same policy questions and HR tracks onboarding tasks by hand.",
    builds: ["Policy Q&A assistant", "Onboarding checklists per role", "Manager notifications", "HR progress dashboard"],
    agents: ["Requirement", "AI Engineer", "Integration", "Backend"],
    outcome: "New joiners get instant answers from current policies, and HR sees who is stuck at which step.",
  },
];

export const USE_CASE_INDUSTRIES = ["All", ...Array.from(new Set(USE_CASES.map((u) => u.industry)))] as const;
