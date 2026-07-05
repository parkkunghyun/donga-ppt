import { cookies } from "next/headers";
import { ADMIN_COOKIE, ADMIN_TOKEN } from "./auth";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === ADMIN_TOKEN;
}
