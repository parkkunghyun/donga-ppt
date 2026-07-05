import { NextResponse } from "next/server";
import { getContent } from "@/lib/store";

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("GET /api/data failed:", error);
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
