import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { AdminLoginCard } from "@/components/admin-login-card";
import { getCurrentAdmin, isAdminAuthConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#071D3A]">
      <header className="border-b border-white/10 bg-[#071D3A]/95">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="rounded-xl bg-white px-3 py-1.5">
            <BrandLogo />
          </div>
          <span className="rounded-lg bg-amber-400/20 border border-amber-300/30 px-3 py-1 text-xs font-extrabold text-amber-300">
            Portal Khusus Admin
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="mb-6 text-center max-w-md text-white">
          <h1 className="font-heading text-2xl sm:text-3xl font-black">
            Login Admin BOYANG-CPNS
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Masuk menggunakan akun admin khusus untuk memverifikasi pembayaran QRIS Rp 10.000, memantau Kode Login pendaftar, dan menerbitkan voucher aktivasi.
          </p>
        </div>

        <AdminLoginCard configured={isAdminAuthConfigured()} />
      </main>
    </div>
  );
}
