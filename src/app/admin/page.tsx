import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { BrandLogo } from "@/components/brand-logo";
import { AdminPanel, type AdminOrderRow, type AdminVoucherRow } from "@/components/admin-panel";
import { getDb, schema } from "@/db";
import { isAdminEmail } from "@/lib/admin";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/masuk?next=/admin");
  }

  if (!isAdminEmail(user.email)) {
    redirect("/dashboard");
  }

  const db = getDb();
  const [orders, vouchers] = await Promise.all([
    db
      .select({
        id: schema.qrisOrders.id,
        orderId: schema.qrisOrders.orderId,
        amount: schema.qrisOrders.amount,
        paymentMethod: schema.qrisOrders.paymentMethod,
        status: schema.qrisOrders.status,
        proofNote: schema.qrisOrders.proofNote,
        createdAt: schema.qrisOrders.createdAt,
        userId: schema.user.id,
        userName: schema.user.name,
        userEmail: schema.user.email,
        userWhatsapp: schema.user.whatsapp,
        hasPaidAccess: schema.user.hasPaidAccess,
        accessCode: schema.user.accessCode,
      })
      .from(schema.qrisOrders)
      .innerJoin(schema.user, eq(schema.qrisOrders.userId, schema.user.id))
      .orderBy(desc(schema.qrisOrders.createdAt))
      .limit(50),
    db
      .select()
      .from(schema.accessVouchers)
      .orderBy(desc(schema.accessVouchers.createdAt))
      .limit(30),
  ]);

  const serializedOrders: AdminOrderRow[] = orders.map((o) => ({
    ...o,
    createdAt: o.createdAt.toISOString(),
  }));

  const serializedVouchers: AdminVoucherRow[] = vouchers.map((v) => ({
    id: v.id,
    code: v.code,
    note: v.note,
    isActive: v.isActive,
    usedAt: v.usedAt ? v.usedAt.toISOString() : null,
    createdAt: v.createdAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <BrandLogo href="/dashboard" />
          <span className="rounded-lg bg-amber-100 px-3 py-1 text-xs font-black text-amber-900">
            Admin Verifikasi QRIS
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-black text-[#0B2A52]">
            Verifikasi Pembayaran QRIS BOYANG-CPNS
          </h1>
          <p className="mt-1 text-xs text-slate-600">
            Setujui pembayaran QRIS Rp 10.000 (PODCAST MANDAR, Service) atau buat kode voucher aktivasi instan.
          </p>
        </div>

        <AdminPanel
          initialOrders={serializedOrders}
          initialVouchers={serializedVouchers}
        />
      </main>
    </div>
  );
}
