import { promises as fs } from "fs";
import path from "path";
import { defaultContent } from "./defaults";
import { syncContent } from "./project-utils";
import type { SiteContent } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

export async function getContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return syncContent(JSON.parse(raw) as SiteContent);
  } catch {
    await saveContent(defaultContent);
    return syncContent(defaultContent);
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  const synced = syncContent(content);
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(synced, null, 2), "utf-8");
}

export async function getProjectById(id: string) {
  const content = await getContent();
  return content.projects.find((p) => p.id === id);
}
