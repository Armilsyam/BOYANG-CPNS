import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileSearch,
  ListChecks,
  Lock,
  QrCode,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { FORMASI_INSTANSI, LEVEL_META, getDisplayName } from "@/data/formasi";
import { SKD_STRUCTURE } from "@/data/curriculum";
import { getCurrentUser } from "@/lib/session";

const SAMPLE_PREVIEW = FORMASI_INSTANSI.slice(0, 6);

export default async function HomePage() {
  const user = await getCurrentUser();
  const pusatCount = FORMASI_INSTANSI.filter((i) => i.lv === "P").length;
  const provCount = FORMASI_INSTANSI.filter((i) => i.lv === "V").length;
  const kabCount = FORMASI_INSTANSI.filter((i) => i.lv === "B").length;
  const kotaCount = FORMASI_INSTANSI.filter((i) => i.lv === "T").length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <BrandLogo />
          <nav className="flex items-center gap-3">
            <a
              href="#fitur"
              className="hidden sm:inline-block text-sm font-semibold text-slate-600 hover:text-[#0B2A52]"
            >
              Fitur Materi
            </a>
            <a
              href="#formasi-preview"
              className="hidden sm:inline-block text-sm font-semibold text-slate-600 hover:text-[#0B2A52]"
            >
              304 Formasi
            </a>
            {user?.hasPaidAccess ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0B2A52] px-4 py-2 text-xs sm:text-sm font-extrabold text-white hover:bg-[#143d73]"
              >
                Buka Dashboard
                <ArrowRight className="h-4 w-4 text-amber-400" />
              </Link>
            ) : user ? (
              <Link
                href="/pembayaran"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-extrabold text-white hover:bg-emerald-700"
              >
                <QrCode className="h-4 w-4" />
                Aktifkan Rp 10rb
              </Link>
            ) : (
              <>
                <Link
                  href="/masuk"
                  className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Masuk
                </Link>
                <Link
                  href="/masuk?tab=daftar"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#0B2A52] px-4 py-2 text-xs sm:text-sm font-extrabold text-white hover:bg-[#143d73]"
                >
                  Akses Rp 10rb
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 lg:pt-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071D3A] via-[#0B2A52] to-[#1A4B8C] p-7 sm:p-12 text-white shadow-xl">
            <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-300/30 px-3.5 py-1 text-xs font-extrabold text-amber-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Dashboard Mandiri Persiapan CPNS 2026
                </span>
                <h1 className="mt-4 font-heading text-3xl sm:text-5xl font-black leading-[1.1] tracking-tight">
                  Satu Portal Lengkap <span className="text-amber-400">BOYANG-CPNS</span> untuk Pejuang ASN.
                </h1>
                <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-200 leading-relaxed">
                  Akses seluruh direktori <strong>304 PDF Formasi Instansi</strong>, folder instansi CPNS 2026,
                  modul kisi-kisi <strong>TWK, TIU, TKP</strong>, simulasi CAT ber-timer, serta panduan resmi SSCASN
                  dalam satu dashboard cepat &amp; bebas ribet.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={
                      user?.hasPaidAccess
                        ? "/dashboard"
                        : user
                          ? "/pembayaran"
                          : "/masuk?tab=daftar"
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-black text-[#0B2A52] shadow-md transition hover:bg-amber-300"
                  >
                    <QrCode className="h-4 w-4" />
                    {user?.hasPaidAccess
                      ? "Masuk ke Dashboard Saya"
                      : "Daftar & Bayar QRIS Hanya Rp 10.000"}
                  </Link>
                  <a
                    href="#formasi-preview"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur hover:bg-white/20"
                  >
                    Lihat Daftar 304 Instansi
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Bayar sekali Rp 10.000 (bukan langganan)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Otomatis aktif setelah scan QRIS
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Bisa login dari HP &amp; laptop kapan saja
                  </span>
                </div>
              </div>

              {/* Pricing / Stats Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        Akses Penuh Selamanya
                      </p>
                      <p className="mt-1 font-heading text-3xl font-black text-white">
                        Rp 10.000
                      </p>
                    </div>
                    <span className="rounded-xl bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 text-xs font-extrabold text-emerald-300">
                      QRIS Instan
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-xl bg-white/10 p-3">
                      <p className="font-heading text-2xl font-black text-amber-300">
                        {FORMASI_INSTANSI.length}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-200">
                        PDF Formasi Instansi
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-3">
                      <p className="font-heading text-2xl font-black text-amber-300">
                        30+
                      </p>
                      <p className="text-[11px] font-semibold text-slate-200">
                        Soal CAT + Pembahasan
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-3">
                      <p className="font-heading text-2xl font-black text-amber-300">
                        7
                      </p>
                      <p className="text-[11px] font-semibold text-slate-200">
                        Modul SKD TWK/TIU/TKP
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-3">
                      <p className="font-heading text-2xl font-black text-amber-300">
                        2026
                      </p>
                      <p className="text-[11px] font-semibold text-slate-200">
                        Panduan &amp; Folder PDF
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="fitur" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-black text-[#0B2A52]">
              Semua Fitur di Dalam Dashboard BOYANG-CPNS
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Dirancang ringkas dan terstruktur agar persiapan administrasi hingga SKD lebih terarah.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0B2A52]">
                <FileSearch className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-extrabold text-[#0B2A52]">
                Explorer 304 Formasi PDF
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Cari cepat instansi {pusatCount} Pusat, {provCount} Provinsi, {kabCount} Kabupaten, dan {kotaCount} Kota lengkap dengan filter, alias nama, dan simpan favorit.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-extrabold text-[#0B2A52]">
                Gudang Materi &amp; PDF 2026
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Akses PDF Instansi CPNS 2026, Panduan Akun SSCASN, FGD Guru ASN 2026, serta 7 modul kisi-kisi SKD TWK, TIU, dan TKP.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Timer className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-extrabold text-[#0B2A52]">
                Simulasi CAT &amp; Passing Grade
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Latihan soal dengan timer CAT, pembobotan nilai resmi (TWK/TIU +5, TKP skala 1–5), cek ambang batas, dan pembahasan lengkap.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                <ListChecks className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-extrabold text-[#0B2A52]">
                Checklist SSCASN &amp; Info
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Pantau progres 7 langkah pemberkasan agar tidak gugur administrasi, plus rangkuman info kebijakan CPNS 2026.
              </p>
            </div>
          </div>
        </section>

        {/* SKD Reference Table */}
        <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="font-heading text-lg font-black text-[#0B2A52]">
              Acuan Nilai Ambang Batas (Passing Grade) SKD CPNS
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Total 110 soal · Durasi 100 menit (Umum) · Skor maksimal 550.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {SKD_STRUCTURE.map((item) => (
                <div
                  key={item.code}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm font-black text-[#0B2A52]">
                      {item.code}
                    </span>
                    <span className="rounded-lg bg-white border border-slate-200 px-2.5 py-0.5 text-xs font-extrabold text-emerald-700">
                      PG: {item.passingGradeGeneral}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-bold text-slate-800">{item.name}</p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {item.questions} soal · Maks {item.maxScore} · {item.scoring}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preview Formasi List */}
        <section id="formasi-preview" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-heading text-lg font-black text-[#0B2A52]">
                  Cuplikan Direktori 304 Instansi Formasi PDF
                </h2>
                <p className="text-xs text-slate-600">
                  Menampilkan 6 dari 304 instansi pusat &amp; daerah. Buka akses Rp 10.000 untuk pencarian lengkap &amp; link PDF langsung.
                </p>
              </div>
              <Link
                href={user?.hasPaidAccess ? "/dashboard/formasi" : "/masuk?tab=daftar"}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#0B2A52] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#143d73]"
              >
                {user?.hasPaidAccess ? "Buka Semua 304 Instansi" : "Buka Semua via QRIS Rp 10rb"}
              </Link>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {SAMPLE_PREVIEW.map((item) => (
                <div
                  key={item.no}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {getDisplayName(item)}
                    </p>
                    <span className="mt-0.5 inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-900">
                      {LEVEL_META[item.lv].label}
                    </span>
                  </div>
                  {user?.hasPaidAccess ? (
                    <Link
                      href="/dashboard/formasi"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#0B2A52] hover:bg-blue-100"
                    >
                      Buka di Explorer
                    </Link>
                  ) : (
                    <Link
                      href="/masuk?tab=daftar"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                    >
                      <Lock className="h-3.5 w-3.5 text-amber-600" />
                      PDF Terkunci (Rp 10rb)
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-3 px-4 text-xs text-slate-500 sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <ShieldCheck className="h-4 w-4 text-[#0B2A52]" />
            BOYANG-CPNS — Dashboard Independen Persiapan CPNS
          </div>
          <p>
            Referensi resmi tetap mengacu pada portal{" "}
            <a
              href="https://sscasn.bkn.go.id"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-[#0B2A52] underline"
            >
              sscasn.bkn.go.id
            </a>{" "}
            &amp;{" "}
            <a
              href="https://www.menpan.go.id"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-[#0B2A52] underline"
            >
              menpan.go.id
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
