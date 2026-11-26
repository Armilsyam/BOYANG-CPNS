import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";
import { FormasiExplorer } from "@/components/formasi-explorer";

export default async function FormasiPage() {
  const user = (await getCurrentUser())!;
  const db = getDb();

  const rows = await db
    .select({ instansiNo: schema.userBookmarks.instansiNo })
    .from(schema.userBookmarks)
    .where(eq(schema.userBookmarks.userId, user.id));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl font-black text-[#0B2A52]">
          Direktori 304 PDF Formasi CPNS
        </h1>
        <p className="mt-1 text-xs text-slate-600">
          Cari instansi pusat maupun daerah, buka PDF pengumuman resmi, atau tandai sebagai instansi target Anda.
        </p>
      </div>

      <FormasiExplorer initialBookmarks={rows.map((r) => r.instansiNo)} />
    </div>
  );
}
