"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Loader2,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

interface QrisCheckoutProps {
  userName: string;
  userEmail: string;
  hasPaidAccess: boolean;
  accessCode: string | null;
  midtransConfigured: boolean;
  midtransEnv: "sandbox" | "production";
}

interface ActiveQrisOrder {
  orderId: string;
  amount: number;
  status: string;
  qrString: string | null;
  qrDataUrl: string | null;
  qrImageUrl: string | null;
  expiresAt: string | null;
}

export function QrisCheckout({
  userName,
  userEmail,
  hasPaidAccess: initialPaid,
  accessCode: initialCode,
  midtransConfigured,
  midtransEnv,
}: QrisCheckoutProps) {
  const router = useRouter();
  const [hasPaid, setHasPaid] = useState(initialPaid);
  const [accessCode, setAccessCode] = useState(initialCode);
  const [order, setOrder] = useState<ActiveQrisOrder | null>(null);
  const [creating, setCreating] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  const secondsLeft =
    order?.expiresAt && !hasPaid
      ? Math.max(
          0,
          Math.floor((new Date(order.expiresAt).getTime() - nowMs) / 1000)
        )
      : null;

  const generateQris = useCallback(async () => {
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/payments/qris/create", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Gagal membuat QRIS Midtrans.");
        return;
      }
      if (data.alreadyPaid) {
        setHasPaid(true);
        setAccessCode(data.accessCode || null);
        return;
      }
      setNowMs(Date.now());
      setOrder(data);
    } catch {
      setError("Gagal menghubungi server pembayaran.");
    } finally {
      setCreating(false);
    }
  }, []);

  const checkStatus = useCallback(async () => {
    if (!order?.orderId || hasPaid) return;
    setChecking(true);
    try {
      const res = await fetch(
        `/api/payments/qris/status?orderId=${encodeURIComponent(order.orderId)}`,
        { cache: "no-store" }
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data.hasPaidAccess || data.status === "settlement") {
        setHasPaid(true);
        setAccessCode(data.accessCode || null);
        router.refresh();
      } else if (data.status && data.status !== order.status) {
        setOrder((prev) => (prev ? { ...prev, status: data.status } : null));
      }
    } finally {
      setChecking(false);
    }
  }, [order?.orderId, order?.status, hasPaid, router]);

  useEffect(() => {
    if (!order?.orderId || hasPaid || order.status !== "pending") return;
    const timer = setInterval(() => {
      void checkStatus();
    }, 4000);
    return () => clearInterval(timer);
  }, [order?.orderId, order?.status, hasPaid, checkStatus]);

  useEffect(() => {
    if (!order?.expiresAt || hasPaid) return;
    const t = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(t);
  }, [order?.expiresAt, hasPaid]);

  if (hasPaid) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h2 className="font-heading text-2xl font-black text-[#0B2A52]">
          Akses BOYANG-CPNS Sudah Aktif!
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Terima kasih, <strong>{userName}</strong> ({userEmail}). Pembayaran QRIS Rp 10.000 Anda telah terverifikasi.
        </p>

        {accessCode && (
          <div className="mx-auto mt-5 max-w-xs rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              ID / Kode Akses Member
            </p>
            <p className="mt-1 font-mono text-lg font-black text-emerald-900">
              {accessCode}
            </p>
          </div>
        )}

        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B2A52] px-6 py-3.5 text-sm font-extrabold text-white shadow-sm hover:bg-[#154078]"
        >
          <Sparkles className="h-4 w-4 text-amber-400" />
          Masuk ke Dashboard BOYANG-CPNS
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-slate-100">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900">
              <QrCode className="h-3.5 w-3.5" />
              Midtrans QRIS ({midtransEnv === "production" ? "Live" : "Sandbox"})
            </span>
            <h2 className="mt-2 font-heading text-xl font-black text-[#0B2A52]">
              Aktivasi Akses Penuh — Rp 10.000
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Sekali bayar</p>
            <p className="font-heading text-2xl font-black text-emerald-700">
              Rp 10.000
            </p>
          </div>
        </div>

        {!midtransConfigured && (
          <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <p className="font-bold">Midtrans Server Key Belum Dikonfigurasi</p>
              <p className="mt-1">
                Isi <code className="font-mono font-semibold">MIDTRANS_SERVER_KEY</code> dan{" "}
                <code className="font-mono font-semibold">MIDTRANS_CLIENT_KEY</code> di file{" "}
                <code className="font-mono font-semibold">.env.local</code> atau Vercel Environment Variables agar generator QRIS aktif.
              </p>
            </div>
          </div>
        )}

        <div className="mt-5 rounded-xl bg-slate-50 p-4 text-xs text-slate-700 space-y-1">
          <p>
            Akun aktif: <strong className="text-slate-900">{userName}</strong> ({userEmail})
          </p>
          <p>
            Mendukung seluruh aplikasi pembayaran QRIS: <strong>GoPay, OVO, DANA, ShopeePay, LinkAja, BCA, BRI, Mandiri, BNI, BSI</strong>.
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-700">
            {error}
          </div>
        )}

        {!order ? (
          <div className="mt-6">
            <button
              type="button"
              onClick={generateQris}
              disabled={creating}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2A52] px-6 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#143d73] disabled:opacity-60"
            >
              {creating ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <QrCode className="h-5 w-5 text-amber-400" />
              )}
              {creating ? "Membuat Kode QRIS..." : "Buat Kode QRIS Rp 10.000 Sekarang"}
            </button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50/70 p-6 text-center">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-600">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>
                Order <span className="font-mono text-slate-900">{order.orderId}</span>
                {secondsLeft !== null && (
                  <>
                    {" · "}Sisa waktu{" "}
                    <span className="font-mono text-[#0B2A52]">
                      {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
                    </span>
                  </>
                )}
              </span>
            </div>

            {order.qrDataUrl ? (
              <div className="rounded-2xl border-4 border-white bg-white p-3 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={order.qrDataUrl}
                  alt="QRIS Pembayaran BOYANG-CPNS Rp 10.000"
                  className="h-60 w-60"
                />
              </div>
            ) : order.qrImageUrl ? (
              <div className="rounded-2xl border-4 border-white bg-white p-3 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={order.qrImageUrl}
                  alt="QRIS Pembayaran BOYANG-CPNS Rp 10.000"
                  className="h-60 w-60"
                />
              </div>
            ) : null}

            <p className="mt-4 text-xs text-slate-600 max-w-sm">
              Scan kode QRIS di atas memakai e-wallet atau mobile banking Anda. Status diverifikasi otomatis setiap 4 detik.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={checkStatus}
                disabled={checking}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-extrabold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {checking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Saya Sudah Bayar — Cek Status
              </button>

              {order.status !== "pending" && (
                <button
                  type="button"
                  onClick={generateQris}
                  disabled={creating}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Buat QRIS Baru
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-[#0B2A52] p-6 text-white shadow-sm">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
          <ShieldCheck className="h-4 w-4" />
          Yang Langsung Terbuka
        </div>
        <h3 className="mt-2 font-heading text-lg font-extrabold">
          Paket Lengkap BOYANG-CPNS
        </h3>
        <ul className="mt-5 space-y-3 text-sm text-slate-200">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <span>Explorer <strong>304 PDF Formasi Resmi</strong> (67 Pusat, 26 Provinsi, 166 Kabupaten, 45 Kota) + Bookmark</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <span>Folder PDF Instansi CPNS 2026, Panduan Akun SSCASN, & Materi FGD Guru ASN 2026</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <span><strong>7 Modul Ringkasan Kisi-Kisi SKD 2026</strong> (TWK, TIU, TKP) siap baca</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <span><strong>Simulasi Tryout CAT SKD</strong> ber-timer + perhitungan Passing Grade BKN & pembahasan</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <span>Checklist 7 Langkah Pemberkasan SSCASN tersimpan otomatis di akun Anda</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
