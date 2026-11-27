import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { getAdminWhatsapp, getPaidWaChannelUrl } from "@/lib/admin";
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
      adminWhatsapp={getAdminWhatsapp()}
      communityWaUrl={getPaidWaChannelUrl()}
      userName={user.name}
      userAccessCode={user.accessCode}
    />
  );
}
