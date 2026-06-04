import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE = "hg_admin";
const SECRET = process.env.ADMIN_SESSION_SECRET || "dev-secret-change-me";

function sign(value: string) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

// Token format: <issuedAtMs>.<signature>
export function createToken(): string {
  const issued = Date.now().toString();
  return `${issued}.${sign(issued)}`;
}

export function verifyToken(token?: string): boolean {
  if (!token) return false;
  const [issued, sig] = token.split(".");
  if (!issued || !sig) return false;
  const expected = sign(issued);
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return false;
  }
  // 30-day validity
  const age = Date.now() - Number(issued);
  return age >= 0 && age < 30 * 24 * 60 * 60 * 1000;
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export const COOKIE_NAME = COOKIE;

export function isAuthed(): boolean {
  const token = cookies().get(COOKIE)?.value;
  return verifyToken(token);
}
