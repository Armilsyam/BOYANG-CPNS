import Link from "next/link";
import { and, desc, eq, inArray } from "drizzle-orm";
import { BrandLogo } from "@/components/brand-logo";
import { AuthCard } from "@/components/auth-card";
import { QrisCheckout } from "@/components/qris-checkout";
import { getDb, isDatabaseConfigured, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";
import { isMidtransConfigured } from "@/lib/midtrans";

export const dynamic = "force-dynamic";

export default async function PembayaranPage() {
  const dbConfigured = isDatabaseConfigured();
  const midtransConfigured = isMidtransConfigured();
  const midtransEnv =
    process.env.MIDTRANS_IS_PRODUCTION === "true" ? "production" : "sandbox";
  const user = await getCurrentUser();

  let initialStaticOrder: {
    orderId: string;
    amount: number;
    status: string;
    proofNote: string | null;
  } | null = null;

  if (user && !user.hasPaidAccess && dbConfigured) {
    const db = getDb();
    const [latest] = await db
      .select({
        orderId: schema.qrisOrders.orderId,
        amount: schema.qrisOrders.amount,
        status: schema.qrisOrders.status,
        proofNote: schema.qrisOrders.proofNote,
      })
      .from(schema.qrisOrders)
      .where(
        and(
          eq(schema.qrisOrders.userId, user.id),
          eq(schema.qrisOrders.paymentMethod, "static_qris"),
          inArray(schema.qrisOrders.status, ["pending", "waiting_verification"])
        )
      )
      .orderBy(desc(schema.qrisOrders.createdAt))
      .limit(1);

    initialStaticOrder = latest ?? null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <BrandLogo />
          <div className="flex items-center gap-3 text-xs font-bold">
            {user ? (
              <span className="text-slate-600">{user.email}</span>
            ) : (
              <Link
                href="/masuk"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
              >
                Sudah punya akun? Masuk
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#0B2A52]">
            Pembayaran Akses BOYANG-CPNS
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Cukup sekali bayar <strong>Rp 10.000 via QRIS</strong>, akun Anda langsung aktif untuk akses penuh 304 Formasi, Materi SKD &amp; Tryout CAT.
          </p>
        </div>

        {!user ? (
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-6">
              <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs text-blue-950">
                <strong>Langkah 1 dari 2:</strong> Buat akun singkat (atau masuk jika sudah daftar) agar status pembayaran Rp 10.000 terikat aman ke akun Anda.
              </div>
              <AuthCard
                initialTab="daftar"
                nextPath="/pembayaran"
                dbConfigured={dbConfigured}
              />
            </div>
            <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h2 className="font-heading text-lg font-black text-[#0B2A52]">
                Alur Mudah Aktivasi QRIS Rp 10.000
              </h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-700 list-decimal pl-5">
                <li>Isi Nama, Email, dan Kata Sandi untuk membuat akun Anda.</li>
                <li>Scan <strong>QRIS Resmi PODCAST MANDAR, Service</strong> senilai <strong>Rp 10.000</strong>.</li>
                <li>Klik <strong>Saya Sudah Bayar Rp 10.000</strong> atau masukkan Kode Aktivasi dari admin.</li>
                <li>Dashboard langsung terbuka dan tersimpan permanen di akun Anda.</li>
              </ol>
            </div>
          </div>
        ) : (
          <QrisCheckout
            userName={user.name}
            userEmail={user.email}
            hasPaidAccess={user.hasPaidAccess}
            accessCode={user.accessCode}
            initialStaticOrder={initialStaticOrder}
            midtransConfigured={midtransConfigured}
            midtransEnv={midtransEnv}
            adminWhatsapp={process.env.NEXT_PUBLIC_ADMIN_WHATSAPP}
          />
        )}
      </main>
    </div>
  );
}
