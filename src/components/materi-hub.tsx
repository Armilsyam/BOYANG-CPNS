"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  FileText,
  Lightbulb,
} from "lucide-react";
import { SKD_STRUCTURE, STUDY_MODULES } from "@/data/curriculum";
import { OFFICIAL_RESOURCES } from "@/data/resources";

type CategoryFilter = "ALL" | "TWK" | "TIU" | "TKP";

const CAT_BADGE: Record<"TWK" | "TIU" | "TKP", string> = {
  TWK: "bg-amber-100 text-amber-900 border-amber-200",
  TIU: "bg-sky-100 text-sky-900 border-sky-200",
  TKP: "bg-emerald-100 text-emerald-900 border-emerald-200",
};

export function MateriHub() {
  const [filter, setFilter] = useState<CategoryFilter>("ALL");
  const [openId, setOpenId] = useState<string>(STUDY_MODULES[0]?.id ?? "");

  const visibleModules =
    filter === "ALL"
      ? STUDY_MODULES
      : STUDY_MODULES.filter((m) => m.category === filter);

  return (
    <div className="space-y-8">
      {/* Section 1: Dokumen PDF & Portal Publik */}
      <section>
        <div className="mb-4">
          <h2 className="font-heading text-xl font-black text-[#0B2A52]">
            Gudang Dokumen PDF &amp; Portal Resmi CPNS 2026
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Kumpulan PDF panduan SSCASN, folder syarat instansi 2026, materi FGD Kemendikdasmen, serta portal resmi BKN/KemenPAN-RB.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {OFFICIAL_RESOURCES.map((res) => (
            <div
              key={res.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold text-[#0B2A52]">
                    <FileText className="h-3 w-3" />
                    {res.badge}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {res.sourceNote}
                  </span>
                </div>
                <h3 className="mt-3 font-heading text-sm font-extrabold text-slate-900">
                  {res.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <a
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B2A52] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-[#143d73]"
              >
                {res.actionLabel}
                <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Struktur SKD */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        <h2 className="font-heading text-lg font-black text-[#0B2A52]">
          Struktur Nilai Ambang Batas (Passing Grade) SKD CPNS
        </h2>
        <p className="mt-1 text-xs text-slate-600">
          Total 110 soal dalam 100 menit (130 menit disabilitas netra). Nilai maksimal kumulatif 550.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {SKD_STRUCTURE.map((s) => (
            <div
              key={s.code}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-md border px-2 py-0.5 text-xs font-black ${
                    CAT_BADGE[s.code]
                  }`}
                >
                  {s.code}
                </span>
                <span className="text-xs font-extrabold text-slate-800">
                  PG {s.passingGradeGeneral} / {s.maxScore}
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-slate-900">{s.name}</p>
              <p className="mt-1 text-xs text-slate-600">
                {s.questions} soal · {s.scoring}
              </p>
              <p className="mt-1.5 text-[11px] text-slate-500">{s.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Modul Belajar SKD Original BOYANG-CPNS */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="font-heading text-xl font-black text-[#0B2A52]">
              Modul Ringkasan Kisi-Kisi SKD BOYANG-CPNS
            </h2>
            <p className="text-xs text-slate-600">
              Materi inti TWK, TIU, dan TKP siap baca langsung dengan tips menembus Passing Grade.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["ALL", "TWK", "TIU", "TKP"] as CategoryFilter[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-xl px-3.5 py-2 text-xs font-extrabold transition ${
                  filter === cat
                    ? "bg-[#0B2A52] text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {cat === "ALL" ? "Semua Modul" : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {visibleModules.map((mod) => {
            const isOpen = openId === mod.id;
            return (
              <div
                key={mod.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? "" : mod.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left hover:bg-slate-50/70 transition"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[10px] font-black ${
                          CAT_BADGE[mod.category]
                        }`}
                      >
                        {mod.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        {mod.readMinutes} menit baca
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-heading text-base font-extrabold text-[#0B2A52]">
                      {mod.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-600">{mod.subtitle}</p>
                  </div>

                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-slate-50/50 p-5 space-y-5">
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0B2A52]">
                        <BookOpen className="h-3.5 w-3.5 text-amber-500" />
                        Poin Kunci Materi
                      </p>
                      <ul className="mt-2 space-y-1.5 text-sm text-slate-700 list-disc pl-5">
                        {mod.keyPoints.map((kp, i) => (
                          <li key={i}>{kp}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {mod.deepNotes.map((section, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-slate-200 bg-white p-4"
                        >
                          <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">
                            {section.heading}
                          </h4>
                          <ul className="mt-2 space-y-1.5 text-xs text-slate-600 list-disc pl-4">
                            {section.points.map((pt, j) => (
                              <li key={j}>{pt}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-950">
                      <Lightbulb className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                      <div>
                        <strong className="font-extrabold">Trik Cepat Ujian: </strong>
                        {mod.examTip}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
