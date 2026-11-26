"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Award,
  CheckCircle2,
  Clock,
  Flag,
  Loader2,
  Play,
  RotateCcw,
} from "lucide-react";
import { TRYOUT_QUESTIONS, type TryoutQuestion } from "@/data/tryout";
import type { TryoutMode, TryoutScoreBreakdown } from "@/lib/tryout-scoring";

export interface SavedAttemptSummary {
  id: string;
  mode: string;
  twkScore: number;
  tiuScore: number;
  tkpScore: number;
  totalScore: number;
  passedPassingGrade: boolean;
  durationSeconds: number;
  createdAt: string;
}

const MODE_OPTIONS: Array<{
  mode: TryoutMode;
  title: string;
  desc: string;
  minutes: number;
}> = [
  {
    mode: "all",
    title: "Paket Simulasi CAT Terpadu",
    desc: "30 soal lengkap (10 TWK + 10 TIU + 10 TKP) · 30 menit",
    minutes: 30,
  },
  {
    mode: "TWK",
    title: "Fokus TWK",
    desc: "10 soal Wawasan Kebangsaan & Bahasa Indonesia · 10 menit",
    minutes: 10,
  },
  {
    mode: "TIU",
    title: "Fokus TIU",
    desc: "10 soal Verbal, Numerik & Logika · 10 menit",
    minutes: 10,
  },
  {
    mode: "TKP",
    title: "Fokus TKP",
    desc: "10 soal Skala 1–5 Pelayanan hingga Anti-Radikalisme · 10 menit",
    minutes: 10,
  },
];

export function TryoutSimulator({
  initialHistory,
}: {
  initialHistory: SavedAttemptSummary[];
}) {
  const [phase, setPhase] = useState<"idle" | "running" | "result">("idle");
  const [mode, setMode] = useState<TryoutMode>("all");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [totalSeconds, setTotalSeconds] = useState(30 * 60);
  const [secondsLeft, setSecondsLeft] = useState(30 * 60);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<TryoutScoreBreakdown | null>(null);
  const [history, setHistory] = useState<SavedAttemptSummary[]>(initialHistory);
  const [error, setError] = useState<string | null>(null);

  const questions: TryoutQuestion[] = useMemo(() => {
    if (mode === "all") return TRYOUT_QUESTIONS;
    return TRYOUT_QUESTIONS.filter((q) => q.category === mode);
  }, [mode]);

  const currentQuestion = questions[currentIdx];

  function startSession(selectedMode: TryoutMode) {
    const opt = MODE_OPTIONS.find((m) => m.mode === selectedMode)!;
    const allocated = opt.minutes * 60;
    setMode(selectedMode);
    setAnswers({});
    setFlagged(new Set());
    setCurrentIdx(0);
    setTotalSeconds(allocated);
    setSecondsLeft(allocated);
    setResult(null);
    setError(null);
    setPhase("running");
  }

  async function submitAttempt() {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    const durationSeconds = Math.max(1, totalSeconds - secondsLeft);

    try {
      const res = await fetch("/api/dashboard/tryout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, answers, durationSeconds }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Gagal menyimpan hasil tryout.");
        setSubmitting(false);
        return;
      }

      const breakdown = data.result as TryoutScoreBreakdown;
      setResult(breakdown);
      setHistory((prev) => [
        {
          id: data.id,
          mode: breakdown.mode,
          twkScore: breakdown.twkScore,
          tiuScore: breakdown.tiuScore,
          tkpScore: breakdown.tkpScore,
          totalScore: breakdown.totalScore,
          passedPassingGrade: breakdown.passedPassingGrade,
          durationSeconds,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      setPhase("result");
    } catch {
      setError("Koneksi terganggu saat mengirim jawaban.");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          void submitAttempt();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === "idle") {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="font-heading text-xl font-black text-[#0B2A52]">
            Simulasi Tryout CAT SKD BOYANG-CPNS
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Menggunakan sistem skor resmi BKN: TWK &amp; TIU (+5 benar, 0 salah) serta TKP (skala 1–5 tanpa nilai minus).
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {MODE_OPTIONS.map((opt) => (
              <div
                key={opt.mode}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <div>
                  <span className="rounded-md bg-[#0B2A52] px-2.5 py-0.5 text-[10px] font-extrabold text-amber-300 uppercase">
                    {opt.mode === "all" ? "Full Simulator" : `Subtes ${opt.mode}`}
                  </span>
                  <h3 className="mt-2.5 font-heading text-base font-extrabold text-slate-900">
                    {opt.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">{opt.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => startSession(opt.mode)}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B2A52] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-[#143d73]"
                >
                  <Play className="h-3.5 w-3.5 text-amber-400" />
                  Mulai Simulasi
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <h3 className="font-heading text-base font-black text-[#0B2A52]">
            Riwayat Tryout Tersimpan
          </h3>
          {history.length === 0 ? (
            <p className="mt-2 text-xs text-slate-500">
              Belum ada riwayat pengerjaan. Pilih salah satu paket simulasi di atas untuk memulai.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2 pr-4 font-bold">Mode</th>
                    <th className="py-2 pr-4 font-bold">TWK</th>
                    <th className="py-2 pr-4 font-bold">TIU</th>
                    <th className="py-2 pr-4 font-bold">TKP</th>
                    <th className="py-2 pr-4 font-bold">Total</th>
                    <th className="py-2 pr-4 font-bold">Status Proyeksi PG</th>
                    <th className="py-2 font-bold">Durasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((h) => (
                    <tr key={h.id}>
                      <td className="py-2.5 pr-4 font-extrabold text-[#0B2A52]">
                        {h.mode === "all" ? "Terpadu" : h.mode}
                      </td>
                      <td className="py-2.5 pr-4">{h.twkScore}</td>
                      <td className="py-2.5 pr-4">{h.tiuScore}</td>
                      <td className="py-2.5 pr-4">{h.tkpScore}</td>
                      <td className="py-2.5 pr-4 font-extrabold">{h.totalScore}</td>
                      <td className="py-2.5 pr-4">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold ${
                            h.passedPassingGrade
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {h.passedPassingGrade ? "Lulus Ambang Batas" : "Perlu Latihan Lagi"}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-500">
                        {Math.floor(h.durationSeconds / 60)}m {h.durationSeconds % 60}d
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (phase === "result" && result) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${
                  result.passedPassingGrade
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-900"
                }`}
              >
                <Award className="h-4 w-4" />
                {result.passedPassingGrade
                  ? "Memenuhi Proyeksi Passing Grade BKN!"
                  : "Belum Memenuhi Proyeksi Passing Grade"}
              </span>
              <h2 className="mt-2 font-heading text-2xl font-black text-[#0B2A52]">
                Hasil Simulasi: {result.totalScore} / {result.totalMax}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setPhase("idle")}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0B2A52] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-[#143d73]"
            >
              <RotateCcw className="h-4 w-4 text-amber-400" />
              Kembali ke Menu Tryout
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {result.twkMax > 0 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold text-slate-500">TWK (PG Proyeksi ≥ 65)</p>
                <p className="mt-1 font-heading text-xl font-black text-slate-900">
                  {result.twkScore} / {result.twkMax}
                </p>
                <p className="text-[11px] font-semibold text-slate-600">
                  Setara skala 150: <strong>{result.projectedTwk}</strong>
                </p>
              </div>
            )}
            {result.tiuMax > 0 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold text-slate-500">TIU (PG Proyeksi ≥ 80)</p>
                <p className="mt-1 font-heading text-xl font-black text-slate-900">
                  {result.tiuScore} / {result.tiuMax}
                </p>
                <p className="text-[11px] font-semibold text-slate-600">
                  Setara skala 175: <strong>{result.projectedTiu}</strong>
                </p>
              </div>
            )}
            {result.tkpMax > 0 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold text-slate-500">TKP (PG Proyeksi ≥ 166)</p>
                <p className="mt-1 font-heading text-xl font-black text-slate-900">
                  {result.tkpScore} / {result.tkpMax}
                </p>
                <p className="text-[11px] font-semibold text-slate-600">
                  Setara skala 225: <strong>{result.projectedTkp}</strong>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pembahasan */}
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-black text-[#0B2A52]">
            Review Jawaban &amp; Pembahasan Lengkap
          </h3>
          {questions.map((q, index) => {
            const d = result.details[index];
            const isFull = d.earnedScore === d.maxScore;
            return (
              <div
                key={q.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-[#0B2A52]">
                    No. {index + 1} · {q.category} ({q.subtopic})
                  </span>
                  <span
                    className={`rounded-lg px-2.5 py-0.5 text-xs font-extrabold ${
                      isFull
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    Skor: {d.earnedScore} / {d.maxScore} (Terbaik: {d.bestLabel})
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900">{q.prompt}</p>
                <div className="grid gap-1.5 text-xs">
                  {q.options.map((opt) => {
                    const chosen = d.selectedLabel === opt.label;
                    const best = d.bestLabel === opt.label;
                    return (
                      <div
                        key={opt.label}
                        className={`rounded-xl border px-3 py-2 flex items-center justify-between gap-2 ${
                          best
                            ? "border-emerald-300 bg-emerald-50 text-emerald-950 font-bold"
                            : chosen
                              ? "border-red-300 bg-red-50 text-red-900"
                              : "border-slate-100 bg-slate-50 text-slate-600"
                        }`}
                      >
                        <span>
                          <strong>{opt.label}.</strong> {opt.text}
                        </span>
                        <span className="shrink-0 font-mono text-[11px]">
                          +{opt.score}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="rounded-xl bg-blue-50/70 p-3 text-xs text-slate-700">
                  <strong className="text-[#0B2A52]">Pembahasan: </strong>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Running CAT Session
  const answeredTotal = Object.keys(answers).length;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Main Question Panel */}
      <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-[#0B2A52] px-2.5 py-1 text-xs font-extrabold text-amber-300">
                Soal {currentIdx + 1} / {questions.length}
              </span>
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                {currentQuestion.category} · {currentQuestion.subtopic}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 font-mono text-xs font-black text-amber-900">
              <Clock className="h-3.5 w-3.5" />
              {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </div>
          </div>

          <p className="mt-5 text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
            {currentQuestion.prompt}
          </p>

          <div className="mt-5 space-y-2.5">
            {currentQuestion.options.map((opt) => {
              const selected = answers[currentQuestion.id] === opt.label;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: opt.label,
                    }))
                  }
                  className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition ${
                    selected
                      ? "border-[#0B2A52] bg-blue-50/70 text-[#0B2A52] font-bold"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                      selected
                        ? "bg-[#0B2A52] text-amber-300"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {opt.label}
                  </span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              onClick={() =>
                setFlagged((prev) => {
                  const next = new Set(prev);
                  if (next.has(currentQuestion.id)) next.delete(currentQuestion.id);
                  else next.add(currentQuestion.id);
                  return next;
                })
              }
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold ${
                flagged.has(currentQuestion.id)
                  ? "border-amber-300 bg-amber-100 text-amber-900"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Flag className="h-3.5 w-3.5" />
              Ragu-Ragu
            </button>
          </div>

          <div className="flex items-center gap-2">
            {currentIdx < questions.length - 1 ? (
              <button
                type="button"
                onClick={() =>
                  setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))
                }
                className="rounded-xl bg-[#0B2A52] px-5 py-2 text-xs font-extrabold text-white hover:bg-[#143d73]"
              >
                Simpan &amp; Lanjut
              </button>
            ) : (
              <button
                type="button"
                onClick={submitAttempt}
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-extrabold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                Selesai &amp; Nilai Sekarang
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question Palette Sidebar */}
      <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4 h-fit">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-black text-[#0B2A52]">
            Navigasi Soal
          </h3>
          <span className="text-xs font-bold text-slate-500">
            {answeredTotal} / {questions.length} dijawab
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIdx;
            const isAnswered = Boolean(answers[q.id]);
            const isFlagged = flagged.has(q.id);
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`h-9 rounded-lg text-xs font-extrabold transition ${
                  isCurrent
                    ? "ring-2 ring-[#0B2A52] ring-offset-1 "
                    : ""
                }${
                  isFlagged
                    ? "bg-amber-300 text-amber-950"
                    : isAnswered
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={submitAttempt}
          disabled={submitting}
          className="w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-extrabold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {submitting ? "Menilai..." : "Kumpulkan Jawaban Sekarang"}
        </button>
      </div>
    </div>
  );
}
