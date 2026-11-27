import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "boyang_admin_session";
const DEFAULT_ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 24; // 24 hours

export interface AdminSession {
  identifier: string;
  role: "admin";
  issuedAt: number;
  expiresAt: number;
}

interface AdminTokenPayload {
  id: string;
  role: "admin";
  iat: number;
  exp: number;
}

export function getAdminSessionSecret(): string {
  return (
    process.env.ADMIN_AUTH_SECRET?.trim() ||
    process.env.BETTER_AUTH_SECRET?.trim() ||
    ""
  );
}

export function getConfiguredAdminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

export function getAllowedAdminIdentifiers(): string[] {
  const candidates = [
    process.env.ADMIN_LOGIN_IDS,
    process.env.ADMIN_USERNAME,
    process.env.ADMIN_EMAILS,
  ]
    .filter((v): v is string => Boolean(v && v.trim()))
    .flatMap((v) => v.split(","))
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);

  if (candidates.length === 0) {
    return ["admin", "admin@boyang-cpns.id"];
  }

  return Array.from(new Set(candidates));
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(
    getAdminSessionSecret().length >= 16 && getConfiguredAdminPassword().length >= 6
  );
}

function hmacDigest(secret: string, value: string): Buffer {
  return crypto.createHmac("sha256", secret).update(value, "utf8").digest();
}

export function safeEqualText(
  a: string,
  b: string,
  hmacKey = "boyang-admin-compare"
): boolean {
  const digestA = hmacDigest(hmacKey, a);
  const digestB = hmacDigest(hmacKey, b);
  return crypto.timingSafeEqual(digestA, digestB);
}

export function verifyAdminCredentials(
  identifier: string,
  password: string
):
  | { ok: true; identifier: string }
  | { ok: false; reason: "NOT_CONFIGURED" | "INVALID_CREDENTIALS" } {
  const secret = getAdminSessionSecret();
  const expectedPassword = getConfiguredAdminPassword();
  if (!secret || expectedPassword.length < 6) {
    return { ok: false, reason: "NOT_CONFIGURED" };
  }

  const normalizedId = identifier.trim().toLowerCase();
  if (!normalizedId || !password) {
    return { ok: false, reason: "INVALID_CREDENTIALS" };
  }

  const allowedIdentifiers = getAllowedAdminIdentifiers();
  let matchedIdentifier = false;
  for (const allowed of allowedIdentifiers) {
    if (safeEqualText(normalizedId, allowed, secret)) {
      matchedIdentifier = true;
    }
  }

  const matchedPassword = safeEqualText(password, expectedPassword, secret);

  if (!matchedIdentifier || !matchedPassword) {
    return { ok: false, reason: "INVALID_CREDENTIALS" };
  }

  return { ok: true, identifier: normalizedId };
}

export function signAdminToken(
  identifier: string,
  secret = getAdminSessionSecret(),
  nowMs = Date.now(),
  ttlSeconds = DEFAULT_ADMIN_SESSION_TTL_SECONDS
): string {
  if (!secret) {
    throw new Error("Admin session secret is not configured.");
  }

  const payload: AdminTokenPayload = {
    id: identifier,
    role: "admin",
    iat: nowMs,
    exp: nowMs + ttlSeconds * 1000,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url"
  );
  const sigB64 = crypto
    .createHmac("sha256", secret)
    .update(payloadB64, "utf8")
    .digest("base64url");

  return `${payloadB64}.${sigB64}`;
}

export function verifyAdminToken(
  token: string | undefined | null,
  secret = getAdminSessionSecret(),
  nowMs = Date.now()
): AdminSession | null {
  if (!token || !secret) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, sigB64] = parts;
  if (!payloadB64 || !sigB64) return null;

  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(payloadB64, "utf8")
    .digest();

  let actualSig: Buffer;
  try {
    actualSig = Buffer.from(sigB64, "base64url");
  } catch {
    return null;
  }

  if (
    expectedSig.length !== actualSig.length ||
    !crypto.timingSafeEqual(expectedSig, actualSig)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8")
    ) as Partial<AdminTokenPayload>;

    if (
      parsed.role !== "admin" ||
      typeof parsed.id !== "string" ||
      !parsed.id ||
      typeof parsed.iat !== "number" ||
      typeof parsed.exp !== "number" ||
      parsed.exp <= nowMs
    ) {
      return null;
    }

    return {
      identifier: parsed.id,
      role: "admin",
      issuedAt: parsed.iat,
      expiresAt: parsed.exp,
    };
  } catch {
    return null;
  }
}

export function getAdminCookieOptions(
  maxAge = DEFAULT_ADMIN_SESSION_TTL_SECONDS
) {
  return {
    name: ADMIN_COOKIE_NAME,
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge,
  };
}

export async function getCurrentAdmin(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}
