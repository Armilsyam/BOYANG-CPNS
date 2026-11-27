"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  MessageCircle,
  Newspaper,
  Users,
} from "lucide-react";
import {
  CPNS_NEWS_UPDATES,
  SSCASN_CHECKLIST,
} from "@/data/resources";
import {
  DEFAULT_ADMIN_WHATSAPP,
  DEFAULT_WA_CHANNEL_URL,
  normalizeWhatsappNumber,
} from "@/lib/admin";

export function PanduanHub({
  initialCompletedIds,
  adminWhatsapp,
  communityWaUrl,
  userName,
  userAccessCode,
}: {
  initialCompletedIds: string[];
  adminWhatsapp?: string;
  communityWaUrl?: string;
  userName?: string;
  userAccessCode?: string | null;
}) {
  const [completed, setCompleted] = useState<Set<string>>(
    () => new Set(initialCompletedIds)
  );
  const [savingId, setSavingId] = useState<string | null>(null);

  async function toggleStep(stepId: string) {
    setSavingId(stepId);
    const prev = new Set(completed);
    const next = new Set(completed);
    const willComplete = !next.has(stepId);
    if (willComplete) next.add(stepId);
    else next.delete(stepId);
    setCompleted(next);

    try {
      const res = await fetch("/api/dashboard/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId, completed: willComplete }),
      });
      if (!res.ok) setCompleted(prev);
    } catch {
      setCompleted(prev);
    } finally {
      setSavingId(null);
    }
  }

  const progressPct = Math.round(
    (completed.size / SSCASN_CHECKLIST.length) * 100
  );

  const sanitizedAdminWa = (() => {
    const n = normalizeWhatsappNumber(adminWhatsapp);
    return n.length >= 9 ? n : DEFAULT_ADMIN_WHATSAPP;
  })();
  const adminDisplay = sanitizedAdminWa.startsWith("62")
    ? `0${sanitizedAdminWa.slice(2)}`
    : sanitizedAdminWa;
  const channelHref = communityWaUrl?.trim() || DEFAULT_WA_CHANNEL_URL;

  return (
    <div className="space-y-8">
      {/* Checklist SSCASN */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-heading text-xl font-black text-[#0B2A52]">
              Checklist 7 Langkah Pemberkasan &amp; Akun SSCASN
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Centang setiap langkah yang sudah Anda selesaikan. Progres otomatis tersimpan ke akun Anda.
            </p>
          </div>

          <div className="text-right">
            <p className="font-heading text-xl font-black text-emerald-700">
              {progressPct}%
            </p>
            <p className="text-[11px] font-bold text-slate-500">
              {completed.size} dari {SSCASN_CHECKLIST.length} selesai
            </p>
          </div>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="mt-5 space-y-3">
          {SSCASN_CHECKLIST.map((step) => {
            const done = completed.has(step.id);
            return (
              <button
                key={step.id}
                type="button"
                disabled={savingId === step.id}
                onClick={() => toggleStep(step.id)}
                className={`flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition ${
                  done
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                {done ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-slate-300 mt-0.5" />
                )}
                <div>
                  <p
                    className={`text-sm font-extrabold ${
                      done ? "text-emerald-950 line-through" : "text-slate-900"
                    }`}
                  >
                    {step.order}. {step.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">{step.description}</p>
                  <p className="mt-1.5 text-[11px] font-semibold text-amber-800">
                    Tip: {step.tip}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Berita & Info CPNS 2026 */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-[#0B2A52]" />
          <h2 className="font-heading text-xl font-black text-[#0B2A52]">
            Berita &amp; Informasi Kebijakan CPNS 2026
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {CPNS_NEWS_UPDATES.map((news) => (
            <article
              key={news.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="rounded-md bg-amber-100 px-2.5 py-0.5 font-extrabold text-amber-900">
                    {news.tag}
                  </span>
                  <span className="font-semibold text-slate-400">{news.date}</span>
                </div>
                <h3 className="mt-3 font-heading text-base font-extrabold text-slate-900">
                  {news.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {news.summary}
                </p>
                <ul className="mt-3 space-y-1 text-xs text-slate-700 list-disc pl-4">
                  {news.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <a
                href={news.officialSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0B2A52] hover:underline"
              >
                {news.officialSourceLabel}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Saluran WA Resmi & Konsultasi Admin BOYANG-CPNS */}
      <section className="rounded-2xl border border-slate-200 bg-[#0B2A52] p-6 text-white shadow-xs">
        <h2 className="font-heading text-lg font-black">
          Saluran WhatsApp Resmi &amp; Konsultasi Admin BOYANG-CPNS
        </h2>
        <p className="mt-1 text-xs text-slate-200 max-w-2xl">
          Ikuti saluran WhatsApp resmi khusus member untuk info update formasi &amp; materi harian, atau hubungi Admin ({adminDisplay}) untuk konsultasi.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={channelHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-black text-[#0B2A52] hover:bg-amber-300"
          >
            <Users className="h-4 w-4" />
            Ikuti Saluran BOYANG-CPNS di WhatsApp
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <a
            href={`https://wa.me/${sanitizedAdminWa}?text=${encodeURIComponent(
              `Halo Admin BOYANG-CPNS (${adminDisplay}), saya ${userName || "Member"} (Kode Login: ${userAccessCode || "-"}) ingin konsultasi seputar persiapan CPNS.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-black text-white hover:bg-emerald-600"
          >
            <MessageCircle className="h-4 w-4" />
            Konsultasi Admin ({adminDisplay})
          </a>
        </div>
      </section>
    </div>
  );
}
