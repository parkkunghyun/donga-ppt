import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_TOKEN } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/store";
import type { SiteContent } from "@/lib/types";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === ADMIN_TOKEN;
}

export async function GET() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const content = await getContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("GET /api/admin/data failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "콘텐츠를 불러오지 못했습니다.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const body = (await request.json()) as SiteContent;
    await saveContent(body);

    revalidatePath("/");
    revalidatePath("/projects/[id]", "page");
    for (const project of body.projects) {
      revalidatePath(`/projects/${project.id}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/admin/data failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "저장에 실패했습니다.",
      },
      { status: 500 }
    );
  }
}
