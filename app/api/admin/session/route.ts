import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_TOKEN } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get(ADMIN_COOKIE)?.value === ADMIN_TOKEN;
  return NextResponse.json({ authenticated });
}
