import type { RangeId } from "@/lib/format";

export type KpiId = "revenue" | "users" | "conversion" | "growth";

export type Kpi = {
  id: KpiId;
  title: string;
  value: string;
  change: string;
  positive: boolean;
  comparison: string;
  color: string;
  series: number[];
};

export type RevenuePoint = {
  label: string;
  current: number;
  previous: number;
};

export type Slice = {
  name: string;
  value: number;
  color: string;
};

export type Snapshot = {
  kpis: Kpi[];
  revenue: RevenuePoint[];
  currentRevenue: number;
  currentChange: string;
  currentPositive: boolean;
  currentNote: string;
  previousRevenue: number;
  previousChange: string;
  previousPositive: boolean;
  previousNote: string;
  periodLabels: [string, string];
  slices: Slice[];
  audienceLabel: string;
};

export type ActivityIcon = "user" | "pen" | "crown" | "receipt" | "message" | "calendar";

export type Activity = {
  id: string;
  title: string;
  detail: string;
  time: string;
  icon: ActivityIcon;
};

export type ProjectStatus = "Active" | "In review" | "Planning";

export type Project = {
  id: string;
  name: string;
  template: string;
  status: ProjectStatus;
  updated: string;
  members: number;
};

export type Teammate = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type Notice = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export type PlanId = "Starter" | "Pro" | "Scale";

const desktop = "#8B5CF6";
const mobile = "#60A5FA";
const tablet = "#2DD4BF";

function zip(labels: string[], current: number[], previous: number[]): RevenuePoint[] {
  return labels.map((label, index) => ({
    label,
    current: current[index] ?? 0,
    previous: previous[index] ?? 0,
  }));
}

function dayLabels(now: Date, count: number) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (count - 1 - index));
    return date.toLocaleDateString("en-US", { weekday: "short" });
  });
}

function weekLabels(now: Date) {
  return Array.from({ length: 4 }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (3 - index) * 7);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });
}

function monthLabels(now: Date, count = 6) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (count - 1 - index), 1);
    return date.toLocaleDateString("en-US", { month: "short" });
  });
}

function kpi(
  id: KpiId,
  title: string,
  value: string,
  change: string,
  positive: boolean,
  comparison: string,
  color: string,
  series: number[],
): Kpi {
  return { id, title, value, change, positive, comparison, color, series };
}

export function getSnapshot(range: RangeId, now = new Date()): Snapshot {
  if (range === "7d") {
    return {
      kpis: [
        kpi("revenue", "Total Revenue", "$24,180", "+3.1%", true, "vs prior week", "#A78BFA", [2.8, 3.1, 2.95, 3.4, 3.6, 4.1, 4.23]),
        kpi("users", "Active Users", "6,420", "+1.4%", true, "vs prior week", "#60A5FA", [5.4, 5.6, 5.5, 5.9, 6.1, 6.3, 6.42]),
        kpi("conversion", "Conversion Rate", "7.96%", "−0.4%", false, "vs prior week", "#34D399", [8.4, 8.3, 8.5, 8.2, 8.1, 8.0, 7.96]),
        kpi("growth", "Weekly Growth", "+4.8%", "+0.6%", true, "vs prior week", "#E879F9", [2.2, 2.8, 3.1, 3.4, 4.0, 4.4, 4.8]),
      ],
      revenue: zip(
        dayLabels(now, 7),
        [2800, 3100, 2950, 3400, 3600, 4100, 4230],
        [2600, 2740, 3010, 2880, 3320, 3510, 3700],
      ),
      currentRevenue: 24180,
      currentChange: "+3.1%",
      currentPositive: true,
      currentNote: "from last week",
      previousRevenue: 21760,
      previousChange: "+1.8%",
      previousPositive: true,
      previousNote: "from the week before",
      periodLabels: ["This week", "Last week"],
      slices: [
        { name: "Desktop", value: 48, color: desktop },
        { name: "Mobile", value: 39, color: mobile },
        { name: "Tablet", value: 13, color: tablet },
      ],
      audienceLabel: "6.4K",
    };
  }

  if (range === "30d") {
    return {
      kpis: [
        kpi("revenue", "Total Revenue", "$96,240", "+9.4%", true, "vs prior 30 days", "#A78BFA", [62, 70, 74, 81, 88, 96]),
        kpi("users", "Active Users", "18,430", "+5.1%", true, "vs prior 30 days", "#60A5FA", [14.2, 15.1, 15.8, 16.6, 17.4, 18.4]),
        kpi("conversion", "Conversion Rate", "8.15%", "+0.8%", true, "vs prior 30 days", "#34D399", [6.8, 7.1, 7.0, 7.6, 7.9, 8.15]),
        kpi("growth", "Period Growth", "+11.2%", "+2.1%", true, "vs prior 30 days", "#E879F9", [6, 7.2, 8.1, 9.4, 10.2, 11.2]),
      ],
      revenue: zip(weekLabels(now), [21400, 22840, 24100, 27900], [19800, 20640, 22110, 25320]),
      currentRevenue: 96240,
      currentChange: "+9.4%",
      currentPositive: true,
      currentNote: "from the prior 30 days",
      previousRevenue: 87870,
      previousChange: "+4.2%",
      previousPositive: true,
      previousNote: "from the period before",
      periodLabels: ["This period", "Prior period"],
      slices: [
        { name: "Desktop", value: 51, color: desktop },
        { name: "Mobile", value: 35, color: mobile },
        { name: "Tablet", value: 14, color: tablet },
      ],
      audienceLabel: "18.4K",
    };
  }

  if (range === "quarter") {
    return {
      kpis: [
        kpi("revenue", "Total Revenue", "$342,900", "+15.8%", true, "vs last quarter", "#A78BFA", [72, 81, 77, 95, 110, 128, 142]),
        kpi("users", "Active Users", "31,204", "+10.4%", true, "vs last quarter", "#60A5FA", [20, 22, 23, 25, 27, 29, 31.2]),
        kpi("conversion", "Conversion Rate", "8.71%", "+2.2%", true, "vs last quarter", "#34D399", [6.1, 6.6, 7.0, 7.4, 7.9, 8.3, 8.71]),
        kpi("growth", "Quarterly Growth", "+21.4%", "+5.0%", true, "vs last quarter", "#E879F9", [8, 11, 12, 15, 17, 19, 21.4]),
      ],
      revenue: zip(
        monthLabels(now),
        [86400, 91200, 88400, 102600, 118400, 136500],
        [74200, 80100, 77600, 91400, 102200, 118800],
      ),
      currentRevenue: 342900,
      currentChange: "+15.8%",
      currentPositive: true,
      currentNote: "from last quarter",
      previousRevenue: 296100,
      previousChange: "+7.6%",
      previousPositive: true,
      previousNote: "from the quarter before",
      periodLabels: ["This quarter", "Last quarter"],
      slices: [
        { name: "Desktop", value: 54, color: desktop },
        { name: "Mobile", value: 33, color: mobile },
        { name: "Tablet", value: 13, color: tablet },
      ],
      audienceLabel: "31.2K",
    };
  }

  return {
    kpis: [
      kpi("revenue", "Total Revenue", "$128,430", "+12.5%", true, "vs last month", "#A78BFA", [62, 70, 66, 78, 88, 96, 110, 128]),
      kpi("users", "Active Users", "24,892", "+8.2%", true, "vs last month", "#60A5FA", [18.2, 19.1, 18.6, 20.4, 21.2, 22.8, 23.6, 24.9]),
      kpi("conversion", "Conversion Rate", "8.42%", "+1.6%", true, "vs last month", "#34D399", [6.4, 6.9, 6.6, 7.2, 7.5, 7.9, 8.1, 8.42]),
      kpi("growth", "Monthly Growth", "+18.6%", "+4.3%", true, "vs last month", "#E879F9", [9, 11, 10, 12.5, 14, 15.2, 16.8, 18.6]),
    ],
    revenue: zip(
      monthLabels(now),
      [72400, 81200, 76800, 95400, 110200, 128430],
      [61000, 69800, 74200, 80100, 96400, 114160],
    ),
    currentRevenue: 128430,
    currentChange: "+12.5%",
    currentPositive: true,
    currentNote: "from last month",
    previousRevenue: 114160,
    previousChange: "+6.4%",
    previousPositive: true,
    previousNote: "from the month before",
    periodLabels: ["This month", "Last month"],
    slices: [
      { name: "Desktop", value: 52, color: desktop },
      { name: "Mobile", value: 34, color: mobile },
      { name: "Tablet", value: 14, color: tablet },
    ],
    audienceLabel: "24.9K",
  };
}

export const activities: Activity[] = [
  {
    id: "user",
    title: "New user registered",
    detail: "Noah Patel joined the workspace",
    time: "2m ago",
    icon: "user",
  },
  {
    id: "project",
    title: "Website redesign project updated",
    detail: "Status moved to review",
    time: "18m ago",
    icon: "pen",
  },
  {
    id: "plan",
    title: "Subscription upgraded to Pro",
    detail: "Billing plan is now Pro",
    time: "1h ago",
    icon: "crown",
  },
  {
    id: "invoice",
    title: "Invoice #1048 was paid",
    detail: "November Pro renewal settled",
    time: "3h ago",
    icon: "receipt",
  },
  {
    id: "comment",
    title: "Comment on Website Redesign",
    detail: "Amal left notes on the homepage",
    time: "5h ago",
    icon: "message",
  },
  {
    id: "briefing",
    title: "Weekly briefing scheduled",
    detail: "Monday 9:00 AM for the core team",
    time: "Yesterday",
    icon: "calendar",
  },
];

export const initialProjects: Project[] = [
  {
    id: "website",
    name: "Website Redesign",
    template: "Marketing",
    status: "In review",
    updated: "18m ago",
    members: 6,
  },
  {
    id: "launch",
    name: "Astra Launch",
    template: "Product",
    status: "Active",
    updated: "2h ago",
    members: 4,
  },
  {
    id: "billing",
    name: "Billing Revamp",
    template: "Product",
    status: "Planning",
    updated: "1d ago",
    members: 3,
  },
  {
    id: "mobile",
    name: "Mobile Companion",
    template: "Research",
    status: "Active",
    updated: "3d ago",
    members: 5,
  },
];

export const initialTeam: Teammate[] = [
  { id: "amal", name: "Amal Hassan", email: "amal@astra.ai", role: "Owner" },
  { id: "noah", name: "Noah Patel", email: "noah@astra.ai", role: "Editor" },
  { id: "lina", name: "Lina Ortiz", email: "lina@astra.ai", role: "Viewer" },
];

export const initialNotices: Notice[] = [
  {
    id: "n1",
    title: "New user registered",
    body: "Noah Patel joined the workspace.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "n2",
    title: "Website redesign updated",
    body: "The project moved to review.",
    time: "18m ago",
    unread: true,
  },
  {
    id: "n3",
    title: "Subscription upgraded",
    body: "AstraAI Pro is active on this workspace.",
    time: "1h ago",
    unread: false,
  },
];

export const channels = [
  { name: "Direct", value: 4820 },
  { name: "Organic", value: 3610 },
  { name: "Referral", value: 2140 },
  { name: "Social", value: 1680 },
  { name: "Email", value: 940 },
];

export const topPages = [
  { path: "/overview", views: "18,420", conversion: "9.1%" },
  { path: "/pricing", views: "9,310", conversion: "6.4%" },
  { path: "/docs", views: "7,844", conversion: "3.2%" },
  { path: "/blog/launch", views: "4,102", conversion: "2.8%" },
  { path: "/login", views: "3,556", conversion: "11.6%" },
];

export const invoices = [
  { id: "INV-1048", date: "Nov 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-1047", date: "Oct 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-1046", date: "Sep 1, 2026", amount: "$49.00", status: "Paid" },
];

export const plans: {
  id: PlanId;
  monthly: string;
  yearly: string;
  note: string;
  features: string[];
}[] = [
  {
    id: "Starter",
    monthly: "$0",
    yearly: "$0",
    note: "For a first workspace",
    features: ["1 project", "3 members", "Overview dashboard"],
  },
  {
    id: "Pro",
    monthly: "$49",
    yearly: "$39",
    note: "For teams shipping every week",
    features: ["Unlimited projects", "10 members", "AI intelligence", "Priority support"],
  },
  {
    id: "Scale",
    monthly: "$149",
    yearly: "$119",
    note: "For larger organizations",
    features: ["SSO", "Advanced roles", "Usage analytics", "Dedicated success"],
  },
];

export const faqs = [
  {
    question: "How do date ranges change the dashboard?",
    answer:
      "The range in the header updates revenue, audience, conversion, and growth together. This month is the default view.",
  },
  {
    question: "Where do quick actions go?",
    answer:
      "Create Project adds a card to Workspace. Invite Member adds a person to the team roster. Generate Report downloads a file from the numbers on screen. Ask AI answers from those same figures.",
  },
  {
    question: "Is Ask AI connected to an external model?",
    answer:
      "No. Answers are composed from the workspace metrics already visible in AstraAI, so the response matches the dashboard.",
  },
  {
    question: "Will changing a plan charge a card?",
    answer:
      "No. Plan switching in Billing updates this session only. Nothing is billed and no payment details are collected.",
  },
  {
    question: "How do I search the workspace?",
    answer:
      "Use the search field or press Ctrl K. You can jump to a page, run a quick action, or open a project.",
  },
];
