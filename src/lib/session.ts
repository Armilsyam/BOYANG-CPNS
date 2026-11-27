import { headers } from "next/headers";
import { and, eq, isNull } from "drizzle-orm";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import { ensureDatabaseSchema } from "@/db/ensure-schema";
import { getAuth } from "@/lib/auth";
import { generateAccessCode } from "@/lib/midtrans";

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  hasPaidAccess: boolean;
  accessCode: string | null;
  paidAt: Date | null;
}

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
    await ensureDatabaseSchema();
    const auth = getAuth();
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return null;
    }

    const db = getDb();
    const [dbUser] = await db
      .select({
        id: schema.user.id,
        name: schema.user.name,
        email: schema.user.email,
        whatsapp: schema.user.whatsapp,
        hasPaidAccess: schema.user.hasPaidAccess,
        accessCode: schema.user.accessCode,
        paidAt: schema.user.paidAt,
      })
      .from(schema.user)
      .where(eq(schema.user.id, session.user.id))
      .limit(1);

    if (!dbUser) return null;

    // Backfill personal system login code for any existing account created prior to auto-hook
    if (!dbUser.accessCode) {
      const code = generateAccessCode();
      await db
        .update(schema.user)
        .set({ accessCode: code, updatedAt: new Date() })
        .where(
          and(eq(schema.user.id, dbUser.id), isNull(schema.user.accessCode))
        );
      return { ...dbUser, accessCode: code };
    }

    return dbUser;
  } catch {
    return null;
  }
}
