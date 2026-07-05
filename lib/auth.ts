export const ADMIN_COOKIE = "ax_admin_session";
export const ADMIN_TOKEN = "ax_admin_authenticated";
export const ADMIN_PIN = process.env.ADMIN_PIN ?? "donga1932";

export function verifyPin(pin: string): boolean {
  return pin === ADMIN_PIN;
}
