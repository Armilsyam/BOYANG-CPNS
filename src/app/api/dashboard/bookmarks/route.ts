import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  if (!user.hasPaidAccess) {
    return NextResponse.json({ error: "PAYMENT_REQUIRED" }, { status: 402 });
  }

  const db = getDb();
  const rows = await db
    .select({ instansiNo: schema.userBookmarks.instansiNo })
    .from(schema.userBookmarks)
    .where(eq(schema.userBookmarks.userId, user.id));

  return NextResponse.json({ bookmarks: rows.map((r) => r.instansiNo) });
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  if (!user.hasPaidAccess) {
    return NextResponse.json({ error: "PAYMENT_REQUIRED" }, { status: 402 });
  }

  const body = (await request.json()) as { instansiNo?: number };
  const instansiNo = Number(body.instansiNo);
  if (!Number.isInteger(instansiNo) || instansiNo < 1 || instansiNo > 500) {
    return NextResponse.json({ error: "INVALID_INSTANSI_NO" }, { status: 400 });
  }

  const db = getDb();
  const [existing] = await db
    .select({ id: schema.userBookmarks.id })
    .from(schema.userBookmarks)
    .where(
      and(
        eq(schema.userBookmarks.userId, user.id),
        eq(schema.userBookmarks.instansiNo, instansiNo)
      )
    )
    .limit(1);

  if (existing) {
    await db
      .delete(schema.userBookmarks)
      .where(eq(schema.userBookmarks.id, existing.id));
    return NextResponse.json({ instansiNo, bookmarked: false });
  }

  await db.insert(schema.userBookmarks).values({
    id: crypto.randomUUID(),
    userId: user.id,
    instansiNo,
  });

  return NextResponse.json({ instansiNo, bookmarked: true });
}
