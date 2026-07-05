import { getContent, getProjectById } from "./store";

export { getContent, getProjectById };

export async function getDashboardStats() {
  const content = await getContent();
  return content.dashboardStats;
}

export async function getProjects() {
  const content = await getContent();
  return content.projects;
}
