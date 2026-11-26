import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { getDb, schema } from "@/db";

function createAuth() {
  const db = getDb();
  const baseUrl =
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

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
