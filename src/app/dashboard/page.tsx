import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import {
  ArrowRight,
  BookOpen,
  Compass,
  ExternalLink,
  FileSearch,
  ListChecks,
  MessageCircle,
  Star,
  Timer,
  Trophy,
  Users,
} from "lucide-react";
import { getDb, schema } from "@/db";
import { buildAdminWhatsappUrl, getAdminWhatsappDisplay, getPaidWaChannelUrl } from "@/lib/admin";
import { getCurrentUser } from "@/lib/session";
import { FORMASI_INSTANSI } from "@/data/formasi";
import { STUDY_MODULES } from "@/data/curriculum";
import { SSCASN_CHECKLIST } from "@/data/resources";

export default async function DashboardOverviewPage() {
  const user = (await getCurrentUser())!;
  const db = getDb();

  const [bookmarks, checklist, attempts] = await Promise.all([
    db
      .select({ instansiNo: schema.userBookmarks.instansiNo })
      .from(schema.userBookmarks)
      .where(eq(schema.userBookmarks.userId, user.id)),
    db
      .select({
        stepId: schema.userChecklist.stepId,
        completed: schema.userChecklist.completed,
      })
      .from(schema.userChecklist)
      .where(eq(schema.userChecklist.userId, user.id)),
    db
      .select({
        id: schema.tryoutAttempts.id,
        mode: schema.tryoutAttempts.mode,
        totalScore: schema.tryoutAttempts.totalScore,
        passedPassingGrade: schema.tryoutAttempts.passedPassingGrade,
        createdAt: schema.tryoutAttempts.createdAt,
      })
      .from(schema.tryoutAttempts)
      .where(eq(schema.tryoutAttempts.userId, user.id))
      .orderBy(desc(schema.tryoutAttempts.createdAt))
      .limit(5),
  ]);

  const completedSteps = checklist.filter((c) => c.completed).length;
  const bestScore = attempts.reduce(
    (max, a) => (a.totalScore > max ? a.totalScore : max),
    0
  );

  const waChannelUrl = getPaidWaChannelUrl();
  const adminDisplay = getAdminWhatsappDisplay();
  const consultUrl = buildAdminWhatsappUrl(
    `Halo Admin BOYANG-CPNS (${adminDisplay}), saya ${user.name} (${user.accessCode || user.email}) ingin berkonsultasi.`
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-[#071D3A] via-[#0B2A52] to-[#1A4B8C] p-6 sm:p-8 text-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-[11px] font-extrabold text-emerald-300">
              Member Aktif · QRIS Lunas
            </span>
            <h1 className="mt-2 font-heading text-2xl sm:text-3xl font-black">
              Selamat Belajar, {user.name}!
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-200">
              Seluruh 304 PDF Formasi, modul kisi-kisi SKD 2026, simulasi CAT, dan Saluran WhatsApp resmi sudah aktif untuk Anda.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a
                href={waChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-black text-white hover:bg-emerald-600"
              >
                <Users className="h-4 w-4" />
                Ikuti Saluran WhatsApp BOYANG-CPNS
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={consultUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-extrabold text-white hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4 text-amber-300" />
                Konsultasi Admin ({adminDisplay})
              </a>
            </div>
          </div>
          {user.accessCode && (
            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-left sm:text-right shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Kode Login Pribadi
              </p>
              <p className="mt-0.5 font-mono text-base font-black text-white">
                {user.accessCode}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Instansi Favorit</span>
            <Star className="h-4 w-4 text-amber-500" />
          </div>
          <p className="mt-2 font-heading text-2xl font-black text-[#0B2A52]">
            {bookmarks.length}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            dari {FORMASI_INSTANSI.length} PDF instansi tersedia
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Checklist SSCASN</span>
            <ListChecks className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-2 font-heading text-2xl font-black text-[#0B2A52]">
            {completedSteps} / {SSCASN_CHECKLIST.length}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            langkah pemberkasan selesai
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Tryout Dikerjakan</span>
            <Timer className="h-4 w-4 text-sky-600" />
          </div>
          <p className="mt-2 font-heading text-2xl font-black text-[#0B2A52]">
            {attempts.length}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            sesi simulasi CAT tersimpan
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Skor Terbaik</span>
            <Trophy className="h-4 w-4 text-amber-500" />
          </div>
          <p className="mt-2 font-heading text-2xl font-black text-[#0B2A52]">
            {bestScore}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            poin kumulatif terbaik
          </p>
        </div>
      </section>

      {/* Quick Launch Cards */}
      <section className="grid gap-4 md:grid-cols-2">
        <Link
          href="/dashboard/formasi"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-[#0B2A52]"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B2A52]">
              <FileSearch className="h-5 w-5" />
            </span>
            <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#0B2A52]" />
          </div>
          <h2 className="mt-4 font-heading text-lg font-black text-[#0B2A52]">
            Explorer 304 Formasi PDF &amp; Folder 2026
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Cari persyaratan instansi Pusat, Provinsi, Kabupaten, dan Kota beserta link Google Drive PDF pengumuman resmi.
          </p>
        </Link>

        <Link
          href="/dashboard/materi"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-[#0B2A52]"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <BookOpen className="h-5 w-5" />
            </span>
            <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#0B2A52]" />
          </div>
          <h2 className="mt-4 font-heading text-lg font-black text-[#0B2A52]">
            {STUDY_MODULES.length} Modul SKD + Gudang Dokumen PDF
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Pelajari rangkuman TWK, TIU, TKP dan buka dokumen panduan SSCASN, Kemendikdasmen Guru ASN 2026, serta portal BKN.
          </p>
        </Link>

        <Link
          href="/dashboard/tryout"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-[#0B2A52]"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Timer className="h-5 w-5" />
            </span>
            <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#0B2A52]" />
          </div>
          <h2 className="mt-4 font-heading text-lg font-black text-[#0B2A52]">
            Simulasi CAT Tryout SKD &amp; Pembahasan
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Uji kecepatan dan akurasi Anda dengan timer otomatis, cek proyeksi Passing Grade, dan pelajari pembahasan soal.
          </p>
        </Link>

        <Link
          href="/dashboard/panduan"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-[#0B2A52]"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
              <Compass className="h-5 w-5" />
            </span>
            <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#0B2A52]" />
          </div>
          <h2 className="mt-4 font-heading text-lg font-black text-[#0B2A52]">
            Checklist SSCASN, Saluran WA &amp; Berita 2026
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Lacak kelengkapan 7 dokumen penting pendaftaran, pantau kebijakan CPNS 2026, dan akses dukungan BOYANG-CPNS.
          </p>
        </Link>
      </section>
    </div>
  );
}
