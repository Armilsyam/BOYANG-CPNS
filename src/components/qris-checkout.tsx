"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Download,
  KeyRound,
  Loader2,
  MessageCircle,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { STATIC_QRIS_MERCHANT } from "@/lib/admin";

interface QrisCheckoutProps {
  userName: string;
  userEmail: string;
  hasPaidAccess: boolean;
  accessCode: string | null;
  initialStaticOrder?: StaticOrderState | null;
  midtransConfigured: boolean;
  midtransEnv: "sandbox" | "production";
  adminWhatsapp?: string;
}

interface ActiveMidtransOrder {
  orderId: string;
  amount: number;
  status: string;
  qrString: string | null;
  qrDataUrl: string | null;
  qrImageUrl: string | null;
  expiresAt: string | null;
}

interface StaticOrderState {
  orderId: string;
  amount: number;
  status: string;
  proofNote: string | null;
}

export function QrisCheckout({
  userName,
  userEmail,
  hasPaidAccess: initialPaid,
  accessCode: initialCode,
  initialStaticOrder = null,
  midtransConfigured,
  midtransEnv,
  adminWhatsapp,
}: QrisCheckoutProps) {
  const router = useRouter();
  const [hasPaid, setHasPaid] = useState(initialPaid);
  const [accessCode, setAccessCode] = useState(initialCode);
  const [tab, setTab] = useState<"static" | "midtrans">("static");

  // Static QRIS (PODCAST MANDAR, Service) state
  const [staticOrder, setStaticOrder] = useState<StaticOrderState | null>(
    initialStaticOrder
  );
  const [proofNote, setProofNote] = useState("");
  const [staticBusy, setStaticBusy] = useState(false);
  const [staticError, setStaticError] = useState<string | null>(null);
  const [staticInfo, setStaticInfo] = useState<string | null>(null);

  // Voucher redeem state
  const [voucherCode, setVoucherCode] = useState("");
  const [redeemBusy, setRedeemBusy] = useState(false);
  const [redeemError, setRedeemError] = useState<string | null>(null);

  // Midtrans state (optional when configured)
  const [mtOrder, setMtOrder] = useState<ActiveMidtransOrder | null>(null);
  const [creatingMt, setCreatingMt] = useState(false);
  const [checkingMt, setCheckingMt] = useState(false);
  const [mtError, setMtError] = useState<string | null>(null);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  const secondsLeft =
    mtOrder?.expiresAt && !hasPaid
      ? Math.max(
          0,
          Math.floor((new Date(mtOrder.expiresAt).getTime() - nowMs) / 1000)
        )
      : null;

  const refreshStaticStatus = useCallback(async () => {
    if (hasPaid) return;
    try {
      const res = await fetch("/api/payments/static-qris", {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.hasPaidAccess) {
        setHasPaid(true);
        setAccessCode(data.accessCode || null);
        router.refresh();
        return;
      }
      if (data.order) {
        setStaticOrder(data.order);
      }
    } catch {
      // Ignore transient polling error
    }
  }, [hasPaid, router]);

  useEffect(() => {
    if (hasPaid || !staticOrder) return;
    const t = setInterval(() => {
      void refreshStaticStatus();
    }, 5000);
    return () => clearInterval(t);
  }, [hasPaid, staticOrder, refreshStaticStatus]);

  async function handleConfirmStaticQris(e: React.FormEvent) {
    e.preventDefault();
    setStaticBusy(true);
    setStaticError(null);
    setStaticInfo(null);
    try {
      const res = await fetch("/api/payments/static-qris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proofNote: proofNote.trim(),
          confirmTransfer: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStaticError(data.message || "Gagal mencatat konfirmasi pembayaran.");
        return;
      }
      if (data.hasPaidAccess) {
        setHasPaid(true);
        setAccessCode(data.accessCode || null);
        router.refresh();
        return;
      }
      setStaticOrder(data.order);
      setStaticInfo(
        "Konfirmasi dicatat! Admin akan memverifikasi mutasi QRIS Rp 10.000 Anda dan halaman ini akan terbuka otomatis."
      );
    } catch {
      setStaticError("Gagal terhubung ke server.");
    } finally {
      setStaticBusy(false);
    }
  }

  async function handleRedeemVoucher(e: React.FormEvent) {
    e.preventDefault();
    setRedeemBusy(true);
    setRedeemError(null);
    try {
      const res = await fetch("/api/payments/voucher/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucherCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRedeemError(data.message || "Kode aktivasi tidak valid.");
        return;
      }
      setHasPaid(true);
      setAccessCode(data.accessCode || null);
      router.refresh();
    } catch {
      setRedeemError("Gagal memverifikasi kode aktivasi.");
    } finally {
      setRedeemBusy(false);
    }
  }

  const generateMidtransQris = useCallback(async () => {
    setCreatingMt(true);
    setMtError(null);
    try {
      const res = await fetch("/api/payments/qris/create", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setMtError(data.message || "Gagal membuat QRIS Midtrans.");
        return;
      }
      if (data.alreadyPaid) {
        setHasPaid(true);
        setAccessCode(data.accessCode || null);
        return;
      }
      setNowMs(Date.now());
      setMtOrder(data);
    } catch {
      setMtError("Gagal menghubungi server pembayaran.");
    } finally {
      setCreatingMt(false);
    }
  }, []);

  const checkMidtransStatus = useCallback(async () => {
    if (!mtOrder?.orderId || hasPaid) return;
    setCheckingMt(true);
    try {
      const res = await fetch(
        `/api/payments/qris/status?orderId=${encodeURIComponent(mtOrder.orderId)}`,
        { cache: "no-store" }
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data.hasPaidAccess || data.status === "settlement") {
        setHasPaid(true);
        setAccessCode(data.accessCode || null);
        router.refresh();
      } else if (data.status && data.status !== mtOrder.status) {
        setMtOrder((prev) => (prev ? { ...prev, status: data.status } : null));
      }
    } finally {
      setCheckingMt(false);
    }
  }, [mtOrder?.orderId, mtOrder?.status, hasPaid, router]);

  useEffect(() => {
    if (!mtOrder?.orderId || hasPaid || mtOrder.status !== "pending") return;
    const timer = setInterval(() => {
      void checkMidtransStatus();
    }, 4000);
    return () => clearInterval(timer);
  }, [mtOrder?.orderId, mtOrder?.status, hasPaid, checkMidtransStatus]);

  useEffect(() => {
    if (!mtOrder?.expiresAt || hasPaid) return;
    const t = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(t);
  }, [mtOrder?.expiresAt, hasPaid]);

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
          Terima kasih, <strong>{userName}</strong> ({userEmail}). Akses penuh dashboard Anda sudah terbuka.
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

  const sanitizedAdminWa = (adminWhatsapp || "").replace(/[^0-9]/g, "");
  const hasAdminWa =
    sanitizedAdminWa.length >= 9 && sanitizedAdminWa !== "6281234567890";
  const waConfirmText = `Halo Admin BOYANG-CPNS, saya sudah bayar QRIS Rp 10.000 ke ${STATIC_QRIS_MERCHANT.merchantName}.\nNama: ${userName}\nEmail: ${userEmail}${staticOrder?.orderId ? `\nOrder ID: ${staticOrder.orderId}` : ""}${proofNote ? `\nCatatan: ${proofNote}` : ""}`;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-slate-100">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900">
                <QrCode className="h-3.5 w-3.5" />
                QRIS Resmi · {STATIC_QRIS_MERCHANT.merchantName}
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

          {midtransConfigured && (
            <div className="mt-4 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setTab("static")}
                className={`rounded-lg py-2 text-xs font-extrabold transition ${
                  tab === "static"
                    ? "bg-white text-[#0B2A52] shadow-xs"
                    : "text-slate-600"
                }`}
              >
                QRIS Merchant Resmi
              </button>
              <button
                type="button"
                onClick={() => setTab("midtrans")}
                className={`rounded-lg py-2 text-xs font-extrabold transition ${
                  tab === "midtrans"
                    ? "bg-white text-[#0B2A52] shadow-xs"
                    : "text-slate-600"
                }`}
              >
                QRIS Otomatis (Midtrans {midtransEnv})
              </button>
            </div>
          )}

          {tab === "static" ? (
            <div className="mt-5 space-y-5">
              <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-700 space-y-1">
                <p>
                  Akun aktif: <strong className="text-slate-900">{userName}</strong> ({userEmail})
                </p>
                <p>
                  Merchant: <strong>{STATIC_QRIS_MERCHANT.merchantName}</strong> · NMID{" "}
                  <span className="font-mono font-bold">{STATIC_QRIS_MERCHANT.nmid}</span>
                </p>
              </div>

              <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-center">
                <div className="overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md max-w-[300px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={STATIC_QRIS_MERCHANT.imagePath}
                    alt={`QRIS ${STATIC_QRIS_MERCHANT.merchantName} NMID ${STATIC_QRIS_MERCHANT.nmid}`}
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={STATIC_QRIS_MERCHANT.imagePath}
                    download="QRIS-BOYANG-CPNS-10K.jpg"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 hover:bg-slate-50"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Unduh Gambar QRIS
                  </a>
                </div>

                <p className="mt-3 text-xs text-slate-600 max-w-sm">
                  Scan QRIS di atas melalui <strong>GoPay, DANA, OVO, ShopeePay, BCA, BRI, Mandiri, BNI, BSI</strong> lalu masukkan nominal tepat <strong>Rp 10.000</strong>.
                </p>
              </div>

              {staticOrder?.status === "waiting_verification" && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-950 space-y-1.5">
                  <p className="font-extrabold flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-amber-600" />
                    Menunggu Verifikasi Admin (Order: {staticOrder.orderId})
                  </p>
                  <p>
                    Halaman ini otomatis mengecek status setiap 5 detik. Begitu admin menyetujui pembayaran Anda, dashboard langsung terbuka.
                  </p>
                </div>
              )}

              {staticError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
                  {staticError}
                </div>
              )}
              {staticInfo && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-800">
                  {staticInfo}
                </div>
              )}

              <form onSubmit={handleConfirmStaticQris} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Catatan Pengirim / Jam Transfer (Opsional)
                  </label>
                  <input
                    type="text"
                    value={proofNote}
                    onChange={(e) => setProofNote(e.target.value)}
                    placeholder="Contoh: Transfer DANA a.n. Budi jam 08:15"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#0B2A52] focus:bg-white"
                  />
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="submit"
                    disabled={staticBusy}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B2A52] px-5 py-3.5 text-xs sm:text-sm font-extrabold text-white hover:bg-[#143d73] disabled:opacity-60"
                  >
                    {staticBusy ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-amber-400" />
                    )}
                    Saya Sudah Bayar Rp 10.000
                  </button>

                  {hasAdminWa && (
                    <a
                      href={`https://wa.me/${sanitizedAdminWa}?text=${encodeURIComponent(
                        waConfirmText
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-xs sm:text-sm font-extrabold text-white hover:bg-emerald-700"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Kirim Bukti via WA
                    </a>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="mt-5">
              {mtError && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-700">
                  {mtError}
                </div>
              )}

              {!mtOrder ? (
                <button
                  type="button"
                  onClick={generateMidtransQris}
                  disabled={creatingMt}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2A52] px-6 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#143d73] disabled:opacity-60"
                >
                  {creatingMt ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <QrCode className="h-5 w-5 text-amber-400" />
                  )}
                  {creatingMt
                    ? "Membuat Kode QRIS..."
                    : "Buat Kode QRIS Otomatis Rp 10.000"}
                </button>
              ) : (
                <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50/70 p-6 text-center">
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span>
                      Order{" "}
                      <span className="font-mono text-slate-900">
                        {mtOrder.orderId}
                      </span>
                      {secondsLeft !== null && (
                        <>
                          {" · "}Sisa waktu{" "}
                          <span className="font-mono text-[#0B2A52]">
                            {Math.floor(secondsLeft / 60)}:
                            {String(secondsLeft % 60).padStart(2, "0")}
                          </span>
                        </>
                      )}
                    </span>
                  </div>

                  {(mtOrder.qrDataUrl || mtOrder.qrImageUrl) && (
                    <div className="rounded-2xl border-4 border-white bg-white p-3 shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mtOrder.qrDataUrl || mtOrder.qrImageUrl || ""}
                        alt="QRIS Otomatis BOYANG-CPNS Rp 10.000"
                        className="h-60 w-60"
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={checkMidtransStatus}
                    disabled={checkingMt}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-extrabold text-white hover:bg-emerald-700 disabled:opacity-60"
                  >
                    {checkingMt ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    Cek Status Pembayaran
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Redeem Kode Aktivasi / Voucher */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0B2A52]">
            <KeyRound className="h-4 w-4 text-amber-500" />
            Sudah Punya Kode Aktivasi dari Admin?
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Masukkan kode voucher aktivasi (format <code className="font-mono font-bold">BYG-XXXX-XXXX</code>) untuk langsung membuka akses dashboard tanpa menunggu.
          </p>

          <form onSubmit={handleRedeemVoucher} className="mt-3 flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              placeholder="BYG-XXXX-XXXX"
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-sm uppercase outline-none focus:border-[#0B2A52] focus:bg-white"
            />
            <button
              type="submit"
              disabled={redeemBusy || voucherCode.trim().length < 6}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-black text-[#0B2A52] hover:bg-amber-300 disabled:opacity-50"
            >
              {redeemBusy && <Loader2 className="h-4 w-4 animate-spin" />}
              Aktifkan Kode
            </button>
          </form>

          {redeemError && (
            <p className="mt-2 text-xs font-semibold text-red-600">{redeemError}</p>
          )}
        </div>
      </div>

      <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-[#0B2A52] p-6 text-white shadow-sm h-fit">
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
            <span>Folder PDF Instansi CPNS 2026, Panduan Akun SSCASN, &amp; Materi FGD Guru ASN 2026</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <span><strong>7 Modul Ringkasan Kisi-Kisi SKD 2026</strong> (TWK, TIU, TKP) siap baca</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <span><strong>Simulasi Tryout CAT SKD</strong> ber-timer + perhitungan Passing Grade BKN &amp; pembahasan</span>
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
