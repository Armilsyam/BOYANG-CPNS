import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";
import { gradeTryoutAnswers, type TryoutMode } from "@/lib/tryout-scoring";

const VALID_MODES = new Set<TryoutMode>(["all", "TWK", "TIU", "TKP"]);

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
  const attempts = await db
    .select({
      id: schema.tryoutAttempts.id,
      mode: schema.tryoutAttempts.mode,
      twkScore: schema.tryoutAttempts.twkScore,
      tiuScore: schema.tryoutAttempts.tiuScore,
      tkpScore: schema.tryoutAttempts.tkpScore,
      totalScore: schema.tryoutAttempts.totalScore,
      passedPassingGrade: schema.tryoutAttempts.passedPassingGrade,
      durationSeconds: schema.tryoutAttempts.durationSeconds,
      createdAt: schema.tryoutAttempts.createdAt,
    })
    .from(schema.tryoutAttempts)
    .where(eq(schema.tryoutAttempts.userId, user.id))
    .orderBy(desc(schema.tryoutAttempts.createdAt))
    .limit(15);

  return NextResponse.json({ attempts });
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

  const body = (await request.json()) as {
    mode?: TryoutMode;
    answers?: Record<string, string>;
    durationSeconds?: number;
  };

  const mode: TryoutMode =
    body.mode && VALID_MODES.has(body.mode) ? body.mode : "all";
  const answers = body.answers && typeof body.answers === "object" ? body.answers : {};
  const durationSeconds = Math.max(
    0,
    Math.min(7200, Math.round(Number(body.durationSeconds) || 0))
  );

  const result = gradeTryoutAnswers(mode, answers);
  const db = getDb();
  const id = crypto.randomUUID();

  await db.insert(schema.tryoutAttempts).values({
    id,
    userId: user.id,
    mode: result.mode,
    twkScore: result.twkScore,
    tiuScore: result.tiuScore,
    tkpScore: result.tkpScore,
    totalScore: result.totalScore,
    passedPassingGrade: result.passedPassingGrade,
    durationSeconds,
    answersJson: JSON.stringify(answers),
  });

  return NextResponse.json({ id, result });
}
