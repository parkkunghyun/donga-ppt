export interface DashboardStats {
  totalProjects: number;
  totalTimeSaved: number;
  avgEfficiency: number;
  affiliates: number;
}

export interface SiteContent {
  dashboardStats: DashboardStats;
  projects: Project[];
  dashboardTitle: string;
  dashboardDescription: string;
  footerText: string;
}

export interface Project {
  id: string;
  title: string;
  affiliate: string;
  participants: string;
  summary: string;
  problem: string;
  asIs: string;
  toBe: string;
  aiApplication: string;
  impactValue: number;
  impactUnit: string;
  impactLabel: string;
  impactQualitative: string;
  images: string[];
}
