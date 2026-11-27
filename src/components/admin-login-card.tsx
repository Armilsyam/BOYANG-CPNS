"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export function AdminLoginCard({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!res.ok) {
        setError(data.message || "Gagal masuk ke portal admin.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md">
      <div className="mb-5 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-950">
        <ShieldCheck className="h-5 w-5 shrink-0 text-amber-600" />
        <div>
          <p className="font-extrabold">Portal Khusus Admin (Akun Terdaftar Sistem)</p>
          <p className="mt-0.5 text-amber-900">
            Sesi admin terpisah penuh dari akun peserta/pelanggan di halaman{" "}
            <code className="font-mono font-bold">/masuk</code>.
          </p>
        </div>
      </div>

      {!configured && (
        <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-900">
          <AlertTriangle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <div>
            <p className="font-bold">ADMIN_PASSWORD Belum Diatur</p>
            <p className="mt-0.5">
              Tambahkan <code className="font-mono font-semibold">ADMIN_PASSWORD</code> di
              Environment Variables Vercel sebelum masuk sebagai admin.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-1.5">
            Username / Email Admin
          </label>
          <div className="relative">
            <UserCheck className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              required
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="admin atau admin@boyang-cpns.id"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#0B2A52] focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-1.5">
            Kata Sandi Admin
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi admin"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm outline-none focus:border-[#0B2A52] focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
              className="absolute right-3 top-2.5 rounded-md p-0.5 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2A52] py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#143d73] disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Masuk ke Console Admin
        </button>
      </form>

      <div className="mt-5 border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
        Bukan admin?{" "}
        <Link href="/masuk" className="font-extrabold text-[#0B2A52] underline">
          Login / Daftar sebagai Peserta
        </Link>
      </div>
    </div>
  );
}
