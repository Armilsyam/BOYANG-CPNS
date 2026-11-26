import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";
import { PanduanHub } from "@/components/panduan-hub";

export default async function PanduanPage() {
  const user = (await getCurrentUser())!;
  const db = getDb();

  const rows = await db
    .select({
      stepId: schema.userChecklist.stepId,
      completed: schema.userChecklist.completed,
    })
    .from(schema.userChecklist)
    .where(eq(schema.userChecklist.userId, user.id));

  return (
    <PanduanHub
      initialCompletedIds={rows.filter((r) => r.completed).map((r) => r.stepId)}
      adminWhatsapp={process.env.NEXT_PUBLIC_ADMIN_WHATSAPP}
      communityWaUrl={process.env.NEXT_PUBLIC_COMMUNITY_WA_URL}
    />
  );
}
