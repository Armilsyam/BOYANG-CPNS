import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import { ensureDatabaseSchema } from "@/db/ensure-schema";
import { getAuth } from "@/lib/auth";

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        error: "DATABASE_NOT_CONFIGURED",
        message: "Database Neon Postgres belum terhubung.",
      },
      { status: 503 }
    );
  }

  await ensureDatabaseSchema();

  const body = (await request.json().catch(() => ({}))) as {
    identifier?: string;
    password?: string;
  };

  const rawIdentifier = (body.identifier || "").trim();
  const password = body.password || "";

  if (!rawIdentifier || !password) {
    return NextResponse.json(
      {
        error: "INVALID_INPUT",
        message: "Email / Kode Login dan kata sandi wajib diisi.",
      },
      { status: 400 }
    );
  }

  let email = rawIdentifier;

  // If identifier is not an email, resolve it as a system-issued Kode Login (BYG-XXXX-XXXX)
  if (!rawIdentifier.includes("@")) {
    const normalizedCode = rawIdentifier.toUpperCase();
    const db = getDb();
    const [matched] = await db
      .select({ email: schema.user.email })
      .from(schema.user)
      .where(eq(schema.user.accessCode, normalizedCode))
      .limit(1);

    if (!matched) {
      return NextResponse.json(
        {
          error: "INVALID_CREDENTIALS",
          message: "Kode Login / Email atau kata sandi salah.",
        },
        { status: 401 }
      );
    }
    email = matched.email;
  }

  const reqUrl = new URL(request.url);
  const authEndpoint = new URL("/api/auth/sign-in/email", reqUrl.origin);

  const forwardHeaders = new Headers();
  forwardHeaders.set("content-type", "application/json");
  for (const h of ["cookie", "origin", "referer", "user-agent", "x-forwarded-for", "x-forwarded-host", "x-forwarded-proto"]) {
    const val = request.headers.get(h);
    if (val) forwardHeaders.set(h, val);
  }

  const authRequest = new Request(authEndpoint.toString(), {
    method: "POST",
    headers: forwardHeaders,
    body: JSON.stringify({ email, password }),
  });

  const authResponse = await getAuth().handler(authRequest);
  if (!authResponse.ok) {
    return NextResponse.json(
      {
        error: "INVALID_CREDENTIALS",
        message: "Kode Login / Email atau kata sandi salah.",
      },
      { status: authResponse.status }
    );
  }

  return authResponse;
}
