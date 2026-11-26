import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/db";
import { getAuth } from "@/lib/auth";

async function handleAuth(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        error: "DATABASE_NOT_CONFIGURED",
        message:
          "Database Neon Postgres belum terhubung. Tambahkan Neon via Vercel Marketplace (`vercel integration add neon`) atau atur DATABASE_URL di .env.local.",
      },
      { status: 503 }
    );
  }

  const handler = toNextJsHandler(getAuth());
  const method = request.method.toUpperCase();
  if (method === "GET") return handler.GET(request);
  if (method === "POST") return handler.POST(request);
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function GET(request: Request) {
  return handleAuth(request);
}

export async function POST(request: Request) {
  return handleAuth(request);
}
