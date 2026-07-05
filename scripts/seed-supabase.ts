import "./load-env";
import { readFile } from "fs/promises";
import path from "path";
import { syncContent } from "../lib/project-utils";
import { saveContent } from "../lib/store";
import type { SiteContent } from "../lib/types";

async function main() {
  const filePath = path.join(process.cwd(), "data", "content.json");
  const raw = await readFile(filePath, "utf-8");
  const content = syncContent(JSON.parse(raw) as SiteContent);
  await saveContent(content);
  console.log("Supabase에 콘텐츠를 저장했습니다.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
