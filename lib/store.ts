import { promises as fs } from "fs";
import path from "path";
import { defaultContent } from "./defaults";
import { syncContent } from "./project-utils";
import { getSupabaseAdmin } from "./supabase/admin";
import { CONTENT_ROW_ID, CONTENT_TABLE } from "./supabase/constants";
import type { SiteContent } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

async function getSeedContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return syncContent(JSON.parse(raw) as SiteContent);
  } catch {
    return syncContent(defaultContent);
  }
}

export async function getContent(): Promise<SiteContent> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(CONTENT_TABLE)
    .select("content")
    .eq("id", CONTENT_ROW_ID)
    .maybeSingle();

  if (error) {
    throw new Error(`콘텐츠를 불러오지 못했습니다: ${error.message}`);
  }

  if (data?.content) {
    return syncContent(data.content as SiteContent);
  }

  const seed = await getSeedContent();
  await saveContent(seed);
  return seed;
}

export async function saveContent(content: SiteContent): Promise<void> {
  const supabase = getSupabaseAdmin();
  const synced = syncContent(content);
  const { error } = await supabase.from(CONTENT_TABLE).upsert({
    id: CONTENT_ROW_ID,
    content: synced,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`콘텐츠를 저장하지 못했습니다: ${error.message}`);
  }
}

export async function getProjectById(id: string) {
  const content = await getContent();
  return content.projects.find((p) => p.id === id);
}
