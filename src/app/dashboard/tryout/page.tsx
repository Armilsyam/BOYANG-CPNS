import { desc, eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";
import {
  TryoutSimulator,
  type SavedAttemptSummary,
} from "@/components/tryout-simulator";

export default async function TryoutPage() {
  const user = (await getCurrentUser())!;
  const db = getDb();

  const rows = await db
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

  const history: SavedAttemptSummary[] = rows.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));

  return <TryoutSimulator initialHistory={history} />;
}
