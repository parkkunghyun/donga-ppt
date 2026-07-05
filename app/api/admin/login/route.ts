import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_TOKEN, verifyPin } from "@/lib/auth";

export async function POST(request: Request) {
  const { pin } = (await request.json()) as { pin?: string };

  if (!pin || !verifyPin(pin)) {
    return NextResponse.json({ error: "핀코드가 올바르지 않습니다." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, ADMIN_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
