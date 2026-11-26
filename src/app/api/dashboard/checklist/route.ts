import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";
import { SSCASN_CHECKLIST } from "@/data/resources";

const VALID_STEPS = new Set(SSCASN_CHECKLIST.map((s) => s.id));

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
    .select({
      stepId: schema.userChecklist.stepId,
      completed: schema.userChecklist.completed,
    })
    .from(schema.userChecklist)
    .where(eq(schema.userChecklist.userId, user.id));

  return NextResponse.json({
    completedIds: rows.filter((r) => r.completed).map((r) => r.stepId),
  });
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

  const body = (await request.json()) as { stepId?: string; completed?: boolean };
  const stepId = body.stepId?.trim() ?? "";
  if (!VALID_STEPS.has(stepId)) {
    return NextResponse.json({ error: "INVALID_STEP_ID" }, { status: 400 });
  }

  const db = getDb();
  const [existing] = await db
    .select({
      id: schema.userChecklist.id,
      completed: schema.userChecklist.completed,
    })
    .from(schema.userChecklist)
    .where(
      and(
        eq(schema.userChecklist.userId, user.id),
        eq(schema.userChecklist.stepId, stepId)
      )
    )
    .limit(1);

  const nextCompleted =
    typeof body.completed === "boolean"
      ? body.completed
      : existing
        ? !existing.completed
        : true;

  if (existing) {
    await db
      .update(schema.userChecklist)
      .set({ completed: nextCompleted, updatedAt: new Date() })
      .where(eq(schema.userChecklist.id, existing.id));
  } else {
    await db.insert(schema.userChecklist).values({
      id: crypto.randomUUID(),
      userId: user.id,
      stepId,
      completed: nextCompleted,
    });
  }

  return NextResponse.json({ stepId, completed: nextCompleted });
}
