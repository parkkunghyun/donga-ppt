import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const projectId = formData.get("projectId");

  if (!(file instanceof File) || typeof projectId !== "string" || !projectId) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "JPEG, PNG, WebP, GIF만 업로드할 수 있습니다." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "파일 크기는 5MB 이하여야 합니다." },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const projectDir = path.join(UPLOAD_DIR, projectId);

  await fs.mkdir(projectDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(projectDir, safeName), buffer);

  const url = `/uploads/${projectId}/${safeName}`;
  return NextResponse.json({ url });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { url } = (await request.json()) as { url?: string };

  if (!url || !url.startsWith("/uploads/")) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", url);

  try {
    await fs.unlink(filePath);
  } catch {
    // 파일이 없어도 목록에서 제거할 수 있도록 성공 처리
  }

  return NextResponse.json({ success: true });
}
