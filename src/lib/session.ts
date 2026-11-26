import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import { getAuth } from "@/lib/auth";

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

    return dbUser ?? null;
  } catch {
    return null;
  }
}
