import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { generateAccessCode } from "@/lib/midtrans";
import { sendRegistrationNotifications } from "@/lib/whatsapp-notify";

async function generateUniqueUserLoginCode(): Promise<string> {
  const db = getDb();
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = generateAccessCode();
    const [existing] = await db
      .select({ id: schema.user.id })
      .from(schema.user)
      .where(eq(schema.user.accessCode, candidate))
      .limit(1);
    if (!existing) return candidate;
  }
  return generateAccessCode();
}

function createAuth() {
  const db = getDb();
  const baseUrl =
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  return betterAuth({
    appName: "BOYANG-CPNS",
    baseURL: baseUrl,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: ["https://*.vercel.app", "http://localhost:3000"],
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
    },
    user: {
      additionalFields: {
        whatsapp: {
          type: "string",
          required: false,
          input: true,
        },
        hasPaidAccess: {
          type: "boolean",
          required: false,
          defaultValue: false,
          input: false,
        },
        accessCode: {
          type: "string",
          required: false,
          input: false,
        },
        paidAt: {
          type: "date",
          required: false,
          input: false,
        },
      },
    },
    databaseHooks: {
      user: {
        create: {
          before: async (userData) => {
            const accessCode =
              typeof userData.accessCode === "string" && userData.accessCode
                ? userData.accessCode
                : await generateUniqueUserLoginCode();
            return {
              data: {
                ...userData,
                accessCode,
              },
            };
          },
          after: async (createdUser) => {
            const u = createdUser as typeof createdUser & {
              whatsapp?: string | null;
              accessCode?: string | null;
            };
            await sendRegistrationNotifications({
              name: u.name,
              email: u.email,
              whatsapp: u.whatsapp ?? null,
              accessCode: u.accessCode ?? null,
            });
          },
        },
      },
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    plugins: [nextCookies()],
  });
}

let _auth: ReturnType<typeof createAuth> | null = null;

export function getAuth() {
  if (!_auth) {
    _auth = createAuth();
  }
  return _auth;
}
