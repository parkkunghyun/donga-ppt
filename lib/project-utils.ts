import type { DashboardStats, Project, SiteContent } from "./types";

type LegacyProject = Partial<Project> & {
  department?: string;
  tools?: string[];
  category?: string;
  status?: string;
  completedAt?: string;
  metrics?: unknown[];
};

type LegacyDashboardStats = Partial<DashboardStats> & {
  departments?: number;
};

export function normalizeDashboardStats(
  raw: LegacyDashboardStats
): DashboardStats {
  return {
    totalProjects: raw.totalProjects ?? 0,
    totalTimeSaved: raw.totalTimeSaved ?? 0,
    avgEfficiency: raw.avgEfficiency ?? 0,
    affiliates: raw.affiliates ?? raw.departments ?? 0,
  };
}

export function normalizeProject(raw: LegacyProject): Project {
  const legacyTools = raw.tools ?? [];

  return {
    id: raw.id ?? "",
    title: raw.title ?? "",
    affiliate: raw.affiliate ?? raw.department ?? "",
    participants: raw.participants ?? "",
    summary: raw.summary ?? "",
    problem: raw.problem ?? raw.summary ?? "",
    asIs: raw.asIs ?? "",
    toBe: raw.toBe ?? "",
    aiApplication:
      raw.aiApplication ??
      (legacyTools.length > 0 ? legacyTools.join(", ") : ""),
    impactValue: Number(raw.impactValue) || 0,
    impactUnit: "시간",
    impactLabel: raw.impactLabel ?? "",
    impactQualitative: raw.impactQualitative ?? "",
    images: raw.images ?? [],
  };
}

export function syncDashboardStats(
  stats: DashboardStats,
  projects: Project[]
): DashboardStats {
  return {
    ...stats,
    totalProjects: projects.length,
    totalTimeSaved: projects.reduce(
      (sum, project) => sum + (Number(project.impactValue) || 0),
      0
    ),
  };
}

export function syncContent(content: SiteContent & { dashboardStats?: LegacyDashboardStats }): SiteContent {
  const projects = content.projects.map((project) =>
    normalizeProject(project as LegacyProject)
  );
  const dashboardStats = normalizeDashboardStats(
    content.dashboardStats ?? {}
  );

  return {
    ...content,
    projects,
    dashboardStats: syncDashboardStats(dashboardStats, projects),
  };
}

export function createProjectId(title: string, existingIds: string[]): string {
  const base =
    title
      .trim()
      .toLowerCase()
      .replace(/[^\w가-힣\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 40) || "new-project";

  let id = base;
  let counter = 1;
  while (existingIds.includes(id)) {
    id = `${base}-${counter}`;
    counter += 1;
  }
  return id;
}

export function createEmptyProject(existingIds: string[]): Project {
  const title = "새 AX 과제";
  return {
    id: createProjectId(title, existingIds),
    title,
    affiliate: "",
    participants: "",
    summary: "",
    problem: "",
    asIs: "",
    toBe: "",
    aiApplication: "",
    impactValue: 0,
    impactUnit: "시간",
    impactLabel: "연간 절감 (40% 절감)",
    impactQualitative: "",
    images: [],
  };
}
