"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, Phone, User, AlertTriangle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function AuthCard({
  nextPath = "/dashboard",
  initialTab = "masuk",
  dbConfigured = true,
}: {
  nextPath?: string;
  initialTab?: "masuk" | "daftar";
  dbConfigured?: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"masuk" | "daftar">(initialTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (tab === "daftar") {
        const res = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
          whatsapp: whatsapp.trim() || undefined,
        } as Parameters<typeof authClient.signUp.email>[0]);

        if (res.error) {
          setError(res.error.message || "Gagal mendaftar. Cek data Anda.");
          setLoading(false);
          return;
        }
        router.push("/pembayaran");
        router.refresh();
      } else {
        const res = await authClient.signIn.email({
          email: email.trim(),
          password,
        });

        if (res.error) {
          setError(res.error.message || "Email atau kata sandi salah.");
          setLoading(false);
          return;
        }
        router.push(nextPath);
        router.refresh();
      }
    } catch {
      setError("Koneksi gagal atau database belum dikonfigurasi.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      {!dbConfigured && (
        <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
          <div>
            <p className="font-bold">Database Neon Belum Terhubung</p>
            <p className="mt-0.5 text-amber-800">
              Jalankan <code className="font-mono font-semibold">vercel integration add neon</code> dan{" "}
              <code className="font-mono font-semibold">npm run db:push</code> sebelum login/daftar.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1 mb-6">
        <button
          type="button"
          onClick={() => {
            setTab("masuk");
            setError(null);
          }}
          className={`rounded-lg py-2 text-sm font-bold transition ${
            tab === "masuk"
              ? "bg-white text-[#0B2A52] shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Masuk Akun
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("daftar");
            setError(null);
          }}
          className={`rounded-lg py-2 text-sm font-bold transition ${
            tab === "daftar"
              ? "bg-white text-[#0B2A52] shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Daftar Baru
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {tab === "daftar" && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-1.5">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#0B2A52] focus:bg-white"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-1.5">
            Email Aktif
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#0B2A52] focus:bg-white"
            />
          </div>
        </div>

        {tab === "daftar" && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-1.5">
              Nomor WhatsApp (Opsional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="0812xxxxxxxx"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#0B2A52] focus:bg-white"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-1.5">
            Kata Sandi (min. 6 karakter)
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#0B2A52] focus:bg-white"
            />
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
          {tab === "daftar"
            ? "Buat Akun & Lanjut Bayar QRIS Rp 10.000"
            : "Masuk ke BOYANG-CPNS"}
        </button>
      </form>
    </div>
  );
}
