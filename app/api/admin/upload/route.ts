import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteProjectImage, uploadProjectImage } from "@/lib/image-storage";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request: Request) {
  try {
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

    const url = await uploadProjectImage(projectId, file);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("POST /api/admin/upload failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "업로드에 실패했습니다.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { url } = (await request.json()) as { url?: string };

    if (!url) {
      return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
    }

    await deleteProjectImage(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/upload failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "삭제에 실패했습니다.",
      },
      { status: 500 }
    );
  }
}
