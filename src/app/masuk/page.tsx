import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { AuthCard } from "@/components/auth-card";
import { isDatabaseConfigured } from "@/db";
import { getCurrentUser } from "@/lib/session";

export default async function MasukPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; next?: string }>;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();

  if (user) {
    redirect(user.hasPaidAccess ? "/dashboard" : "/pembayaran");
  }

  const initialTab = params.tab === "daftar" ? "daftar" : "masuk";
  const nextPath = params.next?.startsWith("/") ? params.next : "/dashboard";

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <BrandLogo />
          <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-[#0B2A52]">
            Login Peserta / Member
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="mb-6 text-center max-w-md">
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#0B2A52]">
            {initialTab === "daftar"
              ? "Daftar Peserta BOYANG-CPNS"
              : "Masuk Peserta BOYANG-CPNS"}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {initialTab === "daftar"
              ? "Daftar 10 detik, bayar Rp 10.000 lewat QRIS, lalu akses penuh 304 Formasi & Tryout CAT."
              : "Masuk dengan email atau Kode Login pribadi Anda untuk mengakses dashboard belajar atau melanjutkan pembayaran."}
          </p>
        </div>

        <AuthCard
          initialTab={initialTab}
          nextPath={nextPath}
          dbConfigured={isDatabaseConfigured()}
        />

        <p className="mt-6 text-xs text-slate-500">
          Pengelola website?{" "}
          <Link
            href="/admin/login"
            className="font-bold text-[#0B2A52] underline hover:text-[#143d73]"
          >
            Login Khusus Admin →
          </Link>
        </p>
      </main>
    </div>
  );
}
