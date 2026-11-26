import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function BrandLogo({
  href = "/",
  inverted = false,
}: {
  href?: string;
  inverted?: boolean;
}) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5 group">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-105 ${
          inverted
            ? "bg-amber-400 text-[#0B2A52]"
            : "bg-[#0B2A52] text-amber-400"
        }`}
      >
        <ShieldCheck className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-base font-black tracking-tight ${
            inverted ? "text-white" : "text-[#0B2A52]"
          }`}
        >
          BOYANG<span className="text-amber-500">-CPNS</span>
        </span>
        <span
          className={`text-[10px] font-semibold tracking-wider uppercase ${
            inverted ? "text-slate-300" : "text-slate-500"
          }`}
        >
          Portal Persiapan ASN
        </span>
      </span>
    </Link>
  );
}
