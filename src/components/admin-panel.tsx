"use client";

import { useState } from "react";
import {
  Check,
  CheckCircle2,
  Copy,
  KeyRound,
  Loader2,
  PlusCircle,
  ShieldAlert,
  UserCheck,
} from "lucide-react";

export interface AdminOrderRow {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  proofNote: string | null;
  createdAt: string;
  userId: string;
  userName: string;
  userEmail: string;
  userWhatsapp: string | null;
  hasPaidAccess: boolean;
  accessCode: string | null;
}

export interface AdminVoucherRow {
  id: string;
  code: string;
  note: string | null;
  isActive: boolean;
  usedAt: string | null;
  createdAt: string;
}

export function AdminPanel({
  initialOrders,
  initialVouchers,
}: {
  initialOrders: AdminOrderRow[];
  initialVouchers: AdminVoucherRow[];
}) {
  const [orders, setOrders] = useState<AdminOrderRow[]>(initialOrders);
  const [vouchers, setVouchers] = useState<AdminVoucherRow[]>(initialVouchers);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [voucherNote, setVoucherNote] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function refreshAll() {
    const res = await fetch("/api/admin/orders", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setOrders(data.orders || []);
    setVouchers(data.vouchers || []);
  }

  async function approveOrder(orderId: string) {
    setBusyId(orderId);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve_order", orderId }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback(`Order ${orderId} disetujui! Kode Akses: ${data.accessCode}`);
        await refreshAll();
      }
    } finally {
      setBusyId(null);
    }
  }

  async function approveByEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setBusyId("email-activate");
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "approve_user_email",
          email: emailInput.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback(`Akun ${data.email} aktif! Kode Akses: ${data.accessCode}`);
        setEmailInput("");
        await refreshAll();
      } else {
        setFeedback(data.message || "Gagal mengaktifkan akun.");
      }
    } finally {
      setBusyId(null);
    }
  }

  async function createVoucher(e: React.FormEvent) {
    e.preventDefault();
    setBusyId("new-voucher");
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create_voucher", note: voucherNote }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback(`Voucher baru dibuat: ${data.code}`);
        setVoucherNote("");
        await refreshAll();
      }
    } finally {
      setBusyId(null);
    }
  }

  async function copyCode(code: string) {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode((c) => (c === code ? null : c)), 1500);
  }

  return (
    <div className="space-y-6">
      {feedback && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-900">
          {feedback}
        </div>
      )}

      {/* Quick Tools */}
      <div className="grid gap-4 md:grid-cols-2">
        <form
          onSubmit={approveByEmail}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3"
        >
          <h2 className="flex items-center gap-2 font-heading text-sm font-black text-[#0B2A52]">
            <UserCheck className="h-4 w-4 text-emerald-600" />
            Aktifkan Akun via Email
          </h2>
          <p className="text-xs text-slate-600">
            Langsung buka akses user yang sudah mendaftar &amp; mengirim bukti transfer QRIS.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="email-pembeli@gmail.com"
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-[#0B2A52] focus:bg-white"
            />
            <button
              type="submit"
              disabled={busyId === "email-activate"}
              className="rounded-xl bg-[#0B2A52] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#143d73] disabled:opacity-60"
            >
              Aktifkan
            </button>
          </div>
        </form>

        <form
          onSubmit={createVoucher}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3"
        >
          <h2 className="flex items-center gap-2 font-heading text-sm font-black text-[#0B2A52]">
            <KeyRound className="h-4 w-4 text-amber-500" />
            Buat Kode Voucher Aktivasi Baru
          </h2>
          <p className="text-xs text-slate-600">
            Kirim kode voucher sekali pakai ke pembeli agar bisa langsung aktivasi sendiri di halaman pembayaran.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={voucherNote}
              onChange={(e) => setVoucherNote(e.target.value)}
              placeholder="Catatan (mis. Nama pembeli)"
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-[#0B2A52] focus:bg-white"
            />
            <button
              type="submit"
              disabled={busyId === "new-voucher"}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-[#0B2A52] hover:bg-amber-300 disabled:opacity-60"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Buat Kode
            </button>
          </div>
        </form>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <h2 className="font-heading text-base font-black text-[#0B2A52]">
          Daftar Pesanan QRIS Rp 10.000 ({orders.length})
        </h2>
        {orders.length === 0 ? (
          <p className="mt-3 text-xs text-slate-500">Belum ada transaksi masuk.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-3 font-bold">Order ID</th>
                  <th className="py-2 pr-3 font-bold">Pembeli</th>
                  <th className="py-2 pr-3 font-bold">Metode</th>
                  <th className="py-2 pr-3 font-bold">Catatan</th>
                  <th className="py-2 pr-3 font-bold">Status</th>
                  <th className="py-2 font-bold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="py-2.5 pr-3 font-mono font-bold text-slate-800">
                      {o.orderId}
                    </td>
                    <td className="py-2.5 pr-3">
                      <p className="font-bold text-slate-900">{o.userName}</p>
                      <p className="text-[11px] text-slate-500">{o.userEmail}</p>
                      {o.userWhatsapp && (
                        <p className="text-[11px] text-slate-500">{o.userWhatsapp}</p>
                      )}
                    </td>
                    <td className="py-2.5 pr-3">{o.paymentMethod}</td>
                    <td className="py-2.5 pr-3 text-slate-600">
                      {o.proofNote || "—"}
                    </td>
                    <td className="py-2.5 pr-3">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold ${
                          o.status === "settlement" || o.hasPaidAccess
                            ? "bg-emerald-100 text-emerald-800"
                            : o.status === "waiting_verification"
                              ? "bg-amber-100 text-amber-900"
                              : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {o.hasPaidAccess ? "Lunas / Aktif" : o.status}
                      </span>
                    </td>
                    <td className="py-2.5">
                      {o.hasPaidAccess ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {o.accessCode || "Aktif"}
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={busyId === o.orderId}
                          onClick={() => approveOrder(o.orderId)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-extrabold text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                          {busyId === o.orderId && (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          )}
                          Setujui &amp; Aktifkan
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Vouchers List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <h2 className="font-heading text-base font-black text-[#0B2A52]">
          Kode Voucher Aktivasi ({vouchers.length})
        </h2>
        {vouchers.length === 0 ? (
          <p className="mt-2 text-xs text-slate-500">Belum ada voucher dibuat.</p>
        ) : (
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {vouchers.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs"
              >
                <div>
                  <p className="font-mono font-black text-[#0B2A52]">{v.code}</p>
                  <p className="text-[11px] text-slate-500">
                    {v.isActive ? v.note || "Siap pakai" : "Sudah dipakai"}
                  </p>
                </div>
                {v.isActive ? (
                  <button
                    type="button"
                    onClick={() => copyCode(v.code)}
                    className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:text-[#0B2A52]"
                  >
                    {copiedCode === v.code ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                ) : (
                  <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                    Terpakai
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-4 text-[11px] text-slate-500">
        <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500" />
        <span>
          Halaman ini hanya dapat diakses oleh email yang terdaftar pada environment variable{" "}
          <code className="font-mono font-bold text-slate-700">ADMIN_EMAILS</code>.
        </span>
      </div>
    </div>
  );
}
