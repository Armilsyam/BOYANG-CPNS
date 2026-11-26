"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  FolderOpen,
  Search,
  Star,
  X,
} from "lucide-react";
import {
  FORMASI_INSTANSI,
  LEVEL_META,
  getDisplayName,
  getPdfUrl,
  type FormasiInstansi,
  type InstansiLevel,
} from "@/data/formasi";

type FilterKey = "all" | InstansiLevel | "fav";

const LEVEL_STOP = new Set([
  "kab",
  "kota",
  "prov",
  "provinsi",
  "kabupaten",
  "pemkab",
  "pemkot",
  "pemprov",
  "pemda",
  "daerah",
  "pusat",
]);

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

interface IndexedFormasi extends FormasiInstansi {
  display: string;
  hay: string;
  hayCompact: string;
  displayWords: string[];
  aliasWords: string[];
  levelWords: string[];
  displayNorm: string;
  keyNorm: string;
  letter: string;
  pdfUrl: string;
}

const INDEXED_DATA: IndexedFormasi[] = FORMASI_INSTANSI.map((item) => {
  const display = getDisplayName(item);
  const full = item.lv === "P" ? item.name : `Pemerintah ${display}`;
  const hay = normalizeText(
    [full, item.alias, LEVEL_META[item.lv].searchWords].join(" ")
  );
  return {
    ...item,
    display,
    hay,
    hayCompact: hay.replace(/ /g, ""),
    displayWords: normalizeText(display).split(" "),
    aliasWords: normalizeText(item.alias).split(" ").filter(Boolean),
    levelWords: LEVEL_META[item.lv].searchWords.split(" "),
    displayNorm: normalizeText(display),
    keyNorm: normalizeText(item.name),
    letter: normalizeText(item.name).charAt(0).toUpperCase(),
    pdfUrl: getPdfUrl(item.id),
  };
}).sort(
  (a, b) =>
    a.name.localeCompare(b.name, "id") || a.lv.localeCompare(b.lv)
);

function scoreMatch(d: IndexedFormasi, tokens: string[], q: string): number {
  let score = 0;
  for (const t of tokens) {
    if (!(d.hay.includes(t) || d.hayCompact.includes(t))) return -1;
    if (d.levelWords.includes(t)) score += 2;
    else if (
      d.displayWords.some((w) => w.startsWith(t)) ||
      d.aliasWords.some((w) => w.startsWith(t))
    ) {
      score += 3;
    } else {
      score += 1;
    }
  }
  if (d.displayNorm.startsWith(q)) score += 6;
  if (d.keyNorm.startsWith(q)) score += 4;
  if (d.aliasWords.includes(q)) score += 5;
  return score;
}

function HighlightText({ text, tokens }: { text: string; tokens: string[] }) {
  const activeTokens = tokens.filter(
    (t) => t.length > 1 && !LEVEL_STOP.has(t)
  );
  if (activeTokens.length === 0) return <>{text}</>;

  const escaped = [...activeTokens]
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, idx) =>
        idx % 2 === 1 ? <mark key={idx}>{part}</mark> : <span key={idx}>{part}</span>
      )}
    </>
  );
}

const LEVEL_BADGE_CLASSES: Record<InstansiLevel, string> = {
  P: "bg-amber-100 text-amber-900 border-amber-200",
  V: "bg-indigo-100 text-indigo-900 border-indigo-200",
  B: "bg-sky-100 text-sky-900 border-sky-200",
  T: "bg-emerald-100 text-emerald-900 border-emerald-200",
};

export function FormasiExplorer({
  initialBookmarks,
}: {
  initialBookmarks: number[];
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [bookmarks, setBookmarks] = useState<Set<number>>(
    () => new Set(initialBookmarks)
  );
  const [copiedNo, setCopiedNo] = useState<number | null>(null);
  const [savingNo, setSavingNo] = useState<number | null>(null);
  const [activeLetter, setActiveLetter] = useState<string>("ALL");

  const tokens = useMemo(() => {
    const norm = normalizeText(query);
    return norm ? norm.split(" ").filter(Boolean) : [];
  }, [query]);

  const queryNorm = useMemo(() => normalizeText(query), [query]);

  const counts = useMemo(() => {
    return {
      all: INDEXED_DATA.length,
      P: INDEXED_DATA.filter((d) => d.lv === "P").length,
      V: INDEXED_DATA.filter((d) => d.lv === "V").length,
      B: INDEXED_DATA.filter((d) => d.lv === "B").length,
      T: INDEXED_DATA.filter((d) => d.lv === "T").length,
      fav: bookmarks.size,
    };
  }, [bookmarks.size]);

  const filtered = useMemo(() => {
    let list = INDEXED_DATA.filter((d) => {
      if (filter === "fav") return bookmarks.has(d.no);
      if (filter === "all") return true;
      return d.lv === filter;
    });

    if (activeLetter !== "ALL" && tokens.length === 0) {
      list = list.filter((d) => d.letter === activeLetter);
    }

    if (tokens.length > 0) {
      const scored = list
        .map((d) => ({ item: d, score: scoreMatch(d, tokens, queryNorm) }))
        .filter((r) => r.score >= 0)
        .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name, "id"));
      return scored.map((r) => r.item);
    }

    return list;
  }, [filter, bookmarks, activeLetter, tokens, queryNorm]);

  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    for (const d of INDEXED_DATA) {
      if (filter === "fav" && !bookmarks.has(d.no)) continue;
      if (filter !== "all" && filter !== "fav" && d.lv !== filter) continue;
      set.add(d.letter);
    }
    return Array.from(set).sort();
  }, [filter, bookmarks]);

  async function toggleBookmark(instansiNo: number) {
    setSavingNo(instansiNo);
    const prev = new Set(bookmarks);
    const next = new Set(bookmarks);
    if (next.has(instansiNo)) next.delete(instansiNo);
    else next.add(instansiNo);
    setBookmarks(next);

    try {
      const res = await fetch("/api/dashboard/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instansiNo }),
      });
      if (!res.ok) {
        setBookmarks(prev);
      }
    } catch {
      setBookmarks(prev);
    } finally {
      setSavingNo(null);
    }
  }

  async function copyPdfLink(item: IndexedFormasi) {
    try {
      await navigator.clipboard.writeText(item.pdfUrl);
      setCopiedNo(item.no);
      setTimeout(() => setCopiedNo((curr) => (curr === item.no ? null : curr)), 1800);
    } catch {
      // Ignore clipboard failures on restricted contexts
    }
  }

  const filterTabs: Array<{ key: FilterKey; label: string; count: number }> = [
    { key: "all", label: "Semua", count: counts.all },
    { key: "P", label: "Pusat", count: counts.P },
    { key: "V", label: "Provinsi", count: counts.V },
    { key: "B", label: "Kabupaten", count: counts.B },
    { key: "T", label: "Kota", count: counts.T },
    { key: "fav", label: "★ Favorit", count: counts.fav },
  ];

  return (
    <div className="space-y-5">
      {/* Banner Folder 2026 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-gradient-to-r from-[#0B2A52] to-[#1A4B8C] p-5 text-white shadow-sm">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
            Update Folder CPNS 2026 + Arsip 304 Instansi
          </p>
          <h2 className="mt-1 font-heading text-lg font-black">
            Explorer PDF Formasi &amp; Persyaratan Instansi
          </h2>
          <p className="mt-1 text-xs text-slate-200">
            Gunakan arsip PDF 304 instansi untuk memetakan syarat ijazah, akreditasi, dan TOEFL, lalu pantau folder instansi 2026.
          </p>
        </div>
        <a
          href="https://drive.google.com/drive/folders/1Y8Mq2R4TVQQMIrvTRXPWOWGOyGHutpZh?usp=drive_link"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-black text-[#0B2A52] hover:bg-amber-300"
        >
          <FolderOpen className="h-4 w-4" />
          Buka Folder PDF Instansi 2026
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Search & Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari instansi atau singkatan (mis. kemenkeu, kemenkes, atrbpn, kalbar, bandung, pemkot)..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm outline-none focus:border-[#0B2A52] focus:bg-white"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Hapus pencarian"
              className="absolute right-3 top-3 rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setFilter(tab.key);
                setActiveLetter("ALL");
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold transition ${
                filter === tab.key
                  ? "bg-[#0B2A52] text-white"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                  filter === tab.key
                    ? "bg-white/20 text-white"
                    : "bg-white text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Alphabet jump */}
        {tokens.length === 0 && (
          <div className="flex flex-wrap items-center gap-1 pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setActiveLetter("ALL")}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-extrabold ${
                activeLetter === "ALL"
                  ? "bg-amber-400 text-[#0B2A52]"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              A–Z
            </button>
            {availableLetters.map((ltr) => (
              <button
                key={ltr}
                type="button"
                onClick={() => setActiveLetter(ltr)}
                className={`rounded-lg px-2 py-1 text-[11px] font-bold ${
                  activeLetter === ltr
                    ? "bg-[#0B2A52] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {ltr}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-600">
        <span>Menampilkan {filtered.length} instansi</span>
        {filter === "fav" && bookmarks.size === 0 && (
          <span className="text-amber-700">Klik ikon bintang untuk menyimpan instansi target Anda.</span>
        )}
      </div>

      {/* Results List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          Tidak ada instansi yang cocok dengan kata kunci &ldquo;{query}&rdquo;.
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          {filtered.map((item) => {
            const isBookmarked = bookmarks.has(item.no);
            return (
              <li
                key={item.no}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 hover:bg-slate-50/70 transition"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">
                    <HighlightText text={item.display} tokens={tokens} />
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px]">
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-extrabold ${
                        LEVEL_BADGE_CLASSES[item.lv]
                      }`}
                    >
                      {LEVEL_META[item.lv].label}
                    </span>
                    {item.formasi !== null && (
                      <span className="font-semibold text-slate-600">
                        {item.formasi.toLocaleString("id-ID")} formasi
                      </span>
                    )}
                    {item.daftar && (
                      <span className="text-slate-500">Pendaftaran {item.daftar}</span>
                    )}
                    {item.alias && (
                      <span className="text-slate-400">Alias: {item.alias}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#0B2A52] px-3.5 py-2 text-xs font-extrabold text-white hover:bg-[#143d73]"
                  >
                    Buka PDF
                    <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                  </a>

                  <button
                    type="button"
                    onClick={() => copyPdfLink(item)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    {copiedNo === item.no ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Salin Link
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={savingNo === item.no}
                    onClick={() => toggleBookmark(item.no)}
                    aria-label={isBookmarked ? "Hapus dari favorit" : "Simpan ke favorit"}
                    className={`inline-flex items-center justify-center rounded-xl border p-2 transition ${
                      isBookmarked
                        ? "border-amber-300 bg-amber-50 text-amber-600"
                        : "border-slate-200 bg-white text-slate-400 hover:text-amber-500"
                    }`}
                  >
                    <Star
                      className="h-4 w-4"
                      fill={isBookmarked ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
